import { body, ValidationChain, Meta } from "express-validator";
import { validate as uuidValidate } from 'uuid'
import { translate } from "../../helpers/validatorTranslation";

export const bodyValidation = (): ValidationChain[] => {
    return [
        body('name', () => translate("vehicle__model__name__required")).notEmpty(),
        body("name", () => translate("vehicle__model__name__must_be_string")).isString(),
        body("type_uuid", () => translate("vehicle__model__type_uuid__required")).notEmpty(),
        body("type_uuid", () => translate("vehicle__model__type_uuid__required")).isUUID(),
        body("sub_type_uuid", () => translate("vehicle__model__sub_type_uuid__required")).notEmpty(),
        body("sub_type_uuid", () => translate("vehicle__model__sub_type_uuid__required")).isUUID(),
        body("brand_uuid", () => translate("vehicle__model__brand_uuid__required")).notEmpty(),
        body("brand_uuid", () => translate("vehicle__model__brand_uuid__required")).isUUID(),
        body("year", () => translate("vehicle__model__year__must_a_number")).isNumeric(),
        body("year", () => translate("vehicle__model__year__is_only_four_digit")).custom(vehicleYearCustomValidator).customSanitizer(vehicleYearCustomSanitizer),
        body("year", () => translate("vehicle__model__year__must_greater_than_zero")).notEmpty().custom(positiveNumberValidation),
        body("cargo_size_length", () => translate("vehicle__model__cargo_size_length__required")).notEmpty(),
        body("cargo_size_length", () => translate("vehicle__model__cargo_size_length__must_a_number")).isNumeric(),
        body("cargo_size_width", () => translate("vehicle__model__cargo_size_width__required")).notEmpty(),
        body("cargo_size_width", () => translate("vehicle__model__cargo_size_width__must_a_number")).isNumeric(),
        body("cargo_size_height", () => translate("vehicle__model__cargo_size_height__required")).notEmpty(),
        body("cargo_size_height", () => translate("vehicle__model__cargo_size_height__must_a_number")).isNumeric(),
        body("cargo_size_dimension", () => translate("vehicle__model__cargo_size_dimension__required")).notEmpty(),
        body("cargo_size_dimension", () => translate("vehicle__model__cargo_size_dimension__must_a_number")).isNumeric(),
        body("maximum_weight", () => translate("vehicle__model__maximum_weight__required")).notEmpty(),
        body("cargo_size_length", () => translate("vehicle__model__cargo_size_length__must_greater_than_zero")).custom(positiveNumberValidation),
        body("cargo_size_width", () => translate("vehicle__model__cargo_size_width__must_greater_than_zero")).custom(positiveNumberValidation),
        body("cargo_size_height", () => translate("vehicle__model__cargo_size_height__must_greater_than_zero")).custom(positiveNumberValidation),
        body("cargo_size_dimension", () => translate("vehicle__model__cargo_size_dimension__must_greater_than_zero")).custom(positiveNumberValidation),
        body("maximum_weight", () => translate("vehicle__model__maximum_weight__must_greater_than_zero")).custom(positiveNumberValidation),
        body("photos", () => translate("vehicle__model__photos__must_be_array")).isArray(),
        body("photos.*", () => translate("vehicle__model__photos__must_be_string")).isString(),
        body("photos.*", () => translate("vehicle__model__photos__must_be_url")).isURL(),
    ]
}

const vehicleYearCustomValidator = (input: number, meta: Meta) => {
    const { location, path, req: { body } } = meta
    if (input.toString().length < 4) throw () => translate("vehicle__model__year__is_only_four_digit")
    return true
}

const vehicleYearCustomSanitizer = (input: number, meta: Meta) => {
    const result = Number(input)
    return result
}

const positiveNumberValidation = (input: number, meta: Meta) => {
    if (input > 0) {
        return true
    } else {
        return false
    }
}