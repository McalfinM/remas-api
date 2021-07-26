
import { inject, injectable } from "inversify";
import { IUser } from "../models/interfaces/user";
import { ITokenService } from "./interfaces/token";
import TokenEntity from "../entities/token";
import TokenModel from "../models/token";
import { TYPES } from "../types";
import { ITokenRepository } from "../repositories/interfaces/token";
import { EventDispatcher } from "event-dispatch";
import crypto from 'crypto'
import { v4 as uuid } from 'uuid'
import { IUserService } from "./interfaces/user";
import { ErrorNotFound } from "../helpers/errors";
import { IUserRepository } from "../repositories/interfaces/user";
import { IProfileService } from "./interfaces/profile";

@injectable()
class TokenService implements ITokenService {
    constructor(
        @inject(TYPES.TokenRepository) private tokenRepository: ITokenRepository,
        @inject(TYPES.UserRepository) private userService: IUserRepository,
        @inject(TYPES.ProfileService) private profileService: IProfileService,
        @inject(TYPES.ProducerDispatcher) private dispatcher: EventDispatcher,
    ) { }
    async create(data: TokenEntity): Promise<TokenEntity> {
        var id = crypto.randomBytes(100).toString('hex');
        const entity = new TokenEntity({
            uuid: uuid(),
            user_uuid: data.user_uuid,
            activity: data.activity,
            email: data.email,
            revoked: false,
            token: id,
            created_at: new Date,
            updated_at: new Date,
        })
        return await this.tokenRepository.create(entity)
    }

    async findOne(uuid: string): Promise<TokenEntity | null> {

        const result = await this.tokenRepository.findOne(uuid)

        return result ? new TokenEntity(result) : null
    }

    async findWithEmail(email: string): Promise<TokenEntity | null> {
        const result = await this.tokenRepository.findWithEmail(email)
        return result ? new TokenEntity(result) : null

    }
    async update(token: string): Promise<TokenEntity> {
        const findToken = await this.findOneWithToken(token)
        if (!findToken) throw new ErrorNotFound('Data not found', '@Token service update')
        const user = await this.userService.checkEmail(findToken.email)
        if (!user) throw new ErrorNotFound('User not found', '@service token update service')
        const tokenEntity = new TokenEntity({
            uuid: findToken.uuid,
            email: findToken.email,
            revoked: true,
            token: findToken.token,
            user_uuid: findToken.user_uuid,
            activity: findToken.activity,
            created_at: findToken.created_at,
            updated_at: new Date
        })
        const result = await this.tokenRepository.update(tokenEntity, user.uuid ?? '')
        await this.userService.updateIsActiveTrue(findToken.user_uuid, true)
        await this.profileService.updateIsActiveTrue(findToken.user_uuid, true)
        return result
    }
    async findOneWithToken(token: string): Promise<TokenEntity | null> {
        const result = await this.tokenRepository.findOneWithToken(token)

        return result ? new TokenEntity(result) : null
    }
    async chainUpdateFromProfile(name: string, uuid: string): Promise<{ success: true }> {
        const response = await this.tokenRepository.chainUpdateFromProfile(name, uuid)
        return { success: true }
    }



}

export default TokenService
