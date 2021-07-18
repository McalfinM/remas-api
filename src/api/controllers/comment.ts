import { Response, Request } from "express";
import HttpResponse from '../../helpers/httpResponse';
import { injectable, inject } from "inversify";
import { TYPES } from "../../types";
import { body } from "express-validator";
import { HttpErrorHandler } from "../../helpers/errors";
import { IUserController } from "./interfaces/user";
import { IUserService } from "../../services/interfaces/user";
import CreateUserRequest from "../../request/user/createUserRequest";
import { IPostController } from "./interfaces/post";
import { IPostService } from "../../services/interfaces/post";
import CreatePostRequest from "../../request/post/createPostrequest";
import GetPostRequest from "../../request/post/getPostRequest";
import UpdatePostRequest from "../../request/post/updatePostRequest";
import { ICommentController } from "./interfaces/comment";
import CreateCommentRequest from "../../request/comment/createCommentRequest";
import { ICommentService } from "../../services/interfaces/comment";
import { ipaddr } from "../../helpers/ip";
@injectable()
class CommentController implements ICommentController {

    constructor(
        @inject(TYPES.CommentService) private commentService: ICommentService
    ) { }


    async create(req: Request, res: Response): Promise<Response> {

        const commentData = new CreateCommentRequest({
            ...req.body,
            ip_address: ipaddr
        }
        );
        const user = req.user
        return this.commentService.create(commentData, user)
            .then((result) => {
                return HttpResponse.created(req, res, result);
            })
            .catch((err) => HttpErrorHandler(err, req, res));
    }

    update(req: Request, res: Response): Response | Promise<Response> {

        const user = req.user
        const { params: { uuid } } = req
        return this.commentService.update(uuid, new CreateCommentRequest(req.body), user)
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

export default CommentController
