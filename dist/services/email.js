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
const types_1 = require("../types");
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let EmailService = class EmailService {
    dispatcher;
    constructor(dispatcher) {
        this.dispatcher = dispatcher;
    }
    async sendEmailVerificationAccout(token, email) {
        var transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            port: 465,
            auth: {
                user: 'ir.arrahmah@gmail.com',
                pass: 'ogkfkvfaqitfqdes'
            }
        });
        var mailOptions = {
            from: 'ir.arrahmah@gmail.com',
            to: email,
            subject: 'Verification Account Remaja Masjid',
            html: '<p>Selamat Datang di Remaja Masjid Silahkan Klik Link berikut untuk konfirmasi akun anda</p>' + `<a href='https://muezaa.vercel.app/verification/${token}/account'>Link Verifikasi</a>`
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email sent: ' + info.response);
            }
        });
        return { success: true };
    }
};
EmailService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.ProducerDispatcher))
], EmailService);
exports.default = EmailService;
