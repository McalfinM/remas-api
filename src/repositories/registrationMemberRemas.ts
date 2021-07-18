
import { IUserRepository } from "./interfaces/user";
import { injectable } from "inversify";
import specificationInterface from "./specifications/specificationInterface";
import { IRegistrationMemberRemasRepository } from "./interfaces/registrationMemberRemas";
import RegistrationMemberRemasModel from '../models/registrationMemberRemas'
import RegistrationMemberRemasEntity from "../entities/registrationMemberRemas";

@injectable()
class RegistrationMemberRemasRepository implements IRegistrationMemberRemasRepository {
    async create(data: RegistrationMemberRemasEntity): Promise<RegistrationMemberRemasEntity> {
        console.log(data, 'ini repo')
        const result = await RegistrationMemberRemasModel.create({
            uuid: data.uuid,
            user_uuid: data.user_uuid,
            full_name: data.full_name,
            address: data.address,
            birthday: data.birthday,
            handphone: data.handphone,
            image: data.image,
            created_at: data.created_at,
            updated_at: data.updated_at,
            created_by: data.created_by ?? null,
            email: data.email
        })

        return data
    }

    async findOne(uuid: string): Promise<RegistrationMemberRemasEntity | null> {

        const result = await RegistrationMemberRemasModel.findOne({
            uuid: uuid,
            deleted_at: null
        })

        return result ? new RegistrationMemberRemasEntity(result) : null
    }

    async update(data: RegistrationMemberRemasEntity): Promise<RegistrationMemberRemasEntity> {
        const result = await RegistrationMemberRemasModel.updateOne({
            uuid: data.uuid, user_uuid: data.user_uuid,
        }, {
            user_uuid: data.user_uuid,
            full_name: data.full_name,
            address: data.address,
            birthday: data.birthday,
            handphone: data.handphone,
            created_at: data.created_at,
            updated_at: data.updated_at,
            image: data.image,
            created_by: data.created_by ? data.created_by : null,
            email: data.email

        })
        return data
    }

    async delete(uuid: string): Promise<{ success: true }> {
        const data = await RegistrationMemberRemasModel.updateOne({ uuid: uuid }, {
            deleted_at: new Date
        })

        return { success: true }
    }

    async index(user_uuid: string): Promise<{ data: RegistrationMemberRemasEntity[] }> {

        return await RegistrationMemberRemasModel.find({ user_uuid: user_uuid, deleted_at: null })
            .then(result => {
                return {
                    data: result.map(data => {
                        return new RegistrationMemberRemasEntity({
                            user_uuid: data.user_uuid,
                            full_name: data.full_name,
                            address: data.address,
                            birthday: data.birthday,
                            handphone: data.handphone,
                            created_at: data.created_at,
                            updated_at: data.updated_at,
                            image: data.image,
                            description: data.description,
                            ipaddr: data.ipaddr,
                            created_by: data.created_by,
                            email: data.email,
                            deleted_at: data.deleted_at,
                            uuid: data.uuid
                        })
                    })
                }
            })
    }

    // async index(
    //     specification: specificationInterface
    // ): Promise<{
    //     total: number;
    //     data: RegistrationMemberRemasEntity[];
    // }> {
    //     const total_customer = await RegistrationMemberRemasModel.find({
    //         ...specification.specifies(),
    //     }).countDocuments();
    //     return RegistrationMemberRemasModel.find(
    //         {
    //             ...specification.specifies(),
    //         },
    //         {},
    //         {
    //             ...specification.paginate(),
    //             sort: specification.specSort(),
    //         }
    //     )
    //         .then((result) => {
    //             return {
    //                 total: total_customer,
    //                 data: result.map((data) => {
    //                     return new RegistrationMemberRemasEntity({
    //                         user_uuid: data.user_uuid,
    //                         full_name: data.full_name,
    //                         address: data.address,
    //                         birthday: data.birthday,
    //                         handphone: data.handphone,
    //                         created_at: data.created_at,
    //                         updated_at: data.updated_at,
    //                         created_by: data.created_by,
    //                         email: data.email,
    //                         deleted_at: data.deleted_at,
    //                         uuid: data.uuid
    //                     });
    //                 }),
    //             };
    //         })
    //         .catch((err) => {
    //             return err;
    //         });
    // }



}

export default RegistrationMemberRemasRepository
