import { Document } from 'mongoose'

export interface IPost extends Document {
    uuid: string
    title: string | null
    content: string | null
    category: string
    created_by: IEmbed | null
    image: string | null
    slug: string | null
    cloudinary_id: string | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
}

export interface IEmbed {
    uuid: string
    name: string
}
