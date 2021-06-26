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
const post_1 = __importDefault(require("../entities/post"));
const post_2 = __importDefault(require("../models/post"));
let PostRepository = class PostRepository {
    async create(data) {
        const result = await post_2.default.create({
            uuid: data.uuid,
            title: data.title,
            slug: data.slug,
            category: data.category,
            image: data.image,
            cloudinary_id: data.cloudinary_id,
            content: data.content,
            created_by: data.created_by,
            created_at: data.created_at,
            updated_at: data.updated_at
        });
        return data;
    }
    async findOne(uuid) {
        const result = await post_2.default.findOne({
            slug: uuid,
            $or: [{ deleted_at: undefined }]
        });
        return result ? new post_1.default(result) : null;
    }
    async update(data) {
        const result = await post_2.default.updateOne({ uuid: data.uuid ?? '', "created_by.uuid": data.created_by?.uuid }, {
            title: data.title,
            content: data.content,
            image: data.image,
            category: data.category,
            cloudinary_id: data.cloudinary_id,
            created_at: data.created_at,
            updated_at: data.updated_at,
            deleted_at: data.deleted_at,
            created_by: data.created_by,
            slug: data.slug
        });
        return data;
    }
    async findDetailPost(slug) {
        const result = await post_2.default.findOne({
            slug: slug,
            $or: [{ deleted_at: undefined }]
        });
        return result ? new post_1.default(result) : null;
    }
    async delete(uuid, user) {
        const result = await post_2.default.updateOne({
            uuid: uuid,
            "created_by.uuid": user.uuid
        }, { deleted_at: new Date });
        return { success: true };
    }
    async index(specification) {
        const total_customer = await post_2.default.find({
            ...specification.specifies(),
        }).countDocuments();
        return post_2.default.find({
            ...specification.specifies(),
        }, {}, {
            ...specification.paginate(),
            sort: specification.specSort(),
        })
            .then((result) => {
            return {
                total: total_customer,
                data: result.map((data) => {
                    return new post_1.default({
                        uuid: data.uuid,
                        created_by: data.created_by,
                        slug: data.slug,
                        category: data.category,
                        image: data.image,
                        title: data.title,
                        cloudinary_id: data.cloudinary_id,
                        // comments: data.comments,
                        content: data.content,
                        created_at: data.created_at,
                        deleted_at: data.deleted_at,
                        updated_at: data.updated_at
                    });
                }),
            };
        })
            .catch((err) => {
            return err;
        });
    }
};
PostRepository = __decorate([
    inversify_1.injectable()
], PostRepository);
exports.default = PostRepository;
