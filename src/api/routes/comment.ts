import BaseRouter from './baseRouter'
import { bodyValidation } from '../validators/comment/comment'
import { Router } from 'express'
import IRouter from './interfaces/router'
import { decorate, inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { ICommentController } from '../controllers/interfaces/comment'
import { authenticate } from '../../middlewares/auth'
import { validate } from '../../middlewares/requestBodyValidation'

@injectable()
class CommentRouter extends BaseRouter {

    public router: Router

    constructor(
        @inject(TYPES.CommentController) private commentController: ICommentController
    ) {
        super()
        this.router = Router()
        this.bindings()
        this.routes()
    }

    routes(): IRouter {
        // call controllers here
        this.router.post('/', authenticate, bodyValidation(), validate, this.commentController.create)
        this.router.put('/:uuid', authenticate, this.commentController.update)
        this.router.delete('/:uuid', authenticate, this.commentController.delete)
        this.router.get('/:uuid', authenticate, this.commentController.findOne)
        return this
    }

}

export default CommentRouter
