


class CreateCommentRemasRequest {
    protected _remas_uuid: string
    protected _comment: string
    protected _ip_address: string


    constructor(body: {
        remas_uuid: string
        comment: string
        ip_address: string

    }) {
        this._remas_uuid = body.remas_uuid
        this._comment = body.comment
        this._ip_address = body.ip_address
    }
    get remas_uuid(): string {
        return this._remas_uuid
    }
    get comment(): string {
        return this._comment
    }
    get ip_address(): string {
        return this._ip_address
    }

}

export default CreateCommentRemasRequest