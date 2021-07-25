"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetPostSpecification {
    _title;
    _category;
    _sort_by;
    _user_uuid;
    _page;
    _limit;
    _search;
    constructor(request) {
        this._search = request.search;
        this._title = request.title;
        this._category = request.category;
        this._user_uuid = request.user_uuid;
        this._sort_by = request.sort ?? '-created_at';
        this._page = request.page ?? 1;
        this._limit = request.limit ?? 30;
    }
    specifies() {
        let specifications = {};
        let or_specifications = [];
        if (this._search) {
            or_specifications.push({ 'title': new RegExp(this._search, 'i') });
        }
        if (this._category) {
            specifications["category"] = this._category;
        }
        if (this._user_uuid) {
            specifications["created_by.uuid"] = this._user_uuid;
        }
        if (or_specifications.length > 0) {
            specifications["$or"] = or_specifications;
        }
        specifications.deleted_at = null;
        return specifications;
    }
    specSort() {
        let specifications = {};
        if (this._sort_by[0] == '-') {
            specifications[this._sort_by.slice(1)] = -1;
        }
        else {
            specifications[this._sort_by] = 1;
        }
        return specifications;
    }
    paginate() {
        const specification = {
            limit: +this._limit,
            skip: 0
        };
        if (this._page > 1) {
            specification.skip = (this._page - 1) * this._limit;
        }
        return specification;
    }
}
exports.default = GetPostSpecification;
