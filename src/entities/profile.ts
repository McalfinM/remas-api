
import BaseEntity from "./baseEntity";
import { IIdulAdha, IMainInformation, IProfile, IZakat } from "./interfaces/profile";

class ProfileEntity extends BaseEntity {
    protected _uuid?: string
    protected _user_uuid?: string
    protected _slug: string
    protected _main_information: IMainInformation | null
    protected _roles?: string[]
    protected _ramadhan?: IZakat | null
    protected _idul_adha?: IIdulAdha | null

    constructor(params: IProfile) {
        super();
        this._uuid = params.uuid
        this._user_uuid = params.user_uuid
        this._slug = params.slug
        this._main_information = params.main_information
        this._ramadhan = params.ramadhan
        this._idul_adha = params.idul_adha
        this._roles = params.roles
    }

    get uuid(): string | undefined {
        return this._uuid
    }
    set uuid(uuid: string | undefined) {
        this._uuid = uuid
    }
    get slug(): string {
        return this._slug
    }
    set slug(slug: string) {
        this._slug = slug
    }
    get user_uuid(): string | undefined {
        return this._user_uuid
    }
    get roles(): string[] | undefined {
        return this._roles
    }
    set roles(roles: string[] | undefined) {
        this._roles = roles
    }
    set user_uuid(user_uuid: string | undefined) {
        this._user_uuid = user_uuid
    }
    get main_information(): IMainInformation | null {
        return this._main_information
    }
    set main_information(main_information: IMainInformation | null) {
        this._main_information = main_information
    }
    get ramadhan(): IZakat | null | undefined {
        return this._ramadhan
    }
    set ramadhan(ramadhan: IZakat | null | undefined) {
        this._ramadhan = ramadhan
    }
    get idul_adha(): IIdulAdha | null | undefined {
        return this._idul_adha
    }
    set idul_adha(idul_adha: IIdulAdha | null | undefined) {
        this._idul_adha = idul_adha
    }

    toJson(): object {
        return {
            uuid: this.uuid,
            user_uuid: this.user_uuid,
            slug: this.slug,
            main_information: this.main_information,
            ramadhan: this.ramadhan,
            idul_adha: this.idul_adha,
        };
    }

    toListData(): {} {
        return {
            uuid: this.uuid,
            user_uuid: this.user_uuid,
            slug: this.slug,
            main_information: this.main_information,
            ramadhan: this.ramadhan,
            idul_adha: this.idul_adha,
        };
    }

    toDetailData(): {} {
        return {
            uuid: this.uuid,
            user_uuid: this.user_uuid,
            slug: this.slug,
            main_information: this.main_information,
            ramadhan: this.ramadhan,
            idul_adha: this.idul_adha,
        };
    }
}

export default ProfileEntity;
