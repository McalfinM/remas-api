
import { IUserRepository } from "./interfaces/user";
import { injectable } from "inversify";
import specificationInterface from "./specifications/specificationInterface";
import { IUser } from "../models/interfaces/user";
import { IProfileRepository } from "./interfaces/profile";
import ProfileEntity from "../entities/profile";
import ProfileModel from "../models/profile";

@injectable()
class ProfileRepository implements IProfileRepository {
    async create(data: ProfileEntity): Promise<ProfileEntity> {

        const result = await ProfileModel.create({
            uuid: data.uuid,
            user_uuid: data.user_uuid,
            main_information: data.main_information,
            is_active: data.is_active,
            ramadhan: data.ramadhan,
            roles: data.roles,
            idul_adha: data.idul_adha
        })

        return data
    }

    async findOne(uuid: string): Promise<ProfileEntity | null> {

        const result = await ProfileModel.findOne({
            user_uuid: uuid,
            is_active: true
        })

        return result ? new ProfileEntity(result) : null
    }

    async findOneBySlug(slug: string): Promise<ProfileEntity | null> {

        const result = await ProfileModel.findOne({
            slug: slug,
            is_active: true,
        })

        return result ? new ProfileEntity(result) : null
    }

    async update(data: ProfileEntity): Promise<ProfileEntity> {
        console.log(data, 'repo')
        const result = await ProfileModel.updateOne({
            uuid: data.uuid, user_uuid: data.user_uuid,
        }, {
            idul_adha: data.idul_adha ?? null,
            main_information: {
                nickname: data.main_information?.nickname,
                full_name: data.main_information?.full_name,
                visi: data.main_information?.visi,
                misi: data.main_information?.misi,
                image: data.main_information?.image,
                description: data.main_information?.description,
                cloudinary_id: data.main_information?.cloudinary_id
            },
            ramadhan: data.ramadhan ?? null,
            slug: data.slug,
            user_uuid: data.user_uuid,

        })
        return data
    }

    async index(
        specification: specificationInterface
    ): Promise<{
        total: number;
        data: ProfileEntity[];
    }> {
        const total_customer = await ProfileModel.find({
            ...specification.specifies(),
        }).countDocuments();
        return ProfileModel.find(
            {
                ...specification.specifies(),
            },
            {},
            {
                ...specification.paginate(),
                sort: specification.specSort(),
            }
        )
            .then((result) => {
                return {
                    total: total_customer,
                    data: result.map((data) => {
                        return new ProfileEntity({
                            idul_adha: null,
                            ramadhan: null,
                            user_uuid: '',
                            uuid: '',
                            slug: data.slug,
                            main_information: data.main_information,
                            deleted_at: null
                        });
                    }),
                };
            })
            .catch((err) => {
                return err;
            });
    }



}

export default ProfileRepository
