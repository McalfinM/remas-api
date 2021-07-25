"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseEntity_1 = __importDefault(require("./baseEntity"));
class TokenEntity extends baseEntity_1.default {
    _uuid;
    _user_uuid;
    _token;
    _revoked;
    _activity;
    _email;
    _created_at;
    _updated_at;
    constructor(params) {
        super();
        this._uuid = params.uuid;
        this._user_uuid = params.user_uuid;
        this._email = params.email;
        this._revoked = params.revoked;
        this._activity = params.activity;
        this._token = params.token;
        this._created_at = params.created_at;
        this._updated_at = params.updated_at;
    }
    get uuid() {
        return this._uuid;
    }
    set uuid(uuid) {
        this._uuid = uuid;
    }
    get user_uuid() {
        return this._user_uuid;
    }
    get activity() {
        return this._activity;
    }
    set activity(activity) {
        this._activity = activity;
    }
    set user_uuid(user_uuid) {
        this._user_uuid = user_uuid;
    }
    get email() {
        return this._email;
    }
    set email(email) {
        this._email = email;
    }
    get revoked() {
        return this._revoked;
    }
    set revoked(revoked) {
        this._revoked = revoked;
    }
    get token() {
        return this._token;
    }
    set token(token) {
        this._token = token;
    }
    get created_at() {
        return this._created_at;
    }
    set created_at(created_at) {
        this._created_at = created_at;
    }
    get updated_at() {
        return this._updated_at;
    }
    set updated_at(updated_at) {
        this._updated_at = updated_at;
    }
    toJson() {
        return {
            uuid: this.uuid,
            user_user_uuid: this.user_uuid,
            revoked: this.revoked,
            created_at: this.created_at,
            updated_at: this.updated_at,
        };
    }
    toListData() {
        return {
            uuid: this.uuid,
            user_user_uuid: this.user_uuid,
            revoked: this.revoked,
            created_at: this.created_at,
            updated_at: this.updated_at,
        };
    }
    toDetailData() {
        return {
            uuid: this.uuid,
            user_user_uuid: this.user_uuid,
            revoked: this.revoked,
            created_at: this.created_at,
            updated_at: this.updated_at,
        };
    }
}
exports.default = TokenEntity;
