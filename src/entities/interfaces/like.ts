export interface ILike {
    uuid: string
    user_uuid: string
    ip_address: string
    post_uuid: string
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
}