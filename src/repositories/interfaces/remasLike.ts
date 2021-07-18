
import LikeEntity from "../../entities/like";
import specificationInterface from "../specifications/specificationInterface";


export interface IRemasLikeRepository {
    create(data: LikeEntity): Promise<{ success: true }>
    findOne(post_uuid: string, uuid: string): Promise<LikeEntity | null>
    delete(uuid: string, user_uuid: string, data: Date): Promise<{ success: true }>
    updateDeleteToNullAgain(post_uuid: string): Promise<{ success: true }>
    find(post_uuid: string): Promise<{ data: LikeEntity[] }>
}
