

import { IUser } from '../../models/interfaces/user'
import ProfileEntity from '../../entities/profile'
import GetProfileRequest from '../../request/profile/getProfileRequest'
import CreateUserRequest from '../../request/user/createUserRequest'
import UpdateProfileRequest from '../../request/profile/updateProfileRequest'
import CommentRemasEntity from '../../entities/commentRemas'

export interface IProfileService {
    create(data: ProfileEntity): Promise<{ success: true }>
    findOne(uuid: string): Promise<ProfileEntity | null>
    index(request: GetProfileRequest): Promise<{ total: number, data: ProfileEntity[] }>
    findOneBySlug(slug: string): Promise<{ data: ProfileEntity | null, comment: CommentRemasEntity[], likes: string[] }>
    update(data: UpdateProfileRequest, user: IUser): Promise<{ success: true }>
}
