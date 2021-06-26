"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetProfileRequest {
    _nickname;
    _full_name;
    _sort_by;
    _page;
    _limit;
    _search;
    constructor(queryParams) {
        this._nickname = queryParams.nickname;
        this._full_name = queryParams.full_name;
        this._sort_by = queryParams.sort_by;
        this._page = queryParams.page;
        this._limit = queryParams.limit;
        this._search = queryParams.search;
    }
    get search() {
        return this._search;
    }
    get nickname() {
        return this._nickname;
    }
    get full_name() {
        return this._full_name;
    }
    get sort_by() {
        return this._sort_by;
    }
    get page() {
        return this._page;
    }
    get limit() {
        return this._limit;
    }
}
exports.default = GetProfileRequest;
