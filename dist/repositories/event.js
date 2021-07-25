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
const event_1 = __importDefault(require("../entities/event"));
const event_2 = __importDefault(require("../models/event"));
let EventRepository = class EventRepository {
    async create(data) {
        const result = await event_2.default.create({
            uuid: data.uuid,
            title: data.title,
            slug: data.slug,
            category: data.category,
            image: data.image,
            time: data.time,
            schedule: data.schedule,
            place: data.place,
            cloudinary_id: data.cloudinary_id,
            content: data.content,
            created_by: data.created_by,
            created_at: data.created_at,
            updated_at: data.updated_at
        });
        return data;
    }
    async findOne(uuid) {
        const result = await event_2.default.findOne({
            slug: uuid,
            $or: [{ deleted_at: undefined }]
        });
        return result ? new event_1.default(result) : null;
    }
    async update(data) {
        const result = await event_2.default.updateOne({ uuid: data.uuid ?? '', "created_by.uuid": data.created_by?.uuid }, {
            uuid: data.uuid ?? '',
            title: data.title,
            slug: data.slug,
            category: data.category,
            image: data.image,
            schedule: data.schedule,
            time: data.time,
            place: data.place,
            cloudinary_id: data.cloudinary_id,
            content: data.content,
            created_by: data.created_by,
            created_at: data.created_at,
            updated_at: data.updated_at
        });
        return data;
    }
    async findPostByUuid(uuid, user) {
        const result = await event_2.default.findOne({
            uuid: uuid,
            "created_by.uuid": user.uuid,
            $or: [{ deleted_at: undefined }]
        });
        return result ? new event_1.default(result) : null;
    }
    async delete(uuid, user) {
        const result = await event_2.default.updateOne({
            uuid: uuid,
            "created_by.uuid": user.uuid
        }, { deleted_at: new Date });
        return { success: true };
    }
    async findPostWithAuth(user) {
        return await event_2.default.find({ "created_by.uuid": user.uuid, deleted_at: null })
            .then(result => {
            return {
                data: result.map((data) => {
                    return new event_1.default({
                        uuid: data.uuid,
                        title: data.title,
                        slug: data.slug,
                        category: data.category,
                        image: data.image,
                        time: data.time,
                        schedule: data.schedule,
                        place: data.place,
                        cloudinary_id: data.cloudinary_id,
                        content: data.content,
                        created_by: data.created_by,
                        created_at: data.created_at,
                        updated_at: data.updated_at,
                        deleted_at: data.deleted_at
                    });
                })
            };
        });
    }
    async chainUpdateFromProfile(data) {
        const response = await event_2.default.updateMany({ "created_by.uuid": data.user_uuid }, {
            created_by: {
                uuid: data.user_uuid ?? '',
                name: data.main_information?.nickname ?? '',
                image: data.main_information?.image,
                slug: data.slug
            }
        });
        return { success: true };
    }
    async index(specification) {
        const total_customer = await event_2.default.find({
            ...specification.specifies(),
        }).countDocuments();
        return event_2.default.find({
            ...specification.specifies(),
        }, {}, {
            ...specification.paginate(),
            sort: specification.specSort(),
        })
            .then((result) => {
            return {
                total: total_customer,
                data: result.map((data) => {
                    return new event_1.default({
                        uuid: data.uuid,
                        title: data.title,
                        slug: data.slug,
                        category: data.category,
                        image: data.image,
                        time: data.time,
                        place: data.place,
                        cloudinary_id: data.cloudinary_id,
                        schedule: data.schedule,
                        content: data.content,
                        created_by: data.created_by,
                        created_at: data.created_at,
                        updated_at: data.updated_at,
                        deleted_at: data.deleted_at
                    });
                }),
            };
        })
            .catch((err) => {
            return err;
        });
    }
};
EventRepository = __decorate([
    inversify_1.injectable()
], EventRepository);
exports.default = EventRepository;
