


class CreateCommentRequest {
    protected _user_uuid: string
    protected _post_uuid: string
    protected _comment: string
    protected _created_at: Date | null
    protected _updated_at: Date | null
    protected _deleted_at: Date | null


    constructor(body: {
        user_uuid: string
        post_uuid: string
        comment: string
        created_at: Date | null
        updated_at: Date | null
        deleted_at: Date | null

    }) {
        this._user_uuid = body.user_uuid
        this._post_uuid = body.post_uuid
        this._comment = body.comment
        this._created_at = body.created_at
        this._updated_at = body.updated_at
        this._deleted_at = body.deleted_at
    }

    get user_uuid(): string {
        return this._user_uuid
    }
    get post_uuid(): string {
        return this._post_uuid
    }
    get comment(): string {
        return this._comment
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