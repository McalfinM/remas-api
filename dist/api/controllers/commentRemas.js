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
const createCommentRemasRequest_1 = __importDefault(require("../../request/comment/createCommentRemasRequest"));
let CommentRemasController = class CommentRemasController {
    commentService;
    constructor(commentService) {
        this.commentService = commentService;
    }
    create(req, res) {
        const postData = new createCommentRemasRequest_1.default(req.body);
        const user = req.user;
        console.log('from controller', user);
        return this.commentService.create(postData, user)
            .then((result) => {
            return httpResponse_1.default.created(req, res, result);
        })
            .catch((err) => errors_1.HttpErrorHandler(err, req, res));
    }
    update(req, res) {
        const user = req.user;
        const { params: { uuid } } = req;
        return this.commentService.update(uuid, new createCommentRemasRequest_1.default(req.body), user)
            .then((result) => {
            return httpResponse_1.default.success(req, res, result);
        })
            .catch((err) => errors_1.HttpErrorHandler(err, req, res));
    }
    findOne(req, res) {
        const { params: { uuid } } = req;
        return this.commentService.findOne(uuid)
            .then((result) => {
            return httpResponse_1.default.success(req, res, result);
        })
            .catch((err) => errors_1.HttpErrorHandler(err, req, res));
    }
    delete(req, res) {
        const { params: { uuid } } = req;
        const user = req.user;
        return this.commentService.delete(uuid, user)
            .then((result) => {
            return httpResponse_1.default.success(req, res, result);
        })
            .catch((err) => errors_1.HttpErrorHandler(err, req, res));
    }
};
CommentRemasController = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.CommentRemasService))
], CommentRemasController);
exports.default = CommentRemasController;
