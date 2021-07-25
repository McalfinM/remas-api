"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateEventRequest {
    _uuid;
    _title;
    _content;
    _category;
    _created_by;
    _time;
    _date;
    _place;
    _image;
    _slug;
    _cloudinary_id;
    constructor(body) {
        this._uuid = body.uuid;
        this._title = body.title;
        this._content = body.content;
        this._category = body.category;
        this._created_by = body.created_by;
        this._time = body.time;
        this._date = body.date;
        this._place = body.place;
        this._image = body.image;
        this._slug = body.slug;
        this._cloudinary_id = body.cloudinary_id;
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
    get time() {
        return this._time;
    }
    set time(time) {
        this._time = time;
    }
    get date() {
        return this._date;
    }
    set date(date) {
        this._date = date;
    }
    get place() {
        return this._place;
    }
    set place(place) {
        this._place = place;
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
}
exports.default = CreateEventRequest;
