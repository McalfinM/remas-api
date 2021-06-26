"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UpdatePostRequest {
    _title;
    _content;
    _category;
    _image;
    _cloudinary_id;
    constructor(body) {
        this._title = body.title;
        this._content = body.content;
        this._category = body.category;
        this._image = body.image;
        this._cloudinary_id = body.cloudinary_id;
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
    get image() {
        return this._image;
    }
    set image(image) {
        this._image = image;
    }
    get cloudinary_id() {
        return this._cloudinary_id;
    }
    set cloudinary_id(cloudinary_id) {
        this._cloudinary_id = cloudinary_id;
    }
}
exports.default = UpdatePostRequest;
