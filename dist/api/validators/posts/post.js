"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePost = exports.bodyValidation = void 0;
const express_validator_1 = require("express-validator");
const bodyValidation = () => {
    return [
        express_validator_1.body('title', 'Judul harus di isi').notEmpty(),
        express_validator_1.body('category', 'Kategori harus di isi').notEmpty(),
        express_validator_1.body('content', 'Kontent harus di isi').notEmpty()
    ];
};
exports.bodyValidation = bodyValidation;
const updatePost = () => {
    return [
        express_validator_1.body('title', 'Judul harus di isi').notEmpty(),
        express_validator_1.body('category', 'Kategori harus di isi').notEmpty(),
        express_validator_1.body('content', 'Kontent harus di isi').notEmpty()
    ];
};
exports.updatePost = updatePost;
