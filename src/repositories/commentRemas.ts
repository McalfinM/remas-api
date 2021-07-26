import { injectable } from "inversify";
import specificationInterface from "./specifications/specificationInterface";
import { IUser } from "../models/interfaces/user";
import { ICommentRemasRepository } from "./interfaces/commentRemas";
import CommentRemasEntity from "../entities/commentRemas";
import CommentRemasModel from "../models/commentRemas";
import ProfileEntity from "../entities/profile";

@injectable()
class CommentRemasRepository implements ICommentRemasRepository {
    async create(data: CommentRemasEntity): Promise<{ success: true }> {

        const result = await CommentRemasModel.create({
            uuid: data.uuid,
            created_by: data.created_by,
            comment: data.comment,
            remas_uuid: data.remas_uuid,
            ip_address: data.ip_address,
            created_at: data.created_at,
            deleted_at: data.deleted_at,
            updated_at: data.updated_at,
        })

        return { success: true }
    }

    async findOne(uuid: string): Promise<CommentRemasEntity | null> {

        const result = await CommentRemasModel.findOne({
            "created_by.uuid": uuid,
        })

        return result ? new CommentRemasEntity(result) : null
    }

    async update(data: CommentRemasEntity): Promise<{ success: true }> {

        const result = await CommentRemasModel.updateOne({ uuid: data.uuid }, {
            comment: data.comment,
            updated_at: data.updated_at
        })
        return { success: true }
    }

    async delete(uuid: string, user_uuid: string, data: Date): Promise<{ success: true }> {
        const result = await CommentRemasModel.updateOne({ uuid: uuid }, {
            updated_at: data,
            deleted_at: data
        })
        return { success: true }
    }

    async chainUpdateFromProfile(data: ProfileEntity): Promise<{ success: true }> {
        await CommentRemasModel.updateMany({ "created_by.uuid": data.user_uuid }, {
            created_by: {
                name: data.main_information?.nickname ?? '',
                uuid: data.user_uuid ?? "",
                image: data.main_information?.image,
                slug: data.slug
            }
        })

        return { success: true }
    }

    async find(post_uuid: string): Promise<{ data: CommentRemasEntity[] }> {
        return CommentRemasModel.find({ remas_uuid: post_uuid })
            .then(result => {
                return {
                    data: result.map(data => {
                        return new CommentRemasEntity({
                            uuid: data.uuid,
                            created_by: data.created_by,
                            remas_uuid: data.remas_uuid,
                            comment: data.comment,
                            created_at: data.created_at,
                            updated_at: data.updated_at,
                        })
                    })
                }
            })
    }

    // async index(
    //     specification: specificationInterface
    // ): Promise<{
    //     total: number;
    //     data: CommentRemasEntity[];
    // }> {
    //     const total_customer = await CommentRemasModel.find({
    //         ...specification.specifies(),
    //     }).countDocuments();
    //     return CommentRemasModel.find(
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
    //                     return new CommentRemasEntity({
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

export default CommentRemasRepository
