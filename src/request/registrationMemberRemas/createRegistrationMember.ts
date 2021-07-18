

class CraeteRegistrationMemberRemas {
    protected _full_name: string
    protected _email: string
    protected _birthday: string
    protected _address: string
    protected _image: string | null
    protected _ipaddr: string | null
    protected _user_uuid: string
    protected _handphone: string
    protected _description: string


    constructor(body: {
        full_name: string
        email: string
        birthday: string
        user_uuid: string
        address: string
        ipaddr: string | null
        handphone: string
        image: string | null
        description: string

    }) {
        this._full_name = body.full_name
        this._email = body.email
        this._birthday = body.birthday
        this._user_uuid = body.user_uuid
        this._address = body.address
        this._ipaddr = body.ipaddr
        this._handphone = body.handphone
        this._image = body.image
        this._description = body.description
    }

    get full_name(): string {
        return this._full_name
    }
    set full_name(full_name: string) {
        this._full_name = full_name
    }
    get email(): string {
        return this._email
    }
    set email(email: string) {
        this._email = email
    }
    get birthday(): string {
        return this._birthday
    }
    set birthday(birthday: string) {
        this._birthday = birthday
    }
    get address(): string {
        return this._address
    }
    set address(address: string) {
        this._address = address
    }
    get image(): string | null {
        return this._image
    }
    set image(image: string | null) {
        this._image = image
    }
    get user_uuid(): string {
        return this._user_uuid
    }
    set user_uuid(user_uuid: string) {
        this._user_uuid = user_uuid
    }
    get handphone(): string {
        return this._handphone
    }
    set handphone(handphone: string) {
        this._handphone = handphone
    }
    get ipaddr(): string | null {
        return this._ipaddr
    }
    set ipaddr(ipaddr: string | null) {
        this._ipaddr = ipaddr
    }
    get description(): string {
        return this._description
    }
    set description(description: string) {
        this._description = description
    }

}

export default CraeteRegistrationMemberRemas