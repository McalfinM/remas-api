import BaseRouter from './baseRouter'
import { bodyValidation } from '../validators/vehicleBrand'
import { Router } from 'express'
import IRouter from './interfaces/router'
import { decorate, inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { ICommentController } from '../controllers/interfaces/comment'

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
        this.router.post('/', this.commentController.create)
        this.router.put('/:uuid', this.commentController.update)
        this.router.delete('/:uuid', this.commentController.delete)
        this.router.get('/:uuid', this.commentController.findOne)
        return this
    }

}

export default CommentRouter
