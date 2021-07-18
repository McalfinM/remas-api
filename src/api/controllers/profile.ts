import { Response, Request } from "express";
import HttpResponse from '../../helpers/httpResponse';
import { injectable, inject } from "inversify";
import { TYPES } from "../../types";
import { IProfileController } from "./interfaces/profile";
import GetProfileRequest from "../../request/profile/getProfileRequest";
import { IProfileService } from "../../services/interfaces/profile";
import { HttpErrorHandler } from "../../helpers/errors";
import UpdatePostRequest from "../../request/post/updatePostRequest";
import UpdateProfileRequest from "../../request/profile/updateProfileRequest";

@injectable()
class ProfileCotnroller implements IProfileController {

    constructor(
        @inject(TYPES.ProfileService) private profileService: IProfileService
    ) { }


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

        return this.profileService.index(new GetProfileRequest(query))
            .then((result) => {
                obj.totalPage = Math.ceil(result.total / +limitVal)
                obj.totalData = result.total || 0
                obj.currentPage = pageVal
                obj.limit = limitVal

                obj.data = result.data.map((data) => data.toListData());

                return HttpResponse.success(req, res, obj);
            })


    }

    profile(req: Request, res: Response): Promise<Response> {
        const user = req.user
        return this.profileService.findOne(user.uuid)
            .then((result) => {
                return HttpResponse.success(req, res, result?.toDetailData());
            })
            .catch((err) => HttpErrorHandler(err, req, res));
    }


    findOneBySlug(req: Request, res: Response): Promise<Response> {
        const { params: { slug } } = req
        return this.profileService.findOneBySlug(slug)
            .then((result) => {
                return HttpResponse.success(req, res, result,);
            })
            .catch((err) => HttpErrorHandler(err, req, res));
    }

    update(req: Request, res: Response): Promise<Response> {
        const user = req.user
        const bodyData = new UpdateProfileRequest(req.body)
        return this.profileService.update(bodyData, user)
            .then((result) => {
                return HttpResponse.success(req, res, result);
            })
            .catch((err) => HttpErrorHandler(err, req, res));
    }

}

export default ProfileCotnroller
