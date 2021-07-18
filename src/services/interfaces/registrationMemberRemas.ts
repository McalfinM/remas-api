

import { IUser } from '../../models/interfaces/user'
import ProfileEntity from '../../entities/profile'
import GetProfileRequest from '../../request/profile/getProfileRequest'
import CreateUserRequest from '../../request/user/createUserRequest'
import UpdateProfileRequest from '../../request/profile/updateProfileRequest'
import RegistrationMemberRemasEntity from '../../entities/registrationMemberRemas'
import CraeteRegistrationMemberRemas from '../../request/registrationMemberRemas/createRegistrationMember'

export interface IRegistrationMemberRemasService {
    create(data: CraeteRegistrationMemberRemas, user: IUser): Promise<{ success: true }>
    findOne(user: string): Promise<RegistrationMemberRemasEntity | null>
    index(user: IUser): Promise<{ data: RegistrationMemberRemasEntity[] }>
    delete(uuid: string): Promise<{ success: true }>
}
