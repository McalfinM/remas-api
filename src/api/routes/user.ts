import BaseRouter from './baseRouter'
import { bodyValidation } from '../validators/vehicleBrand'
import { Router } from 'express'
import IRouter from './interfaces/router'
import { IUserController } from '../controllers/interfaces/user'
import { validate } from '../../middlewares/requestValidation'
import { decorate, inject, injectable } from 'inversify'
import { TYPES } from '../../types'

@injectable()
class UserRouter extends BaseRouter {

    public router: Router

    constructor(
        @inject(TYPES.UserController) private userController: IUserController
    ) {
        super()
        this.router = Router()
        this.bindings()
        this.routes()
    }

    routes(): IRouter {
        // call controllers here
        this.router.post('/', this.userController.create)
        this.router.patch('/:uuid', this.userController.update)
        return this
    }

}

export default UserRouter
