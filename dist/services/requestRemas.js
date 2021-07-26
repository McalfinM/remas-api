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
const createRequestRemas_1 = __importDefault(require("../request/requestRemas/createRequestRemas"));
const requestRemas_1 = __importDefault(require("../entities/requestRemas"));
const errors_1 = require("../helpers/errors");
const profile_1 = __importDefault(require("../entities/profile"));
const slugify_1 = __importDefault(require("slugify"));
const userRoleEnum_1 = require("../entities/enums/userRoleEnum");
let RequestRemasService = class RequestRemasService {
    requestRemasRepository;
    userRepository;
    profileService;
    dispatcher;
    constructor(requestRemasRepository, userRepository, profileService, dispatcher) {
        this.requestRemasRepository = requestRemasRepository;
        this.userRepository = userRepository;
        this.profileService = profileService;
        this.dispatcher = dispatcher;
    }
    async create(data, user) {
        const likeEntity = new requestRemas_1.default({
            uuid: uuid_1.v4(),
            full_name: data.full_name,
            address: data.address,
            created_by: {
                uuid: user.uuid,
                name: user.name,
            },
            status: 'Pending',
            description: data.description,
            handphone: data.handphone,
            image: data.image,
            created_at: new Date,
            deleted_at: null,
            updated_at: new Date
        });
        const likes = await this.requestRemasRepository.create(likeEntity);
        return { success: true };
    }
    async findOne(uuid) {
        const result = await this.requestRemasRepository.findOne(uuid);
        if (result) {
        }
        return result;
    }
    async find(user) {
        const findUser = await this.userRepository.findOneByUuid(user.uuid);
        if (!findUser)
            throw new errors_1.ErrorNotFound('User not found', '@Find Reqquest Remas Service');
        let roles = JSON.stringify(findUser.roles);
        if (roles.includes('admin')) {
            return await this.requestRemasRepository.find();
        }
        else {
            throw new errors_1.ErrorNotFound('not have access', '@find service request remas');
        }
    }
    async findWithUserUuid(user) {
        const response = await this.requestRemasRepository.findWithUserUuid(user.uuid);
        return response;
    }
    async delete(requestUuid, user) {
        const searchRequest = await this.requestRemasRepository.findOne(requestUuid);
        if (!searchRequest)
            throw new errors_1.ErrorNotFound('Request not found', '@Service request remas');
        await this.requestRemasRepository.delete(searchRequest.uuid, user);
        return { success: true };
    }
    async chainUpdateFromProfile(user) {
        await this.requestRemasRepository.chainUpdateFromProfile(user);
        return { success: true };
    }
    async update(data, user_uuid) {
        const findUser = await this.userRepository.findOneByUuid(user_uuid);
        const likeEntity = new requestRemas_1.default({
            uuid: uuid_1.v4(),
            full_name: data.full_name,
            address: data.address,
            created_by: {
                uuid: findUser?.uuid ?? '',
                name: findUser?.name ?? '',
            },
            status: 'Completed',
            description: data.description,
            handphone: data.handphone,
            image: data.image,
            created_at: new Date,
            deleted_at: null,
            updated_at: new Date
        });
        const likes = await this.requestRemasRepository.update(likeEntity);
        return { success: true };
    }
    async updateToProfile(uuid) {
        const findUser = await this.findOne(uuid);
        const findUserRequest = await this.profileService.findOne(findUser?.created_by.uuid ?? '');
        if (!findUserRequest)
            throw new errors_1.ErrorNotFound('Data not found', '@Service update to profile request remas');
        if (findUser) {
            const profile = new profile_1.default({
                idul_adha: null,
                main_information: {
                    address: findUser.address,
                    birthday: '',
                    cloudinary_id: '',
                    description: findUser.description,
                    full_name: findUser.full_name,
                    image: findUserRequest.main_information?.image,
                    misi: '',
                    nickname: findUserRequest.main_information?.nickname,
                    visi: ''
                },
                deleted_at: null,
                ramadhan: null,
                slug: slugify_1.default(findUserRequest.main_information?.nickname ?? '') + uuid_1.v4(),
                user_uuid: findUserRequest.user_uuid ?? '',
                uuid: findUserRequest.uuid ?? '',
                is_active: true,
                roles: [userRoleEnum_1.UserRole.MEMBER, userRoleEnum_1.UserRole.REMAJA_MASJID]
            });
            const updateEntity = new createRequestRemas_1.default({
                address: findUser.address,
                description: findUser.description,
                full_name: findUser.full_name,
                handphone: findUser.handphone,
                image: findUser.image,
            });
            await this.profileService.update(profile);
            await this.update(updateEntity, findUser.created_by.uuid ?? '');
        }
        return { success: true };
    }
};
RequestRemasService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.RequestRemasRepository)),
    __param(1, inversify_1.inject(types_1.TYPES.UserRepository)),
    __param(2, inversify_1.inject(types_1.TYPES.ProfileRepository)),
    __param(3, inversify_1.inject(types_1.TYPES.ProducerDispatcher))
], RequestRemasService);
exports.default = RequestRemasService;
