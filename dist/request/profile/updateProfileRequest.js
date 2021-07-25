"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UpdateProfileRequest {
    _nickname;
    _full_name;
    _address;
    _birthday;
    _cloudinary_id;
    _description;
    _visi;
    _misi;
    _image;
    _idul_adha;
    _ramadhan;
    constructor(body) {
        this._nickname = body.nickname;
        this._full_name = body.full_name;
        this._visi = body.visi;
        this._misi = body.misi;
        this._description = body.description;
        this._image = body.image;
        this._cloudinary_id = body.cloudinary_id;
        this._address = body.address;
        this._birthday = body.birthday;
        this._idul_adha = body.idul_adha;
        this._ramadhan = body.ramadhan;
    }
    get nickname() {
        return this._nickname;
    }
    set nickname(nickname) {
        this._nickname = nickname;
    }
    get full_name() {
        return this._full_name;
    }
    set full_name(full_name) {
        this._full_name = full_name;
    }
    get visi() {
        return this._visi;
    }
    set visi(visi) {
        this._visi = visi;
    }
    get misi() {
        return this._misi;
    }
    set misi(misi) {
        this._misi = misi;
    }
    get description() {
        return this._description;
    }
    set birthday(birthday) {
        this._birthday = birthday;
    }
    get image() {
        return this._image;
    }
    set description(description) {
        this._description = description;
    }
    get address() {
        return this._address;
    }
    set cloudinary_id(cloudinary_id) {
        this._cloudinary_id = cloudinary_id;
    }
    get cloudinary_id() {
        return this._cloudinary_id;
    }
    set address(address) {
        this._address = address;
    }
    get birthday() {
        return this._birthday;
    }
    set image(image) {
        this._image = image;
    }
    get idul_adha() {
        return this._idul_adha;
    }
    set idul_adha(idul_adha) {
        this._idul_adha = idul_adha;
    }
    get ramadhan() {
        return this._ramadhan;
    }
    set ramadhan(ramadhan) {
        this._ramadhan = ramadhan;
    }
}
exports.default = UpdateProfileRequest;
