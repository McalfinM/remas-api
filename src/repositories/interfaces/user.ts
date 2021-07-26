import UserEntity from "../../entities/user";
import { IUser } from "../../models/interfaces/user";


export interface IUserRepository {
    create(data: any): Promise<UserEntity>
    update(data: UserEntity, user: IUser): Promise<UserEntity>
    findOne(uuid: string): Promise<UserEntity | null>
    checkEmail(email: string): Promise<UserEntity | null>
    chainUpdateFromProfile(name: string, uuid: string): Promise<{ success: true }>
    findOneByUuid(uuid: string): Promise<UserEntity | null>
    updateIsActiveTrue(user_uuid: string, is_active: boolean): Promise<{ success: true }>
}
