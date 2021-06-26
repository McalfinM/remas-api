
import BaseEntity from "./baseEntity";
import { IComment } from "./interfaces/comment";

class CommentEntity extends BaseEntity {
    protected _uuid: string
    protected _user_uuid: string
    protected _comment: string
    protected _post_uuid: string
    protected _created_at: Date | null
    protected _updated_at: Date | null
    protected _deleted_at: Date | null

    constructor(params: IComment) {
        super();
        this._uuid = params.uuid
        this._user_uuid = params.user_uuid
        this._comment = params.comment
        this._post_uuid = params.post_uuid
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
    get user_uuid(): string {
        return this._user_uuid
    }

    set user_uuid(user_uuid: string) {
        this._user_uuid = user_uuid
    }
    get comment(): string {
        return this._comment
    }

    set comment(comment: string) {
        this._comment = comment
    }
    get post_uuid(): string {
        return this._post_uuid
    }

    set post_uuid(post_uuid: string) {
        this._post_uuid = post_uuid
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

    set deleted_at(deleted_at: Date | null) {
        this._deleted_at = deleted_at
    }
    get deleted_at(): Date | null {
        return this._deleted_at
    }

    set updated_at(updated_at: Date | null) {
        this._updated_at = updated_at
    }

    toJson(): object {
        return {
            uuid: this._uuid,
            user_uuid: this._user_uuid,
            comment: this._comment,
            post_uuid: this._post_uuid,
            created_at: this._created_at,
            deleted_at: this._deleted_at,
            updated_at: this._updated_at,
        };
    }

    toListData(): {} {
        return {
            uuid: this._uuid,
            user_uuid: this._user_uuid,
            comment: this._comment,
            post_uuid: this._post_uuid,
            created_at: this._created_at,
            deleted_at: this._deleted_at,
            updated_at: this._updated_at,
        };
    }

    toDetailData(): {} {
        return {
            uuid: this._uuid,
            user_uuid: this._user_uuid,
            comment: this._comment,
            post_uuid: this._post_uuid,
            created_at: this._created_at,
            deleted_at: this._deleted_at,
            updated_at: this._updated_at,
        };
    }
}

export default CommentEntity;
