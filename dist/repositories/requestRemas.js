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
const requestRemas_1 = __importDefault(require("../entities/requestRemas"));
const requestRemas_2 = __importDefault(require("../models/requestRemas"));
let RequestRemasRepository = class RequestRemasRepository {
    async create(data) {
        const result = await requestRemas_2.default.create({
            uuid: data.uuid,
            address: data.address,
            created_by: data.created_by,
            description: data.description,
            full_name: data.full_name,
            handphone: data.handphone,
            image: data.image,
            created_at: new Date,
            updated_at: new Date,
            deleted_at: null
        });
        return { success: true };
    }
    async findOne(uuid) {
        const result = await requestRemas_2.default.findOne({
            uuid: uuid,
        });
        return result ? new requestRemas_1.default(result) : null;
    }
    async delete(uuid, user) {
        console.log(uuid, 'ini uuid repo');
        console.log(user);
        const result = await requestRemas_2.default.updateOne({
            uuid: uuid,
            "created_by.uuid": user.uuid
        }, { deleted_at: new Date });
        return { success: true };
    }
    async findWithUserUuid(user_uuid) {
        const response = await requestRemas_2.default.findOne({ "created_by.uuid": user_uuid, deleted_at: null });
        return response ? new requestRemas_1.default(response) : null;
    }
    async chainUpdateFromProfile(user) {
        const response = await requestRemas_2.default.updateOne({ "created_by.uuid": user.user_uuid }, {
            "created_by.name": user.main_information?.nickname,
            "created_by.image": user.main_information?.image
        });
        return { success: true };
    }
    async find(uuid) {
        return await requestRemas_2.default.find({ uuid: uuid, deleted_at: null })
            .then((data) => {
            return {
                data: data.map(result => {
                    return new requestRemas_1.default({
                        created_by: result.created_by,
                        created_at: result.created_at,
                        full_name: result.full_name,
                        updated_at: result.updated_at,
                        uuid: result.uuid,
                        status: result.status,
                        address: result.address,
                        deleted_at: result.deleted_at,
                        description: result.description,
                        handphone: result.handphone,
                        image: result.image
                    });
                })
            };
        });
    }
};
RequestRemasRepository = __decorate([
    inversify_1.injectable()
], RequestRemasRepository);
exports.default = RequestRemasRepository;
