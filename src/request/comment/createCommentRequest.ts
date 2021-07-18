


class CreateCommentRequest {
    protected _post_uuid: string
    protected _comment: string
    protected _ip_address: string
    protected _created_at: Date | null
    protected _updated_at: Date | null
    protected _deleted_at: Date | null


    constructor(body: {
        post_uuid: string
        comment: string
        ip_address: string
        created_at: Date | null
        updated_at: Date | null
        deleted_at: Date | null

    }) {
        this._post_uuid = body.post_uuid
        this._comment = body.comment
        this._ip_address = body.ip_address
        this._created_at = body.created_at
        this._updated_at = body.updated_at
        this._deleted_at = body.deleted_at
    }
    get post_uuid(): string {
        return this._post_uuid
    }
    get comment(): string {
        return this._comment
    }
    get ip_address(): string {
        return this._ip_address
    }
    get created_at(): Date | null {
        return this._created_at
    }
    get updated_at(): Date | null {
        return this._updated_at
    }
    get deleted_at(): Date | null {
        return this._deleted_at
    }

}

export default CreateCommentRequest