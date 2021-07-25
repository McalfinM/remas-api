import TokenEntity from "../../entities/token";
import { IUser } from "../../models/interfaces/user";


export interface ITokenService {
    create(data: any): Promise<TokenEntity>
    update(token: string): Promise<TokenEntity>
    findOne(uuid: string): Promise<TokenEntity | null>
    findOneWithToken(token: string): Promise<TokenEntity | null>
    findWithEmail(email: string): Promise<TokenEntity | null>
    chainUpdateFromProfile(name: string, uuid: string): Promise<{ success: true }>
}
