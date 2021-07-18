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
import { IRemasLikeService } from "./interfaces/remasLike";
import { IRemasLikeRepository } from "../repositories/interfaces/remasLike";

@injectable()
class RemasLikeService implements IRemasLikeService {

    constructor(
        @inject(TYPES.RemasLikeRepository) private likeRepository: IRemasLikeRepository,
        @inject(TYPES.ProducerDispatcher) private dispatcher: EventDispatcher,
    ) { }

    async create(data: CreateLikeRequest, user: IUser): Promise<{ success: true }> {
        const findUuidUser = await this.likeRepository.findOne(data.post_uuid, user.uuid)
        if (findUuidUser) {
            if (findUuidUser.deleted_at === null) {
                await this.delete(findUuidUser.uuid, user)
            } else {
                await this.updateDeleteToNullAgain(findUuidUser.uuid)

            }
        } else {
            const likeEntity = new LikeEntity({
                uuid: uuidv4(),
                user_uuid: user.uuid,
                post_uuid: data.post_uuid,
                created_at: new Date,
                deleted_at: null,
                updated_at: new Date
            })
            const likes = await this.likeRepository.create(likeEntity)
        }

        return { success: true }
    }

    async findOne(post_uuid: string, user_uuid: string): Promise<LikeEntity | null> {
        const result = await this.likeRepository.findOne(post_uuid, user_uuid)

        return result
    }


    async find(post_uuid: string): Promise<{ data: LikeEntity[] }> {

        const findLike = await this.likeRepository.find(post_uuid)
        return findLike
    }

    async updateDeleteToNullAgain(uuid: string): Promise<{ success: true }> {

        const likes = await this.likeRepository.updateDeleteToNullAgain(uuid)

        return { success: true }
    }

    async delete(uuid: string, user: IUser): Promise<{ success: true }> {
        const data = new Date
        const post = await this.likeRepository.delete(uuid, user.uuid, data)

        return { success: true }
    }

}

export default RemasLikeService
