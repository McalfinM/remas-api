
import { IUserRepository } from "./interfaces/user";
import { injectable } from "inversify";
import specificationInterface from "./specifications/specificationInterface";
import { IUser } from "../models/interfaces/user";
import UserEntity from '../entities/user';
import UserModel from '../models/user';
import { IPostRepository } from "./interfaces/post";
import ProfileEntity from "../entities/profile";
import { IEventRepository } from "./interfaces/event";
import EventEntity from "../entities/event";
import EventModel from "../models/event";

@injectable()
class EventRepository implements IEventRepository {
    async create(data: EventEntity): Promise<EventEntity | null> {

        const result = await EventModel.create({
            uuid: data.uuid,
            title: data.title,
            slug: data.slug,
            category: data.category,
            image: data.image,
            time: data.time,
            schedule: data.schedule,
            place: data.place,
            cloudinary_id: data.cloudinary_id,
            content: data.content,
            created_by: data.created_by,
            created_at: data.created_at,
            updated_at: data.updated_at
        })

        return data
    }

    async findOne(uuid: string): Promise<EventEntity | null> {

        const result = await EventModel.findOne({
            slug: uuid,
            $or: [{ deleted_at: undefined }]
        })

        return result ? new EventEntity(result) : null
    }

    async update(data: EventEntity): Promise<EventEntity> {

        const result = await EventModel.updateOne({ uuid: data.uuid ?? '', "created_by.uuid": data.created_by?.uuid }, {
            uuid: data.uuid ?? '',
            title: data.title,
            slug: data.slug,
            category: data.category,
            image: data.image,
            schedule: data.schedule,
            time: data.time,
            place: data.place,
            cloudinary_id: data.cloudinary_id,
            content: data.content,
            created_by: data.created_by,
            created_at: data.created_at,
            updated_at: data.updated_at
        })
        return data
    }

    async findPostByUuid(uuid: string, user: IUser): Promise<EventEntity | null> {

        const result = await EventModel.findOne({
            uuid: uuid,
            "created_by.uuid": user.uuid,
            $or: [{ deleted_at: undefined }]
        })

        return result ? new EventEntity(result) : null
    }

    async delete(uuid: string, user: IUser): Promise<{ success: true }> {
        const result = await EventModel.updateOne({
            uuid: uuid,
            "created_by.uuid": user.uuid
        },
            { deleted_at: new Date }
        )

        return { success: true }
    }

    async findPostWithAuth(user: IUser): Promise<{ data: EventEntity[] }> {
        return await EventModel.find({ "created_by.uuid": user.uuid, deleted_at: null })
            .then(result => {
                return {
                    data: result.map((data) => {
                        return new EventEntity({
                            uuid: data.uuid,
                            title: data.title,
                            slug: data.slug,
                            category: data.category,
                            image: data.image,
                            time: data.time,
                            schedule: data.schedule,
                            place: data.place,
                            cloudinary_id: data.cloudinary_id,
                            content: data.content,
                            created_by: data.created_by,
                            created_at: data.created_at,
                            updated_at: data.updated_at,
                            deleted_at: data.deleted_at
                        })
                    })
                }
            })
    }

    async chainUpdateFromProfile(data: ProfileEntity): Promise<{ success: true }> {
        const response = await EventModel.updateMany({ "created_by.uuid": data.user_uuid }, {
            created_by: {
                uuid: data.user_uuid ?? '',
                name: data.main_information?.nickname ?? '',
                image: data.main_information?.image,
                slug: data.slug
            }
        })

        return { success: true }
    }

    async index(
        specification: specificationInterface
    ): Promise<{
        total: number;
        data: EventEntity[];
    }> {
        const total_customer = await EventModel.find({
            ...specification.specifies(),
        }).countDocuments();
        return EventModel.find(
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
                        return new EventEntity({
                            uuid: data.uuid,
                            title: data.title,
                            slug: data.slug,
                            category: data.category,
                            image: data.image,
                            time: data.time,
                            place: data.place,
                            cloudinary_id: data.cloudinary_id,
                            schedule: data.schedule,
                            content: data.content,
                            created_by: data.created_by,
                            created_at: data.created_at,
                            updated_at: data.updated_at,
                            deleted_at: data.deleted_at
                        });
                    }),
                };
            })
            .catch((err) => {
                return err;
            });
    }


}

export default EventRepository
