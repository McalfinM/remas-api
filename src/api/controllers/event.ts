import { Response, Request } from "express";
import HttpResponse from '../../helpers/httpResponse';
import { injectable, inject } from "inversify";
import { TYPES } from "../../types";
import { body } from "express-validator";
import { HttpErrorHandler } from "../../helpers/errors";
import { IPostService } from "../../services/interfaces/post";

import GetPostRequest from "../../request/post/getPostRequest";
import UpdatePostRequest from "../../request/post/updatePostRequest";
import { IEventController } from "./interfaces/event";
import { IEventService } from "../../services/interfaces/event";
import CreateEventRequest from "../../request/event/createEvent";

@injectable()
class EventController implements IEventController {

    constructor(
        @inject(TYPES.EventService) private eventService: IEventService
    ) { }


    create(req: Request, res: Response): Promise<Response> {
        const user = req.user
        return this.eventService.create(new CreateEventRequest(req.body), user)
            .then((result) => {
                return HttpResponse.created(req, res, result);
            })
            .catch((err) => HttpErrorHandler(err, req, res));
    }

    update(req: Request, res: Response): Response | Promise<Response> {

        const user = req.user
        const { params: { uuid } } = req
        return this.eventService.update(uuid, new CreateEventRequest(req.body), user)
            .then((result) => {
                return HttpResponse.success(req, res, result);
            })
            .catch((err) => HttpErrorHandler(err, req, res));
    }

    findOne(req: Request, res: Response): Response | Promise<Response> {

        const { params: { uuid } } = req
        return this.eventService.findOne(uuid)
            .then((result) => {
                return HttpResponse.success(req, res, result);
            })
            .catch((err) => HttpErrorHandler(err, req, res));
    }

    findWithAuth(req: Request, res: Response): Response | Promise<Response> {
        const user = req.user
        let obj = {
            data: [{}]
        }
        return this.eventService.findPostWithAuth(user)
            .then((result) => {
                obj.data = result.data.map((data) => data.toListWithAuth());

                return HttpResponse.success(req, res, obj);
            })

    }

    delete(req: Request, res: Response): Response | Promise<Response> {

        const { params: { uuid } } = req
        const user = req.user
        return this.eventService.delete(uuid, user)
            .then((result) => {
                let obj = {}
                return HttpResponse.success(req, res, result);
            })
            .catch((err) => HttpErrorHandler(err, req, res));
    }

    findOneByUuid(req: Request, res: Response): Response | Promise<Response> {
        const { params: { uuid } } = req
        const user = req.user
        return this.eventService.findPostByUuid(uuid, user)
            .then((result) => {
                let obj = {}
                return HttpResponse.success(req, res, result?.toJson());
            })
            .catch((err) => HttpErrorHandler(err, req, res));
    }

    index(req: Request, res: Response): Promise<Response> {
        const { query } = req;
        const { page, limit, sort, ...rest } = req.query;
        const pageVal: string = page?.toString() ?? "1";
        const limitVal: string = limit?.toString() ?? "30";
        let obj = {
            totalPage: 0,
            totalData: 0,
            currentPage: '',
            limit: '',
            data: [{}]
        }

        return this.eventService.index(new GetPostRequest(query))
            .then((result) => {
                obj.totalPage = Math.ceil(result.total / +limitVal)
                obj.totalData = result.total || 0
                obj.currentPage = pageVal
                obj.limit = limitVal
                // res.setHeader("X-Pagination-Total-Page", Math.ceil(result.total / +limitVal));
                // res.setHeader("X-Pagination-Total-Data", result.total || 0);
                // res.setHeader("X-Pagination-Current-Page", pageVal);
                // res.setHeader("X-Pagination-Limit", limitVal);
                obj.data = result.data.map((data) => data.toListData());

                return HttpResponse.success(req, res, obj);
            })


    }

}

export default EventController
