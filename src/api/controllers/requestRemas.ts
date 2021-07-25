import { Response, Request } from "express";
import HttpResponse from '../../helpers/httpResponse';
import { injectable, inject } from "inversify";
import { TYPES } from "../../types";
import { body } from "express-validator";
import { HttpErrorHandler } from "../../helpers/errors";
import { IRequestRemasController } from "./interfaces/requestRemas";
import { IRequestRemasService } from "../../services/interfaces/requestRemas";
import CreateRequestRemas from "../../request/requestRemas/createRequestRemas";
@injectable()
class RequestRemasController implements IRequestRemasController {

    constructor(
        @inject(TYPES.RequestRemasService) private requestRemasService: IRequestRemasService
    ) { }


    create(req: Request, res: Response): Promise<Response> {
        const like = new CreateRequestRemas(
            req.body
        );
        const user = req.user
        return this.requestRemasService.create(like, user)
            .then((result) => {
                return HttpResponse.created(req, res, result);
            })
            .catch((err) => HttpErrorHandler(err, req, res));
    }

    findOne(req: Request, res: Response): Response | Promise<Response> {

        const { body: { uuid } } = req
        return this.requestRemasService.findOne(uuid)
            .then((result) => {
                return HttpResponse.success(req, res, result);
            })
            .catch((err) => HttpErrorHandler(err, req, res));
    }

    delete(req: Request, res: Response): Response | Promise<Response> {

        const { params: { uuid } } = req
        const user = req.user
        return this.requestRemasService.delete(uuid, user)
            .then((result) => {
                return HttpResponse.success(req, res, result);
            })
            .catch((err) => HttpErrorHandler(err, req, res));
    }

    findWithUserUuid(req: Request, res: Response): Response | Promise<Response> {

        const user = req.user

        return this.requestRemasService.findWithUserUuid(user)
            .then((result) => {
                return HttpResponse.success(req, res, result);
            })
            .catch((err) => HttpErrorHandler(err, req, res));
    }

}

export default RequestRemasController
