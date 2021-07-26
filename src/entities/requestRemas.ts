
import BaseEntity from "./baseEntity";
import { IEmbed } from "./interfaces/post";
import { IIdulAdha, IMainInformation, IProfile, IZakat } from "./interfaces/profile";
import { IRequestRemas } from "./interfaces/requestRemas";

class RequestRemasEntity extends BaseEntity {
    protected _uuid: string
    protected _created_by: IEmbed
    protected _full_name: string
    protected _address: string
    protected _handphone: string
    protected _description: string
    protected _image: string
    protected _status: string
    protected _created_at: Date | null
    protected _updated_at: Date | null
    protected _deleted_at: Date | null

    constructor(params: IRequestRemas) {
        super();
        this._uuid = params.uuid
        this._created_by = params.created_by
        this._full_name = params.full_name
        this._address = params.address
        this._handphone = params.handphone
        this._description = params.description
        this._image = params.image
        this._status = params.status
        this._created_at = params.created_at
        this._updated_at = params.updated_at
        this._deleted_at = params.deleted_at
    }

    get uuid(): string {
        return this._uuid
    }
    set uuid(uuid: string) {
        this._uuid = uuid
    }
    get full_name(): string {
        return this._full_name
    }
    set full_name(full_name: string) {
        this._full_name = full_name
    }
    get created_by(): IEmbed {
        return this._created_by
    }

    get handphone(): string {
        return this._handphone
    }
    set handphone(handphone: string) {
        this._handphone = handphone
    }
    set created_by(created_by: IEmbed) {
        this._created_by = created_by
    }
    get address(): string {
        return this._address
    }
    set address(address: string) {
        this._address = address
    }
    get description(): string {
        return this._description
    }
    set description(description: string) {
        this._description = description
    }
    get image(): string {
        return this._image
    }
    set image(image: string) {
        this._image = image
    }
    get status(): string {
        return this._status
    }
    set status(status: string) {
        this._status = status
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

    toJson(): object {
        return {
            uuid: this.uuid,
            created_by: this.created_by,
            full_name: this.full_name,
            address: this.address,
            description: this.description,
            image: this.image,
        };
    }

    toListData(): {} {
        return {
            uuid: this.uuid,
            created_by: this.created_by,
            full_name: this.full_name,
            address: this.address,
            description: this.description,
            image: this.image,
        };
    }

    toDetailData(): {} {
        return {
            full_name: this.full_name,
            address: this.address,
            description: this.description,
            image: this.image,
        };
    }
}

export default RequestRemasEntity;
