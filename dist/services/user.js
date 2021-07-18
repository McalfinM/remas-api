"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const types_1 = require("../types");
const uuid_1 = require("uuid");
const user_1 = __importDefault(require("../entities/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const profile_1 = __importDefault(require("../entities/profile"));
const slugify_1 = __importDefault(require("slugify"));
const userRoleEnum_1 = require("../entities/enums/userRoleEnum");
let UserService = class UserService {
    userRepository;
    profileService;
    dispatcher;
    constructor(userRepository, profileService, dispatcher) {
        this.userRepository = userRepository;
        this.profileService = profileService;
        this.dispatcher = dispatcher;
    }
    async create(data) {
        const salt = await bcrypt_1.default.genSalt(12);
        const hash = bcrypt_1.default.hashSync(data.password, salt);
        const userEntity = new user_1.default({
            name: data.name,
            email: data.email,
            uuid: uuid_1.v4(),
            password: hash,
            roles: [userRoleEnum_1.UserRole.MEMBER],
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null
        });
        const profile = new profile_1.default({
            uuid: uuid_1.v4(),
            user_uuid: userEntity.uuid ?? '',
            slug: slugify_1.default(userEntity.name ?? '') + uuid_1.v4(),
            roles: userEntity.roles,
            main_information: {
                nickname: userEntity.name ?? '',
                image: 'https://res.cloudinary.com/werich1/image/upload/v1624073825/waugxiymo5l9u3jcesq4.png',
            },
            idul_adha: null,
            ramadhan: null,
            deleted_at: null
        });
        await this.userRepository.create(userEntity);
        await this.profileService.create(profile);
        return { success: true };
    }
    async findOne(uuid) {
        const result = await this.userRepository.findOne(uuid);
        return result;
    }
    async update(data) {
        return { success: true };
    }
};
UserService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.UserRepository)),
    __param(1, inversify_1.inject(types_1.TYPES.ProfileService)),
    __param(2, inversify_1.inject(types_1.TYPES.ProducerDispatcher))
], UserService);
exports.default = UserService;
