import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { v4 as uuidv4 } from 'uuid'
import { events } from "../events/events";
import { EventDispatcher } from "event-dispatch";
import { ErrorNotFound } from "../helpers/errors";
import { IUserService } from "./interfaces/user";
import CreateUserRequest from "../request/user/createUserRequest";
import bcrypt from 'bcrypt'
import { IUserRepository } from "../repositories/interfaces/user";
import { IProfileService } from "./interfaces/profile";
import ProfileEntity from "../entities/profile";
import { IProfileRepository } from "../repositories/interfaces/profile";
import GetProfileRequest from "../request/profile/getProfileRequest";
import GetProfileSpecification from "../repositories/specifications/profileSpecification"

@injectable()
class ProfileService implements IProfileService {

    constructor(
        @inject(TYPES.ProfileRepository) private profileReopsitory: IProfileRepository,
        @inject(TYPES.ProducerDispatcher) private dispatcher: EventDispatcher,
    ) { }

    async create(data: ProfileEntity): Promise<{ success: true }> {
        const searchData = await this.profileReopsitory.findOne(data.uuid ?? '')

        const profileEntity = new ProfileEntity({
            main_information: data.main_information,
            ramadhan: data.ramadhan ?? null,
            idul_adha: data.idul_adha ?? null,
            roles: data.roles,
            user_uuid: data.user_uuid ?? '',
            uuid: data.uuid ?? '',
            slug: data.slug
        })
        await this.profileReopsitory.create(profileEntity)
        return { success: true }
    }

    async findOne(uuid: string): Promise<ProfileEntity | null> {
        const result = await this.profileReopsitory.findOne(uuid)

        return result
    }

    async update(uuid: string, data: ProfileEntity): Promise<{ success: true }> {

        return { success: true }
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

}

export default ProfileService
