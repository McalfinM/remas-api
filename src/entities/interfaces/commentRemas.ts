import { IEmbed } from "./post";

export interface ICommentRemas {
    uuid: string
    created_by: IEmbed
    comment: string
    remas_uuid: string
    ip_address: string | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
}