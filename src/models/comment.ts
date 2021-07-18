import { model, Schema, Model } from "mongoose";
import { IComment } from "./interfaces/comment";

const CommentSchema: Schema = new Schema(
    {
        uuid: { type: String },
        created_by: { type: Object },
        comment: { type: String },
        post_uuid: { type: String },
        ip_address: { type: String },
        created_at: { type: Date },
        deleted_at: { type: Date },
        updated_at: { type: Date }
    }
);

CommentSchema.index('uuid')
CommentSchema.index('user_uuid')

const CommentModel: Model<IComment> = model(
    "comments",
    CommentSchema
);

export default CommentModel;
