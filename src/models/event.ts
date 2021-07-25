import { model, Schema, Model } from "mongoose";
import { IEvent } from "./interfaces/event";

const EventSchema: Schema = new Schema(
    {
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
    }
);

EventSchema.index('title')
EventSchema.index('uuid')

const EventModel: Model<IEvent> = model(
    "events",
    EventSchema
);

export default EventModel;
