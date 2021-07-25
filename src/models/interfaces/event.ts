import { Document } from 'mongoose'
import { IEmbed } from '../../entities/interfaces/post';

export interface IEvent extends Document {
    uuid: string
    title: string | null
    content: string | null
    category: IEmbed
    created_by: IEmbed
    time: string | null
    place: string | null
    schedule: string | null
    image: string | null
    slug: string | null
    cloudinary_id: string
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
}
