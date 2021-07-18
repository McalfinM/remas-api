import BaseRouter from './baseRouter'
import { bodyValidation } from '../validators/registrationMemberRemas/registrationRemasMember'
import { Router } from 'express'
import IRouter from './interfaces/router'
import { validate } from '../../middlewares/requestValidation'
import { decorate, inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { authenticate } from '../../middlewares/auth'
import { IRegistrationMemberRemasController } from '../controllers/interfaces/registrationMemberRemas'

@injectable()
class RegistrationMemberRemasRouter extends BaseRouter {

    public router: Router

    constructor(
        @inject(TYPES.RegistrationMemberRemasController) private registrationMemberRemasController: IRegistrationMemberRemasController
    ) {
        super()
        this.router = Router()
        this.bindings()
        this.routes()
    }

    routes(): IRouter {
        // call controllers here
        this.router.get('/', authenticate, this.registrationMemberRemasController.index)
        this.router.post('/', authenticate, bodyValidation(), validate, this.registrationMemberRemasController.create)
        this.router.post('/no-auth', bodyValidation(), validate, this.registrationMemberRemasController.create)
        this.router.get('/:uuid', this.registrationMemberRemasController.findOne)

        return this
    }

}

export default RegistrationMemberRemasRouter
