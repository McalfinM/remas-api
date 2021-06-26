import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { v4 as uuidv4 } from 'uuid'
import { events } from "../events/events";
import { EventDispatcher } from "event-dispatch";
import { ErrorNotFound } from "../helpers/errors";
import { IUserService } from "./interfaces/user";
import CreateUserRequest from "../request/user/createUserRequest";
import UserEntity from "../entities/user";
import slugify from 'slugify'
import { IUserRepository } from "../repositories/interfaces/user";
import { IPostService } from "./interfaces/post";
import CreatePostRequest from "../request/post/createPostrequest";
import PostEntity from "../entities/post";
import { IUser } from "../models/interfaces/user";
import { IPostRepository } from "../repositories/interfaces/post";
import GetPostRequest from "../request/post/getPostRequest";
import GetPostSpecification from "../repositories/specifications/postSpecification";
import UpdatePostRequest from "../request/post/updatePostRequest";
import CommentEntity from "../entities/comment";
import { ICommentService } from "./interfaces/comment";

@injectable()
class PostService implements IPostService {

    constructor(
        @inject(TYPES.PostRepository) private postRepository: IPostRepository,
        @inject(TYPES.CommentService) private commentService: ICommentService,
        @inject(TYPES.ProducerDispatcher) private dispatcher: EventDispatcher,
    ) { }

    async create(data: CreatePostRequest, user: IUser): Promise<{ success: true }> {
        console.log('data', data, user)
        const postEntity = new PostEntity({
            uuid: uuidv4(),
            category: data.category ?? null,
            cloudinary_id: data.cloudinary_id,
            content: data.content,
            created_by: {
                uuid: user.uuid,
                name: user.name
            },
            created_at: new Date,
            deleted_at: null,
            image: data.image ?? 'http://res.cloudinary.com/werich1/image/upload/v1624073825/waugxiymo5l9u3jcesq4.png',
            slug: slugify(data.title ?? '') + uuidv4(),
            title: data.title,
            updated_at: new Date

        })
        await this.postRepository.create(postEntity)
        return { success: true }
    }

    async findOne(uuid: string): Promise<{ data: PostEntity | null, comment: CommentEntity[] }> {
        const result = await this.postRepository.findOne(uuid)
        const comment = await this.commentService.find(result?.uuid ?? '')
        return {
            data: result,
            comment: comment.data
        }
    }

    async update(uuid: string, data: UpdatePostRequest, user: IUser): Promise<{ success: true }> {
        const searchPost = await this.postRepository.findOne(uuid)
        if (!searchPost) throw new ErrorNotFound('Data not found', '@Service update post')
        let slugi = searchPost.title
        if (searchPost.title !== data.title) {
            slugi = slugify(data.title ?? '') + uuidv4()
        }
        const postEntity = new PostEntity({
            uuid: searchPost.uuid,
            category: data.category,
            cloudinary_id: data.cloudinary_id,
            content: data.content,
            created_at: searchPost.created_at,
            created_by: searchPost.created_by,
            deleted_at: null,
            image: data.image ?? 'http://res.cloudinary.com/werich1/image/upload/v1624073825/waugxiymo5l9u3jcesq4.png',
            slug: slugi,
            title: data.title,
            updated_at: new Date
        })

        await this.postRepository.update(postEntity)
        return { success: true }
    }

    async delete(uuid: string, user: IUser): Promise<{ success: true }> {
        const searchPost = await this.postRepository.delete(uuid, user)
        if (!searchPost) throw new ErrorNotFound('Data not found', '@Delete Service Post')

        return { success: true }
    }

    async index(
        data: GetPostRequest
    ): Promise<{
        total: number;
        data: PostEntity[];
    }> {
        return await this.postRepository.index(
            new GetPostSpecification(data)
        );
    }


}

export default PostService
