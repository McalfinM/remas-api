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
const user_1 = __importDefault(require("../entities/user"));
const user_2 = __importDefault(require("../models/user"));
let UserRepository = class UserRepository {
    async create(data) {
        const result = await user_2.default.create({
            uuid: data.uuid,
            name: data.name,
            email: data.email,
            password: data.password,
            roles: data.roles,
            created_at: data.created_at,
            deleted_at: data.deleted_at,
            updated_at: data.updated_at
        });
        return data;
    }
    async findOne(uuid) {
        const result = await user_2.default.findOne({
            email: uuid,
            $or: [{ deleted_at: undefined }]
        });
        return result ? new user_1.default(result) : null;
    }
    async update(data, user) {
        const result = await user_2.default.updateOne();
        return data;
    }
};
UserRepository = __decorate([
    inversify_1.injectable()
], UserRepository);
exports.default = UserRepository;
