
import BaseEntity from "./baseEntity";
import { ITokenEntity } from "./interfaces/token";

class TokenEntity extends BaseEntity {
    protected _uuid: string
    protected _user_uuid: string
    protected _token: string
    protected _revoked: boolean
    protected _activity: string
    protected _email: string
    protected _created_at: Date | null
    protected _updated_at: Date | null


    constructor(params: ITokenEntity) {
        super();
        this._uuid = params.uuid
        this._user_uuid = params.user_uuid
        this._email = params.email
        this._revoked = params.revoked
        this._activity = params.activity
        this._token = params.token
        this._created_at = params.created_at
        this._updated_at = params.updated_at

    }

    get uuid(): string {
        return this._uuid;
    }

    set uuid(uuid: string) {
        this._uuid = uuid;
    }

    get user_uuid(): string {
        return this._user_uuid
    }
    get activity(): string {
        return this._activity
    }
    set activity(activity: string) {
        this._activity = activity
    }

    set user_uuid(user_uuid: string) {
        this._user_uuid = user_uuid
    }

    get email(): string {
        return this._email
    }

    set email(email: string) {
        this._email = email
    }


    get revoked(): boolean {
        return this._revoked
    }

    set revoked(revoked: boolean) {
        this._revoked = revoked
    }

    get token(): string {
        return this._token
    }

    set token(token: string) {
        this._token = token
    }

    get created_at(): Date | null {
        return this._created_at;
    }

    set created_at(created_at: Date | null) {
        this._created_at = created_at;
    }

    get updated_at(): Date | null {
        return this._updated_at;
    }

    set updated_at(updated_at: Date | null) {
        this._updated_at = updated_at;
    }

    toJson(): object {
        return {
            uuid: this.uuid,
            user_user_uuid: this.user_uuid,
            revoked: this.revoked,
            created_at: this.created_at,
            updated_at: this.updated_at,
        };
    }

    toListData(): {} {
        return {
            uuid: this.uuid,
            user_user_uuid: this.user_uuid,
            revoked: this.revoked,
            created_at: this.created_at,
            updated_at: this.updated_at,
        };
    }

    toDetailData(): {} {
        return {
            uuid: this.uuid,
            user_user_uuid: this.user_uuid,
            revoked: this.revoked,
            created_at: this.created_at,
            updated_at: this.updated_at,
        };
    }
}

export default TokenEntity;
