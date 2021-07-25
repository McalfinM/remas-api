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
const baseRouter_1 = __importDefault(require("./baseRouter"));
const post_1 = require("../validators/posts/post");
const express_1 = require("express");
const requestValidation_1 = require("../../middlewares/requestValidation");
const inversify_1 = require("inversify");
const types_1 = require("../../types");
const auth_1 = require("../../middlewares/auth");
let PostRouter = class PostRouter extends baseRouter_1.default {
    postController;
    router;
    constructor(postController) {
        super();
        this.postController = postController;
        this.router = express_1.Router();
        this.bindings();
        this.routes();
    }
    routes() {
        // call controllers here
        this.router.get('/', this.postController.index);
        this.router.get('/my-post', auth_1.authenticate, this.postController.findWithAuth);
        this.router.post('/', auth_1.authenticate, post_1.bodyValidation(), requestValidation_1.validate, this.postController.create);
        this.router.put('/:uuid', auth_1.authenticate, post_1.updatePost(), requestValidation_1.validate, this.postController.update);
        this.router.get('/my-post/:uuid', auth_1.authenticate, this.postController.findOneByUuid);
        this.router.get('/:uuid', this.postController.findOne);
        this.router.delete('/:uuid', auth_1.authenticate, this.postController.delete);
        return this;
    }
};
PostRouter = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.PostController))
], PostRouter);
exports.default = PostRouter;
