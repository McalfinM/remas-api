import { body, ValidationChain } from 'express-validator'
import { translate } from '../../helpers/validatorTranslation'

export const bodyValidation = (): ValidationChain[] => {
    return [
        body('name', () => translate("vehicle__brand__name__required")).notEmpty(),
        body('vehicle_type_uuid', () => translate("vehicle_type_uuid__required")).notEmpty()
    ]
}
