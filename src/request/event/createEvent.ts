import { IEmbed } from "../../entities/interfaces/post"

class CreateEventRequest {
    protected _uuid: string | null
    protected _title: string | null
    protected _content: string | null
    protected _category: string
    protected _created_by: IEmbed | null
    protected _time: Date | null
    protected _date: Date | null
    protected _place: string | null
    protected _image: string | null
    protected _slug: string | null
    protected _cloudinary_id: string


    constructor(body: {
        uuid: string | null
        title: string | null
        content: string | null
        category: string
        created_by: IEmbed | null
        time: Date | null
        date: Date | null
        place: string | null
        image: string | null
        slug: string | null
        cloudinary_id: string

    }) {
        this._uuid = body.uuid
        this._title = body.title
        this._content = body.content
        this._category = body.category
        this._created_by = body.created_by
        this._time = body.time
        this._date = body.date
        this._place = body.place
        this._image = body.image
        this._slug = body.slug
        this._cloudinary_id = body.cloudinary_id
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
    get time(): Date | null {
        return this._time
    }
    set time(time: Date | null) {
        this._time = time
    }
    get date(): Date | null {
        return this._date
    }
    set date(date: Date | null) {
        this._date = date
    }
    get place(): string | null {
        return this._place
    }
    set place(place: string | null) {
        this._place = place
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
    get cloudinary_id(): string {
        return this._cloudinary_id
    }
    set cloudinary_id(cloudinary_id: string) {
        this._cloudinary_id = cloudinary_id
    }

}

export default CreateEventRequest