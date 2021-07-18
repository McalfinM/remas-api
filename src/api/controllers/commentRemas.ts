import { Response, Request } from "express";
import HttpResponse from '../../helpers/httpResponse';
import { injectable, inject } from "inversify";
import { TYPES } from "../../types";
import { body } from "express-validator";
import { HttpErrorHandler } from "../../helpers/errors";
import { ICommentRemasController } from "./interfaces/commentRemas";
import { ICommentRemasService } from "../../services/interfaces/commentRemas";
import CreateCommentRemasRequest from "../../request/comment/createCommentRemasRequest";

@injectable()
class CommentRemasController implements ICommentRemasController {

    constructor(
        @inject(TYPES.CommentRemasService) private commentService: ICommentRemasService
    ) { }


    create(req: Request, res: Response): Promise<Response> {

        const postData = new CreateCommentRemasRequest(
            req.body
        );
        const user = req.user
        console.log('from controller', user)
        return this.commentService.create(postData, user)
            .then((result) => {
                return HttpResponse.created(req, res, result);
            })
            .catch((err) => HttpErrorHandler(err, req, res));
    }

    update(req: Request, res: Response): Response | Promise<Response> {

        const user = req.user
        const { params: { uuid } } = req
        return this.commentService.update(uuid, new CreateCommentRemasRequest(req.body), user)
            .then((result) => {
                return HttpResponse.success(req, res, result);
            })
            .catch((err) => HttpErrorHandler(err, req, res));
    }

    findOne(req: Request, res: Response): Response | Promise<Response> {

        const { params: { uuid } } = req
        return this.commentService.findOne(uuid)
            .then((result) => {
                return HttpResponse.success(req, res, result);
            })
            .catch((err) => HttpErrorHandler(err, req, res));
    }

    delete(req: Request, res: Response): Response | Promise<Response> {

        const { params: { uuid } } = req
        const user = req.user
        return this.commentService.delete(uuid, user)
            .then((result) => {
                return HttpResponse.success(req, res, result);
            })
            .catch((err) => HttpErrorHandler(err, req, res));
    }

}

export default CommentRemasController
