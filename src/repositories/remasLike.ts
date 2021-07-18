import { injectable } from "inversify";
import specificationInterface from "./specifications/specificationInterface";
import LikeEntity from "../entities/like";
import { IRemasLikeRepository } from "./interfaces/remasLike";
import RemasLikeModel from "../models/remasLike";

@injectable()
class RemasLikeRepository implements IRemasLikeRepository {
    async create(data: LikeEntity): Promise<{ success: true }> {

        const result = await RemasLikeModel.create({
            uuid: data.uuid,
            user_uuid: data.user_uuid,
            post_uuid: data.post_uuid,
            created_at: data.created_at,
            deleted_at: data.deleted_at,
            updated_at: data.updated_at,
        })

        return { success: true }
    }

    async findOne(post_uuid: string, uuid: string): Promise<LikeEntity | null> {

        const result = await RemasLikeModel.findOne({
            post_uuid: post_uuid,
            user_uuid: uuid,
        })

        return result ? new LikeEntity(result) : null
    }


    async delete(uuid: string, user_uuid: string, data: Date): Promise<{ success: true }> {
        const result = await RemasLikeModel.updateOne({ uuid: uuid }, {
            updated_at: data,
            deleted_at: data
        })
        return { success: true }
    }

    async updateDeleteToNullAgain(uuid: string): Promise<{ success: true }> {
        const result = await RemasLikeModel.updateOne({ uuid: uuid }, {
            updated_at: new Date,
            deleted_at: null
        })
        return { success: true }
    }

    async find(post_uuid: string): Promise<{ data: LikeEntity[] }> {
        return await RemasLikeModel.find({ post_uuid: post_uuid, deleted_at: null })
            .then((data) => {
                return {
                    data: data.map(result => {
                        return new LikeEntity({
                            user_uuid: result.user_uuid,
                            created_at: result.created_at,
                            deleted_at: result.deleted_at,
                            post_uuid: result.post_uuid,
                            updated_at: result.updated_at,
                            uuid: result.uuid
                        })
                    })
                }
            })
    }


}

export default RemasLikeRepository
