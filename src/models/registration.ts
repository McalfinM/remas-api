import { model, Schema, Model } from "mongoose";
import { IRegsitration } from "./interfaces/regstration";

const RegistrationSchema: Schema = new Schema(
    {
        uuid: { type: String },
        full_name: { type: String },
        email: { type: String },
        birthday: { type: String },
        address: { type: String },
        handphone: { type: String },
        user_uuid: { type: String },
        created_at: { type: Date },
        updated_at: { type: Date },
        deleted_at: { type: Date },
    }
);

RegistrationSchema.index('full_name')
RegistrationSchema.index('uuid')

const RegistrationModel: Model<IRegsitration> = model(
    "registrations",
    RegistrationSchema
);

export default RegistrationModel;
