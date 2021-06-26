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
const types_1 = require("../../types");
const authentication_1 = __importDefault(require("../../helpers/authentication"));
const createUserRequest_1 = __importDefault(require("../../request/user/createUserRequest"));
const httpResponse_1 = __importDefault(require("../../helpers/httpResponse"));
const errors_1 = require("../../helpers/errors");
let AuthController = class AuthController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const data = await this.userService.findOne(email);
            console.log('ada yang hit', req.body);
            if (!data) {
                return res.status(400).json({
                    message: 'invalid email or password'
                });
            }
            const compare = await authentication_1.default.passwordCompare(password, data.password);
            if (compare) {
                const token = await authentication_1.default.generateToken(data.name ?? '', email, data.uuid ?? '');
                // data._id = undefined;
                return res.status(200).json({
                    token_type: 'Bearer',
                    token: token,
                    user: data.uuid
                });
            }
        }
        catch (err) {
            console.log(err);
        }
        return res.status(400).json({
            message: 'Invalid email or password'
        });
    }
    async register(req, res) {
        const userData = new createUserRequest_1.default(req.body);
        return await this.userService.create(userData)
            .then((result) => {
            return httpResponse_1.default.created(req, res, result);
        })
            .catch((err) => errors_1.HttpErrorHandler(err, req, res));
    }
};
AuthController = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.UserService))
], AuthController);
exports.default = AuthController;
