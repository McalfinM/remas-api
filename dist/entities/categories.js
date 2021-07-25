"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseEntity_1 = __importDefault(require("./baseEntity"));
class CategoryEntity extends baseEntity_1.default {
    _uuid;
    _name;
    constructor(params) {
        super();
        this._uuid = params.uuid;
        this._name = params.name;
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
    set name(name) {
        this._name = name;
    }
    toJson() {
        return {
            uuid: this._uuid,
            name: this._name,
        };
    }
    toListData() {
        return {
            uuid: this._uuid,
            name: this._name,
        };
    }
    toDetailData() {
        return {
            uuid: this._uuid,
            name: this._name,
        };
    }
}
exports.default = CategoryEntity;
