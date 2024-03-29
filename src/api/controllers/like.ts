import { Response, Request } from "express";
import HttpResponse from '../../helpers/httpResponse';
import { injectable, inject } from "inversify";
import { TYPES } from "../../types";
import { body } from "express-validator";
import { HttpErrorHandler } from "../../helpers/errors";
import { ILikeController } from "./interfaces/like";
import CreateCommentRequest from "../../request/comment/createCommentRequest";
import { ICommentService } from "../../services/interfaces/comment";
import { ILikeService } from "../../services/interfaces/like";
import CreateLikeRequest from "../../request/like/createLikeRequest";

@injectable()
class LikeController implements ILikeController {

    constructor(
        @inject(TYPES.LikeService) private likeService: ILikeService
    ) { }


    create(req: Request, res: Response): Promise<Response> {

        const postData = new CreateLikeRequest(
            req.body
        );
        const user = req.user

        return this.likeService.create(postData, user)
            .then((result) => {
                return HttpResponse.created(req, res, result);
            })
            .catch((err) => HttpErrorHandler(err, req, res));
    }

    findOne(req: Request, res: Response): Response | Promise<Response> {

        const { params: { uuid } } = req
        return this.likeService.findOne(uuid)
            .then((result) => {
                return HttpResponse.success(req, res, result);
            })
            .catch((err) => HttpErrorHandler(err, req, res));
    }

    delete(req: Request, res: Response): Response | Promise<Response> {

        const { params: { uuid } } = req
        const user = req.user
        return this.likeService.delete(uuid, user)
            .then((result) => {
                return HttpResponse.success(req, res, result);
            })
            .catch((err) => HttpErrorHandler(err, req, res));
    }

}

export default LikeController
