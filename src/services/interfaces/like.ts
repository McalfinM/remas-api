

import { IUser } from '../../models/interfaces/user'
import CreateCommentRequest from '../../request/comment/createCommentRequest'
import CommentEntity from '../../entities/comment'
import CreateLikeRequest from '../../request/like/createLikeRequest'
import LikeEntity from '../../entities/like'

export interface ILikeService {
    delete(uuid: string, user: IUser): Promise<{ success: true }>
    create(data: CreateLikeRequest, user: IUser): Promise<{ success: true }>
    findOne(uuid: string): Promise<LikeEntity | null>
    find(uuid: string): Promise<number>
}
