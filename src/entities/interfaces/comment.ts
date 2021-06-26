export interface IComment {
    uuid: string
    user_uuid: string
    comment: string
    post_uuid: string
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
}