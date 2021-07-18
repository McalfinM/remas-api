import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { v4 as uuidv4 } from 'uuid'
import { events } from "../events/events";
import { EventDispatcher } from "event-dispatch";
import { ErrorNotFound } from "../helpers/errors";
import slugify from 'slugify'
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
import { ILikeService } from "./interfaces/like";
import { IProfileService } from "./interfaces/profile";
import { cloud } from '../helpers/cloudinary'
import axios from 'axios'
import { ICategoryService } from "./interfaces/categories";
import ProfileEntity from "../entities/profile";
@injectable()
class PostService implements IPostService {

    constructor(
        @inject(TYPES.PostRepository) private postRepository: IPostRepository,
        @inject(TYPES.CommentService) private commentService: ICommentService,
        @inject(TYPES.LikeService) private likeService: ILikeService,
        @inject(TYPES.ProfileService) private profileService: IProfileService,
        @inject(TYPES.CategoryService) private categoryService: ICategoryService,
        @inject(TYPES.ProducerDispatcher) private dispatcher: EventDispatcher,
    ) { }

    async create(data: CreatePostRequest, user: IUser): Promise<{ success: true }> {
        const profile = await this.profileService.findOne(user.uuid)
        const category = await this.categoryService.findOne(data.category)
        const postEntity = new PostEntity({
            uuid: uuidv4(),
            category: {
                uuid: category?.uuid ?? '',
                name: category?.name ?? ''
            },
            cloudinary_id: data.cloudinary_id,
            content: data.content,
            created_by: {
                uuid: user.uuid,
                name: user.name,
                image: profile?.main_information?.image ?? 'https://res.cloudinary.com/werich1/image/upload/v1624073825/waugxiymo5l9u3jcesq4.png',
                slug: profile?.slug ?? ''
            },
            created_at: new Date,
            deleted_at: null,
            image: data.image ?? 'https://res.cloudinary.com/werich1/image/upload/v1624073825/waugxiymo5l9u3jcesq4.png',
            slug: slugify(data.title ?? '') + uuidv4(),
            title: data.title,
            updated_at: new Date

        })

        await this.postRepository.create(postEntity)
        return { success: true }
    }

    async findOne(uuid: string): Promise<{ data: PostEntity | null, comment: CommentEntity[], like: string[] }> {
        const result = await this.postRepository.findOne(uuid)
        const comment = await this.commentService.find(result?.uuid ?? '')
        const likes = await this.likeService.find(result?.uuid ?? '')
        const stringLikes = []
        for (let i = 0; i < likes.data.length; i++) {
            stringLikes.push(likes.data[i].user_uuid)
        }
        // let isLikes = false
        // const searchUuid = await this.likeService.findByUserLogin(user.uuid)
        // if(searchUuid){
        //     isLikes = true
        // }
        return {
            data: result,
            comment: comment.data,
            like: stringLikes,
        }
    }

    async findPostByUuid(uuid: string, user: IUser): Promise<PostEntity | null> {
        const post = await this.postRepository.findPostByUuid(uuid, user)

        return post ? new PostEntity(post) : null
    }

    async chainUpdateFromProfile(data: ProfileEntity): Promise<{ success: true }> {
        const post = await this.postRepository.chainUpdateFromProfile(data)
        return { success: true }
    }

    async update(uuid: string, data: UpdatePostRequest, user: IUser): Promise<{ success: true }> {
        console.log(data, 'ini image')
        const searchPost = await this.postRepository.findPostByUuid(uuid, user)
        console.log(searchPost)
        if (!searchPost) throw new ErrorNotFound('Data not found', '@Service update post')
        let slugi = searchPost.title
        const category = await this.categoryService.findOne(data.category)
        if (searchPost.title !== data.title) {
            slugi = slugify(data.title ?? '') + uuidv4()
        }
        if (searchPost.cloudinary_id !== data.cloudinary_id) {
            console.log('masuk')
            await cloud.uploader.destroy('posts/' + searchPost.cloudinary_id)
        }
        const postEntity = new PostEntity({
            uuid: searchPost.uuid,
            category: {
                uuid: category?.uuid ?? '',
                name: category?.name ?? ''
            },
            cloudinary_id: data.cloudinary_id ?? 'roxlkp46kp0sk9oqb3jg',
            content: data.content,
            created_at: searchPost.created_at,
            created_by: searchPost.created_by,
            deleted_at: null,
            image: data.image ?? 'https://res.cloudinary.com/dcyohew0h/image/upload/v1626325005/posts/roxlkp46kp0sk9oqb3jg.png',
            slug: slugi,
            title: data.title,
            updated_at: new Date
        })

        await this.postRepository.update(postEntity)
        return { success: true }
    }

    async delete(uuid: string, user: IUser): Promise<{ success: true }> {
        console.log(uuid, user, 'masuk')
        const searchPost = await this.postRepository.delete(uuid, user)
        if (!searchPost) throw new ErrorNotFound('Data not found', '@Delete Service Post')

        return { success: true }
    }

    async findPostWithAuth(user: IUser): Promise<{ data: PostEntity[] }> {
        return await this.postRepository.findPostWithAuth(user)
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
