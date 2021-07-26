import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { v4 as uuidv4 } from 'uuid'
import { events } from "../events/events";
import { EventDispatcher } from "event-dispatch";
import { IProfileService } from "./interfaces/profile";
import ProfileEntity from "../entities/profile";
import { IProfileRepository } from "../repositories/interfaces/profile";
import GetProfileRequest from "../request/profile/getProfileRequest";
import GetProfileSpecification from "../repositories/specifications/profileSpecification"
import slugify from "slugify";
import { IUser } from "../models/interfaces/user";
import UpdateProfileRequest from "../request/profile/updateProfileRequest";
import { ErrorNotFound } from "../helpers/errors";
import { cloud } from "../helpers/cloudinary";
import { IRemasLikeService } from "./interfaces/remasLike";
import { IPostRepository } from "../repositories/interfaces/post";
import { ICommentRemasService } from "./interfaces/commentRemas";
import { ICommentService } from "./interfaces/comment";
import CommentRemasEntity from "../entities/commentRemas";
import { IUserService } from "./interfaces/user";
import { IUserRepository } from "../repositories/interfaces/user";
import { IRequestRemasService } from "./interfaces/requestRemas";
import { IRegistrationMemberRemasService } from "./interfaces/registrationMemberRemas";
import { IRegistrationMemberRemasRepository } from "../repositories/interfaces/registrationMemberRemas";

@injectable()
class ProfileService implements IProfileService {

    constructor(

        @inject(TYPES.ProfileRepository) private profileReopsitory: IProfileRepository,
        @inject(TYPES.PostRepository) private postService: IPostRepository,
        @inject(TYPES.RemasLikeService) private remasService: IRemasLikeService,
        @inject(TYPES.CommentRemasService) private commentRemasService: ICommentRemasService,
        @inject(TYPES.RegistrationMemberRemasRepository) private registerMemberRemas: IRegistrationMemberRemasRepository,
        @inject(TYPES.CommentService) private commentService: ICommentService,
        @inject(TYPES.UserRepository) private userService: IUserRepository,
        @inject(TYPES.RequestRemasService) private requestRemasService: IRequestRemasService,
        @inject(TYPES.ProducerDispatcher) private dispatcher: EventDispatcher
    ) { }

    async create(data: ProfileEntity): Promise<{ success: true }> {
        const searchData = await this.profileReopsitory.findOne(data.uuid ?? '')

        const profileEntity = new ProfileEntity({
            main_information: data.main_information,
            ramadhan: data.ramadhan ?? null,
            idul_adha: data.idul_adha ?? null,
            roles: data.roles,
            is_active: data.is_active,
            user_uuid: data.user_uuid ?? '',
            uuid: data.uuid ?? '',
            slug: slugify(data.slug) + uuidv4(),
            deleted_at: null
        })
        await this.profileReopsitory.create(profileEntity)
        return { success: true }
    }

    async findOne(uuid: string): Promise<ProfileEntity | null> {
        const result = await this.profileReopsitory.findOne(uuid)

        return result
    }

    async update(data: UpdateProfileRequest, user: IUser): Promise<{ success: true }> {
        const searchProfile = await this.profileReopsitory.findOne(user.uuid)
        const postService = await this.postService.findPostWithAuth(user)
        const commentRemas = await this.commentRemasService.findOne(user.uuid)
        const commentService = await this.commentService.findOne(user.uuid)
        const userService = await this.userService.findOneByUuid(user.uuid)
        const findrequestRemas = await this.requestRemasService.findWithUserUuid(user)
        const findRegistrationMember = await this.registerMemberRemas.findOneUserUuid(user.uuid)

        if (!searchProfile) throw new ErrorNotFound('Data not found', '@Service Update profile')
        let slugi = ''
        if (searchProfile.main_information?.nickname !== data.nickname) {
            slugi = slugify(data.nickname ?? '')
        } else {
            slugi = searchProfile.slug
        }

        if (searchProfile.main_information?.cloudinary_id !== data.cloudinary_id) {
            await cloud.uploader.destroy('profile/' + searchProfile.main_information?.cloudinary_id)
        }
        const profileEntity = new ProfileEntity({
            idul_adha: data.idul_adha ?? null,
            main_information: {
                nickname: data.nickname ?? '',
                full_name: data.full_name ?? '',
                address: data.address ?? '',
                birthday: data.birthday ?? '',
                cloudinary_id: data.cloudinary_id ?? '',
                description: data.description ?? '',
                image: data.image ?? '',
                member: '',
                misi: data.misi ?? '',
                visi: data.visi ?? '',
            },
            ramadhan: data.ramadhan ?? null,
            slug: slugi,
            user_uuid: user.uuid,
            uuid: searchProfile.uuid ?? '',
            deleted_at: null
        })
        if (postService.data.length > 0) {
            if (postService.data[0].created_by.name !== data.nickname || postService.data[0].created_by.image !== data.image) {
                await this.postService.chainUpdateFromProfile(profileEntity)
            }

        }
        if (commentRemas) {
            if (commentRemas?.created_by.name !== data.nickname || commentRemas.created_by.image !== data.image) {
                await this.commentRemasService.chainUpdateFromProfile(profileEntity)
            }

        }
        if (commentService) {
            if (commentService.created_by.name !== data.nickname || commentService.created_by.image !== data.image) {
                await this.commentService.chainUpdateFromProfile(profileEntity)
            }
        }

        if (userService) {

            if (userService.name !== data.nickname) {
                await this.userService.chainUpdateFromProfile(data.nickname ?? '', user.uuid)
            }
        }

        if (findrequestRemas) {
            if (findrequestRemas.created_by.name !== data.nickname || findrequestRemas.created_by.image !== data.image) {
                await this.requestRemasService.chainUpdateFromProfile(profileEntity)
            }
        }

        if (findRegistrationMember) {
            if (findRegistrationMember.created_by?.name !== data.nickname || findRegistrationMember.created_by.image !== data.image) {
                await this.registerMemberRemas.chainUpdateFromProfile(profileEntity)
            }
        }


        await this.profileReopsitory.update(profileEntity)

        return { success: true }
    }

    async findOneBySlug(slug: string): Promise<{ data: ProfileEntity | null, comment: CommentRemasEntity[], likes: string[] }> {
        const result = await this.profileReopsitory.findOneBySlug(slug)
        const likes = await this.remasService.find(result?.user_uuid ?? '')
        const commentEntity = await this.commentRemasService.find(result?.user_uuid ?? '')
        const stringLikes = []
        for (let i = 0; i < likes.data.length; i++) {
            stringLikes.push(likes.data[i].user_uuid)
        }
        return {
            data: result,
            likes: stringLikes,
            comment: commentEntity.data,
        }
    }

    async index(
        data: GetProfileRequest
    ): Promise<{
        total: number;
        data: ProfileEntity[];
    }> {
        return await this.profileReopsitory.index(
            new GetProfileSpecification(data)
        );
    }

    async updateIsActiveTrue(user_uuid: string, is_active: boolean): Promise<{ success: true }> {
        await this.profileReopsitory.updateIsActiveTrue(user_uuid, is_active)
        return { success: true }
    }

}

export default ProfileService
