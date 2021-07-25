import { IEmbed } from "./post";


export interface IRequestRemas {
    uuid: string
    created_by: IEmbed
    full_name: string
    address: string
    handphone: string
    description: string
    image: string
    status: string
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
}