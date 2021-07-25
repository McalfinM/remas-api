import { model, Schema, Model } from "mongoose";
import { IToken } from "./interfaces/token";

const TokenSchema: Schema = new Schema(
    {
        uuid: { type: String },
        user_uuid: { type: String },
        token: { type: String },
        revoked: { type: Boolean },
        activity: { type: String },
        email: { type: String },
        created_at: { type: Date },
        updated_at: { type: Date },
    }
);

TokenSchema.index('email')
TokenSchema.index('uuid')
TokenSchema.index('activity')

const TokenModel: Model<IToken> = model(
    "token",
    TokenSchema
);

export default TokenModel;
