import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { v4 as uuidv4 } from 'uuid'
import { events } from "../events/events";
import { EventDispatcher } from "event-dispatch";
import { IUser } from "../models/interfaces/user";
import CreateRequestRemas from "../request/requestRemas/createRequestRemas";
import RequestRemasEntity from "../entities/requestRemas";
import { IRequestRemasRepository } from "../repositories/interfaces/requestRemas";
import { IRequestRemasService } from "./interfaces/requestRemas";
import { ErrorNotFound } from "../helpers/errors";
import ProfileEntity from "../entities/profile";

@injectable()
class RequestRemasService implements IRequestRemasService {

    constructor(
        @inject(TYPES.RequestRemasRepository) private requestRemasRepository: IRequestRemasRepository,
        @inject(TYPES.ProducerDispatcher) private dispatcher: EventDispatcher,
    ) { }

    async create(data: CreateRequestRemas, user: IUser): Promise<{ success: true }> {
        const likeEntity = new RequestRemasEntity({
            uuid: uuidv4(),
            full_name: data.full_name,
            address: data.address,
            created_by: {
                uuid: user.uuid,
                name: user.name,
            },
            status: 'Pending',
            description: data.description,
            handphone: data.handphone,
            image: data.image,
            created_at: new Date,
            deleted_at: null,
            updated_at: new Date
        })
        const likes = await this.requestRemasRepository.create(likeEntity)

        return { success: true }
    }

    async findOne(uuid: string): Promise<RequestRemasEntity | null> {
        const result = await this.requestRemasRepository.findOne(uuid)

        return result
    }


    async find(post_uuid: string): Promise<{ data: RequestRemasEntity[] }> {

        const findComment = await this.requestRemasRepository.find(post_uuid)
        return findComment
    }

    async findWithUserUuid(user: IUser): Promise<RequestRemasEntity | null> {
        const response = await this.requestRemasRepository.findWithUserUuid(user.uuid)
        return response
    }

    async delete(requestUuid: string, user: IUser): Promise<{ success: true }> {
        const searchRequest = await this.requestRemasRepository.findOne(requestUuid)
        console.log(searchRequest, 'ini request')
        if (!searchRequest) throw new ErrorNotFound('Request not found', '@Service request remas')
        await this.requestRemasRepository.delete(searchRequest.uuid, user)

        return { success: true }
    }

    async chainUpdateFromProfile(user: ProfileEntity): Promise<{ success: true }> {

        await this.requestRemasRepository.chainUpdateFromProfile(user)

        return { success: true }
    }

}

export default RequestRemasService
