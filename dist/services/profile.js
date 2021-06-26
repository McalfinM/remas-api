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
const profile_1 = __importDefault(require("../entities/profile"));
const profileSpecification_1 = __importDefault(require("../repositories/specifications/profileSpecification"));
let ProfileService = class ProfileService {
    profileReopsitory;
    dispatcher;
    constructor(profileReopsitory, dispatcher) {
        this.profileReopsitory = profileReopsitory;
        this.dispatcher = dispatcher;
    }
    async create(data) {
        const searchData = await this.profileReopsitory.findOne(data.uuid ?? '');
        const profileEntity = new profile_1.default({
            main_information: data.main_information,
            ramadhan: data.ramadhan ?? null,
            idul_adha: data.idul_adha ?? null,
            roles: data.roles,
            user_uuid: data.user_uuid ?? '',
            uuid: data.uuid ?? '',
            slug: data.slug
        });
        await this.profileReopsitory.create(profileEntity);
        return { success: true };
    }
    async findOne(uuid) {
        const result = await this.profileReopsitory.findOne(uuid);
        return result;
    }
    async update(uuid, data) {
        return { success: true };
    }
    async index(data) {
        return await this.profileReopsitory.index(new profileSpecification_1.default(data));
    }
};
ProfileService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.ProfileRepository)),
    __param(1, inversify_1.inject(types_1.TYPES.ProducerDispatcher))
], ProfileService);
exports.default = ProfileService;
