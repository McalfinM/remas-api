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
const like_1 = __importDefault(require("../entities/like"));
let LikeService = class LikeService {
    likeRepository;
    dispatcher;
    constructor(likeRepository, dispatcher) {
        this.likeRepository = likeRepository;
        this.dispatcher = dispatcher;
    }
    async create(data, user) {
        const likeEntity = new like_1.default({
            uuid: uuid_1.v4(),
            user_uuid: user.uuid,
            post_uuid: data.post_uuid,
            ip_address: data.ip_address,
            created_at: new Date,
            deleted_at: null,
            updated_at: new Date
        });
        const comment = await this.likeRepository.create(likeEntity);
        return { success: true };
    }
    async findOne(uuid) {
        const result = await this.likeRepository.findOne(uuid);
        return result;
    }
    async find(post_uuid) {
        const findComment = await this.likeRepository.find(post_uuid);
        return findComment;
    }
    async delete(uuid, user) {
        const data = new Date;
        const post = await this.likeRepository.delete(uuid, user.uuid, data);
        return { success: true };
    }
};
LikeService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.LikeRepository)),
    __param(1, inversify_1.inject(types_1.TYPES.ProducerDispatcher))
], LikeService);
exports.default = LikeService;
