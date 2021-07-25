
class GetPostRequest {
    protected _uuid?: string;
    protected _title?: string;
    protected _slug?: string;
    protected _sort_by?: any;
    protected _user_uuid?: string
    protected _page?: number;
    protected _limit?: number;
    protected _search?: string;

    constructor(queryParams: {
        uuid?: string
        title?: string
        slug?: string
        sort_by?: any
        user_uuid?: string
        page?: number
        limit?: number
        search?: string
    }) {
        this._uuid = queryParams.uuid
        this._title = queryParams.title
        this._slug = queryParams.slug
        this._sort_by = queryParams.sort_by
        this._user_uuid = queryParams.user_uuid
        this._page = queryParams.page
        this._limit = queryParams.limit
        this._search = queryParams.search
    }

    get search(): string | undefined {
        return this._search
    }

    get uuid(): string | undefined {
        return this._uuid
    }

    get title(): string | undefined {
        return this._title
    }

    get slug(): string | undefined {
        return this._slug
    }

    get sort_by(): string | undefined {
        return this._sort_by
    }
    get user_uuid(): string | undefined {
        return this._user_uuid
    }
    get page(): number | undefined {
        return this._page
    }

    get limit(): number | undefined {
        return this._limit
    }
}

export default GetPostRequest;
