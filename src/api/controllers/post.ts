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

@injectable()
class PostController implements IPostController {

    constructor(
        @inject(TYPES.PostService) private postService: IPostService
    ) { }


    create(req: Request, res: Response): Promise<Response> {

        const postData = new CreatePostRequest(
            req.body
        );
        const user = req.user

        return this.postService.create(postData, user)
            .then((result) => {
                return HttpResponse.created(req, res, result);
            })
            .catch((err) => HttpErrorHandler(err, req, res));
    }

    update(req: Request, res: Response): Response | Promise<Response> {

        const user = req.user
        const { params: { uuid } } = req
        return this.postService.update(uuid, new UpdatePostRequest(req.body), user)
            .then((result) => {
                return HttpResponse.success(req, res, result);
            })
            .catch((err) => HttpErrorHandler(err, req, res));
    }

    findOne(req: Request, res: Response): Response | Promise<Response> {

        const { params: { uuid } } = req
        return this.postService.findOne(uuid)
            .then((result) => {
                return HttpResponse.success(req, res, result);
            })
            .catch((err) => HttpErrorHandler(err, req, res));
    }

    delete(req: Request, res: Response): Response | Promise<Response> {

        const { params: { uuid } } = req
        const user = req.user
        return this.postService.delete(uuid, user)
            .then((result) => {
                return HttpResponse.success(req, res, result);
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

        return this.postService.index(new GetPostRequest(query))
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

export default PostController
