
import ISpecification from "./specificationInterface";


class GetPostSpecification implements ISpecification {
    protected _title?: string;
    protected _category?: string;
    protected _sort_by: any;
    protected _page: number;
    protected _limit: number;
    protected _search?: string;

    constructor(request: {
        title?: string;
        category?: string;
        sort?: string
        page?: number
        limit?: number
        search?: string
    }) {
        this._search = request.search;
        this._title = request.title;
        this._category = request.category;
        this._sort_by = request.sort ?? '-created_at'
        this._page = request.page ?? 1
        this._limit = request.limit ?? 30
    }


    specifies(): object {
        let specifications: { [k: string]: any } = {};
        let or_specifications: object[] = [];

        if (this._search) {

            or_specifications.push(
                { 'title': new RegExp(this._search, 'i') }
            )
        }


        if (this._category) {
            specifications["category"] = this._category
        }

        if (or_specifications.length > 0) {
            specifications["$or"] = or_specifications;
        }
        specifications.deleted_at = null;

        return specifications;
    }

    specSort(): object {
        let specifications: { [k: string]: any } = {};

        if (this._sort_by[0] == '-') {
            specifications[this._sort_by.slice(1)] = -1
        } else {
            specifications[this._sort_by] = 1
        }

        return specifications;
    }

    paginate(): object {
        const specification: {
            limit: number
            skip: number
        } = {
            limit: +this._limit,
            skip: 0
        }

        if (this._page > 1) {
            specification.skip = (this._page - 1) * this._limit
        }
        return specification
    }

}


export default GetPostSpecification;
