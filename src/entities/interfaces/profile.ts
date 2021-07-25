
export interface IMainInformation {
    nickname?: string
    image?: string
    cloudinary_id?: string
    full_name?: string
    address?: string
    visi?: string
    misi?: string
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

export interface IProfile {
    uuid: string
    user_uuid: string
    slug: string
    main_information: IMainInformation | null
    ramadhan: IZakat | null
    is_active?: boolean
    idul_adha: IIdulAdha | null
    roles?: string[]
    deleted_at: Date | null
}