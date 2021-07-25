
import UserEntity from '../../entities/user'
import { IUser } from '../../models/interfaces/user'
import CreateUserRequest from '../../request/user/createUserRequest'

export interface IUserService {
    create(data: CreateUserRequest): Promise<{ success: true }>
    update(data: CreateUserRequest, user: IUser): Promise<{ success: true }>
    findOne(uuid: string): Promise<UserEntity | null>
    checkEmail(email: string): Promise<UserEntity | null>
    chainUpdateFromProfile(name: string, uuid: string): Promise<{ success: true }>
}
