

import { IUser } from '../../models/interfaces/user'
import ProfileEntity from '../../entities/profile'
import GetProfileRequest from '../../request/profile/getProfileRequest'

export interface IProfileService {
    create(data: ProfileEntity, user: IUser): Promise<{ success: true }>
    update(uuid: string, data: ProfileEntity): Promise<{ success: true }>
    findOne(uuid: string): Promise<ProfileEntity | null>
    index(request: GetProfileRequest): Promise<{ total: number, data: ProfileEntity[] }>
}
