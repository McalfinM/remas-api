import { body, ValidationChain } from 'express-validator'
import { translate } from '../../../helpers/validatorTranslation'

export const bodyValidation = (): ValidationChain[] => {
    return [
        body('full_name', 'Nama lengkap harus di isi').notEmpty(),
        body('address', 'Alamat harus di isi').notEmpty(),
        body('birthday', 'Tanggal Lahir harus di isi').notEmpty(),
        body('email', 'Email harus di isi').notEmpty(),
        body('email', 'Email harus berformat email').isEmail(),
        body('user_uuid', 'Penerima harus di isi').notEmpty(),
        body('user_uuid', 'Penerima harus berformat uuid').isUUID(),
        body('handphone', 'Nomor handphone ahrus di isi').notEmpty(),
        body('description', 'Ceritakan singkat tentang dirimu').notEmpty(),
        body('image').isString(),
    ]
}

