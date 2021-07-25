"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const EventSchema = new mongoose_1.Schema({
    uuid: { type: String },
    title: { type: String },
    content: { type: String },
    category: { type: Object },
    created_by: { type: Object },
    time: { type: String },
    place: { type: String },
    image: { type: String },
    slug: { type: String },
    schedule: { type: String },
    cloudinary_id: { type: String },
    created_at: { type: Date },
    updated_at: { type: Date },
    deleted_at: { type: Date },
});
EventSchema.index('title');
EventSchema.index('uuid');
const EventModel = mongoose_1.model("events", EventSchema);
exports.default = EventModel;
