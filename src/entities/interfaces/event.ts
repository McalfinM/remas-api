import { IEmbed } from "./post";

export interface IEvent {
    uuid: string | null
    title: string | null
    content: string | null
    category: IEmbed
    created_by: IEmbed
    time: string | null
    place: string | null
    image: string | null
    slug: string | null
    schedule: string | null
    cloudinary_id: string
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
}


