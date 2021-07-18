import PostEntity from "../../entities/post";
import ProfileEntity from "../../entities/profile";
import UserEntity from "../../entities/user";
import { IUser } from "../../models/interfaces/user";
import specificationInterface from "../specifications/specificationInterface";


export interface IPostRepository {
    create(data: PostEntity): Promise<PostEntity | null>
    update(data: PostEntity): Promise<PostEntity | null>
    findOne(uuid: string): Promise<PostEntity | null>
    findPostByUuid(slug: string, user: IUser): Promise<PostEntity | null>
    delete(uuid: string, user: IUser): Promise<{ success: true }>
    findPostWithAuth(user: IUser): Promise<{ data: PostEntity[] }>
    index(specification: specificationInterface): Promise<{ total: number, data: PostEntity[] }>
    chainUpdateFromProfile(data: ProfileEntity): Promise<{ success: true }>
}
