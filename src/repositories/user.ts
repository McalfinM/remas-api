
import { IUserRepository } from "./interfaces/user";
import { injectable } from "inversify";
import specificationInterface from "./specifications/specificationInterface";
import { IUser } from "../models/interfaces/user";
import UserEntity from '../entities/user';
import UserModel from '../models/user';

@injectable()
class UserRepository implements IUserRepository {
    async create(data: UserEntity): Promise<UserEntity> {
        console.log(data, 'ini data')
        const result = await UserModel.create({
            uuid: data.uuid,
            name: data.name,
            email: data.email,
            password: data.password,
            roles: data.roles,
            is_active: data.is_active,
            created_at: data.created_at,
            deleted_at: data.deleted_at,
            updated_at: data.updated_at
        })

        return data
    }

    async findOne(uuid: string): Promise<UserEntity | null> {

        const result = await UserModel.findOne({
            uuid: uuid,
            is_active: true,
            $or: [{ deleted_at: undefined }]
        })

        return result ? new UserEntity(result) : null
    }

    async checkEmail(email: string): Promise<UserEntity | null> {

        const result = await UserModel.findOne({
            email: email,
            $or: [{ deleted_at: undefined }]
        })

        return result ? new UserEntity(result) : null
    }

    async findOneByUuid(uuid: string): Promise<UserEntity | null> {

        const result = await UserModel.findOne({
            uuid: uuid,
            $or: [{ deleted_at: undefined }]
        })

        return result ? new UserEntity(result) : null
    }

    async update(data: UserEntity, user: IUser): Promise<UserEntity> {

        const result = await UserModel.updateOne({ uuid: user.uuid ?? '' }, {
            data
        })
        return data
    }

    async chainUpdateFromProfile(name: string, uuid: string): Promise<{ success: true }> {
        console.log(name, uuid)
        const response = await UserModel.updateOne({ uuid: uuid }, {
            name: name
        })

        return { success: true }
    }



}

export default UserRepository
