
class GetProfileRequest {
    protected _nickname?: string;
    protected _full_name?: string;
    protected _sort_by?: any;
    protected _page?: number;
    protected _limit?: number;
    protected _search?: string;

    constructor(queryParams: {
        uuid?: string
        nickname?: string
        full_name?: string
        sort_by?: any
        page?: number
        limit?: number
        search?: string
    }) {

        this._nickname = queryParams.nickname
        this._full_name = queryParams.full_name
        this._sort_by = queryParams.sort_by
        this._page = queryParams.page
        this._limit = queryParams.limit
        this._search = queryParams.search
    }

    get search(): string | undefined {
        return this._search
    }

    get nickname(): string | undefined {
        return this._nickname
    }

    get full_name(): string | undefined {
        return this._full_name
    }

    get sort_by(): string | undefined {
        return this._sort_by
    }

    get page(): number | undefined {
        return this._page
    }

    get limit(): number | undefined {
        return this._limit
    }
}

export default GetProfileRequest;
