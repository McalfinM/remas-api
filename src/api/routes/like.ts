import BaseRouter from './baseRouter'
import { bodyValidation } from '../validators/vehicleBrand'
import { Router } from 'express'
import IRouter from './interfaces/router'
import { decorate, inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { ILikeController } from '../controllers/interfaces/like'

@injectable()
class LikeRouter extends BaseRouter {

    public router: Router

    constructor(
        @inject(TYPES.LikeController) private likeController: ILikeController
    ) {
        super()
        this.router = Router()
        this.bindings()
        this.routes()
    }

    routes(): IRouter {
        // call controllers here
        this.router.post('/', this.likeController.create)
        this.router.delete('/:uuid', this.likeController.delete)
        this.router.get('/:uuid', this.likeController.findOne)
        return this
    }

}

export default LikeRouter
