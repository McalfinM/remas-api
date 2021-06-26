import { model, Schema, Model } from "mongoose";
import { IPost } from "./interfaces/post";

const PostSchema: Schema = new Schema(
    {
        uuid: { type: String },
        title: { type: String },
        content: { type: String },
        category: { type: String },
        created_by: { type: Object },
        image: { type: String },
        slug: { type: String },
        cloudinary_id: { type: String },
        created_at: { type: Date },
        updated_at: { type: Date },
        deleted_at: { type: Date },
    }
);

PostSchema.index('title')
PostSchema.index('uuid')

const PostModel: Model<IPost> = model(
    "posts",
    PostSchema
);

export default PostModel;
