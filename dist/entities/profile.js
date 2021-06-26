"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseEntity_1 = __importDefault(require("./baseEntity"));
class ProfileEntity extends baseEntity_1.default {
    _uuid;
    _user_uuid;
    _slug;
    _main_information;
    _roles;
    _ramadhan;
    _idul_adha;
    constructor(params) {
        super();
        this._uuid = params.uuid;
        this._user_uuid = params.user_uuid;
        this._slug = params.slug;
        this._main_information = params.main_information;
        this._ramadhan = params.ramadhan;
        this._idul_adha = params.idul_adha;
        this._roles = params.roles;
    }
    get uuid() {
        return this._uuid;
    }
    set uuid(uuid) {
        this._uuid = uuid;
    }
    get slug() {
        return this._slug;
    }
    set slug(slug) {
        this._slug = slug;
    }
    get user_uuid() {
        return this._user_uuid;
    }
    get roles() {
        return this._roles;
    }
    set roles(roles) {
        this._roles = roles;
    }
    set user_uuid(user_uuid) {
        this._user_uuid = user_uuid;
    }
    get main_information() {
        return this._main_information;
    }
    set main_information(main_information) {
        this._main_information = main_information;
    }
    get ramadhan() {
        return this._ramadhan;
    }
    set ramadhan(ramadhan) {
        this._ramadhan = ramadhan;
    }
    get idul_adha() {
        return this._idul_adha;
    }
    set idul_adha(idul_adha) {
        this._idul_adha = idul_adha;
    }
    toJson() {
        return {
            uuid: this.uuid,
            user_uuid: this.user_uuid,
            slug: this.slug,
            main_information: this.main_information,
            ramadhan: this.ramadhan,
            idul_adha: this.idul_adha,
        };
    }
    toListData() {
        return {
            uuid: this.uuid,
            user_uuid: this.user_uuid,
            slug: this.slug,
            main_information: this.main_information,
            ramadhan: this.ramadhan,
            idul_adha: this.idul_adha,
        };
    }
    toDetailData() {
        return {
            uuid: this.uuid,
            user_uuid: this.user_uuid,
            slug: this.slug,
            main_information: this.main_information,
            ramadhan: this.ramadhan,
            idul_adha: this.idul_adha,
        };
    }
}
exports.default = ProfileEntity;
