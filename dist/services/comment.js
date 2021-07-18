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
const comment_1 = __importDefault(require("../entities/comment"));
const errors_1 = require("../helpers/errors");
let CommentService = class CommentService {
    commentRepository;
    dispatcher;
    constructor(commentRepository, dispatcher) {
        this.commentRepository = commentRepository;
        this.dispatcher = dispatcher;
    }
    async create(data, user) {
        console.log(data);
        const commentEntity = new comment_1.default({
            uuid: uuid_1.v4(),
            created_by: {
                uuid: user.uuid,
                name: user.name
            },
            post_uuid: data.post_uuid,
            ip_address: data.ip_address,
            comment: data.comment,
            created_at: new Date,
            deleted_at: null,
            updated_at: new Date
        });
        const comment = await this.commentRepository.create(commentEntity);
        return { success: true };
    }
    async findOne(uuid) {
        const result = await this.commentRepository.findOne(uuid);
        return result;
    }
    async update(uuid, data, user) {
        const findComment = await this.commentRepository.findOne(uuid);
        if (!findComment)
            throw new errors_1.ErrorNotFound('Comment not found', '@Comment service update');
        const commentEntity = new comment_1.default({
            uuid: findComment.uuid,
            created_by: {
                uuid: user.uuid,
                name: user.name
            },
            post_uuid: findComment.post_uuid,
            comment: data.comment,
            created_at: findComment.created_at,
            deleted_at: null,
            updated_at: new Date
        });
        const post = await this.commentRepository.update(commentEntity);
        return { success: true };
    }
    async find(post_uuid) {
        const findComment = await this.commentRepository.find(post_uuid);
        return findComment;
    }
    async delete(uuid, user) {
        const data = new Date;
        const post = await this.commentRepository.delete(uuid, user.uuid, data);
        return { success: true };
    }
    async chainUpdateFromProfile(data) {
        const comment = await this.commentRepository.chainUpdateFromProfile(data);
        return { success: true };
    }
};
CommentService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.CommentRepository)),
    __param(1, inversify_1.inject(types_1.TYPES.ProducerDispatcher))
], CommentService);
exports.default = CommentService;
