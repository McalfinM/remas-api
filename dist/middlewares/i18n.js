"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trans = exports.changeLang = void 0;
const express_http_context_1 = __importDefault(require("express-http-context"));
async function changeLang(req, res, next) {
    const lang = req.headers.lang ? req.headers.lang : "id";
    await req.i18n.changeLanguage(lang);
    next();
}
exports.changeLang = changeLang;
function trans(req, res, next) {
    express_http_context_1.default.set('translate', req.t);
    next();
}
exports.trans = trans;
