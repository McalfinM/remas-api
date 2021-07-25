import { model, Schema, Model } from "mongoose";
import { IRequestRemas } from "./interfaces/requestRemas";


const RequestRemasSchema: Schema = new Schema(
    {
        uuid: { type: String },
        created_by: { type: Object },
        full_name: { type: String },
        address: { type: String },
        handphone: { type: String },
        description: { type: String },
        image: { type: String },
        status: { type: String },
        created_at: { type: Date },
        updated_at: { type: Date },
        deleted_at: { type: Date },
    }
);

RequestRemasSchema.index('uuid')

const RequestRemasModel: Model<IRequestRemas> = model(
    "request_remas",
    RequestRemasSchema
);

export default RequestRemasModel;
