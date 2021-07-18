"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseEntity_1 = __importDefault(require("./baseEntity"));
class RegistrationMemberRemasEntity extends baseEntity_1.default {
    _uuid;
    _full_name;
    _email;
    _birthday;
    _address;
    _handphone;
    _created_by;
    _ipaddr;
    _image;
    _user_uuid;
    _description;
    _created_at;
    _updated_at;
    _deleted_at;
    constructor(params) {
        super();
        this._uuid = params.uuid;
        this._full_name = params.full_name;
        this._email = params.email;
        this._birthday = params.birthday;
        this._address = params.address;
        this._handphone = params.handphone;
        this._created_by = params.created_by;
        this._description = params.description;
        this._ipaddr = params.ipaddr;
        this._image = params.image;
        this._user_uuid = params.user_uuid;
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
    get full_name() {
        return this._full_name;
    }
    set full_name(full_name) {
        this._full_name = full_name;
    }
    get email() {
        return this._email;
    }
    set email(email) {
        this._email = email;
    }
    get birthday() {
        return this._birthday;
    }
    set birthday(birthday) {
        this._birthday = birthday;
    }
    get image() {
        return this._image;
    }
    set image(image) {
        this._image = image;
    }
    get address() {
        return this._address;
    }
    set address(address) {
        this._address = address;
    }
    get handphone() {
        return this._handphone;
    }
    set handphone(handphone) {
        this._handphone = handphone;
    }
    get created_by() {
        return this._created_by;
    }
    set created_by(created_by) {
        this._created_by = created_by;
    }
    get user_uuid() {
        return this._user_uuid;
    }
    set user_uuid(user_uuid) {
        this._user_uuid = user_uuid;
    }
    get ipaddr() {
        return this._ipaddr;
    }
    set ipaddr(ipaddr) {
        this._ipaddr = ipaddr;
    }
    get description() {
        return this._description;
    }
    set description(description) {
        this._description = description;
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
            full_name: this.full_name,
            email: this.email,
            birthday: this.birthday,
            address: this.address,
            handphone: this.handphone,
            created_by: this.created_by,
            image: this.image,
            user_uuid: this.user_uuid,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
        };
    }
    toListData() {
        return {
            uuid: this.uuid,
            full_name: this.full_name,
            birthday: this.birthday,
            image: this.image,
        };
    }
    toDetailData() {
        return {
            uuid: this.uuid,
            full_name: this.full_name,
            email: this.email,
            birthday: this.birthday,
            address: this.address,
            handphone: this.handphone,
            created_by: this.created_by,
            description: this.description,
            image: this.image,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
        };
    }
}
exports.default = RegistrationMemberRemasEntity;
