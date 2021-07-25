import BaseRouter from './baseRouter'
import { bodyValidation } from '../validators/event/event'
import { Router } from 'express'
import IRouter from './interfaces/router'
import { validate } from '../../middlewares/requestValidation'
import { decorate, inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { IPostController } from '../controllers/interfaces/post'
import { authenticate } from '../../middlewares/auth'
import { IEventController } from '../controllers/interfaces/event'

@injectable()
class EventRouter extends BaseRouter {

    public router: Router

    constructor(
        @inject(TYPES.EventController) private eventController: IEventController
    ) {
        super()
        this.router = Router()
        this.bindings()
        this.routes()
    }

    routes(): IRouter {
        // call controllers here
        this.router.get('/', this.eventController.index)
        this.router.get('/my-event', authenticate, this.eventController.findWithAuth)
        this.router.post('/', authenticate, bodyValidation(), validate, this.eventController.create)
        this.router.put('/:uuid', authenticate, this.eventController.update)
        this.router.get('/:uuid/edit', authenticate, this.eventController.findOneByUuid)
        this.router.get('/:uuid', this.eventController.findOne)
        this.router.delete('/:uuid', authenticate, this.eventController.delete)
        return this
    }

}

export default EventRouter
