import BaseRouter from './baseRouter'
import { bodyValidation } from '../validators/vehicleBrand'
import { Router } from 'express'
import IRouter from './interfaces/router'
import { IUserController } from '../controllers/interfaces/user'
import { validate } from '../../middlewares/requestValidation'
import { decorate, inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { IAuthController } from '../controllers/interfaces/auth'

@injectable()
class AuthRouter extends BaseRouter {

    public router: Router

    constructor(
        @inject(TYPES.AuthController) private authController: IAuthController
    ) {
        super()
        this.router = Router()
        this.bindings()
        this.routes()
    }

    routes(): IRouter {
        // call controllers here
        this.router.post('/login', this.authController.login)
        this.router.post('/register', this.authController.register)
        return this
    }

}

export default AuthRouter
