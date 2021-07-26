import BaseRouter from './baseRouter'
import { bodyValidation } from '../validators/vehicleBrand'
import { Router } from 'express'
import IRouter from './interfaces/router'
import { decorate, inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { ILikeController } from '../controllers/interfaces/like'
import { authenticate } from '../../middlewares/auth'
import { IRequestRemasController } from '../controllers/interfaces/requestRemas'

@injectable()
class RequestRemasRouter extends BaseRouter {

    public router: Router

    constructor(
        @inject(TYPES.RequestRemasController) private requestRemasController: IRequestRemasController
    ) {
        super()
        this.router = Router()
        this.bindings()
        this.routes()
    }

    routes(): IRouter {
        // call controllers here
        this.router.post('/', authenticate, this.requestRemasController.create)
        this.router.get('/', authenticate, this.requestRemasController.find)
        this.router.get('/my-request', authenticate, this.requestRemasController.findWithUserUuid)
        this.router.delete('/:uuid', authenticate, this.requestRemasController.delete)
        this.router.get('/:uuid', authenticate, this.requestRemasController.findOne)

        return this
    }

}

export default RequestRemasRouter
