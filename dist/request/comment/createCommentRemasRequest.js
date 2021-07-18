"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateCommentRemasRequest {
    _remas_uuid;
    _comment;
    _ip_address;
    constructor(body) {
        this._remas_uuid = body.remas_uuid;
        this._comment = body.comment;
        this._ip_address = body.ip_address;
    }
    get remas_uuid() {
        return this._remas_uuid;
    }
    get comment() {
        return this._comment;
    }
    get ip_address() {
        return this._ip_address;
    }
}
exports.default = CreateCommentRemasRequest;
