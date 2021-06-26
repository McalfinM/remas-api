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
const httpResponse_1 = __importDefault(require("../../helpers/httpResponse"));
const inversify_1 = require("inversify");
const types_1 = require("../../types");
const getProfileRequest_1 = __importDefault(require("../../request/profile/getProfileRequest"));
let ProfileCotnroller = class ProfileCotnroller {
    profileService;
    constructor(profileService) {
        this.profileService = profileService;
    }
    index(req, res) {
        const { query } = req;
        const { page, limit, sort, ...rest } = req.query;
        const pageVal = page?.toString() ?? "1";
        const limitVal = limit?.toString() ?? "30";
        let obj = {
            totalPage: 0,
            totalData: 0,
            currentPage: '',
            limit: '',
            data: [{}]
        };
        return this.profileService.index(new getProfileRequest_1.default(query))
            .then((result) => {
            obj.totalPage = Math.ceil(result.total / +limitVal);
            obj.totalData = result.total || 0;
            obj.currentPage = pageVal;
            obj.limit = limitVal;
            // res.setHeader("X-Pagination-Total-Page", Math.ceil(result.total / +limitVal));
            // res.setHeader("X-Pagination-Total-Data", result.total || 0);
            // res.setHeader("X-Pagination-Current-Page", pageVal);
            // res.setHeader("X-Pagination-Limit", limitVal);
            obj.data = result.data.map((data) => data.toListData());
            return httpResponse_1.default.success(req, res, obj);
        });
    }
};
ProfileCotnroller = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.ProfileService))
], ProfileCotnroller);
exports.default = ProfileCotnroller;
