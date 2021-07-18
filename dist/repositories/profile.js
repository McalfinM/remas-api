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
const profile_1 = __importDefault(require("../entities/profile"));
const profile_2 = __importDefault(require("../models/profile"));
let ProfileRepository = class ProfileRepository {
    async create(data) {
        const result = await profile_2.default.create({
            uuid: data.uuid,
            user_uuid: data.user_uuid,
            main_information: data.main_information,
            ramadhan: data.ramadhan,
            roles: data.roles,
            idul_adha: data.idul_adha
        });
        return data;
    }
    async findOne(uuid) {
        const result = await profile_2.default.findOne({
            user_uuid: uuid,
        });
        return result ? new profile_1.default(result) : null;
    }
    async findOneBySlug(slug) {
        const result = await profile_2.default.findOne({
            slug: slug,
        });
        return result ? new profile_1.default(result) : null;
    }
    async update(data) {
        const result = await profile_2.default.updateOne({
            uuid: data.uuid, user_uuid: data.user_uuid,
        }, {
            idul_adha: data.idul_adha ?? null,
            main_information: {
                nickname: data.main_information?.nickname,
                full_name: data.main_information?.full_name,
                visi: data.main_information?.visi,
                misi: data.main_information?.misi,
                image: data.main_information?.image,
                description: data.main_information?.description,
                cloudinary_id: data.main_information?.cloudinary_id
            },
            ramadhan: data.ramadhan ?? null,
            slug: data.slug,
            user_uuid: data.user_uuid,
        });
        return data;
    }
    async index(specification) {
        const total_customer = await profile_2.default.find({
            ...specification.specifies(),
        }).countDocuments();
        return profile_2.default.find({
            ...specification.specifies(),
        }, {}, {
            ...specification.paginate(),
            sort: specification.specSort(),
        })
            .then((result) => {
            return {
                total: total_customer,
                data: result.map((data) => {
                    return new profile_1.default({
                        idul_adha: null,
                        ramadhan: null,
                        user_uuid: '',
                        uuid: '',
                        slug: data.slug,
                        main_information: data.main_information,
                        deleted_at: null
                    });
                }),
            };
        })
            .catch((err) => {
            return err;
        });
    }
};
ProfileRepository = __decorate([
    inversify_1.injectable()
], ProfileRepository);
exports.default = ProfileRepository;
