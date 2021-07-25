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
const token_1 = __importDefault(require("../entities/token"));
const types_1 = require("../types");
const crypto_1 = __importDefault(require("crypto"));
const uuid_1 = require("uuid");
const errors_1 = require("../helpers/errors");
let TokenService = class TokenService {
    tokenRepository;
    userService;
    dispatcher;
    constructor(tokenRepository, userService, dispatcher) {
        this.tokenRepository = tokenRepository;
        this.userService = userService;
        this.dispatcher = dispatcher;
    }
    async create(data) {
        var id = crypto_1.default.randomBytes(100).toString('hex');
        const entity = new token_1.default({
            uuid: uuid_1.v4(),
            user_uuid: data.user_uuid,
            activity: data.activity,
            email: data.email,
            revoked: false,
            token: id,
            created_at: new Date,
            updated_at: new Date,
        });
        return await this.tokenRepository.create(entity);
    }
    async findOne(uuid) {
        const result = await this.tokenRepository.findOne(uuid);
        return result ? new token_1.default(result) : null;
    }
    async findWithEmail(email) {
        const result = await this.tokenRepository.findWithEmail(email);
        return result ? new token_1.default(result) : null;
    }
    async update(token) {
        const findToken = await this.findOneWithToken(token);
        if (!findToken)
            throw new errors_1.ErrorNotFound('Data not found', '@Token service update');
        const user = await this.userService.checkEmail(findToken.email);
        if (!user)
            throw new errors_1.ErrorNotFound('User not found', '@service token update service');
        const tokenEntity = new token_1.default({
            uuid: findToken.uuid,
            email: findToken.email,
            revoked: true,
            token: findToken.token,
            user_uuid: findToken.user_uuid,
            activity: findToken.activity,
            created_at: findToken.created_at,
            updated_at: new Date
        });
        const result = await this.tokenRepository.update(tokenEntity, user.uuid ?? '');
        return result;
    }
    async findOneWithToken(token) {
        const result = await this.tokenRepository.findOneWithToken(token);
        return result ? new token_1.default(result) : null;
    }
    async chainUpdateFromProfile(name, uuid) {
        console.log(name, uuid);
        const response = await this.tokenRepository.chainUpdateFromProfile(name, uuid);
        return { success: true };
    }
};
TokenService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.TokenRepository)),
    __param(1, inversify_1.inject(types_1.TYPES.UserRepository)),
    __param(2, inversify_1.inject(types_1.TYPES.ProducerDispatcher))
], TokenService);
exports.default = TokenService;
