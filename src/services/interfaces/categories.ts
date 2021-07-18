

import { IUser } from '../../models/interfaces/user'
import CreateCommentRequest from '../../request/comment/createCommentRequest'
import CommentEntity from '../../entities/comment'
import CategoryEntity from '../../entities/categories'

export interface ICategoryService {
    findAll(): Promise<{ data: CategoryEntity[] }>
    findOne(uuid: string): Promise<CategoryEntity | null>
}
