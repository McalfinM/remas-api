"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    uuid: { type: String },
    name: { type: String },
    email: { type: String },
    password: { type: String },
    roles: { type: Array },
    created_at: { type: Date },
    updated_at: { type: Date },
    deleted_at: { type: Date },
});
UserSchema.index('name');
UserSchema.index('uuid');
const UserModel = mongoose_1.model("users", UserSchema);
exports.default = UserModel;
