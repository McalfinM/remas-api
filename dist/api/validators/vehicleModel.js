"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyValidation = void 0;
const express_validator_1 = require("express-validator");
const validatorTranslation_1 = require("../../helpers/validatorTranslation");
const bodyValidation = () => {
    return [
        express_validator_1.body('name', () => validatorTranslation_1.translate("vehicle__model__name__required")).notEmpty(),
        express_validator_1.body("name", () => validatorTranslation_1.translate("vehicle__model__name__must_be_string")).isString(),
        express_validator_1.body("type_uuid", () => validatorTranslation_1.translate("vehicle__model__type_uuid__required")).notEmpty(),
        express_validator_1.body("type_uuid", () => validatorTranslation_1.translate("vehicle__model__type_uuid__required")).isUUID(),
        express_validator_1.body("sub_type_uuid", () => validatorTranslation_1.translate("vehicle__model__sub_type_uuid__required")).notEmpty(),
        express_validator_1.body("sub_type_uuid", () => validatorTranslation_1.translate("vehicle__model__sub_type_uuid__required")).isUUID(),
        express_validator_1.body("brand_uuid", () => validatorTranslation_1.translate("vehicle__model__brand_uuid__required")).notEmpty(),
        express_validator_1.body("brand_uuid", () => validatorTranslation_1.translate("vehicle__model__brand_uuid__required")).isUUID(),
        express_validator_1.body("year", () => validatorTranslation_1.translate("vehicle__model__year__must_a_number")).isNumeric(),
        express_validator_1.body("year", () => validatorTranslation_1.translate("vehicle__model__year__is_only_four_digit")).custom(vehicleYearCustomValidator).customSanitizer(vehicleYearCustomSanitizer),
        express_validator_1.body("year", () => validatorTranslation_1.translate("vehicle__model__year__must_greater_than_zero")).notEmpty().custom(positiveNumberValidation),
        express_validator_1.body("cargo_size_length", () => validatorTranslation_1.translate("vehicle__model__cargo_size_length__required")).notEmpty(),
        express_validator_1.body("cargo_size_length", () => validatorTranslation_1.translate("vehicle__model__cargo_size_length__must_a_number")).isNumeric(),
        express_validator_1.body("cargo_size_width", () => validatorTranslation_1.translate("vehicle__model__cargo_size_width__required")).notEmpty(),
        express_validator_1.body("cargo_size_width", () => validatorTranslation_1.translate("vehicle__model__cargo_size_width__must_a_number")).isNumeric(),
        express_validator_1.body("cargo_size_height", () => validatorTranslation_1.translate("vehicle__model__cargo_size_height__required")).notEmpty(),
        express_validator_1.body("cargo_size_height", () => validatorTranslation_1.translate("vehicle__model__cargo_size_height__must_a_number")).isNumeric(),
        express_validator_1.body("cargo_size_dimension", () => validatorTranslation_1.translate("vehicle__model__cargo_size_dimension__required")).notEmpty(),
        express_validator_1.body("cargo_size_dimension", () => validatorTranslation_1.translate("vehicle__model__cargo_size_dimension__must_a_number")).isNumeric(),
        express_validator_1.body("maximum_weight", () => validatorTranslation_1.translate("vehicle__model__maximum_weight__required")).notEmpty(),
        express_validator_1.body("cargo_size_length", () => validatorTranslation_1.translate("vehicle__model__cargo_size_length__must_greater_than_zero")).custom(positiveNumberValidation),
        express_validator_1.body("cargo_size_width", () => validatorTranslation_1.translate("vehicle__model__cargo_size_width__must_greater_than_zero")).custom(positiveNumberValidation),
        express_validator_1.body("cargo_size_height", () => validatorTranslation_1.translate("vehicle__model__cargo_size_height__must_greater_than_zero")).custom(positiveNumberValidation),
        express_validator_1.body("cargo_size_dimension", () => validatorTranslation_1.translate("vehicle__model__cargo_size_dimension__must_greater_than_zero")).custom(positiveNumberValidation),
        express_validator_1.body("maximum_weight", () => validatorTranslation_1.translate("vehicle__model__maximum_weight__must_greater_than_zero")).custom(positiveNumberValidation),
        express_validator_1.body("photos", () => validatorTranslation_1.translate("vehicle__model__photos__must_be_array")).isArray(),
        express_validator_1.body("photos.*", () => validatorTranslation_1.translate("vehicle__model__photos__must_be_string")).isString(),
        express_validator_1.body("photos.*", () => validatorTranslation_1.translate("vehicle__model__photos__must_be_url")).isURL(),
    ];
};
exports.bodyValidation = bodyValidation;
const vehicleYearCustomValidator = (input, meta) => {
    const { location, path, req: { body } } = meta;
    if (input.toString().length < 4)
        throw () => validatorTranslation_1.translate("vehicle__model__year__is_only_four_digit");
    return true;
};
const vehicleYearCustomSanitizer = (input, meta) => {
    const result = Number(input);
    return result;
};
const positiveNumberValidation = (input, meta) => {
    if (input > 0) {
        return true;
    }
    else {
        return false;
    }
};
