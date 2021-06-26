

class UpdatePostRequest {
    protected _title: string | null
    protected _content: string | null
    protected _category: string
    protected _image: string | null
    protected _cloudinary_id: string | null


    constructor(body: {
        title: string | null
        content: string | null
        category: string
        image: string | null
        cloudinary_id: string | null

    }) {
        this._title = body.title
        this._content = body.content
        this._category = body.category
        this._image = body.image
        this._cloudinary_id = body.cloudinary_id
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

    get image(): string | null {
        return this._image
    }
    set image(image: string | null) {
        this._image = image
    }

    get cloudinary_id(): string | null {
        return this._cloudinary_id
    }
    set cloudinary_id(cloudinary_id: string | null) {
        this._cloudinary_id = cloudinary_id
    }

}

export default UpdatePostRequest