"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateCommentRemasRequest {
    _post_uuid;
    _comment;
    _ip_address;
    constructor(body) {
        this._post_uuid = body.post_uuid;
        this._comment = body.comment;
        this._ip_address = body.ip_address;
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
}
exports.default = CreateCommentRemasRequest;
