import { Document } from "mongoose";
import { IEmbed } from "../../entities/interfaces/post";

export interface ICommentRemas extends Document {
    uuid: string
    created_by: IEmbed
    comment: string
    remas_uuid: string
    ip_address: string
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
}