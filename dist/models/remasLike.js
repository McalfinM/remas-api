"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RemasLikeSchema = new mongoose_1.Schema({
    uuid: { type: String },
    user_uuid: { type: String },
    ip_address: { type: String },
    post_uuid: { type: String },
    created_at: { type: Date },
    deleted_at: { type: Date },
    updated_at: { type: Date }
});
RemasLikeSchema.index('uuid');
RemasLikeSchema.index('user_uuid');
RemasLikeSchema.index('post_uuid');
const RemasLikeModel = mongoose_1.model("remas_like", RemasLikeSchema);
exports.default = RemasLikeModel;
