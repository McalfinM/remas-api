import { Document } from 'mongoose'

export interface IUser extends Document {
    uuid: string
    name: string
    email: string
    password: string
    roles: string[]
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
}
