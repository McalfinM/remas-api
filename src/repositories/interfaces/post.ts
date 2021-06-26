import PostEntity from "../../entities/post";
import UserEntity from "../../entities/user";
import { IUser } from "../../models/interfaces/user";
import specificationInterface from "../specifications/specificationInterface";


export interface IPostRepository {
    create(data: PostEntity): Promise<PostEntity | null>
    update(data: PostEntity): Promise<PostEntity | null>
    findOne(uuid: string): Promise<PostEntity | null>
    findDetailPost(slug: string): Promise<PostEntity | null>
    delete(uuid: string, user: IUser): Promise<{ success: true }>
    index(specification: specificationInterface): Promise<{ total: number, data: PostEntity[] }>
}
