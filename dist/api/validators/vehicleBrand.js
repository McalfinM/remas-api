"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyValidation = void 0;
const express_validator_1 = require("express-validator");
const validatorTranslation_1 = require("../../helpers/validatorTranslation");
const bodyValidation = () => {
    return [
        express_validator_1.body('name', () => validatorTranslation_1.translate("vehicle__brand__name__required")).notEmpty(),
        express_validator_1.body('vehicle_type_uuid', () => validatorTranslation_1.translate("vehicle_type_uuid__required")).notEmpty()
    ];
};
exports.bodyValidation = bodyValidation;
