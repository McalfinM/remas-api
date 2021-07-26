
import ProfileEntity from "../../entities/profile";
import RequestRemasEntity from "../../entities/requestRemas";
import { IUser } from "../../models/interfaces/user";
import specificationInterface from "../specifications/specificationInterface";


export interface IRequestRemasRepository {
    create(data: RequestRemasEntity): Promise<{ success: true }>
    findOne(requestUuid: string): Promise<RequestRemasEntity | null>
    delete(uuid: string, user: IUser): Promise<{ success: true }>
    find(): Promise<{ data: RequestRemasEntity[] }>
    findWithUserUuid(user_uuid: string): Promise<RequestRemasEntity | null>
    chainUpdateFromProfile(user: ProfileEntity): Promise<{ success: true }>
    update(data: RequestRemasEntity): Promise<{ success: true }>
}
