
import CommentRemasEntity from "../../entities/commentRemas";
import ProfileEntity from "../../entities/profile";



export interface ICommentRemasRepository {
    create(data: CommentRemasEntity): Promise<{ success: true }>
    update(data: CommentRemasEntity): Promise<{ success: true }>
    findOne(uuid: string): Promise<CommentRemasEntity | null>
    delete(uuid: string, user_uuid: string, data: Date): Promise<{ success: true }>
    find(post_uuid: string): Promise<{ data: CommentRemasEntity[] }>
    chainUpdateFromProfile(data: ProfileEntity): Promise<{ success: true }>
}
