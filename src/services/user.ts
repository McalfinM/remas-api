import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { v4 as uuidv4 } from 'uuid'
import { events } from "../events/events";
import { EventDispatcher } from "event-dispatch";
import { ErrorNotFound } from "../helpers/errors";
import { IUserService } from "./interfaces/user";
import CreateUserRequest from "../request/user/createUserRequest";
import UserEntity from "../entities/user";
import bcrypt from 'bcrypt'
import { IUserRepository } from "../repositories/interfaces/user";
import ProfileEntity from "../entities/profile";
import slugify from 'slugify'
import { UserRole } from "../entities/enums/userRoleEnum";

@injectable()
class UserService implements IUserService {

    constructor(
        @inject(TYPES.UserRepository) private userRepository: IUserRepository,
        @inject(TYPES.ProfileService) private profileService: IUserRepository,
        @inject(TYPES.ProducerDispatcher) private dispatcher: EventDispatcher,
    ) { }

    async create(data: CreateUserRequest): Promise<{ success: true }> {
        const salt = await bcrypt.genSalt(12)
        const hash = bcrypt.hashSync(data.password, salt)
        const userEntity = new UserEntity({
            name: data.name,
            email: data.email,
            uuid: uuidv4(),
            password: hash,
            roles: [UserRole.MEMBER],
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null
        });
        const profile = new ProfileEntity({
            uuid: uuidv4(),
            user_uuid: userEntity.uuid ?? '',
            slug: slugify(userEntity.name ?? '') + uuidv4(),
            roles: userEntity.roles,
            main_information: {
                nickname: userEntity.name ?? '',
                image: 'https://res.cloudinary.com/werich1/image/upload/v1624073825/waugxiymo5l9u3jcesq4.png',
            },
            idul_adha: null,
            ramadhan: null,
            deleted_at: null
        })
        await this.userRepository.create(userEntity)
        await this.profileService.create(profile)
        return { success: true }
    }

    async findOne(uuid: string): Promise<UserEntity | null> {
        const result = await this.userRepository.findOne(uuid)

        return result
    }

    async update(data: CreateUserRequest): Promise<{ success: true }> {

        return { success: true }
    }

}

export default UserService
