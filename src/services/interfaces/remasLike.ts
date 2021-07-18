

import { IUser } from '../../models/interfaces/user'
import CreateCommentRequest from '../../request/comment/createCommentRequest'
import CommentEntity from '../../entities/comment'
import CreateLikeRequest from '../../request/like/createLikeRequest'
import LikeEntity from '../../entities/like'

export interface IRemasLikeService {
    delete(uuid: string, user: IUser): Promise<{ success: true }>
    create(data: CreateLikeRequest, user: IUser): Promise<{ success: true }>
    findOne(post_uuid: string, user_uuid: string): Promise<LikeEntity | null>
    updateDeleteToNullAgain(post_uuid: string): Promise<{ success: true }>
    find(uuid: string): Promise<{ data: LikeEntity[] }>
}
