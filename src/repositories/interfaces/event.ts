import EventEntity from "../../entities/event";
import PostEntity from "../../entities/post";
import ProfileEntity from "../../entities/profile";
import UserEntity from "../../entities/user";
import { IUser } from "../../models/interfaces/user";
import specificationInterface from "../specifications/specificationInterface";


export interface IEventRepository {
    create(data: EventEntity): Promise<EventEntity | null>
    update(data: EventEntity): Promise<EventEntity | null>
    findOne(uuid: string): Promise<EventEntity | null>
    findPostByUuid(slug: string, user: IUser): Promise<EventEntity | null>
    delete(uuid: string, user: IUser): Promise<{ success: true }>
    findPostWithAuth(user: IUser): Promise<{ data: EventEntity[] }>
    index(specification: specificationInterface): Promise<{ total: number, data: EventEntity[] }>
    chainUpdateFromProfile(data: ProfileEntity): Promise<{ success: true }>
}
