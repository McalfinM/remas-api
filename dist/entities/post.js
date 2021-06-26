"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseEntity_1 = __importDefault(require("./baseEntity"));
class PostEntity extends baseEntity_1.default {
    _uuid;
    _title;
    _content;
    _category;
    _created_by;
    _image;
    _slug;
    _cloudinary_id;
    _created_at;
    _updated_at;
    _deleted_at;
    constructor(params) {
        super();
        this._uuid = params.uuid;
        this._title = params.title;
        this._content = params.content;
        this._category = params.category;
        this._created_by = params.created_by;
        this._image = params.image;
        this._slug = params.slug;
        this._cloudinary_id = params.cloudinary_id;
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
    get title() {
        return this._title;
    }
    set title(title) {
        this._title = title;
    }
    get content() {
        return this._content;
    }
    set content(content) {
        this._content = content;
    }
    get category() {
        return this._category;
    }
    set category(category) {
        this._category = category;
    }
    get created_by() {
        return this._created_by;
    }
    set created_by(created_by) {
        this._created_by = created_by;
    }
    get image() {
        return this._image;
    }
    set image(image) {
        this._image = image;
    }
    get slug() {
        return this._slug;
    }
    set slug(slug) {
        this._slug = slug;
    }
    get cloudinary_id() {
        return this._cloudinary_id;
    }
    set cloudinary_id(cloudinary_id) {
        this._cloudinary_id = cloudinary_id;
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
            title: this.title,
            content: this.content,
            category: this.category,
            created_by: this.created_by,
            image: this.image,
            slug: this.slug,
            cloudinary_id: this.cloudinary_id,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
        };
    }
    toListData() {
        return {
            title: this.title,
            category: this.category,
            image: this.image,
            slug: this.slug,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
        };
    }
    toDetailData() {
        return {
            uuid: this.uuid,
            title: this.title,
            content: this.content,
            category: this.category,
            created_by: this.created_by,
            image: this.image,
            slug: this.slug,
            cloudinary_id: this.cloudinary_id,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
        };
    }
}
exports.default = PostEntity;
