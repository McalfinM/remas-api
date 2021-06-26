
import { IUserRepository } from "./interfaces/user";
import { injectable } from "inversify";
import specificationInterface from "./specifications/specificationInterface";
import { IUser } from "../models/interfaces/user";
import UserEntity from '../entities/user';
import UserModel from '../models/user';
import { IPostRepository } from "./interfaces/post";
import PostEntity from "../entities/post";
import PostModel from "../models/post";

@injectable()
class PostRepository implements IPostRepository {
    async create(data: PostEntity): Promise<PostEntity | null> {

        const result = await PostModel.create({
            uuid: data.uuid,
            title: data.title,
            slug: data.slug,
            category: data.category,
            image: data.image,
            cloudinary_id: data.cloudinary_id,
            content: data.content,
            created_by: data.created_by,
            created_at: data.created_at,
            updated_at: data.updated_at
        })

        return data
    }

    async findOne(uuid: string): Promise<PostEntity | null> {

        const result = await PostModel.findOne({
            slug: uuid,
            $or: [{ deleted_at: undefined }]
        })

        return result ? new PostEntity(result) : null
    }

    async update(data: PostEntity): Promise<PostEntity> {

        const result = await PostModel.updateOne({ uuid: data.uuid ?? '', "created_by.uuid": data.created_by?.uuid }, {
            title: data.title,
            content: data.content,
            image: data.image,
            category: data.category,
            cloudinary_id: data.cloudinary_id,
            created_at: data.created_at,
            updated_at: data.updated_at,
            deleted_at: data.deleted_at,
            created_by: data.created_by,
            slug: data.slug
        })
        return data
    }

    async findDetailPost(slug: string): Promise<PostEntity | null> {

        const result = await PostModel.findOne({
            slug: slug,
            $or: [{ deleted_at: undefined }]
        })

        return result ? new PostEntity(result) : null
    }

    async delete(uuid: string, user: IUser): Promise<{ success: true }> {
        const result = await PostModel.updateOne({
            uuid: uuid,
            "created_by.uuid": user.uuid
        },
            { deleted_at: new Date }
        )

        return { success: true }
    }

    async index(
        specification: specificationInterface
    ): Promise<{
        total: number;
        data: PostEntity[];
    }> {
        const total_customer = await PostModel.find({
            ...specification.specifies(),
        }).countDocuments();
        return PostModel.find(
            {
                ...specification.specifies(),
            },
            {},
            {
                ...specification.paginate(),
                sort: specification.specSort(),
            }
        )
            .then((result) => {
                return {
                    total: total_customer,
                    data: result.map((data) => {
                        return new PostEntity({
                            uuid: data.uuid,
                            created_by: data.created_by,
                            slug: data.slug,
                            category: data.category,
                            image: data.image,
                            title: data.title,
                            cloudinary_id: data.cloudinary_id,
                            // comments: data.comments,
                            content: data.content,
                            created_at: data.created_at,
                            deleted_at: data.deleted_at,
                            updated_at: data.updated_at
                        });
                    }),
                };
            })
            .catch((err) => {
                return err;
            });
    }


}

export default PostRepository
