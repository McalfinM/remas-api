import { body, ValidationChain } from 'express-validator'
import { translate } from '../../../helpers/validatorTranslation'

export const bodyValidation = (): ValidationChain[] => {
    return [
        body('post_uuid', 'user dibutuhkan').notEmpty(),
        body('comment', 'comment harus di isi').notEmpty(),
    ]
}

export const updatePost = (): ValidationChain[] => {
    return [
        body('title', 'Judul harus di isi').notEmpty(),
        body('category', 'Kategori harus di isi').notEmpty(),
        body('content', 'Kontent harus di isi').notEmpty()
    ]
}
