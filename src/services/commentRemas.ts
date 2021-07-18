import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { v4 as uuidv4 } from 'uuid'
import { events } from "../events/events";
import { EventDispatcher } from "event-dispatch";
import { IUser } from "../models/interfaces/user";
import { ErrorNotFound } from "../helpers/errors";
import { ICommentRemasService } from "./interfaces/commentRemas";
import CreateCommentRemasRequest from "../request/comment/createCommentRemasRequest";
import CommentRemasEntity from "../entities/commentRemas";
import { ICommentRemasRepository } from "../repositories/interfaces/commentRemas";
import ProfileEntity from "../entities/profile";

@injectable()
class CommentRemasService implements ICommentRemasService {

    constructor(
        @inject(TYPES.CommentRemasRepository) private commentRepository: ICommentRemasRepository,
        @inject(TYPES.ProducerDispatcher) private dispatcher: EventDispatcher,
    ) { }

    async create(data: CreateCommentRemasRequest, user: IUser): Promise<{ success: true }> {
        console.log(user, 'ini user')
        const commentEntity = new CommentRemasEntity({
            uuid: uuidv4(),
            created_by: {
                name: user.name,
                uuid: user.uuid,
            },
            remas_uuid: data.remas_uuid,
            ip_address: data.ip_address ?? null,
            comment: data.comment,
            created_at: new Date,
            deleted_at: null,
            updated_at: new Date
        })
        const comment = await this.commentRepository.create(commentEntity)
        return { success: true }
    }

    async findOne(uuid: string): Promise<CommentRemasEntity | null> {
        const result = await this.commentRepository.findOne(uuid)

        return result
    }

    async update(uuid: string, data: CreateCommentRemasRequest): Promise<{ success: true }> {
        const findComment = await this.commentRepository.findOne(uuid)
        if (!findComment) throw new ErrorNotFound('Comment not found', '@Comment service update')
        const commentEntity = new CommentRemasEntity({
            uuid: findComment.uuid,
            created_by: findComment.created_by,
            remas_uuid: findComment.remas_uuid,
            ip_address: findComment.ip_address ?? null,
            comment: data.comment,
            created_at: findComment.created_at,
            deleted_at: null,
            updated_at: new Date
        })
        const post = await this.commentRepository.update(commentEntity)
        return { success: true }
    }

    async find(remas_uuid: string): Promise<{ data: CommentRemasEntity[] }> {

        const findComment = await this.commentRepository.find(remas_uuid)
        return findComment
    }

    async chainUpdateFromProfile(data: ProfileEntity): Promise<{ success: true }> {
        const response = await this.commentRepository.chainUpdateFromProfile(data)

        return { success: true }
    }

    async delete(uuid: string, user: IUser): Promise<{ success: true }> {
        const data = new Date
        const post = await this.commentRepository.delete(uuid, user.uuid, data)

        return { success: true }
    }

}

export default CommentRemasService
