import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { v4 as uuidv4 } from 'uuid'
import { events } from "../events/events";
import { EventDispatcher } from "event-dispatch";
import { IProfileRepository } from "../repositories/interfaces/profile";
import GetProfileRequest from "../request/profile/getProfileRequest";
import GetProfileSpecification from "../repositories/specifications/profileSpecification"
import { ICommentService } from "./interfaces/comment";
import CommentEntity from "../entities/comment";
import { IUser } from "../models/interfaces/user";
import CreateCommentRequest from "../request/comment/createCommentRequest";
import { ICommentRepository } from "../repositories/interfaces/comment";
import { ErrorNotFound } from "../helpers/errors";
import { ICategoryService } from "./interfaces/categories";
import CategoryEntity from "../entities/categories";
import { ICategoryRepository } from "../repositories/interfaces/categories";

@injectable()
class CategoryService implements ICategoryService {

    constructor(
        @inject(TYPES.CategoryRepository) private categoryRepository: ICategoryRepository,
        @inject(TYPES.ProducerDispatcher) private dispatcher: EventDispatcher,
    ) { }

    async findAll(): Promise<{ data: CategoryEntity[] }> {
        return await this.categoryRepository.findAll()
    }

    async findOne(uuid: string): Promise<CategoryEntity | null> {
        return await this.categoryRepository.findOne(uuid)
    }
}

export default CategoryService
