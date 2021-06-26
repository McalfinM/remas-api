
import BaseEntity from "./baseEntity";
import { IEmbed, IPost } from "./interfaces/post";


class PostEntity extends BaseEntity {
    protected _uuid: string | null
    protected _title: string | null
    protected _content: string | null
    protected _category: string
    protected _created_by: IEmbed | null
    protected _image: string | null
    protected _slug: string | null
    protected _cloudinary_id: string | null
    protected _created_at: Date | null
    protected _updated_at: Date | null
    protected _deleted_at: Date | null


    constructor(params: IPost) {
        super();
        this._uuid = params.uuid
        this._title = params.title
        this._content = params.content
        this._category = params.category
        this._created_by = params.created_by
        this._image = params.image
        this._slug = params.slug
        this._cloudinary_id = params.cloudinary_id
        this._created_at = params.created_at
        this._updated_at = params.updated_at
        this._deleted_at = params.deleted_at
    }

    get uuid(): string | null {
        return this._uuid
    }
    set uuid(uuid: string | null) {
        this._uuid = uuid
    }
    get title(): string | null {
        return this._title
    }
    set title(title: string | null) {
        this._title = title
    }
    get content(): string | null {
        return this._content
    }
    set content(content: string | null) {
        this._content = content
    }
    get category(): string {
        return this._category
    }
    set category(category: string) {
        this._category = category
    }
    get created_by(): IEmbed | null {
        return this._created_by
    }
    set created_by(created_by: IEmbed | null) {
        this._created_by = created_by
    }
    get image(): string | null {
        return this._image
    }
    set image(image: string | null) {
        this._image = image
    }
    get slug(): string | null {
        return this._slug
    }
    set slug(slug: string | null) {
        this._slug = slug
    }
    get cloudinary_id(): string | null {
        return this._cloudinary_id
    }
    set cloudinary_id(cloudinary_id: string | null) {
        this._cloudinary_id = cloudinary_id
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
            title: this.title,
            content: this.content,
            category: this.category,
            created_by: this.created_by,
            image: this.image,
            slug: this.slug,
            cloudinary_id: this.cloudinary_id,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
        };
    }

    toListData(): {} {
        return {
            title: this.title,
            category: this.category,
            image: this.image,
            slug: this.slug,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
        };
    }

    toDetailData(): {} {
        return {
            uuid: this.uuid,
            title: this.title,
            content: this.content,
            category: this.category,
            created_by: this.created_by,
            image: this.image,
            slug: this.slug,
            cloudinary_id: this.cloudinary_id,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
        };
    }
}

export default PostEntity;
