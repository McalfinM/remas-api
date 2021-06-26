import { Document } from "mongoose";

export interface IRegsitration extends Document {
    uuid?: string
    full_name?: string
    email?: string
    birthday?: string
    address?: string
    handphone?: string
    user_uuid?: string
    created_at?: Date
    updated_at?: Date
    deleted_at?: Date
}