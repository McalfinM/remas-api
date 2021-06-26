import BaseRouter from './baseRouter'
import { bodyValidation, updatePost } from '../validators/posts/post'
import { Router } from 'express'
import IRouter from './interfaces/router'
import { validate } from '../../middlewares/requestValidation'
import { decorate, inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { IPostController } from '../controllers/interfaces/post'
import { authenticate } from '../../middlewares/auth'

@injectable()
class PostRouter extends BaseRouter {

    public router: Router

    constructor(
        @inject(TYPES.PostController) private postController: IPostController
    ) {
        super()
        this.router = Router()
        this.bindings()
        this.routes()
    }

    routes(): IRouter {
        // call controllers here
        this.router.get('/', this.postController.index)
        this.router.post('/', authenticate, bodyValidation(), validate, this.postController.create)
        this.router.put('/:uuid', authenticate, updatePost(), validate, this.postController.update)
        this.router.get('/:uuid', this.postController.findOne)
        this.router.delete('/:uuid', authenticate, this.postController.delete)
        return this
    }

}

export default PostRouter
