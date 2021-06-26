"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const LikeSchema = new mongoose_1.Schema({
    uuid: { type: String },
    user_uuid: { type: String },
    ip_address: { type: String },
    post_uuid: { type: String },
    created_at: { type: Date },
    deleted_at: { type: Date },
    updated_at: { type: Date }
});
LikeSchema.index('uuid');
LikeSchema.index('user_uuid');
LikeSchema.index('post_uuid');
const LikeModel = mongoose_1.model("likes", LikeSchema);
exports.default = LikeModel;
