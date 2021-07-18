import { model, Schema, Model } from "mongoose";
import { ILikes } from "./interfaces/likes";

const RemasLikeSchema: Schema = new Schema(
    {
        uuid: { type: String },
        user_uuid: { type: String },
        ip_address: { type: String },
        post_uuid: { type: String },
        created_at: { type: Date },
        deleted_at: { type: Date },
        updated_at: { type: Date }
    }
);

RemasLikeSchema.index('uuid')
RemasLikeSchema.index('user_uuid')
RemasLikeSchema.index('post_uuid')

const RemasLikeModel: Model<ILikes> = model(
    "remas_like",
    RemasLikeSchema
);

export default RemasLikeModel;
