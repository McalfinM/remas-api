


class CreateUserRequest {
    protected _uuid: string | null
    protected _name: string | null
    protected _email: string | null
    protected _password: string
    protected _created_at: Date | null
    protected _updated_at: Date | null
    protected _deleted_at: Date | null


    constructor(body: {
        uuid: string | null
        name: string | null
        email: string | null
        password: string
        created_at: Date | null
        updated_at: Date | null
        deleted_at: Date | null

    }) {
        this._uuid = body.uuid
        this._name = body.name
        this._email = body.email
        this._password = body.password
        this._created_at = body.created_at
        this._updated_at = body.updated_at
        this._deleted_at = body.deleted_at
    }

    get uuid(): string | null {
        return this._uuid
    }
    get name(): string | null {
        return this._name
    }
    get email(): string | null {
        return this._email
    }
    get password(): string {
        return this._password
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

export default CreateUserRequest