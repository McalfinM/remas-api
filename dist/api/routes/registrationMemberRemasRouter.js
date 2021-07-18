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
const registrationRemasMember_1 = require("../validators/registrationMemberRemas/registrationRemasMember");
const express_1 = require("express");
const requestValidation_1 = require("../../middlewares/requestValidation");
const inversify_1 = require("inversify");
const types_1 = require("../../types");
const auth_1 = require("../../middlewares/auth");
let RegistrationMemberRemasRouter = class RegistrationMemberRemasRouter extends baseRouter_1.default {
    registrationMemberRemasController;
    router;
    constructor(registrationMemberRemasController) {
        super();
        this.registrationMemberRemasController = registrationMemberRemasController;
        this.router = express_1.Router();
        this.bindings();
        this.routes();
    }
    routes() {
        // call controllers here
        this.router.get('/', auth_1.authenticate, this.registrationMemberRemasController.index);
        this.router.post('/', auth_1.authenticate, registrationRemasMember_1.bodyValidation(), requestValidation_1.validate, this.registrationMemberRemasController.create);
        this.router.post('/no-auth', registrationRemasMember_1.bodyValidation(), requestValidation_1.validate, this.registrationMemberRemasController.create);
        this.router.get('/:uuid', this.registrationMemberRemasController.findOne);
        return this;
    }
};
RegistrationMemberRemasRouter = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.RegistrationMemberRemasController))
], RegistrationMemberRemasRouter);
exports.default = RegistrationMemberRemasRouter;
