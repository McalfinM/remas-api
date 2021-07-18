"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CommentSchema = new mongoose_1.Schema({
    uuid: { type: String },
    created_by: { type: Object },
    comment: { type: String },
    post_uuid: { type: String },
    ip_address: { type: String },
    created_at: { type: Date },
    deleted_at: { type: Date },
    updated_at: { type: Date }
});
CommentSchema.index('uuid');
CommentSchema.index('user_uuid');
const CommentModel = mongoose_1.model("comments", CommentSchema);
exports.default = CommentModel;
