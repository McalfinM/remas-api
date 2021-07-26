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
const errors_1 = require("../../helpers/errors");
const getPostRequest_1 = __importDefault(require("../../request/post/getPostRequest"));
const createEvent_1 = __importDefault(require("../../request/event/createEvent"));
let EventController = class EventController {
    eventService;
    constructor(eventService) {
        this.eventService = eventService;
    }
    create(req, res) {
        const user = req.user;
        return this.eventService.create(new createEvent_1.default(req.body), user)
            .then((result) => {
            return httpResponse_1.default.created(req, res, result);
        })
            .catch((err) => errors_1.HttpErrorHandler(err, req, res));
    }
    update(req, res) {
        const user = req.user;
        const { params: { uuid } } = req;
        return this.eventService.update(uuid, new createEvent_1.default(req.body), user)
            .then((result) => {
            return httpResponse_1.default.success(req, res, result);
        })
            .catch((err) => errors_1.HttpErrorHandler(err, req, res));
    }
    findOne(req, res) {
        const { params: { uuid } } = req;
        return this.eventService.findOne(uuid)
            .then((result) => {
            return httpResponse_1.default.success(req, res, result);
        })
            .catch((err) => errors_1.HttpErrorHandler(err, req, res));
    }
    findWithAuth(req, res) {
        const user = req.user;
        let obj = {
            data: [{}]
        };
        return this.eventService.findPostWithAuth(user)
            .then((result) => {
            obj.data = result.data.map((data) => data.toListWithAuth());
            return httpResponse_1.default.success(req, res, obj);
        });
    }
    delete(req, res) {
        const { params: { uuid } } = req;
        const user = req.user;
        return this.eventService.delete(uuid, user)
            .then((result) => {
            let obj = {};
            return httpResponse_1.default.success(req, res, result);
        })
            .catch((err) => errors_1.HttpErrorHandler(err, req, res));
    }
    findOneByUuid(req, res) {
        const { params: { uuid } } = req;
        const user = req.user;
        return this.eventService.findPostByUuid(uuid, user)
            .then((result) => {
            let obj = {};
            return httpResponse_1.default.success(req, res, result?.toDetailData());
        })
            .catch((err) => errors_1.HttpErrorHandler(err, req, res));
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
        return this.eventService.index(new getPostRequest_1.default(query))
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
EventController = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.EventService))
], EventController);
exports.default = EventController;
