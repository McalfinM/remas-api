import BaseRouter from './baseRouter'
import { bodyValidation } from '../validators/vehicleBrand'
import { Router } from 'express'
import IRouter from './interfaces/router'
import { decorate, inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { ILikeController } from '../controllers/interfaces/like'
import { authenticate } from '../../middlewares/auth'
import { ICategoryConrtoller } from '../controllers/interfaces/categories'

@injectable()
class CategoryRouter extends BaseRouter {

    public router: Router

    constructor(
        @inject(TYPES.CategoryController) private categoryController: ICategoryConrtoller
    ) {
        super()
        this.router = Router()
        this.bindings()
        this.routes()
    }

    routes(): IRouter {
        // call controllers here
        this.router.get('/', this.categoryController.findAll)
        return this
    }

}

export default CategoryRouter
