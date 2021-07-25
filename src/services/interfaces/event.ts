
import UserEntity from '../../entities/user'
import { IUser } from '../../models/interfaces/user'
import GetPostRequest from '../../request/post/getPostRequest'
import UpdatePostRequest from '../../request/post/updatePostRequest'
import CommentEntity from '../../entities/comment'
import ProfileEntity from '../../entities/profile'
import CreateEventRequest from '../../request/event/createEvent'
import EventEntity from '../../entities/event'

export interface IEventService {
    create(data: CreateEventRequest, user: IUser): Promise<{ success: true }>
    update(uuid: string, data: CreateEventRequest, user: IUser): Promise<{ success: true }>
    findOne(uuid: string): Promise<{ data: EventEntity | null, comment: CommentEntity[], like: string[] }>
    delete(uuid: string, user: IUser): Promise<{ success: true }>
    index(request: GetPostRequest): Promise<{ total: number, data: EventEntity[] }>
    findPostWithAuth(user: IUser): Promise<{ data: EventEntity[] }>
    findPostByUuid(uuid: string, user: IUser): Promise<EventEntity | null>
    chainUpdateFromProfile(data: ProfileEntity): Promise<{ success: true }>
}
