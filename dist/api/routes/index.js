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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inversify_1 = require("inversify");
const types_1 = require("../../types");
let IndexRouter = class IndexRouter {
    userRouter;
    authRouter;
    postRouter;
    profileRouter;
    commentRouter;
    likeRouter;
    categoryRouter;
    remasLikeRouter;
    commentRemasRouter;
    registrationMemberRemasRouter;
    router;
    constructor(userRouter, authRouter, postRouter, profileRouter, commentRouter, likeRouter, categoryRouter, remasLikeRouter, commentRemasRouter, registrationMemberRemasRouter) {
        this.userRouter = userRouter;
        this.authRouter = authRouter;
        this.postRouter = postRouter;
        this.profileRouter = profileRouter;
        this.commentRouter = commentRouter;
        this.likeRouter = likeRouter;
        this.categoryRouter = categoryRouter;
        this.remasLikeRouter = remasLikeRouter;
        this.commentRemasRouter = commentRemasRouter;
        this.registrationMemberRemasRouter = registrationMemberRemasRouter;
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.use("/api/v1/users", this.userRouter.router);
        this.router.use("/api/v1/auth", this.authRouter.router);
        this.router.use("/api/v1/posts", this.postRouter.router);
        this.router.use("/api/v1/profiles", this.profileRouter.router);
        this.router.use("/api/v1/comments", this.commentRouter.router);
        this.router.use("/api/v1/category", this.categoryRouter.router);
        this.router.use("/api/v1/likes", this.likeRouter.router);
        this.router.use("/api/v1/remas-likes", this.remasLikeRouter.router);
        this.router.use("/api/v1/remas-comments", this.commentRemasRouter.router);
        this.router.use("/api/v1/remas-member-register", this.registrationMemberRemasRouter.router);
        return this;
    }
};
IndexRouter = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.UserRouter)),
    __param(1, inversify_1.inject(types_1.TYPES.AuthRouter)),
    __param(2, inversify_1.inject(types_1.TYPES.PostRouter)),
    __param(3, inversify_1.inject(types_1.TYPES.ProfileRouter)),
    __param(4, inversify_1.inject(types_1.TYPES.CommentRouter)),
    __param(5, inversify_1.inject(types_1.TYPES.LikeRouter)),
    __param(6, inversify_1.inject(types_1.TYPES.CategoryRouter)),
    __param(7, inversify_1.inject(types_1.TYPES.RemasLikeRouter)),
    __param(8, inversify_1.inject(types_1.TYPES.CommentRemasRouter)),
    __param(9, inversify_1.inject(types_1.TYPES.RegistrationMemberRemasRouter))
], IndexRouter);
exports.default = IndexRouter;
