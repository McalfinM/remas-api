import { Document } from 'mongoose'

export interface IToken extends Document {
    uuid: string
    user_uuid: string
    token: string
    revoked: boolean
    activity: string
    email: string
    created_at: Date | null
    updated_at: Date | null
}
