
import BaseEntity from "./baseEntity";
import { IEmbed } from "./interfaces/post";
import { IRegistrationMemberRemas } from "./interfaces/registrationMemberList";

class RegistrationMemberRemasEntity extends BaseEntity {
    protected _uuid: string
    protected _full_name: string
    protected _email: string
    protected _birthday: string
    protected _address: string
    protected _handphone: string
    protected _created_by?: IEmbed | null
    protected _ipaddr: string | null
    protected _image: string | null
    protected _user_uuid: string
    protected _description: string | null
    protected _created_at: Date
    protected _updated_at: Date
    protected _deleted_at: Date | null
    constructor(params: IRegistrationMemberRemas) {
        super();
        this._uuid = params.uuid
        this._full_name = params.full_name
        this._email = params.email
        this._birthday = params.birthday
        this._address = params.address
        this._handphone = params.handphone
        this._created_by = params.created_by
        this._description = params.description
        this._ipaddr = params.ipaddr
        this._image = params.image
        this._user_uuid = params.user_uuid
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
    get image(): string | null {
        return this._image
    }
    set image(image: string | null) {
        this._image = image
    }
    get address(): string {
        return this._address
    }
    set address(address: string) {
        this._address = address
    }
    get handphone(): string {
        return this._handphone
    }
    set handphone(handphone: string) {
        this._handphone = handphone
    }
    get created_by(): IEmbed | undefined | null {
        return this._created_by
    }
    set created_by(created_by: IEmbed | undefined | null) {
        this._created_by = created_by
    }
    get user_uuid(): string {
        return this._user_uuid
    }
    set user_uuid(user_uuid: string) {
        this._user_uuid = user_uuid
    }
    get ipaddr(): string | null {
        return this._ipaddr
    }
    set ipaddr(ipaddr: string | null) {
        this._ipaddr = ipaddr
    }
    get description(): string | null {
        return this._description
    }
    set description(description: string | null) {
        this._description = description
    }
    get created_at(): Date {
        return this._created_at
    }
    set created_at(created_at: Date) {
        this._created_at = created_at
    }
    get updated_at(): Date {
        return this._updated_at
    }
    set updated_at(updated_at: Date) {
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
            full_name: this.full_name,
            email: this.email,
            birthday: this.birthday,
            address: this.address,
            handphone: this.handphone,
            created_by: this.created_by,
            image: this.image,
            user_uuid: this.user_uuid,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
        };
    }

    toListData(): {} {
        return {
            uuid: this.uuid,
            full_name: this.full_name,
            birthday: this.birthday,
            image: this.image,
        };
    }

    toDetailData(): {} {
        return {
            uuid: this.uuid,
            full_name: this.full_name,
            email: this.email,
            birthday: this.birthday,
            address: this.address,
            handphone: this.handphone,
            created_by: this.created_by,
            description: this.description,
            image: this.image,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
        };
    }
}

export default RegistrationMemberRemasEntity;
