
import LikeEntity from "../../entities/like";
import specificationInterface from "../specifications/specificationInterface";


export interface ILikeRepository {
    create(data: LikeEntity): Promise<{ success: true }>
    findOne(uuid: string): Promise<LikeEntity | null>
    delete(uuid: string, user_uuid: string, data: Date): Promise<{ success: true }>
    find(post_uuid: string): Promise<number>
}
