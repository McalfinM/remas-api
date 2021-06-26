import CommentEntity from "../../entities/comment";
import { IUser } from "../../models/interfaces/user";
import specificationInterface from "../specifications/specificationInterface";


export interface ICommentRepository {
    create(data: CommentEntity): Promise<{ success: true }>
    update(data: CommentEntity): Promise<{ success: true }>
    findOne(uuid: string): Promise<CommentEntity | null>
    delete(uuid: string, user_uuid: string, data: Date): Promise<{ success: true }>
    find(post_uuid: string): Promise<{ data: CommentEntity[] }>
}
