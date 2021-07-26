import { injectable } from "inversify";
import specificationInterface from "./specifications/specificationInterface";

import { IRequestRemasRepository } from "./interfaces/requestRemas";
import RequestRemasEntity from "../entities/requestRemas";
import RequestRemasModel from "../models/requestRemas";
import { IUser } from "../models/interfaces/user";
import ProfileEntity from "../entities/profile";

@injectable()
class RequestRemasRepository implements IRequestRemasRepository {
    async create(data: RequestRemasEntity): Promise<{ success: true }> {

        const result = await RequestRemasModel.create({
            uuid: data.uuid,
            address: data.address,
            created_by: data.created_by,
            description: data.description,
            full_name: data.full_name,
            handphone: data.handphone,
            image: data.image,
            status: data.status,
            created_at: new Date,
            updated_at: new Date,
            deleted_at: null
        })

        return { success: true }
    }

    async findOne(uuid: string): Promise<RequestRemasEntity | null> {

        const result = await RequestRemasModel.findOne({
            uuid: uuid,

        })

        return result ? new RequestRemasEntity(result) : null
    }


    async delete(uuid: string, user: IUser): Promise<{ success: true }> {
        const result = await RequestRemasModel.updateOne({
            uuid: uuid,
            "created_by.uuid": user.uuid
        },
            { deleted_at: new Date }
        )

        return { success: true }
    }

    async findWithUserUuid(user_uuid: string): Promise<RequestRemasEntity | null> {
        const response = await RequestRemasModel.findOne({ "created_by.uuid": user_uuid, deleted_at: null })
        return response ? new RequestRemasEntity(response) : null
    }

    async chainUpdateFromProfile(user: ProfileEntity): Promise<{ success: true }> {
        const response = await RequestRemasModel.updateOne({ "created_by.uuid": user.user_uuid }, {
            "created_by.name": user.main_information?.nickname,
            "created_by.image": user.main_information?.image
        })

        return { success: true }
    }

    async update(data: RequestRemasEntity): Promise<{ success: true }> {
        const result = await RequestRemasModel.updateOne({ uuid: data.uuid }, {
            uuid: data.uuid,
            address: data.address,
            created_by: data.created_by,
            description: data.description,
            full_name: data.full_name,
            handphone: data.handphone,
            image: data.image,
            status: data.status,
            created_at: new Date,
            updated_at: new Date,
            deleted_at: null
        })

        return { success: true }
    }

    async find(): Promise<{ data: RequestRemasEntity[] }> {

        return await RequestRemasModel.find({ deleted_at: null })
            .then((data) => {
                return {
                    data: data.map(result => {
                        return new RequestRemasEntity({
                            created_by: result.created_by,
                            created_at: result.created_at,
                            full_name: result.full_name,
                            updated_at: result.updated_at,
                            uuid: result.uuid,
                            status: result.status,
                            address: result.address,
                            deleted_at: result.deleted_at,
                            description: result.description,
                            handphone: result.handphone,
                            image: result.image
                        })
                    })
                }
            })
    }


}

export default RequestRemasRepository
