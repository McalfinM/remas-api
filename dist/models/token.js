"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TokenSchema = new mongoose_1.Schema({
    uuid: { type: String },
    user_uuid: { type: String },
    token: { type: String },
    revoked: { type: Boolean },
    activity: { type: String },
    email: { type: String },
    created_at: { type: Date },
    updated_at: { type: Date },
});
TokenSchema.index('email');
TokenSchema.index('uuid');
TokenSchema.index('activity');
const TokenModel = mongoose_1.model("token", TokenSchema);
exports.default = TokenModel;
