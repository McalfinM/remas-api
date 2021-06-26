
import PostEntity from '../../entities/post'
import UserEntity from '../../entities/user'
import { IUser } from '../../models/interfaces/user'
import GetPostRequest from '../../request/post/getPostRequest'
import CreatePostRequest from '../../request/post/createPostrequest'
import CreateUserRequest from '../../request/user/createUserRequest'
import UpdatePostRequest from '../../request/post/updatePostRequest'
import CommentEntity from '../../entities/comment'

export interface IPostService {
    create(data: CreatePostRequest, user: IUser): Promise<{ success: true }>
    update(uuid: string, data: UpdatePostRequest, user: IUser): Promise<{ success: true }>
    findOne(uuid: string): Promise<{ data: PostEntity | null, comment: CommentEntity[] }>
    delete(uuid: string, user: IUser): Promise<{ success: true }>
    index(request: GetPostRequest): Promise<{ total: number, data: PostEntity[] }>
}
