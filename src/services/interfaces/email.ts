import TokenEntity from "../../entities/token";
import { IUser } from "../../models/interfaces/user";


export interface IEmailService {
    sendEmailVerificationAccout(token: string, email: string): Promise<{ success: true }>
}
