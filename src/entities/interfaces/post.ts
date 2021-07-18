export interface IPost {
    uuid: string | null
    title: string | null
    content: string | null
    category: IEmbed
    created_by: IEmbed
    event?: IEvent | null
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

export interface IEvent {
    date_event: Date | null
    place: string
    hour: string
}

