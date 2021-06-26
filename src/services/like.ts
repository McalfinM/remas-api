import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { v4 as uuidv4 } from 'uuid'
import { events } from "../events/events";
import { EventDispatcher } from "event-dispatch";
import { IUser } from "../models/interfaces/user";
import CreateCommentRequest from "../request/comment/createCommentRequest";
import { ErrorNotFound } from "../helpers/errors";
import { ILikeService } from "./interfaces/like";
import CreateLikeRequest from "../request/like/createLikeRequest";
import LikeEntity from "../entities/like";
import { ILikeRepository } from "../repositories/interfaces/like";

@injectable()
class LikeService implements ILikeService {

    constructor(
        @inject(TYPES.LikeRepository) private likeRepository: ILikeRepository,
        @inject(TYPES.ProducerDispatcher) private dispatcher: EventDispatcher,
    ) { }

    async create(data: CreateLikeRequest, user: IUser): Promise<{ success: true }> {
        const likeEntity = new LikeEntity({
            uuid: uuidv4(),
            user_uuid: user.uuid,
            post_uuid: data.post_uuid,
            ip_address: data.ip_address,
            created_at: new Date,
            deleted_at: null,
            updated_at: new Date
        })
        const comment = await this.likeRepository.create(likeEntity)
        return { success: true }
    }

    async findOne(uuid: string): Promise<LikeEntity | null> {
        const result = await this.likeRepository.findOne(uuid)

        return result
    }


    async find(post_uuid: string): Promise<number> {

        const findComment = await this.likeRepository.find(post_uuid)
        return findComment
    }

    async delete(uuid: string, user: IUser): Promise<{ success: true }> {
        const data = new Date
        const post = await this.likeRepository.delete(uuid, user.uuid, data)

        return { success: true }
    }

}

export default LikeService
