

import ProfileEntity from '../../entities/profile'
import RequestRemasEntity from '../../entities/requestRemas'
import { IUser } from '../../models/interfaces/user'
import CreateRequestRemas from '../../request/requestRemas/createRequestRemas'

export interface IRequestRemasService {
    delete(uuid: string, user: IUser): Promise<{ success: true }>
    create(data: CreateRequestRemas, user: IUser): Promise<{ success: true }>
    findOne(uuid: string): Promise<RequestRemasEntity | null>
    find(user: IUser): Promise<{ data: RequestRemasEntity[] }>
    findWithUserUuid(user: IUser): Promise<RequestRemasEntity | null>
    chainUpdateFromProfile(user: ProfileEntity): Promise<{ success: true }>
}
