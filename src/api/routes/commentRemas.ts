import BaseRouter from './baseRouter'
import { bodyValidation } from '../validators/comment/comment'
import { Router } from 'express'
import IRouter from './interfaces/router'
import { decorate, inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { ICommentController } from '../controllers/interfaces/comment'
import { authenticate } from '../../middlewares/auth'
import { validate } from '../../middlewares/requestBodyValidation'
import { ICommentRemasController } from '../controllers/interfaces/commentRemas'

@injectable()
class CommentRemasRouter extends BaseRouter {

    public router: Router

    constructor(
        @inject(TYPES.CommentRemasController) private commentRemasController: ICommentRemasController
    ) {
        super()
        this.router = Router()
        this.bindings()
        this.routes()
    }

    routes(): IRouter {
        // call controllers here
        this.router.post('/', authenticate, bodyValidation(), validate, this.commentRemasController.create)
        this.router.put('/:uuid', authenticate, this.commentRemasController.update)
        this.router.delete('/:uuid', authenticate, this.commentRemasController.delete)
        this.router.get('/:uuid', authenticate, this.commentRemasController.findOne)
        return this
    }

}

export default CommentRemasRouter
