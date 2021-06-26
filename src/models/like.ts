import { model, Schema, Model } from "mongoose";
import { ILikes } from "./interfaces/likes";

const LikeSchema: Schema = new Schema(
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

LikeSchema.index('uuid')
LikeSchema.index('user_uuid')
LikeSchema.index('post_uuid')

const LikeModel: Model<ILikes> = model(
    "likes",
    LikeSchema
);

export default LikeModel;
