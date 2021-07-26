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
import { IUserRepository } from "../repositories/interfaces/user";
import { IProfileService } from "./interfaces/profile";
import UpdateProfileRequest from "../request/profile/updateProfileRequest";
import { IProfileRepository } from "../repositories/interfaces/profile";
import slugify from 'slugify'
import { UserRole } from "../entities/enums/userRoleEnum";

@injectable()
class RequestRemasService implements IRequestRemasService {

    constructor(
        @inject(TYPES.RequestRemasRepository) private requestRemasRepository: IRequestRemasRepository,
        @inject(TYPES.UserRepository) private userRepository: IUserRepository,
        @inject(TYPES.ProfileRepository) private profileService: IProfileRepository,
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
        if (result) {

        }
        return result
    }


    async find(user: IUser): Promise<{ data: RequestRemasEntity[] }> {
        const findUser = await this.userRepository.findOneByUuid(user.uuid)
        if (!findUser) throw new ErrorNotFound('User not found', '@Find Reqquest Remas Service')
        let roles = JSON.stringify(findUser.roles)
        if (roles.includes('admin')) {
            return await this.requestRemasRepository.find()
        } else {
            throw new ErrorNotFound('not have access', '@find service request remas')
        }

    }

    async findWithUserUuid(user: IUser): Promise<RequestRemasEntity | null> {
        const response = await this.requestRemasRepository.findWithUserUuid(user.uuid)
        return response
    }

    async delete(requestUuid: string, user: IUser): Promise<{ success: true }> {
        const searchRequest = await this.requestRemasRepository.findOne(requestUuid)
        if (!searchRequest) throw new ErrorNotFound('Request not found', '@Service request remas')
        await this.requestRemasRepository.delete(searchRequest.uuid, user)

        return { success: true }
    }

    async chainUpdateFromProfile(user: ProfileEntity): Promise<{ success: true }> {

        await this.requestRemasRepository.chainUpdateFromProfile(user)

        return { success: true }
    }

    async update(data: CreateRequestRemas, user_uuid: string): Promise<{ success: true }> {
        const findUser = await this.userRepository.findOneByUuid(user_uuid)
        const likeEntity = new RequestRemasEntity({
            uuid: uuidv4(),
            full_name: data.full_name,
            address: data.address,
            created_by: {
                uuid: findUser?.uuid ?? '',
                name: findUser?.name ?? '',
            },
            status: 'Completed',
            description: data.description,
            handphone: data.handphone,
            image: data.image,
            created_at: new Date,
            deleted_at: null,
            updated_at: new Date
        })
        const likes = await this.requestRemasRepository.update(likeEntity)

        return { success: true }
    }
    async updateToProfile(uuid: string): Promise<{ success: true }> {

        const findUser = await this.findOne(uuid)
        const findUserRequest = await this.profileService.findOne(findUser?.created_by.uuid ?? '')
        if (!findUserRequest) throw new ErrorNotFound('Data not found', '@Service update to profile request remas')
        if (findUser) {
            const profile = new ProfileEntity({
                idul_adha: null,
                main_information: {
                    address: findUser.address,
                    birthday: '',
                    cloudinary_id: '',
                    description: findUser.description,
                    full_name: findUser.full_name,
                    image: findUserRequest.main_information?.image,
                    misi: '',
                    nickname: findUserRequest.main_information?.nickname,
                    visi: ''
                },
                deleted_at: null,
                ramadhan: null,
                slug: slugify(findUserRequest.main_information?.nickname ?? '') + uuidv4(),
                user_uuid: findUserRequest.user_uuid ?? '',
                uuid: findUserRequest.uuid ?? '',
                is_active: true,
                roles: [UserRole.MEMBER, UserRole.REMAJA_MASJID]
            })
            const updateEntity = new CreateRequestRemas({
                address: findUser.address,
                description: findUser.description,
                full_name: findUser.full_name,
                handphone: findUser.handphone,
                image: findUser.image,

            })
            await this.profileService.update(profile)
            await this.update(updateEntity, findUser.created_by.uuid ?? '')
        }
        return { success: true }
    }

}

export default RequestRemasService
