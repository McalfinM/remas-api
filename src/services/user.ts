import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { v4 as uuidv4 } from 'uuid'
import { events } from "../events/events";
import { EventDispatcher } from "event-dispatch";
import { ErrorBadRequest, ErrorNotFound } from "../helpers/errors";
import { IUserService } from "./interfaces/user";
import CreateUserRequest from "../request/user/createUserRequest";
import UserEntity from "../entities/user";
import bcrypt from 'bcrypt'
import { IUserRepository } from "../repositories/interfaces/user";
import ProfileEntity from "../entities/profile";
import slugify from 'slugify'
import { UserRole } from "../entities/enums/userRoleEnum";
import { IProfileService } from "./interfaces/profile";
import { ITokenService } from "./interfaces/token";
import TokenEntity from "../entities/token";
import { IEmailService } from "./interfaces/email";

@injectable()
class UserService implements IUserService {

    constructor(
        @inject(TYPES.UserRepository) private userRepository: IUserRepository,
        @inject(TYPES.ProfileService) private profileService: IProfileService,
        @inject(TYPES.TokenService) private tokenService: ITokenService,
        @inject(TYPES.EmailService) private emailService: IEmailService,
        @inject(TYPES.ProducerDispatcher) private dispatcher: EventDispatcher,
    ) { }

    async create(data: CreateUserRequest): Promise<{ success: true }> {
        data.email?.toLowerCase()
        const findUser = await this.userRepository.checkEmail(data.email ?? '')
        if (findUser) throw new ErrorBadRequest('Email already registered', '@Service User Create')
        const salt = await bcrypt.genSalt(12)
        const hash = bcrypt.hashSync(data.password, salt)
        const userEntity = new UserEntity({
            name: data.name,
            email: data.email,
            uuid: uuidv4(),
            password: hash,
            roles: [UserRole.MEMBER],
            is_active: false,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null
        });
        const profile = new ProfileEntity({
            uuid: uuidv4(),
            user_uuid: userEntity.uuid ?? '',
            slug: slugify(userEntity.name ?? '') + uuidv4(),
            roles: userEntity.roles,
            is_active: false,
            main_information: {
                nickname: userEntity.name ?? '',
                image: 'https://res.cloudinary.com/dcyohew0h/image/upload/v1626325005/posts/roxlkp46kp0sk9oqb3jg.png',
            },
            idul_adha: null,
            ramadhan: null,
            deleted_at: null
        })
        const tokenEntity = new TokenEntity({
            uuid: '',
            activity: 'CreateUser',
            email: data.email ?? '',
            revoked: false,
            token: '',
            user_uuid: userEntity.uuid ?? '',
            created_at: new Date,
            updated_at: new Date
        })
        const tokenService = await this.tokenService.create(tokenEntity)
        await this.emailService.sendEmailVerificationAccout(tokenService.token, data.email ?? '')
        await this.userRepository.create(userEntity)
        await this.profileService.create(profile)
        return { success: true }
    }

    async findOne(uuid: string): Promise<UserEntity | null> {
        const result = await this.userRepository.checkEmail(uuid)

        return result
    }

    async checkEmail(email: string): Promise<UserEntity | null> {
        const result = await this.userRepository.checkEmail(email)

        return result
    }
    async update(data: CreateUserRequest): Promise<{ success: true }> {

        return { success: true }
    }

    async chainUpdateFromProfile(name: string, uuid: string): Promise<{ success: true }> {
        const response = await this.userRepository.chainUpdateFromProfile(name, uuid)

        return { success: true }
    }

}

export default UserService
