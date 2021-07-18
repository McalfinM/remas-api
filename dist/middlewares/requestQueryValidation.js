"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpResponse_1 = __importDefault(require("../helpers/httpResponse"));
const allowPositiveIntegerAndUndefinedPattern = new RegExp(/^[0-9]*$/);
class RequestQueryValidation {
    validatePage(req, res, next) {
        const { query: { page } } = req;
        if (page) {
            if (allowPositiveIntegerAndUndefinedPattern.test(page)) {
                next();
            }
            else {
                httpResponse_1.default.errorRequest(req, res);
            }
        }
        else {
            next();
        }
    }
    validateLimit(req, res, next) {
        const { query: { limit } } = req;
        if (limit) {
            if (allowPositiveIntegerAndUndefinedPattern.test(limit)) {
                next();
            }
            else {
                httpResponse_1.default.errorRequest(req, res);
            }
        }
        else {
            next();
        }
    }
}
exports.default = new RequestQueryValidation();
