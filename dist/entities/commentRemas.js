"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseEntity_1 = __importDefault(require("./baseEntity"));
class CommentRemasEntity extends baseEntity_1.default {
    _uuid;
    _created_by;
    _comment;
    _remas_uuid;
    _ip_address;
    _created_at;
    _updated_at;
    _deleted_at;
    constructor(params) {
        super();
        this._uuid = params.uuid;
        this._created_by = params.created_by;
        this._comment = params.comment;
        this._remas_uuid = params.remas_uuid;
        this._ip_address = params.ip_address;
        this._created_at = params.created_at;
        this._deleted_at = params.deleted_at;
        this._updated_at = params.updated_at;
    }
    get uuid() {
        return this._uuid;
    }
    set uuid(uuid) {
        this._uuid = uuid;
    }
    get created_by() {
        return this._created_by;
    }
    set created_by(created_by) {
        this._created_by = created_by;
    }
    get comment() {
        return this._comment;
    }
    set comment(comment) {
        this._comment = comment;
    }
    get ip_address() {
        return this._ip_address;
    }
    set ip_address(ip_address) {
        this._ip_address = ip_address;
    }
    get remas_uuid() {
        return this._remas_uuid;
    }
    set remas_uuid(remas_uuid) {
        this._remas_uuid = remas_uuid;
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
            uuid: this._uuid,
            created_by: this._created_by,
            comment: this._comment,
            remas_uuid: this._remas_uuid,
            ip_address: this._ip_address,
            created_at: this._created_at,
            deleted_at: this._deleted_at,
            updated_at: this._updated_at,
        };
    }
    toListData() {
        return {
            uuid: this._uuid,
            created_by: this._created_by,
            comment: this._comment,
            remas_uuid: this._remas_uuid,
            created_at: this._created_at,
            updated_at: this._updated_at,
        };
    }
    toDetailData() {
        return {
            uuid: this._uuid,
            created_by: this._created_by,
            comment: this._comment,
            remas_uuid: this._remas_uuid,
            ip_address: this._ip_address,
            created_at: this._created_at,
            deleted_at: this._deleted_at,
            updated_at: this._updated_at,
        };
    }
}
exports.default = CommentRemasEntity;
