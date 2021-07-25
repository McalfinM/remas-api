"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateRequestRemas {
    _full_name;
    _address;
    _handphone;
    _description;
    _image;
    constructor(body) {
        this._full_name = body.full_name;
        this._address = body.address;
        this._handphone = body.handphone;
        this._image = body.image;
        this._description = body.description;
    }
    get full_name() {
        return this._full_name;
    }
    get address() {
        return this._address;
    }
    get handphone() {
        return this._handphone;
    }
    get image() {
        return this._image;
    }
    get description() {
        return this._description;
    }
}
exports.default = CreateRequestRemas;
