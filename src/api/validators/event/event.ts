import { body, ValidationChain } from 'express-validator'
import { translate } from '../../../helpers/validatorTranslation'

export const bodyValidation = (): ValidationChain[] => {
    return [
        body('title', 'Judul harus di isi').notEmpty(),
        body('category', 'Kategori harus di isi').notEmpty(),
        body('content', 'Kontent harus di isi').notEmpty(),
        body('image'),
        body('cloudinary_id'),
        body('time', 'Jam pelaksanaan harus di isi').notEmpty(),
        body('date', 'Tanggal pelaksanaan harus di isi').notEmpty(),
        body('place', 'Tempat pelaksanaan harus di isi').notEmpty(),
    ]
}