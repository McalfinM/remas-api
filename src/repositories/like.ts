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
            ip_address: data.ip_address,
            post_uuid: data.post_uuid,
            created_at: data.created_at,
            deleted_at: data.deleted_at,
            updated_at: data.updated_at,
        })

        return { success: true }
    }

    async findOne(uuid: string): Promise<LikeEntity | null> {

        const result = await LikeModel.findOne({
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

    async find(post_uuid: string): Promise<number> {

        const like = await LikeModel.find({ post_uuid: post_uuid })
            .countDocuments()
        return like
        // .then(result => {
        //     return {
        //         data: result.map(data => {
        //             return new LikeEntity({
        //                 uuid: data.uuid,
        //                 user_uuid: data.user_uuid,
        //                 post_uuid: data.post_uuid,
        //                 ip_address: data.ip_address,
        //                 created_at: data.created_at,
        //                 updated_at: data.updated_at,
        //                 deleted_at: data.updated_at
        //             })
        //         })
        //     }
        // })
    }

    // async index(
    //     specification: specificationInterface
    // ): Promise<{
    //     total: number;
    //     data: CommentEntity[];
    // }> {
    //     const total_customer = await LikeModel.find({
    //         ...specification.specifies(),
    //     }).countDocuments();
    //     return LikeModel.find(
    //         {
    //             ...specification.specifies(),
    //         },
    //         {},
    //         {
    //             ...specification.paginate(),
    //             sort: specification.specSort(),
    //         }
    //     )
    //         .then((result) => {
    //             return {
    //                 total: total_customer,
    //                 data: result.map((data) => {
    //                     return new CommentEntity({
    //                         uuid: data.uuid,
    //                         user_uuid: data.user_uuid,
    //                         comment: data.comment,
    //                         post_uuid: data.post_uuid,
    //                         created_at: data.created_at,
    //                         updated_at: data.updated_at,
    //                         deleted_at: data.deleted_at,
    //                     });
    //                 }),
    //             };
    //         })
    //         .catch((err) => {
    //             return err;
    //         });
    // }



}

export default LikeRepository
