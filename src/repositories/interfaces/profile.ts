import ProfileEntity from "../../entities/profile";
import UserEntity from "../../entities/user";
import { IUser } from "../../models/interfaces/user";
import specificationInterface from "../specifications/specificationInterface";


export interface IProfileRepository {
    create(data: ProfileEntity): Promise<ProfileEntity>
    update(data: ProfileEntity): Promise<ProfileEntity>
    findOne(uuid: string): Promise<ProfileEntity | null>
    index(specification: specificationInterface): Promise<{ total: number, data: ProfileEntity[] }>
}
