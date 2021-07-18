import { Response, Request } from "express";
import HttpResponse from '../../helpers/httpResponse';
import { injectable, inject } from "inversify";
import { TYPES } from "../../types";
import { body } from "express-validator";
import { ICategoryConrtoller } from "./interfaces/categories";
import { ICategoryService } from "../../services/interfaces/categories";

@injectable()
class CategoryController implements ICategoryConrtoller {

    constructor(
        @inject(TYPES.CategoryService) private categoryService: ICategoryService
    ) { }


    findAll(req: Request, res: Response): Promise<Response> {
        return this.categoryService.findAll()
            .then(result => {
                return HttpResponse.success(req, res, result)
            })
    }

}

export default CategoryController
