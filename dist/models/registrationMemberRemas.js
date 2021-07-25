"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RegistrationSchema = new mongoose_1.Schema({
    uuid: { type: String },
    full_name: { type: String },
    email: { type: String },
    birthday: { type: String },
    address: { type: String },
    handphone: { type: String },
    user_uuid: { type: String },
    image: { type: String },
    ipaddr: { type: String },
    description: { type: String },
    created_by: { type: Object },
    created_at: { type: Date },
    updated_at: { type: Date },
    deleted_at: { type: Date },
});
RegistrationSchema.index('full_name');
RegistrationSchema.index('uuid');
const RegistrationMemberRemasModel = mongoose_1.model("registrations_member_remas", RegistrationSchema);
exports.default = RegistrationMemberRemasModel;
