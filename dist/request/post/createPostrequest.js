"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreatePostRequest {
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
    constructor(body) {
        this._uuid = body.uuid;
        this._title = body.title;
        this._content = body.content;
        this._category = body.category;
        this._created_by = body.created_by;
        this._image = body.image;
        this._slug = body.slug;
        this._cloudinary_id = body.cloudinary_id;
        this._created_at = body.created_at;
        this._updated_at = body.updated_at;
        this._deleted_at = body.deleted_at;
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
}
exports.default = CreatePostRequest;
