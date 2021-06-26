import { model, Schema, Model } from "mongoose";
import { IProfile } from "./interfaces/mainInformation";

const ProfileSchema: Schema = new Schema(
    {
        uuid: { type: String },
        user_uuid: { type: String },
        main_information: { type: Object },
        ramadhan: { type: Object },
        idul_adha: { type: Object },
        roles: { type: Array }
    }
);

ProfileSchema.index('uuid')
ProfileSchema.index('user_uuid')

const ProfileModel: Model<IProfile> = model(
    "profiles",
    ProfileSchema
);

export default ProfileModel;
