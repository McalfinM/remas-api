"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetProfileSpecification {
    _nickname;
    _full_name;
    _sort_by;
    _roles;
    _page;
    _limit;
    _search;
    constructor(request) {
        this._search = request.search;
        this._nickname = request.nickname;
        this._full_name = request.full_name;
        this._roles = request.roles ?? ['member'];
        this._sort_by = request.sort ?? '-created_at';
        this._page = request.page ?? 1;
        this._limit = request.limit ?? 30;
    }
    specifies() {
        let specifications = {};
        let or_specifications = [];
        if (this._search) {
            or_specifications.push({ 'main_information.nickname': new RegExp(this._search, 'i') }, { 'main_information.full_name': new RegExp(this._search, 'i') });
        }
        if (this._full_name) {
            specifications["full_name"] = this._full_name;
        }
        if (or_specifications.length > 0) {
            specifications["$or"] = or_specifications;
        }
        specifications.deleted_at = null;
        specifications.roles = ['member', 'remaja_masjid'];
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
exports.default = GetProfileSpecification;
