"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseEntity_1 = __importDefault(require("./baseEntity"));
class RequestRemasEntity extends baseEntity_1.default {
    _uuid;
    _created_by;
    _full_name;
    _address;
    _handphone;
    _description;
    _image;
    _status;
    _created_at;
    _updated_at;
    _deleted_at;
    constructor(params) {
        super();
        this._uuid = params.uuid;
        this._created_by = params.created_by;
        this._full_name = params.full_name;
        this._address = params.address;
        this._handphone = params.handphone;
        this._description = params.description;
        this._image = params.image;
        this._status = params.status;
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
    get created_by() {
        return this._created_by;
    }
    get handphone() {
        return this._handphone;
    }
    set handphone(handphone) {
        this._handphone = handphone;
    }
    set created_by(created_by) {
        this._created_by = created_by;
    }
    get address() {
        return this._address;
    }
    set address(address) {
        this._address = address;
    }
    get description() {
        return this._description;
    }
    set description(description) {
        this._description = description;
    }
    get image() {
        return this._image;
    }
    set image(image) {
        this._image = image;
    }
    get status() {
        return this._status;
    }
    set status(status) {
        this._status = status;
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
            created_by: this.created_by,
            full_name: this.full_name,
            address: this.address,
            description: this.description,
            image: this.image,
        };
    }
    toListData() {
        return {
            uuid: this.uuid,
            created_by: this.created_by,
            full_name: this.full_name,
            address: this.address,
            description: this.description,
            image: this.image,
        };
    }
    toDetailData() {
        return {
            full_name: this.full_name,
            address: this.address,
            description: this.description,
            image: this.image,
        };
    }
}
exports.default = RequestRemasEntity;
