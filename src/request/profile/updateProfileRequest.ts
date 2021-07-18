import { IEmbed } from "../../entities/interfaces/post"
import { IIdulAdha, IZakat } from "../../entities/interfaces/profile"

class UpdateProfileRequest {
    protected _nickname: string | null
    protected _full_name: string | null
    protected _address: string | null
    protected _birthday: string | null
    protected _cloudinary_id: string | null
    protected _description: string | null
    protected _visi: string | null
    protected _misi: string | null
    protected _image: string | null
    protected _idul_adha: IIdulAdha | null
    protected _ramadhan: IZakat | null


    constructor(body: {
        nickname: string | null
        full_name: string | null
        visi: string | null
        misi: string | null
        birthday: string | null
        description: string | null
        cloudinary_id: string | null
        address: string | null
        image: string | null
        idul_adha: IIdulAdha | null
        ramadhan: IZakat | null

    }) {
        this._nickname = body.nickname
        this._full_name = body.full_name
        this._visi = body.visi
        this._misi = body.misi
        this._description = body.description
        this._image = body.image
        this._cloudinary_id = body.cloudinary_id
        this._address = body.address
        this._birthday = body.birthday
        this._idul_adha = body.idul_adha
        this._ramadhan = body.ramadhan
    }

    get nickname(): string | null {
        return this._nickname
    }
    set nickname(nickname: string | null) {
        this._nickname = nickname
    }
    get full_name(): string | null {
        return this._full_name
    }
    set full_name(full_name: string | null) {
        this._full_name = full_name
    }
    get visi(): string | null {
        return this._visi
    }
    set visi(visi: string | null) {
        this._visi = visi
    }
    get misi(): string | null {
        return this._misi
    }
    set misi(misi: string | null) {
        this._misi = misi
    }
    get description(): string | null {
        return this._description
    }
    set birthday(birthday: string | null) {
        this._birthday = birthday
    }
    get image(): string | null {
        return this._image
    }
    set description(description: string | null) {
        this._description = description
    }
    get address(): string | null {
        return this._address
    }
    set cloudinary_id(cloudinary_id: string | null) {
        this._cloudinary_id = cloudinary_id
    }
    get cloudinary_id(): string | null {
        return this._cloudinary_id
    }
    set address(address: string | null) {
        this._address = address
    }
    get birthday(): string | null {
        return this._birthday
    }
    set image(image: string | null) {
        this._image = image
    }
    get idul_adha(): IIdulAdha | null {
        return this._idul_adha
    }
    set idul_adha(idul_adha: IIdulAdha | null) {
        this._idul_adha = idul_adha
    }
    get ramadhan(): IZakat | null {
        return this._ramadhan
    }
    set ramadhan(ramadhan: IZakat | null) {
        this._ramadhan = ramadhan
    }

}

export default UpdateProfileRequest