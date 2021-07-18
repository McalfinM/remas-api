import { IEmbed } from "./post";

export interface IComment {
    uuid: string
    created_by: IEmbed
    comment: string
    post_uuid?: string
    ip_address?: string
    created_at: Date | null
    updated_at: Date | null
    deleted_at?: Date | null
}