"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const registrationMemberRemas_1 = __importDefault(require("../models/registrationMemberRemas"));
const registrationMemberRemas_2 = __importDefault(require("../entities/registrationMemberRemas"));
let RegistrationMemberRemasRepository = class RegistrationMemberRemasRepository {
    async create(data) {
        const result = await registrationMemberRemas_1.default.create({
            uuid: data.uuid,
            user_uuid: data.user_uuid,
            full_name: data.full_name,
            address: data.address,
            birthday: data.birthday,
            handphone: data.handphone,
            image: data.image,
            created_at: data.created_at,
            description: data.description,
            updated_at: data.updated_at,
            created_by: data.created_by ?? null,
            email: data.email
        });
        return data;
    }
    async findOne(uuid) {
        const result = await registrationMemberRemas_1.default.findOne({
            uuid: uuid,
            deleted_at: null
        });
        return result ? new registrationMemberRemas_2.default(result) : null;
    }
    async findOneUserUuid(uuid) {
        const result = await registrationMemberRemas_1.default.findOne({
            "created_by.uuid": uuid,
        });
        return result ? new registrationMemberRemas_2.default(result) : null;
    }
    async chainUpdateFromProfile(data) {
        await registrationMemberRemas_1.default.updateMany({ "created_by.uuid": data.user_uuid }, {
            created_by: {
                name: data.main_information?.nickname ?? '',
                uuid: data.user_uuid ?? "",
                image: data.main_information?.image,
                slug: data.slug
            }
        });
        return { success: true };
    }
    async update(data) {
        const result = await registrationMemberRemas_1.default.updateOne({
            uuid: data.uuid, user_uuid: data.user_uuid,
        }, {
            user_uuid: data.user_uuid,
            full_name: data.full_name,
            address: data.address,
            birthday: data.birthday,
            handphone: data.handphone,
            created_at: data.created_at,
            updated_at: data.updated_at,
            image: data.image,
            created_by: data.created_by ? data.created_by : null,
            email: data.email
        });
        return data;
    }
    async delete(uuid) {
        const data = await registrationMemberRemas_1.default.updateOne({ uuid: uuid }, {
            deleted_at: new Date
        });
        return { success: true };
    }
    async index(user_uuid) {
        return await registrationMemberRemas_1.default.find({ user_uuid: user_uuid, deleted_at: null })
            .then(result => {
            return {
                data: result.map(data => {
                    return new registrationMemberRemas_2.default({
                        user_uuid: data.user_uuid,
                        full_name: data.full_name,
                        address: data.address,
                        birthday: data.birthday,
                        handphone: data.handphone,
                        created_at: data.created_at,
                        updated_at: data.updated_at,
                        image: data.image,
                        description: data.description,
                        ipaddr: data.ipaddr,
                        created_by: data.created_by,
                        email: data.email,
                        deleted_at: data.deleted_at,
                        uuid: data.uuid
                    });
                })
            };
        });
    }
};
RegistrationMemberRemasRepository = __decorate([
    inversify_1.injectable()
], RegistrationMemberRemasRepository);
exports.default = RegistrationMemberRemasRepository;
