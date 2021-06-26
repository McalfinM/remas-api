import { IEmbed } from "../../entities/interfaces/post"

class CreatePostRequest {
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


    constructor(body: {
        uuid: string | null
        title: string | null
        content: string | null
        category: string
        created_by: IEmbed | null
        image: string | null
        slug: string | null
        cloudinary_id: string | null
        created_at: Date | null
        updated_at: Date | null
        deleted_at: Date | null

    }) {
        this._uuid = body.uuid
        this._title = body.title
        this._content = body.content
        this._category = body.category
        this._created_by = body.created_by
        this._image = body.image
        this._slug = body.slug
        this._cloudinary_id = body.cloudinary_id
        this._created_at = body.created_at
        this._updated_at = body.updated_at
        this._deleted_at = body.deleted_at
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

}

export default CreatePostRequest