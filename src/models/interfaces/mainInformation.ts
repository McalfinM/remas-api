import { Document } from "mongoose";

export interface IMainInformation {
    nickname?: string
    full_name?: string
    address?: string
    visi?: string
    misi?: string
    image?: string
    cloudinary_id?: string
    birthday?: string
    member?: string
    description?: string
}

export interface IZakat {
    year: string | null
    value: string | null
}

export interface IIdulAdha {
    year: string | null
    value: string | null
}

export interface IProfile extends Document {
    uuid: string
    user_uuid: string
    slug: string
    main_information: IMainInformation
    ramadhan: IZakat | null
    idul_adha: IIdulAdha | null
    is_active?: boolean
    roles: string[]
    deleted_at: Date | null
}