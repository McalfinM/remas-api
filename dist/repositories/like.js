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
            ip_address: data.ip_address,
            post_uuid: data.post_uuid,
            created_at: data.created_at,
            deleted_at: data.deleted_at,
            updated_at: data.updated_at,
        });
        return { success: true };
    }
    async findOne(uuid) {
        const result = await like_2.default.findOne({
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
    async find(post_uuid) {
        const like = await like_2.default.find({ post_uuid: post_uuid })
            .countDocuments();
        return like;
        // .then(result => {
        //     return {
        //         data: result.map(data => {
        //             return new LikeEntity({
        //                 uuid: data.uuid,
        //                 user_uuid: data.user_uuid,
        //                 post_uuid: data.post_uuid,
        //                 ip_address: data.ip_address,
        //                 created_at: data.created_at,
        //                 updated_at: data.updated_at,
        //                 deleted_at: data.updated_at
        //             })
        //         })
        //     }
        // })
    }
};
LikeRepository = __decorate([
    inversify_1.injectable()
], LikeRepository);
exports.default = LikeRepository;
