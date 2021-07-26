import ProfileEntity from "../../entities/profile";
import UserEntity from "../../entities/user";
import { IUser } from "../../models/interfaces/user";
import specificationInterface from "../specifications/specificationInterface";


export interface IProfileRepository {
    create(data: ProfileEntity): Promise<ProfileEntity>
    update(data: ProfileEntity): Promise<ProfileEntity>
    findOne(uuid: string): Promise<ProfileEntity | null>
    findOneBySlug(slug: string): Promise<ProfileEntity | null>
    update(data: ProfileEntity): Promise<ProfileEntity>
    index(specification: specificationInterface): Promise<{ total: number, data: ProfileEntity[] }>
    updateIsActiveTrue(user_uuid: string, is_active: boolean): Promise<{ success: true }>
}
