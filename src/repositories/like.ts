import { injectable } from "inversify";
import specificationInterface from "./specifications/specificationInterface";
import { ILikeRepository } from "./interfaces/like";
import LikeEntity from "../entities/like";
import LikeModel from "../models/like";

@injectable()
class LikeRepository implements ILikeRepository {
    async create(data: LikeEntity): Promise<{ success: true }> {

        const result = await LikeModel.create({
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

        const result = await LikeModel.findOne({
            post_uuid: post_uuid,
            user_uuid: uuid,
        })

        return result ? new LikeEntity(result) : null
    }


    async delete(uuid: string, user_uuid: string, data: Date): Promise<{ success: true }> {
        const result = await LikeModel.updateOne({ uuid: uuid }, {
            updated_at: data,
            deleted_at: data
        })
        return { success: true }
    }

    async updateDeleteToNullAgain(uuid: string): Promise<{ success: true }> {
        const result = await LikeModel.updateOne({ uuid: uuid }, {
            updated_at: new Date,
            deleted_at: null
        })
        return { success: true }
    }

    async find(post_uuid: string): Promise<{ data: LikeEntity[] }> {

        return await LikeModel.find({ post_uuid: post_uuid, deleted_at: null })
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

export default LikeRepository
