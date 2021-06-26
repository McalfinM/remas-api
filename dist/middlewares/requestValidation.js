"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const express_validator_1 = require("express-validator");
const httpResponse_1 = __importDefault(require("../helpers/httpResponse"));
const validate = (req, res, next) => {
    const errors = express_validator_1.validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map((e) => extractedErrors.push({ [e.param]: e.msg }));
    httpResponse_1.default.unprocessable(req, res, extractedErrors);
};
exports.validate = validate;
