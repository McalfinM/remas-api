"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseEntity_1 = __importDefault(require("./baseEntity"));
class UserEntity extends baseEntity_1.default {
    _uuid;
    _name;
    _email;
    _password;
    _roles;
    _is_active;
    _created_at;
    _updated_at;
    _deleted_at;
    constructor(params) {
        super();
        this._uuid = params.uuid;
        this._name = params.name;
        this._email = params.email;
        this._password = params.password;
        this._roles = params.roles;
        this._is_active = params.is_active;
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
    get name() {
        return this._name;
    }
    get roles() {
        return this._roles;
    }
    set roles(roles) {
        this._roles = roles;
    }
    set name(name) {
        this._name = name;
    }
    get email() {
        return this._email;
    }
    set email(email) {
        this._email = email;
    }
    get password() {
        return this._password;
    }
    set password(password) {
        this._password = password;
    }
    get is_active() {
        return this._is_active;
    }
    set is_active(is_active) {
        this._is_active = is_active;
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
    toJson() {
        return {
            uuid: this.uuid,
            name: this.name,
            password: this.password,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
        };
    }
    toListData() {
        return {
            uuid: this.uuid,
            name: this.name,
            password: this.password,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
        };
    }
    toDetailData() {
        return {
            uuid: this.uuid,
            name: this.name,
            password: this.password,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
        };
    }
}
exports.default = UserEntity;
