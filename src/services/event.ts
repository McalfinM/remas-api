import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { v4 as uuidv4 } from 'uuid'
import { events } from "../events/events";
import { EventDispatcher } from "event-dispatch";
import { ErrorNotFound } from "../helpers/errors";
import slugify from 'slugify'
import { IUser } from "../models/interfaces/user";
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
import { IEventService } from "./interfaces/event";
import CreateEventRequest from "../request/event/createEvent";
import EventEntity from "../entities/event";
import { IEventRepository } from "../repositories/interfaces/event";
import moment from 'moment'
@injectable()
class EventService implements IEventService {

    constructor(
        @inject(TYPES.EventRepository) private eventRepository: IEventRepository,
        @inject(TYPES.CommentService) private commentService: ICommentService,
        @inject(TYPES.LikeService) private likeService: ILikeService,
        @inject(TYPES.ProfileService) private profileService: IProfileService,
        @inject(TYPES.CategoryService) private categoryService: ICategoryService,
        @inject(TYPES.ProducerDispatcher) private dispatcher: EventDispatcher,
    ) { }

    async create(data: CreateEventRequest, user: IUser): Promise<{ success: true }> {
        console.log(data)
        const profile = await this.profileService.findOne(user.uuid)
        const category = await this.categoryService.findOne(data.category)
        const eventEntity = new EventEntity({
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
            time: moment(data.time).format('H:mm'),
            schedule: moment(data.date).format('DD-MM-YYYY'),
            place: data.place,
            created_at: new Date,
            deleted_at: null,
            image: data.image ?? 'https://res.cloudinary.com/werich1/image/upload/v1624073825/waugxiymo5l9u3jcesq4.png',
            slug: slugify(data.title ?? '') + uuidv4(),
            title: data.title,
            updated_at: new Date

        })

        await this.eventRepository.create(eventEntity)
        return { success: true }
    }

    async findOne(uuid: string): Promise<{ data: EventEntity | null, comment: CommentEntity[], like: string[] }> {
        const result = await this.eventRepository.findOne(uuid)
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

    async findPostByUuid(uuid: string, user: IUser): Promise<EventEntity | null> {
        const post = await this.eventRepository.findPostByUuid(uuid, user)

        return post ? new EventEntity(post) : null
    }

    async chainUpdateFromProfile(data: ProfileEntity): Promise<{ success: true }> {
        const post = await this.eventRepository.chainUpdateFromProfile(data)
        return { success: true }
    }

    async update(uuid: string, data: CreateEventRequest, user: IUser): Promise<{ success: true }> {
        console.log(data, 'ini image')
        const searchPost = await this.eventRepository.findPostByUuid(uuid, user)
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
        const eventEntity = new EventEntity({
            uuid: searchPost.uuid,
            category: {
                uuid: category?.uuid ?? '',
                name: category?.name ?? ''
            },
            cloudinary_id: data.cloudinary_id,
            content: data.content,
            created_by: {
                uuid: user.uuid,
                name: user.name,
                image: data.image ?? 'https://res.cloudinary.com/werich1/image/upload/v1624073825/waugxiymo5l9u3jcesq4.png',
                slug: data.slug ?? ''
            },
            time: moment(data.time).format('H:mm'),
            schedule: moment(data.date).format('DD-MM-YYYY'),
            place: data.place,
            created_at: new Date,
            deleted_at: null,
            image: data.image ?? 'https://res.cloudinary.com/werich1/image/upload/v1624073825/waugxiymo5l9u3jcesq4.png',
            slug: slugify(data.title ?? '') + uuidv4(),
            title: data.title,
            updated_at: new Date

        })

        await this.eventRepository.update(eventEntity)
        return { success: true }
    }

    async delete(uuid: string, user: IUser): Promise<{ success: true }> {
        console.log(uuid, user, 'masuk')
        const searchPost = await this.eventRepository.delete(uuid, user)
        if (!searchPost) throw new ErrorNotFound('Data not found', '@Delete Service Post')

        return { success: true }
    }

    async findPostWithAuth(user: IUser): Promise<{ data: EventEntity[] }> {
        return await this.eventRepository.findPostWithAuth(user)
    }

    async index(
        data: GetPostRequest
    ): Promise<{
        total: number;
        data: EventEntity[];
    }> {
        return await this.eventRepository.index(
            new GetPostSpecification(data)
        );
    }


}

export default EventService
