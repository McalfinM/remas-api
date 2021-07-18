"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CraeteRegistrationMemberRemas {
    _full_name;
    _email;
    _birthday;
    _address;
    _image;
    _ipaddr;
    _user_uuid;
    _handphone;
    _description;
    constructor(body) {
        this._full_name = body.full_name;
        this._email = body.email;
        this._birthday = body.birthday;
        this._user_uuid = body.user_uuid;
        this._address = body.address;
        this._ipaddr = body.ipaddr;
        this._handphone = body.handphone;
        this._image = body.image;
        this._description = body.description;
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
    get address() {
        return this._address;
    }
    set address(address) {
        this._address = address;
    }
    get image() {
        return this._image;
    }
    set image(image) {
        this._image = image;
    }
    get user_uuid() {
        return this._user_uuid;
    }
    set user_uuid(user_uuid) {
        this._user_uuid = user_uuid;
    }
    get handphone() {
        return this._handphone;
    }
    set handphone(handphone) {
        this._handphone = handphone;
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
}
exports.default = CraeteRegistrationMemberRemas;
