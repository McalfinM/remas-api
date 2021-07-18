import BaseRouter from './baseRouter'
import { bodyValidation } from '../validators/vehicleBrand'
import { Router } from 'express'
import IRouter from './interfaces/router'
import { decorate, inject, injectable } from 'inversify'
import { TYPES } from '../../types'

import { authenticate } from '../../middlewares/auth'
import { IRemasLikeController } from '../controllers/interfaces/remasLike'

@injectable()
class RemasLikeRouter extends BaseRouter {

    public router: Router

    constructor(
        @inject(TYPES.RemasLikeController) private likeController: IRemasLikeController
    ) {
        super()
        this.router = Router()
        this.bindings()
        this.routes()
    }

    routes(): IRouter {
        // call controllers here
        this.router.post('/', authenticate, this.likeController.create)
        this.router.delete('/:uuid', this.likeController.delete)
        this.router.get('/:uuid', this.likeController.findOne)
        return this
    }

}

export default RemasLikeRouter
