import { Response, Request } from "express";
import HttpResponse from '../../helpers/httpResponse';
import { injectable, inject } from "inversify";
import { TYPES } from "../../types";
import { body } from "express-validator";
import { HttpErrorHandler } from "../../helpers/errors";
import { IUserController } from "./interfaces/user";
import { IUserService } from "../../services/interfaces/user";
import CreateUserRequest from "../../request/user/createUserRequest";

@injectable()
class UserController implements IUserController {

    constructor(
        @inject(TYPES.UserService) private userService: IUserService
    ) { }


    create(req: Request, res: Response): Promise<Response> {

        const userData = new CreateUserRequest(
            req.body
        );

        return this.userService.create(userData)
            .then((result) => {
                return HttpResponse.created(req, res, result);
            })
            .catch((err) => HttpErrorHandler(err, req, res));
    }

    update(req: Request, res: Response): Response | Promise<Response> {

        const user = req.user

        return this.userService.update(new CreateUserRequest(req.body), user)
            .then((result) => {
                return HttpResponse.success(req, res, result);
            })
            .catch((err) => HttpErrorHandler(err, req, res));
    }

}

export default UserController
