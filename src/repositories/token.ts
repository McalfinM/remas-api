
import { injectable } from "inversify";
import specificationInterface from "./specifications/specificationInterface";
import { IUser } from "../models/interfaces/user";
import { ITokenRepository } from "./interfaces/token";
import TokenEntity from "../entities/token";
import TokenModel from "../models/token";

@injectable()
class TokenRepository implements ITokenRepository {
    async create(data: TokenEntity): Promise<TokenEntity> {
        console.log(data, 'ini data')
        const result = await TokenModel.create({
            uuid: data.uuid,
            token: data.token,
            email: data.email,
            activity: data.activity,
            revoked: data.revoked,
            user_uuid: data.user_uuid,
            created_at: data.created_at,
            updated_at: data.updated_at,

        })

        return data
    }

    async findOne(uuid: string): Promise<TokenEntity | null> {

        const result = await TokenModel.findOne({
            uuid: uuid,
            revoked: false,
        })

        return result ? new TokenEntity(result) : null
    }

    async checkEmail(email: string): Promise<TokenEntity | null> {

        const result = await TokenModel.findOne({
            email: email,
            revoked: false
        })

        return result ? new TokenEntity(result) : null
    }

    async findWithEmail(email: string): Promise<TokenEntity | null> {
        const result = await TokenModel.findOne({
            email: email,
            revoked: false,
        })
        return result ? new TokenEntity(result) : null

    }
    async update(data: TokenEntity, user_uuid: string): Promise<TokenEntity> {

        const result = await TokenModel.updateOne({ user_uuid: user_uuid }, {
            data
        })
        return data
    }
    async findOneWithToken(token: string): Promise<TokenEntity | null> {
        const result = await TokenModel.findOne({
            token: token,
            revoked: false,
        })

        return result ? new TokenEntity(result) : null
    }
    async chainUpdateFromProfile(name: string, uuid: string): Promise<{ success: true }> {
        console.log(name, uuid)
        const response = await TokenModel.updateOne({ uuid: uuid }, {
            name: name
        })

        return { success: true }
    }



}

export default TokenRepository
