import { inject, injectable } from "inversify";
import { IUserService } from "../../services/interfaces/user";
import { TYPES } from "../../types";
import { IAuthController } from "./interfaces/auth";
import { Response, Request } from "express";
import Authentication from "../../helpers/authentication";
import CreateUserRequest from "../../request/user/createUserRequest";
import httpResponse from "../../helpers/httpResponse";
import { ErrorNotFound, HttpErrorHandler } from "../../helpers/errors";

@injectable()
class AuthController implements IAuthController {

    constructor(
        @inject(TYPES.UserService) private userService: IUserService
    ) { }

    async login(req: Request, res: Response): Promise<Response> {

        try {
            const { email, password } = req.body
            const data = await this.userService.findOne(email)
            console.log('ada yang hit', req.body)
            if (!data) {
                return res.status(400).json({
                    message: 'invalid email or password'
                })
            }

            const compare = await Authentication.passwordCompare(password, data.password)

            if (compare) {
                const token = await Authentication.generateToken(data.name ?? '', data.roles, data.uuid ?? '');
                // data._id = undefined;
                console.log(token)
                return res.status(200).json({
                    token_type: 'Bearer',
                    token: token,
                    user: {
                        uuid: data.uuid,
                        roles: data.roles
                    },
                    expire_at: 86400
                })
            }
        } catch (err) {
            console.log(err)
        }

        return res.status(400).json({
            message: 'Invalid email or password'
        })
    }

    async register(req: Request, res: Response): Promise<Response> {
        const userData = new CreateUserRequest(
            req.body
        );

        return await this.userService.create(userData)
            .then((result) => {
                return httpResponse.created(req, res, result);
            })
            .catch((err) => HttpErrorHandler(err, req, res));

    }

}

export default AuthController
