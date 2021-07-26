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
const token_1 = __importDefault(require("../entities/token"));
const token_2 = __importDefault(require("../models/token"));
let TokenRepository = class TokenRepository {
    async create(data) {
        const result = await token_2.default.create({
            uuid: data.uuid,
            token: data.token,
            email: data.email,
            activity: data.activity,
            revoked: data.revoked,
            user_uuid: data.user_uuid,
            created_at: data.created_at,
            updated_at: data.updated_at,
        });
        return data;
    }
    async findOne(uuid) {
        const result = await token_2.default.findOne({
            uuid: uuid,
            revoked: false,
        });
        return result ? new token_1.default(result) : null;
    }
    async checkEmail(email) {
        const result = await token_2.default.findOne({
            email: email,
            revoked: false
        });
        return result ? new token_1.default(result) : null;
    }
    async findWithEmail(email) {
        const result = await token_2.default.findOne({
            email: email,
            revoked: false,
        });
        return result ? new token_1.default(result) : null;
    }
    async update(data, user_uuid) {
        const result = await token_2.default.updateOne({ user_uuid: user_uuid }, {
            revoked: data.revoked
        });
        return data;
    }
    async findOneWithToken(token) {
        const result = await token_2.default.findOne({
            token: token,
            revoked: false,
        });
        return result ? new token_1.default(result) : null;
    }
    async chainUpdateFromProfile(name, uuid) {
        const response = await token_2.default.updateOne({ uuid: uuid }, {
            name: name
        });
        return { success: true };
    }
};
TokenRepository = __decorate([
    inversify_1.injectable()
], TokenRepository);
exports.default = TokenRepository;
