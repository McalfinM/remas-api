import ProfileEntity from "../../entities/profile";
import RegistrationMemberRemasEntity from "../../entities/registrationMemberRemas";
import UserEntity from "../../entities/user";
import { IUser } from "../../models/interfaces/user";
import specificationInterface from "../specifications/specificationInterface";


export interface IRegistrationMemberRemasRepository {
    create(data: RegistrationMemberRemasEntity): Promise<RegistrationMemberRemasEntity>
    update(data: RegistrationMemberRemasEntity): Promise<RegistrationMemberRemasEntity>
    findOne(uuid: string): Promise<RegistrationMemberRemasEntity | null>
    update(data: RegistrationMemberRemasEntity): Promise<RegistrationMemberRemasEntity>
    index(user_uuid: string): Promise<{ data: RegistrationMemberRemasEntity[] }>
    delete(uuid: string): Promise<{ success: true }>
}
