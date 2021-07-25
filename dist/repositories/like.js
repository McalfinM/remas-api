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
const like_1 = __importDefault(require("../entities/like"));
const like_2 = __importDefault(require("../models/like"));
let LikeRepository = class LikeRepository {
    async create(data) {
        const result = await like_2.default.create({
            uuid: data.uuid,
            user_uuid: data.user_uuid,
            post_uuid: data.post_uuid,
            created_at: data.created_at,
            deleted_at: data.deleted_at,
            updated_at: data.updated_at,
        });
        return { success: true };
    }
    async findOne(post_uuid, uuid) {
        const result = await like_2.default.findOne({
            post_uuid: post_uuid,
            user_uuid: uuid,
        });
        return result ? new like_1.default(result) : null;
    }
    async delete(uuid, user_uuid, data) {
        const result = await like_2.default.updateOne({ uuid: uuid }, {
            updated_at: data,
            deleted_at: data
        });
        return { success: true };
    }
    async updateDeleteToNullAgain(uuid) {
        const result = await like_2.default.updateOne({ uuid: uuid }, {
            updated_at: new Date,
            deleted_at: null
        });
        return { success: true };
    }
    async find(post_uuid) {
        return await like_2.default.find({ post_uuid: post_uuid, deleted_at: null })
            .then((data) => {
            return {
                data: data.map(result => {
                    return new like_1.default({
                        user_uuid: result.user_uuid,
                        created_at: result.created_at,
                        deleted_at: result.deleted_at,
                        post_uuid: result.post_uuid,
                        updated_at: result.updated_at,
                        uuid: result.uuid
                    });
                })
            };
        });
    }
};
LikeRepository = __decorate([
    inversify_1.injectable()
], LikeRepository);
exports.default = LikeRepository;
