"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProfileSchema = new mongoose_1.Schema({
    uuid: { type: String },
    user_uuid: { type: String },
    main_information: { type: Object },
    ramadhan: { type: Object },
    idul_adha: { type: Object },
    roles: { type: Array }
});
ProfileSchema.index('uuid');
ProfileSchema.index('user_uuid');
const ProfileModel = mongoose_1.model("profiles", ProfileSchema);
exports.default = ProfileModel;
