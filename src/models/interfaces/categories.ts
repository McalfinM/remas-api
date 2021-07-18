import { Document } from "mongoose";

export interface ICategoryModel extends Document {
    uuid: string
    name: string
}