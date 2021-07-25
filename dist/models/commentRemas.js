"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CommentRemasSchema = new mongoose_1.Schema({
    uuid: { type: String },
    user_uuid: { type: String },
    comment: { type: String },
    remas_uuid: { type: String },
    created_by: { type: Object },
    ip_address: { type: String },
    created_at: { type: Date },
    deleted_at: { type: Date },
    updated_at: { type: Date }
});
CommentRemasSchema.index('uuid');
CommentRemasSchema.index('remas_uuid');
const CommentRemasModel = mongoose_1.model("comment_remas", CommentRemasSchema);
exports.default = CommentRemasModel;
