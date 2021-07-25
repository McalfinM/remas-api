"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RequestRemasSchema = new mongoose_1.Schema({
    uuid: { type: String },
    created_by: { type: Object },
    full_name: { type: String },
    address: { type: String },
    handphone: { type: String },
    description: { type: String },
    image: { type: String },
    status: { type: String },
    created_at: { type: Date },
    updated_at: { type: Date },
    deleted_at: { type: Date },
});
RequestRemasSchema.index('uuid');
const RequestRemasModel = mongoose_1.model("request_remas", RequestRemasSchema);
exports.default = RequestRemasModel;
