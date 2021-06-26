"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateLikesRequest {
    _uuid;
    _ip_address;
    _created_at;
    _updated_at;
    _deleted_at;
    constructor(body) {
        this._uuid = body.uuid;
        this._ip_address = body.ip_address;
        this._created_at = body.created_at;
        this._updated_at = body.updated_at;
        this._deleted_at = body.deleted_at;
    }
    get uuid() {
        return this._uuid;
    }
    set uuid(uuid) {
        this._uuid = uuid;
    }
    get ip_address() {
        return this._ip_address;
    }
    set ip_address(ip_address) {
        this._ip_address = ip_address;
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
    get deleted_at() {
        return this._deleted_at;
    }
    set deleted_at(deleted_at) {
        this._deleted_at = deleted_at;
    }
}
exports.default = CreateLikesRequest;
