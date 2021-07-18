import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { v4 as uuidv4 } from 'uuid'
import { events } from "../events/events";
import { EventDispatcher } from "event-dispatch";
import { IProfileRepository } from "../repositories/interfaces/profile";
import GetProfileRequest from "../request/profile/getProfileRequest";
import GetProfileSpecification from "../repositories/specifications/profileSpecification"
import { ICommentService } from "./interfaces/comment";
import CommentEntity from "../entities/comment";
import { IUser } from "../models/interfaces/user";
import CreateCommentRequest from "../request/comment/createCommentRequest";
import { ICommentRepository } from "../repositories/interfaces/comment";
import { ErrorNotFound } from "../helpers/errors";
import ProfileEntity from "../entities/profile";

@injectable()
class CommentService implements ICommentService {

    constructor(
        @inject(TYPES.CommentRepository) private commentRepository: ICommentRepository,
        @inject(TYPES.ProducerDispatcher) private dispatcher: EventDispatcher,
    ) { }

    async create(data: CreateCommentRequest, user: IUser): Promise<{ success: true }> {
        console.log(data)
        const commentEntity = new CommentEntity({
            uuid: uuidv4(),
            created_by: {
                uuid: user.uuid,
                name: user.name
            },
            post_uuid: data.post_uuid,
            ip_address: data.ip_address,
            comment: data.comment,
            created_at: new Date,
            deleted_at: null,
            updated_at: new Date
        })
        const comment = await this.commentRepository.create(commentEntity)
        return { success: true }
    }

    async findOne(uuid: string): Promise<CommentEntity | null> {
        const result = await this.commentRepository.findOne(uuid)

        return result
    }

    async update(uuid: string, data: CreateCommentRequest, user: IUser): Promise<{ success: true }> {
        const findComment = await this.commentRepository.findOne(uuid)
        if (!findComment) throw new ErrorNotFound('Comment not found', '@Comment service update')
        const commentEntity = new CommentEntity({
            uuid: findComment.uuid,
            created_by: {
                uuid: user.uuid,
                name: user.name
            },
            post_uuid: findComment.post_uuid,
            comment: data.comment,
            created_at: findComment.created_at,
            deleted_at: null,
            updated_at: new Date
        })
        const post = await this.commentRepository.update(commentEntity)
        return { success: true }
    }

    async find(post_uuid: string): Promise<{ data: CommentEntity[] }> {

        const findComment = await this.commentRepository.find(post_uuid)
        return findComment
    }

    async delete(uuid: string, user: IUser): Promise<{ success: true }> {
        const data = new Date
        const post = await this.commentRepository.delete(uuid, user.uuid, data)

        return { success: true }
    }

    async chainUpdateFromProfile(data: ProfileEntity): Promise<{ success: true }> {
        const comment = await this.commentRepository.chainUpdateFromProfile(data)
        return { success: true }
    }

}

export default CommentService
