"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDate = exports.isPhonenumber = exports.isEmail = exports.isNumber = exports.isString = exports.isRequired = exports.validate = void 0;
const express_validator_1 = require("express-validator");
const httpResponse_1 = __importDefault(require("../helpers/httpResponse"));
const validate = (req, res, next) => {
    const errors = express_validator_1.validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map(e => extractedErrors.push({ [e.param]: e.msg }));
    httpResponse_1.default.unprocessable(req, res, extractedErrors);
};
exports.validate = validate;
const isRequired = (fields) => {
    return fields.map(field => express_validator_1.body(field).notEmpty());
};
exports.isRequired = isRequired;
const isString = (fields) => {
    return fields.map(field => express_validator_1.body(field).isString());
};
exports.isString = isString;
const isNumber = (fields) => {
    return fields.map(field => express_validator_1.body(field).isNumeric());
};
exports.isNumber = isNumber;
const isEmail = (fields) => {
    return fields.map(field => express_validator_1.body(field).isEmail());
};
exports.isEmail = isEmail;
const isPhonenumber = (fields) => {
    return fields.map(field => express_validator_1.body(field).isMobilePhone('id-ID'));
};
exports.isPhonenumber = isPhonenumber;
const isDate = (fields) => {
    return fields.map(field => express_validator_1.body(field).isDate());
};
exports.isDate = isDate;
