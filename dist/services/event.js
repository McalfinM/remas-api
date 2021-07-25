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
const slugify_1 = __importDefault(require("slugify"));
const postSpecification_1 = __importDefault(require("../repositories/specifications/postSpecification"));
const cloudinary_1 = require("../helpers/cloudinary");
const event_1 = __importDefault(require("../entities/event"));
const moment_1 = __importDefault(require("moment"));
let EventService = class EventService {
    eventRepository;
    commentService;
    likeService;
    profileService;
    categoryService;
    dispatcher;
    constructor(eventRepository, commentService, likeService, profileService, categoryService, dispatcher) {
        this.eventRepository = eventRepository;
        this.commentService = commentService;
        this.likeService = likeService;
        this.profileService = profileService;
        this.categoryService = categoryService;
        this.dispatcher = dispatcher;
    }
    async create(data, user) {
        console.log(data);
        const profile = await this.profileService.findOne(user.uuid);
        const category = await this.categoryService.findOne(data.category);
        const eventEntity = new event_1.default({
            uuid: uuid_1.v4(),
            category: {
                uuid: category?.uuid ?? '',
                name: category?.name ?? ''
            },
            cloudinary_id: data.cloudinary_id,
            content: data.content,
            created_by: {
                uuid: user.uuid,
                name: user.name,
                image: profile?.main_information?.image ?? 'https://res.cloudinary.com/werich1/image/upload/v1624073825/waugxiymo5l9u3jcesq4.png',
                slug: profile?.slug ?? ''
            },
            time: moment_1.default(data.time).format('H:mm'),
            schedule: moment_1.default(data.date).format('DD-MM-YYYY'),
            place: data.place,
            created_at: new Date,
            deleted_at: null,
            image: data.image ?? 'https://res.cloudinary.com/werich1/image/upload/v1624073825/waugxiymo5l9u3jcesq4.png',
            slug: slugify_1.default(data.title ?? '') + uuid_1.v4(),
            title: data.title,
            updated_at: new Date
        });
        await this.eventRepository.create(eventEntity);
        return { success: true };
    }
    async findOne(uuid) {
        const result = await this.eventRepository.findOne(uuid);
        const comment = await this.commentService.find(result?.uuid ?? '');
        const likes = await this.likeService.find(result?.uuid ?? '');
        const stringLikes = [];
        for (let i = 0; i < likes.data.length; i++) {
            stringLikes.push(likes.data[i].user_uuid);
        }
        // let isLikes = false
        // const searchUuid = await this.likeService.findByUserLogin(user.uuid)
        // if(searchUuid){
        //     isLikes = true
        // }
        return {
            data: result,
            comment: comment.data,
            like: stringLikes,
        };
    }
    async findPostByUuid(uuid, user) {
        const post = await this.eventRepository.findPostByUuid(uuid, user);
        return post ? new event_1.default(post) : null;
    }
    async chainUpdateFromProfile(data) {
        const post = await this.eventRepository.chainUpdateFromProfile(data);
        return { success: true };
    }
    async update(uuid, data, user) {
        console.log(data, 'ini image');
        const searchPost = await this.eventRepository.findPostByUuid(uuid, user);
        console.log(searchPost);
        if (!searchPost)
            throw new errors_1.ErrorNotFound('Data not found', '@Service update post');
        let slugi = searchPost.title;
        const category = await this.categoryService.findOne(data.category);
        if (searchPost.title !== data.title) {
            slugi = slugify_1.default(data.title ?? '') + uuid_1.v4();
        }
        if (searchPost.cloudinary_id !== data.cloudinary_id) {
            console.log('masuk');
            await cloudinary_1.cloud.uploader.destroy('posts/' + searchPost.cloudinary_id);
        }
        const eventEntity = new event_1.default({
            uuid: searchPost.uuid,
            category: {
                uuid: category?.uuid ?? '',
                name: category?.name ?? ''
            },
            cloudinary_id: data.cloudinary_id,
            content: data.content,
            created_by: {
                uuid: user.uuid,
                name: user.name,
                image: data.image ?? 'https://res.cloudinary.com/werich1/image/upload/v1624073825/waugxiymo5l9u3jcesq4.png',
                slug: data.slug ?? ''
            },
            time: moment_1.default(data.time).format('H:mm'),
            schedule: moment_1.default(data.date).format('DD-MM-YYYY'),
            place: data.place,
            created_at: new Date,
            deleted_at: null,
            image: data.image ?? 'https://res.cloudinary.com/werich1/image/upload/v1624073825/waugxiymo5l9u3jcesq4.png',
            slug: slugify_1.default(data.title ?? '') + uuid_1.v4(),
            title: data.title,
            updated_at: new Date
        });
        await this.eventRepository.update(eventEntity);
        return { success: true };
    }
    async delete(uuid, user) {
        console.log(uuid, user, 'masuk');
        const searchPost = await this.eventRepository.delete(uuid, user);
        if (!searchPost)
            throw new errors_1.ErrorNotFound('Data not found', '@Delete Service Post');
        return { success: true };
    }
    async findPostWithAuth(user) {
        return await this.eventRepository.findPostWithAuth(user);
    }
    async index(data) {
        return await this.eventRepository.index(new postSpecification_1.default(data));
    }
};
EventService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.EventRepository)),
    __param(1, inversify_1.inject(types_1.TYPES.CommentService)),
    __param(2, inversify_1.inject(types_1.TYPES.LikeService)),
    __param(3, inversify_1.inject(types_1.TYPES.ProfileService)),
    __param(4, inversify_1.inject(types_1.TYPES.CategoryService)),
    __param(5, inversify_1.inject(types_1.TYPES.ProducerDispatcher))
], EventService);
exports.default = EventService;
