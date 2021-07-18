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
const errors_1 = require("../helpers/errors");
const registrationMemberRemas_1 = __importDefault(require("../entities/registrationMemberRemas"));
let RegistrationMemberRemasService = class RegistrationMemberRemasService {
    profileService;
    RegistrationRemasMemberRepository;
    dispatcher;
    constructor(profileService, RegistrationRemasMemberRepository, dispatcher) {
        this.profileService = profileService;
        this.RegistrationRemasMemberRepository = RegistrationRemasMemberRepository;
        this.dispatcher = dispatcher;
    }
    async create(data, user) {
        const searchData = await this.profileService.findOne(data.user_uuid);
        if (!searchData)
            throw new errors_1.ErrorNotFound('Data not found', '@Service Create Member Remas Registration');
        const profileEntity = new registrationMemberRemas_1.default({
            uuid: uuid_1.v4(),
            full_name: data.full_name ?? '',
            address: data.address,
            birthday: data.birthday,
            email: data.email,
            handphone: data.handphone,
            user_uuid: data.user_uuid,
            created_by: user ? {
                name: user.name ?? '',
                uuid: user.uuid ?? '',
            } : null,
            description: data.description,
            ipaddr: data.ipaddr,
            image: data.image ?? 'https://res.cloudinary.com/dcyohew0h/image/upload/v1626325005/posts/roxlkp46kp0sk9oqb3jg.png',
            created_at: new Date,
            deleted_at: null,
            updated_at: new Date,
        });
        await this.RegistrationRemasMemberRepository.create(profileEntity);
        return { success: true };
    }
    async findOne(uuid) {
        const result = await this.RegistrationRemasMemberRepository.findOne(uuid);
        return result;
    }
    async delete(uuid) {
        return await this.RegistrationRemasMemberRepository.delete(uuid);
    }
    async index(user) {
        return await this.RegistrationRemasMemberRepository.index(user.uuid);
    }
};
RegistrationMemberRemasService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.ProfileService)),
    __param(1, inversify_1.inject(types_1.TYPES.RegistrationMemberRemasRepository)),
    __param(2, inversify_1.inject(types_1.TYPES.ProducerDispatcher))
], RegistrationMemberRemasService);
exports.default = RegistrationMemberRemasService;
