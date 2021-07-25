


class CreateCommentRemasRequest {
    protected _post_uuid: string
    protected _comment: string
    protected _ip_address: string


    constructor(body: {
        post_uuid: string
        comment: string
        ip_address: string

    }) {
        this._post_uuid = body.post_uuid
        this._comment = body.comment
        this._ip_address = body.ip_address
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

}

export default CreateCommentRemasRequest