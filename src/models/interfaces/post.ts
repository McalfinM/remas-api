import { Document } from 'mongoose'

export interface IPost extends Document {
    uuid: string
    title: string | null
    content: string | null
    category: IEmbed
    created_by: IEmbed
    image: string | null
    slug: string | null
    cloudinary_id: string
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
}

export interface IEmbed {
    uuid?: string
    name?: string
    slug?: string
    image?: string
}
