import { Response, Request } from "express";
import HttpResponse from '../../helpers/httpResponse';
import { injectable, inject } from "inversify";
import { TYPES } from "../../types";
import { body } from "express-validator";
import { HttpErrorHandler } from "../../helpers/errors";
import { ITokenController } from "./interfaces/token";
import { ITokenService } from "../../services/interfaces/token";
@injectable()
class TokenController implements ITokenController {

    constructor(
        @inject(TYPES.TokenService) private tokenService: ITokenService
    ) { }

    findOne(req: Request, res: Response): Response | Promise<Response> {

        const { body: { uuid } } = req
        return this.tokenService.findOne(uuid)
            .then((result) => {
                return HttpResponse.success(req, res, result);
            })
            .catch((err) => HttpErrorHandler(err, req, res));
    }
    findOneWithToken(req: Request, res: Response): Response | Promise<Response> {

        const { body: { token } } = req
        return this.tokenService.findOneWithToken(token)
            .then((result) => {
                return HttpResponse.success(req, res, result);
            })
            .catch((err) => HttpErrorHandler(err, req, res));
    }

    update(req: Request, res: Response): Response | Promise<Response> {

        const { params: { token } } = req
        return this.tokenService.update(token)
            .then((result) => {
                return HttpResponse.success(req, res, result);
            })
            .catch((err) => HttpErrorHandler(err, req, res));
    }

}

export default TokenController
