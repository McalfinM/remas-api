import UserEntity from "../../entities/user";
import { IUser } from "../../models/interfaces/user";


export interface IUserRepository {
    create(data: any): Promise<UserEntity>
    update(data: UserEntity, user: IUser): Promise<UserEntity>
    findOne(uuid: string): Promise<UserEntity | null>
}
