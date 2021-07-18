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
        image: { type: String },
        ipaddr: { type: String },
        description: { type: String },
        created_by: { type: Object },
        created_at: { type: Date },
        updated_at: { type: Date },
        deleted_at: { type: Date },
    }
);

RegistrationSchema.index('full_name')
RegistrationSchema.index('uuid')

const RegistrationMemberRemasModel: Model<IRegsitration> = model(
    "registrations_member_remas",
    RegistrationSchema
);

export default RegistrationMemberRemasModel;
