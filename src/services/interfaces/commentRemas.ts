

import { IUser } from '../../models/interfaces/user'
import CreateCommentRequest from '../../request/comment/createCommentRequest'
import CommentRemasEntity from '../../entities/commentRemas'
import CreateCommentRemasRequest from '../../request/comment/createCommentRemasRequest'
import ProfileEntity from '../../entities/profile'

export interface ICommentRemasService {
    delete(uuid: string, user: IUser): Promise<{ success: true }>
    create(data: CreateCommentRemasRequest, user: IUser): Promise<{ success: true }>
    update(uuid: string, data: CreateCommentRemasRequest, user: IUser): Promise<{ success: true }>
    findOne(uuid: string): Promise<CommentRemasEntity | null>
    find(uuid: string): Promise<{ data: CommentRemasEntity[] }>
    chainUpdateFromProfile(data: ProfileEntity): Promise<{ success: true }>
}
