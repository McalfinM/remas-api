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
const requestRemas_1 = __importDefault(require("../entities/requestRemas"));
const errors_1 = require("../helpers/errors");
let RequestRemasService = class RequestRemasService {
    requestRemasRepository;
    dispatcher;
    constructor(requestRemasRepository, dispatcher) {
        this.requestRemasRepository = requestRemasRepository;
        this.dispatcher = dispatcher;
    }
    async create(data, user) {
        const likeEntity = new requestRemas_1.default({
            uuid: uuid_1.v4(),
            full_name: data.full_name,
            address: data.address,
            created_by: {
                uuid: user.uuid,
                name: user.name,
            },
            status: 'Pending',
            description: data.description,
            handphone: data.handphone,
            image: data.image,
            created_at: new Date,
            deleted_at: null,
            updated_at: new Date
        });
        const likes = await this.requestRemasRepository.create(likeEntity);
        return { success: true };
    }
    async findOne(uuid) {
        const result = await this.requestRemasRepository.findOne(uuid);
        return result;
    }
    async find(post_uuid) {
        const findComment = await this.requestRemasRepository.find(post_uuid);
        return findComment;
    }
    async findWithUserUuid(user) {
        const response = await this.requestRemasRepository.findWithUserUuid(user.uuid);
        return response;
    }
    async delete(requestUuid, user) {
        const searchRequest = await this.requestRemasRepository.findOne(requestUuid);
        console.log(searchRequest, 'ini request');
        if (!searchRequest)
            throw new errors_1.ErrorNotFound('Request not found', '@Service request remas');
        await this.requestRemasRepository.delete(searchRequest.uuid, user);
        return { success: true };
    }
    async chainUpdateFromProfile(user) {
        await this.requestRemasRepository.chainUpdateFromProfile(user);
        return { success: true };
    }
};
RequestRemasService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.RequestRemasRepository)),
    __param(1, inversify_1.inject(types_1.TYPES.ProducerDispatcher))
], RequestRemasService);
exports.default = RequestRemasService;
