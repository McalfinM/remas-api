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
import CreateUserRequest from "../request/user/createUserRequest";
import UpdateProfileRequest from "../request/profile/updateProfileRequest";
import { ErrorNotFound } from "../helpers/errors";
import { cloud } from "../helpers/cloudinary";
import CraeteRegistrationMemberRemas from "../request/registrationMemberRemas/createRegistrationMember";
import { IRegistrationMemberRemasService } from "./interfaces/registrationMemberRemas";
import RegistrationMemberRemasEntity from "../entities/registrationMemberRemas";
import { IRegistrationMemberRemasRepository } from "../repositories/interfaces/registrationMemberRemas";

@injectable()
class RegistrationMemberRemasService implements IRegistrationMemberRemasService {

    constructor(
        @inject(TYPES.ProfileService) private profileService: IProfileService,
        @inject(TYPES.RegistrationMemberRemasRepository) private RegistrationRemasMemberRepository: IRegistrationMemberRemasRepository,

        @inject(TYPES.ProducerDispatcher) private dispatcher: EventDispatcher
    ) { }

    async create(data: CraeteRegistrationMemberRemas, user: IUser): Promise<{ success: true }> {
        const searchData = await this.profileService.findOne(data.user_uuid)
        if (!searchData) throw new ErrorNotFound('Data not found', '@Service Create Member Remas Registration')
        const profileEntity = new RegistrationMemberRemasEntity({
            uuid: uuidv4(),
            full_name: data.full_name ?? '',
            address: data.address,
            birthday: data.birthday,
            email: data.email,
            handphone: data.handphone,
            user_uuid: data.user_uuid,
            created_by: user ? {
                name: user.name ?? '',
                uuid: user.uuid ?? '',
            } : null,
            description: data.description,
            ipaddr: data.ipaddr,
            image: data.image ?? 'https://res.cloudinary.com/dcyohew0h/image/upload/v1626325005/posts/roxlkp46kp0sk9oqb3jg.png',
            created_at: new Date,
            deleted_at: null,
            updated_at: new Date,
        })
        await this.RegistrationRemasMemberRepository.create(profileEntity)
        return { success: true }
    }

    async findOne(uuid: string): Promise<RegistrationMemberRemasEntity | null> {
        const result = await this.RegistrationRemasMemberRepository.findOne(uuid)

        return result
    }

    async delete(uuid: string): Promise<{ success: true }> {
        return await this.RegistrationRemasMemberRepository.delete(uuid)
    }

    async index(user: IUser): Promise<{ data: RegistrationMemberRemasEntity[] }> {
        return await this.RegistrationRemasMemberRepository.index(user.uuid)
    }

}

export default RegistrationMemberRemasService
