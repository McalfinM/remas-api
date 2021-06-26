

import { IUser } from '../../models/interfaces/user'
import CreateCommentRequest from '../../request/comment/createCommentRequest'
import CommentEntity from '../../entities/comment'

export interface ICommentService {
    delete(uuid: string, user: IUser): Promise<{ success: true }>
    create(data: CreateCommentRequest, user: IUser): Promise<{ success: true }>
    update(uuid: string, data: CreateCommentRequest, user: IUser): Promise<{ success: true }>
    findOne(uuid: string): Promise<CommentEntity | null>
    find(uuid: string): Promise<{ data: CommentEntity[] }>
}
