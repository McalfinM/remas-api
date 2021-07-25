"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateCommentRequest {
    _post_uuid;
    _comment;
    _ip_address;
    _created_at;
    _updated_at;
    _deleted_at;
    constructor(body) {
        this._post_uuid = body.post_uuid;
        this._comment = body.comment;
        this._ip_address = body.ip_address;
        this._created_at = body.created_at;
        this._updated_at = body.updated_at;
        this._deleted_at = body.deleted_at;
    }
    get post_uuid() {
        return this._post_uuid;
    }
    get comment() {
        return this._comment;
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
exports.default = CreateCommentRequest;
