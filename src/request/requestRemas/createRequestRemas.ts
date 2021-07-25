class CreateRequestRemas {
    protected _full_name: string
    protected _address: string
    protected _handphone: string
    protected _description: string
    protected _image: string


    constructor(body: {
        full_name: string
        address: string
        handphone: string
        image: string
        description: string

    }) {
        this._full_name = body.full_name
        this._address = body.address
        this._handphone = body.handphone
        this._image = body.image
        this._description = body.description
    }

    get full_name(): string {
        return this._full_name
    }
    get address(): string {
        return this._address
    }
    get handphone(): string {
        return this._handphone
    }
    get image(): string {
        return this._image
    }
    get description(): string {
        return this._description
    }


}

export default CreateRequestRemas