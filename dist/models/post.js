"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PostSchema = new mongoose_1.Schema({
    uuid: { type: String },
    title: { type: String },
    content: { type: String },
    category: { type: Object },
    created_by: { type: Object },
    image: { type: String },
    slug: { type: String },
    cloudinary_id: { type: String },
    created_at: { type: Date },
    updated_at: { type: Date },
    deleted_at: { type: Date },
});
PostSchema.index('title');
PostSchema.index('uuid');
const PostModel = mongoose_1.model("posts", PostSchema);
exports.default = PostModel;
