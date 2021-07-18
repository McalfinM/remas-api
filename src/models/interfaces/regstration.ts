import { Document } from "mongoose";
import { IEmbed } from "../../entities/interfaces/post";

export interface IRegsitration extends Document {
    uuid: string
    full_name: string
    email: string
    birthday: string
    address: string
    handphone: string
    created_by?: IEmbed | null
    user_uuid: string
    image: string | null
    description: string | null
    ipaddr: string | null
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
}