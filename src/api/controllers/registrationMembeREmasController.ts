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
import publicIp from 'public-ip'
import { IRegistrationMemberRemasController } from "./interfaces/registrationMemberRemas";
import CraeteRegistrationMemberRemas from "../../request/registrationMemberRemas/createRegistrationMember";
import { IRegistrationMemberRemasService } from "../../services/interfaces/registrationMemberRemas";
import { ipaddr } from "../../helpers/ip";
@injectable()
class RegistrationMemberRemasController implements IRegistrationMemberRemasController {

    constructor(
        @inject(TYPES.RegistrationMemberRemasService) private registrationRemasService: IRegistrationMemberRemasService
    ) { }


    create(req: Request, res: Response): Promise<Response> {
        const like = new CraeteRegistrationMemberRemas(
            {
                ...req.body,
                ipaddr: ipaddr
            }
        );
        const user = req.user
        ipaddr
        return this.registrationRemasService.create(like, user)
            .then((result) => {
                return HttpResponse.created(req, res, result);
            })
            .catch((err) => HttpErrorHandler(err, req, res));
    }

    findOne(req: Request, res: Response): Promise<Response> {

        const { params: { uuid } } = req
        return this.registrationRemasService.findOne(uuid)
            .then((result) => {
                return HttpResponse.success(req, res, result?.toDetailData());
            })
            .catch((err) => HttpErrorHandler(err, req, res));
    }

    delete(req: Request, res: Response): Response | Promise<Response> {

        const { params: { uuid } } = req
        return this.registrationRemasService.delete(uuid)
            .then((result) => {
                return HttpResponse.success(req, res, result);
            })
            .catch((err) => HttpErrorHandler(err, req, res));
    }
    index(req: Request, res: Response): Promise<Response> {

        const user = req.user
        return this.registrationRemasService.index(user)
            .then((result) => {
                return HttpResponse.success(req, res, result);
            })
            .catch((err) => HttpErrorHandler(err, req, res));
    }


}

export default RegistrationMemberRemasController
