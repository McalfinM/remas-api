"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyValidation = void 0;
const express_validator_1 = require("express-validator");
const bodyValidation = () => {
    return [
        express_validator_1.body('full_name', 'Nama lengkap harus di isi').notEmpty(),
        express_validator_1.body('address', 'Alamat harus di isi').notEmpty(),
        express_validator_1.body('birthday', 'Tanggal Lahir harus di isi').notEmpty(),
        express_validator_1.body('email', 'Email harus di isi').notEmpty(),
        express_validator_1.body('email', 'Email harus berformat email').isEmail(),
        express_validator_1.body('user_uuid', 'Penerima harus di isi').notEmpty(),
        express_validator_1.body('user_uuid', 'Penerima harus berformat uuid').isUUID(),
        express_validator_1.body('handphone', 'Nomor handphone ahrus di isi').notEmpty(),
        express_validator_1.body('description', 'Ceritakan singkat tentang dirimu').notEmpty(),
        express_validator_1.body('image').isString(),
    ];
};
exports.bodyValidation = bodyValidation;
