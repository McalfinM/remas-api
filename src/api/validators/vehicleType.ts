import { body, ValidationChain } from 'express-validator'
import { translate } from '../../helpers/validatorTranslation'

export const bodyValidation = (): ValidationChain[] => {
    return [
        body('name', () => translate("vehicle__type__name__required")).notEmpty(),
    ]
}
