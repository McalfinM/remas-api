"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseEntity_1 = __importDefault(require("./baseEntity"));
class LikeEntity extends baseEntity_1.default {
    _uuid;
    _user_uuid;
    _ip_address;
    _post_uuid;
    _created_at;
    _updated_at;
    _deleted_at;
    constructor(params) {
        super();
        this._uuid = params.uuid;
        this._user_uuid = params.user_uuid;
        this._ip_address = params.ip_address;
        this._post_uuid = params.post_uuid;
        this._created_at = params.created_at;
        this._updated_at = params.updated_at;
        this._deleted_at = params.deleted_at;
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
    set user_uuid(user_uuid) {
        this._user_uuid = user_uuid;
    }
    get ip_address() {
        return this._ip_address;
    }
    set ip_address(ip_address) {
        this._ip_address = ip_address;
    }
    get post_uuid() {
        return this._post_uuid;
    }
    set post_uuid(post_uuid) {
        this._post_uuid = post_uuid;
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
    set deleted_at(deleted_at) {
        this._deleted_at = deleted_at;
    }
    get deleted_at() {
        return this._deleted_at;
    }
    set updated_at(updated_at) {
        this._updated_at = updated_at;
    }
    toJson() {
        return {
            uuid: this.uuid,
            user_uuid: this.user_uuid,
            ip_address: this.ip_address,
            post_uuid: this.post_uuid,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
        };
    }
    toListData() {
        return {
            uuid: this.uuid,
            user_uuid: this.user_uuid,
            ip_address: this.ip_address,
            post_uuid: this.post_uuid,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
        };
    }
    toDetailData() {
        return {
            uuid: this.uuid,
            user_uuid: this.user_uuid,
            ip_address: this.ip_address,
            post_uuid: this.post_uuid,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
        };
    }
}
exports.default = LikeEntity;
