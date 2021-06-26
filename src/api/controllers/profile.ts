import { Response, Request } from "express";
import HttpResponse from '../../helpers/httpResponse';
import { injectable, inject } from "inversify";
import { TYPES } from "../../types";
import { IProfileController } from "./interfaces/profile";
import GetProfileRequest from "../../request/profile/getProfileRequest";
import { IProfileService } from "../../services/interfaces/profile";

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
                // res.setHeader("X-Pagination-Total-Page", Math.ceil(result.total / +limitVal));
                // res.setHeader("X-Pagination-Total-Data", result.total || 0);
                // res.setHeader("X-Pagination-Current-Page", pageVal);
                // res.setHeader("X-Pagination-Limit", limitVal);
                obj.data = result.data.map((data) => data.toListData());

                return HttpResponse.success(req, res, obj);
            })


    }

}

export default ProfileCotnroller
