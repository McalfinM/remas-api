"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetPostRequest {
    _uuid;
    _title;
    _slug;
    _sort_by;
    _user_uuid;
    _page;
    _limit;
    _search;
    constructor(queryParams) {
        this._uuid = queryParams.uuid;
        this._title = queryParams.title;
        this._slug = queryParams.slug;
        this._sort_by = queryParams.sort_by;
        this._user_uuid = queryParams.user_uuid;
        this._page = queryParams.page;
        this._limit = queryParams.limit;
        this._search = queryParams.search;
    }
    get search() {
        return this._search;
    }
    get uuid() {
        return this._uuid;
    }
    get title() {
        return this._title;
    }
    get slug() {
        return this._slug;
    }
    get sort_by() {
        return this._sort_by;
    }
    get user_uuid() {
        return this._user_uuid;
    }
    get page() {
        return this._page;
    }
    get limit() {
        return this._limit;
    }
}
exports.default = GetPostRequest;
