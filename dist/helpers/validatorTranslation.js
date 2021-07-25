"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.translate = void 0;
const express_http_context_1 = __importDefault(require("express-http-context"));
function translate(message) {
    return express_http_context_1.default.get('translate')(message);
}
exports.translate = translate;
