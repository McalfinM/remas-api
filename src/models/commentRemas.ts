import { model, Schema, Model } from "mongoose";
import { ICommentRemas } from "./interfaces/commentRemas";

const CommentRemasSchema: Schema = new Schema(
    {
        uuid: { type: String },
        user_uuid: { type: String },
        comment: { type: String },
        remas_uuid: { type: String },
        ip_address: { type: String },
        created_at: { type: Date },
        deleted_at: { type: Date },
        updated_at: { type: Date }
    }
);

CommentRemasSchema.index('uuid')
CommentRemasSchema.index('remas_uuid')

const CommentRemasModel: Model<ICommentRemas> = model(
    "comment_remas",
    CommentRemasSchema
);

export default CommentRemasModel;
