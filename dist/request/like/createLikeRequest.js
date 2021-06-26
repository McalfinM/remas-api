"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateLikeRequest {
    _user_uuid;
    _post_uuid;
    _ip_address;
    _created_at;
    _updated_at;
    _deleted_at;
    constructor(body) {
        this._user_uuid = body.user_uuid;
        this._post_uuid = body.post_uuid;
        this._ip_address = body.ip_address;
        this._created_at = body.created_at;
        this._updated_at = body.updated_at;
        this._deleted_at = body.deleted_at;
    }
    get user_uuid() {
        return this._user_uuid;
    }
    get post_uuid() {
        return this._post_uuid;
    }
    get ip_address() {
        return this._ip_address;
    }
    get created_at() {
        return this._created_at;
    }
    get updated_at() {
        return this._updated_at;
    }
    get deleted_at() {
        return this._deleted_at;
    }
}
exports.default = CreateLikeRequest;
