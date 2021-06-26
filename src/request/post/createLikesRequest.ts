

class CreateLikesRequest {
    protected _uuid: string | null
    protected _ip_address: string | null
    protected _created_at: Date | null
    protected _updated_at: Date | null
    protected _deleted_at: Date | null


    constructor(body: {
        uuid: string | null
        ip_address: string | null
        created_at: Date | null
        updated_at: Date | null
        deleted_at: Date | null

    }) {
        this._uuid = body.uuid
        this._ip_address = body.ip_address
        this._created_at = body.created_at
        this._updated_at = body.updated_at
        this._deleted_at = body.deleted_at
    }

    get uuid(): string | null {
        return this._uuid
    }
    set uuid(uuid: string | null) {
        this._uuid = uuid
    }
    get ip_address(): string | null {
        return this._ip_address
    }
    set ip_address(ip_address: string | null) {
        this._ip_address = ip_address
    }
    get created_at(): Date | null {
        return this._created_at
    }
    set created_at(created_at: Date | null) {
        this._created_at = created_at
    }
    get updated_at(): Date | null {
        return this._updated_at
    }
    set updated_at(updated_at: Date | null) {
        this._updated_at = updated_at
    }
    get deleted_at(): Date | null {
        return this._deleted_at
    }
    set deleted_at(deleted_at: Date | null) {
        this._deleted_at = deleted_at
    }

}

export default CreateLikesRequest