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
const comment_1 = __importDefault(require("../entities/comment"));
const comment_2 = __importDefault(require("../models/comment"));
let CommentRepository = class CommentRepository {
    async create(data) {
        const result = await comment_2.default.create({
            uuid: data.uuid,
            created_by: data.created_by,
            comment: data.comment,
            post_uuid: data.post_uuid,
            ip_address: data.ip_address,
            created_at: data.created_at,
            deleted_at: data.deleted_at,
            updated_at: data.updated_at,
        });
        return { success: true };
    }
    async findOne(uuid) {
        const result = await comment_2.default.findOne({
            user_uuid: uuid,
        });
        return result ? new comment_1.default(result) : null;
    }
    async update(data) {
        const result = await comment_2.default.updateOne({ uuid: data.uuid }, {
            comment: data.comment,
            updated_at: data.updated_at
        });
        return { success: true };
    }
    async delete(uuid, user_uuid, data) {
        const result = await comment_2.default.updateOne({ uuid: uuid }, {
            updated_at: data,
            deleted_at: data
        });
        return { success: true };
    }
    async chainUpdateFromProfile(data) {
        await comment_2.default.updateMany({ "created_by.uuid": data.user_uuid }, {
            created_by: {
                name: data.main_information?.nickname ?? '',
                uuid: data.user_uuid ?? "",
                image: data.main_information?.image,
                slug: data.slug
            }
        });
        return { success: true };
    }
    async find(post_uuid) {
        return comment_2.default.find({ post_uuid: post_uuid })
            .then(result => {
            return {
                data: result.map(data => {
                    return new comment_1.default({
                        uuid: data.uuid,
                        created_by: data.created_by,
                        comment: data.comment,
                        created_at: data.created_at,
                        updated_at: data.updated_at,
                    });
                })
            };
        });
    }
};
CommentRepository = __decorate([
    inversify_1.injectable()
], CommentRepository);
exports.default = CommentRepository;
