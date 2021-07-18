
import { Response, Request } from "express";

interface ICustomError {
    error: Error
    message: string
    metadata?: object
    path: string
    statusCode: number
}

export function HttpErrorHandler(err: ICustomError, req: Request, res: Response): any {
    const internalServerErrorCode = 500
    const errorReponse: {
        message: string
        statusCode: number
    } = {
        message: err.message,
        statusCode: err.statusCode ?? internalServerErrorCode
    }

    if (!err.error) {
        err.error = <any>err
    }

    // Error internal message will not show to the api message
    if (errorReponse.statusCode == internalServerErrorCode) {
        errorReponse.message = "Internal Server Error"
    }

    console.log(err)
    return res.status(errorReponse.statusCode).jsonp(errorReponse)
}

export class CustomError extends Error implements ICustomError {
    protected code: number = 500

    constructor(message: string, protected currentPath: string, public metadata?: object) {
        super(message);
    }

    get error(): Error {
        return this
    }

    get path(): string {
        return this.currentPath
    }

    get statusCode(): number {
        return this.code
    }
}

export class ErrorNotFound extends CustomError {
    protected code: number = 404

    constructor(message: string, currentPath: string, public metadata?: object) {
        super(message, currentPath, metadata);
        Object.setPrototypeOf(this, ErrorNotFound.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}

export class ErrorUnprocessableEntity extends CustomError {
    protected code: number = 422

    constructor(message: string, currentPath: string, public metadata?: object) {
        super(message, currentPath, metadata);
        Object.setPrototypeOf(this, ErrorUnprocessableEntity.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}

export class ErrorInternalServerError extends CustomError {
    protected code: number = 500

    constructor(message: string, currentPath: string, public metadata?: object) {
        super(message, currentPath, metadata);
        Object.setPrototypeOf(this, ErrorInternalServerError.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}

export class ErrorBadRequest extends CustomError {
    protected code: number = 400

    constructor(message: string, currentPath: string, public metadata?: object) {
        super(message, currentPath, metadata);
        Object.setPrototypeOf(this, ErrorBadRequest.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}

export class ErrorUnauthenticated extends CustomError {
    protected code: number = 403

    constructor(message: string, currentPath: string, public metadata?: object) {
        super(message, currentPath, metadata);
        Object.setPrototypeOf(this, ErrorBadRequest.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}


export class ErrorUnauthorized extends CustomError {
    protected code: number = 401

    constructor(message: string, currentPath: string, public metadata?: object) {
        super(message, currentPath, metadata);
        Object.setPrototypeOf(this, ErrorBadRequest.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}