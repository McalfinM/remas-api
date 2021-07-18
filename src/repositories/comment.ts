import { injectable } from "inversify";
import specificationInterface from "./specifications/specificationInterface";
import { IUser } from "../models/interfaces/user";
import { IProfileRepository } from "./interfaces/profile";
import { ICommentRepository } from "./interfaces/comment";
import CommentEntity from "../entities/comment";
import CommentModel from "../models/comment";
import ProfileEntity from "../entities/profile";

@injectable()
class CommentRepository implements ICommentRepository {
    async create(data: CommentEntity): Promise<{ success: true }> {

        const result = await CommentModel.create({
            uuid: data.uuid,
            created_by: data.created_by,
            comment: data.comment,
            post_uuid: data.post_uuid,
            ip_address: data.ip_address,
            created_at: data.created_at,
            deleted_at: data.deleted_at,
            updated_at: data.updated_at,
        })

        return { success: true }
    }

    async findOne(uuid: string): Promise<CommentEntity | null> {

        const result = await CommentModel.findOne({
            user_uuid: uuid,
        })

        return result ? new CommentEntity(result) : null
    }

    async update(data: CommentEntity): Promise<{ success: true }> {

        const result = await CommentModel.updateOne({ uuid: data.uuid }, {
            comment: data.comment,
            updated_at: data.updated_at
        })
        return { success: true }
    }

    async delete(uuid: string, user_uuid: string, data: Date): Promise<{ success: true }> {
        const result = await CommentModel.updateOne({ uuid: uuid }, {
            updated_at: data,
            deleted_at: data
        })
        return { success: true }
    }
    async chainUpdateFromProfile(data: ProfileEntity): Promise<{ success: true }> {
        await CommentModel.updateMany({ "created_by.uuid": data.user_uuid }, {
            created_by: {
                name: data.main_information?.nickname ?? '',
                uuid: data.user_uuid ?? "",
                image: data.main_information?.image,
                slug: data.slug
            }
        })

        return { success: true }
    }
    async find(post_uuid: string): Promise<{ data: CommentEntity[] }> {

        return CommentModel.find({ post_uuid: post_uuid })
            .then(result => {
                return {
                    data: result.map(data => {
                        return new CommentEntity({
                            uuid: data.uuid,
                            created_by: data.created_by,
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
    //     data: CommentEntity[];
    // }> {
    //     const total_customer = await CommentModel.find({
    //         ...specification.specifies(),
    //     }).countDocuments();
    //     return CommentModel.find(
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

export default CommentRepository
