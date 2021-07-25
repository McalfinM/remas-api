import { model, Schema, Model } from "mongoose";
import { IUser } from "./interfaces/user";

const UserSchema: Schema = new Schema(
  {
    uuid: { type: String },
    name: { type: String },
    email: { type: String },
    password: { type: String },
    roles: { type: Array },
    is_active: { type: Boolean },
    created_at: { type: Date },
    updated_at: { type: Date },
    deleted_at: { type: Date },
  }
);

UserSchema.index('name')
UserSchema.index('uuid')

const UserModel: Model<IUser> = model(
  "users",
  UserSchema
);

export default UserModel;
