import { IEmbed } from "./post";

export interface IRegistrationMemberRemas {
    uuid: string
    full_name: string
    email: string
    birthday: string
    address: string
    handphone: string
    created_by?: IEmbed | null
    user_uuid: string
    ipaddr: string | null
    description: string | null
    created_at: Date
    image: string | null
    updated_at: Date
    deleted_at: Date | null
}