import BaseRouter from './baseRouter'
import { bodyValidation } from '../validators/vehicleBrand'
import { Router } from 'express'
import IRouter from './interfaces/router'
import { decorate, inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { ILikeController } from '../controllers/interfaces/like'
import { authenticate } from '../../middlewares/auth'
import { ITokenController } from '../controllers/interfaces/token'

@injectable()
class TokenRouter extends BaseRouter {

    public router: Router

    constructor(
        @inject(TYPES.TokenController) private tokenController: ITokenController
    ) {
        super()
        this.router = Router()
        this.bindings()
        this.routes()
    }

    routes(): IRouter {
        // call controllers here
        this.router.put('/:uuid/verification', authenticate, this.tokenController.update)
        this.router.get('/:uuid', authenticate, this.tokenController.findOne)
        this.router.delete('/:uuid', authenticate, this.tokenController.findOneWithToken)

        return this
    }

}

export default TokenRouter
