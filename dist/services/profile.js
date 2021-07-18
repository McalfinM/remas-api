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
const profile_1 = __importDefault(require("../entities/profile"));
const profileSpecification_1 = __importDefault(require("../repositories/specifications/profileSpecification"));
const slugify_1 = __importDefault(require("slugify"));
const errors_1 = require("../helpers/errors");
const cloudinary_1 = require("../helpers/cloudinary");
let ProfileService = class ProfileService {
    profileReopsitory;
    postService;
    remasService;
    commentRemasService;
    commentService;
    dispatcher;
    constructor(profileReopsitory, postService, remasService, commentRemasService, commentService, dispatcher) {
        this.profileReopsitory = profileReopsitory;
        this.postService = postService;
        this.remasService = remasService;
        this.commentRemasService = commentRemasService;
        this.commentService = commentService;
        this.dispatcher = dispatcher;
    }
    async create(data) {
        const searchData = await this.profileReopsitory.findOne(data.uuid ?? '');
        const profileEntity = new profile_1.default({
            main_information: data.main_information,
            ramadhan: data.ramadhan ?? null,
            idul_adha: data.idul_adha ?? null,
            roles: data.roles,
            user_uuid: data.user_uuid ?? '',
            uuid: data.uuid ?? '',
            slug: slugify_1.default(data.slug) + uuid_1.v4(),
            deleted_at: null
        });
        await this.profileReopsitory.create(profileEntity);
        return { success: true };
    }
    async findOne(uuid) {
        const result = await this.profileReopsitory.findOne(uuid);
        return result;
    }
    async update(data, user) {
        console.log(data, 'ini data');
        console.log(user, 'ini user');
        const searchProfile = await this.profileReopsitory.findOne(user.uuid);
        const postService = await this.postService.findPostWithAuth(user);
        const commentRemas = await this.commentRemasService.findOne(user.uuid);
        const commentService = await this.commentService.findOne(user.uuid);
        if (!searchProfile)
            throw new errors_1.ErrorNotFound('Data not found', '@Service Update profile');
        let slugi = '';
        if (searchProfile.main_information?.nickname !== data.nickname) {
            slugi = slugify_1.default(data.nickname ?? '');
        }
        else {
            slugi = searchProfile.slug;
        }
        if (searchProfile.main_information?.cloudinary_id !== data.cloudinary_id) {
            await cloudinary_1.cloud.uploader.destroy('profile/' + searchProfile.main_information?.cloudinary_id);
        }
        const profileEntity = new profile_1.default({
            idul_adha: data.idul_adha ?? null,
            main_information: {
                nickname: data.nickname ?? '',
                full_name: data.full_name ?? '',
                address: data.address ?? '',
                birthday: data.birthday ?? '',
                cloudinary_id: data.cloudinary_id ?? '',
                description: data.description ?? '',
                image: data.image ?? '',
                member: '',
                misi: data.misi ?? '',
                visi: data.visi ?? '',
            },
            ramadhan: data.ramadhan ?? null,
            slug: slugi,
            user_uuid: user.uuid,
            uuid: searchProfile.uuid ?? '',
            deleted_at: null
        });
        if (postService.data[0].created_by.name !== data.nickname || postService.data[0].image !== data.image) {
            await this.postService.chainUpdateFromProfile(profileEntity);
        }
        if (commentRemas?.created_by.name !== data.nickname || commentRemas.created_by.image !== data.image) {
            await this.commentRemasService.chainUpdateFromProfile(profileEntity);
        }
        if (commentService?.created_by.name !== data.nickname || commentService.created_by.image !== data.image) {
            await this.commentService.chainUpdateFromProfile(profileEntity);
        }
        await this.profileReopsitory.update(profileEntity);
        return { success: true };
    }
    async findOneBySlug(slug) {
        const result = await this.profileReopsitory.findOneBySlug(slug);
        const likes = await this.remasService.find(result?.uuid ?? '');
        const stringLikes = [];
        for (let i = 0; i < likes.data.length; i++) {
            stringLikes.push(likes.data[i].user_uuid);
        }
        return {
            data: result,
            likes: stringLikes,
        };
    }
    async index(data) {
        return await this.profileReopsitory.index(new profileSpecification_1.default(data));
    }
};
ProfileService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.ProfileRepository)),
    __param(1, inversify_1.inject(types_1.TYPES.PostRepository)),
    __param(2, inversify_1.inject(types_1.TYPES.RemasLikeService)),
    __param(3, inversify_1.inject(types_1.TYPES.CommentRemasService)),
    __param(4, inversify_1.inject(types_1.TYPES.CommentService)),
    __param(5, inversify_1.inject(types_1.TYPES.ProducerDispatcher))
], ProfileService);
exports.default = ProfileService;
