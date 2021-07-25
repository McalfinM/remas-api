"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyValidation = void 0;
const express_validator_1 = require("express-validator");
const bodyValidation = () => {
    return [
        express_validator_1.body('title', 'Judul harus di isi').notEmpty(),
        express_validator_1.body('category', 'Kategori harus di isi').notEmpty(),
        express_validator_1.body('content', 'Kontent harus di isi').notEmpty(),
        express_validator_1.body('image'),
        express_validator_1.body('cloudinary_id'),
        express_validator_1.body('time', 'Jam pelaksanaan harus di isi').notEmpty(),
        express_validator_1.body('date', 'Tanggal pelaksanaan harus di isi').notEmpty(),
        express_validator_1.body('place', 'Tempat pelaksanaan harus di isi').notEmpty(),
    ];
};
exports.bodyValidation = bodyValidation;
