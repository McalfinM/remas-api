
import BaseEntity from "./baseEntity";
import { ICommentRemas } from "./interfaces/commentRemas";
import { IEmbed } from "./interfaces/post";

class CommentRemasEntity extends BaseEntity {
    protected _uuid: string
    protected _created_by: IEmbed
    protected _comment: string
    protected _remas_uuid: string
    protected _ip_address?: string | null
    protected _created_at: Date | null
    protected _updated_at: Date | null
    protected _deleted_at?: Date | null

    constructor(params: ICommentRemas) {
        super();
        this._uuid = params.uuid
        this._created_by = params.created_by
        this._comment = params.comment
        this._remas_uuid = params.remas_uuid
        this._ip_address = params.ip_address
        this._created_at = params.created_at
        this._deleted_at = params.deleted_at
        this._updated_at = params.updated_at
    }

    get uuid(): string {
        return this._uuid
    }

    set uuid(uuid: string) {
        this._uuid = uuid
    }
    get created_by(): IEmbed {
        return this._created_by
    }

    set created_by(created_by: IEmbed) {
        this._created_by = created_by
    }
    get comment(): string {
        return this._comment
    }

    set comment(comment: string) {
        this._comment = comment
    }

    get ip_address(): string | null | undefined {
        return this._ip_address
    }

    set ip_address(ip_address: string | null | undefined) {
        this._ip_address = ip_address
    }

    get remas_uuid(): string {
        return this._remas_uuid
    }

    set remas_uuid(remas_uuid: string) {
        this._remas_uuid = remas_uuid
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

    set deleted_at(deleted_at: Date | null | undefined) {
        this._deleted_at = deleted_at
    }
    get deleted_at(): Date | null | undefined {
        return this._deleted_at
    }

    set updated_at(updated_at: Date | null) {
        this._updated_at = updated_at
    }

    toJson(): object {
        return {
            uuid: this._uuid,
            created_by: this._created_by,
            comment: this._comment,
            remas_uuid: this._remas_uuid,
            ip_address: this._ip_address,
            created_at: this._created_at,
            deleted_at: this._deleted_at,
            updated_at: this._updated_at,
        };
    }

    toListData(): object {
        return {
            uuid: this._uuid,
            created_by: this._created_by,
            comment: this._comment,
            remas_uuid: this._remas_uuid,
            created_at: this._created_at,
            updated_at: this._updated_at,
        };
    }

    toDetailData(): {} {
        return {
            uuid: this._uuid,
            created_by: this._created_by,
            comment: this._comment,
            remas_uuid: this._remas_uuid,
            ip_address: this._ip_address,
            created_at: this._created_at,
            deleted_at: this._deleted_at,
            updated_at: this._updated_at,
        };
    }
}

export default CommentRemasEntity;
