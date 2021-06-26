import BaseRouter from './baseRouter'
import { bodyValidation } from '../validators/vehicleBrand'
import { Router } from 'express'
import IRouter from './interfaces/router'
import { IUserController } from '../controllers/interfaces/user'
import { validate } from '../../middlewares/requestValidation'
import { decorate, inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { IProfileController } from '../controllers/interfaces/profile'

@injectable()
class ProfileRouter extends BaseRouter {

    public router: Router

    constructor(
        @inject(TYPES.ProfileController) private profileController: IProfileController
    ) {
        super()
        this.router = Router()
        this.bindings()
        this.routes()
    }

    routes(): IRouter {
        // call controllers here
        this.router.get('/', this.profileController.index)
        return this
    }

}

export default ProfileRouter
