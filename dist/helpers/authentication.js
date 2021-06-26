"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Authentication {
    static hash = (password) => {
        return bcrypt_1.default.hash(password, 12);
    };
    static passwordCompare = async (text, encrypt) => {
        let result = await bcrypt_1.default.compare(text, encrypt);
        return result;
    };
    static generateToken = async (name, email, uuid) => {
        const secretKey = process.env.JWT_SECRET || 'secret';
        const token = jsonwebtoken_1.default.sign({ name, email, uuid }, secretKey);
        return token;
    };
}
exports.default = Authentication;
