"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorUnauthorized = exports.ErrorUnauthenticated = exports.ErrorBadRequest = exports.ErrorInternalServerError = exports.ErrorUnprocessableEntity = exports.ErrorNotFound = exports.CustomError = exports.HttpErrorHandler = void 0;
const js_1 = __importDefault(require("@bugsnag/js"));
function HttpErrorHandler(err, req, res) {
    const internalServerErrorCode = 500;
    const errorReponse = {
        message: err.message,
        statusCode: err.statusCode ?? internalServerErrorCode
    };
    if (!err.error) {
        err.error = err;
    }
    // Error internal message will not show to the api message
    if (errorReponse.statusCode == internalServerErrorCode) {
        errorReponse.message = "Internal Server Error";
    }
    console.log(err);
    js_1.default.notify(err.error, function (event) {
        event.severity = 'info';
        if (err.path) {
            event.addMetadata("path", { service: err.path.split(" ")[0], path: err.path });
        }
        if (err.metadata) {
            event.addMetadata("metadata", err.metadata);
        }
        if (req.user) {
            event.addMetadata("user", req.user);
            event.setUser(req.user.uuid, req.user.email, req.user.name);
        }
        event.addMetadata("request", {
            method: req.method,
            url: req.protocol + '://' + req.get('host') + req.originalUrl,
            body: req.body,
            params: req.params,
            query: req.query
        });
        event.addMetadata("response", errorReponse);
    });
    return res.status(errorReponse.statusCode).jsonp(errorReponse);
}
exports.HttpErrorHandler = HttpErrorHandler;
class CustomError extends Error {
    currentPath;
    metadata;
    code = 500;
    constructor(message, currentPath, metadata) {
        super(message);
        this.currentPath = currentPath;
        this.metadata = metadata;
    }
    get error() {
        return this;
    }
    get path() {
        return this.currentPath;
    }
    get statusCode() {
        return this.code;
    }
}
exports.CustomError = CustomError;
class ErrorNotFound extends CustomError {
    metadata;
    code = 404;
    constructor(message, currentPath, metadata) {
        super(message, currentPath, metadata);
        this.metadata = metadata;
        Object.setPrototypeOf(this, ErrorNotFound.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ErrorNotFound = ErrorNotFound;
class ErrorUnprocessableEntity extends CustomError {
    metadata;
    code = 422;
    constructor(message, currentPath, metadata) {
        super(message, currentPath, metadata);
        this.metadata = metadata;
        Object.setPrototypeOf(this, ErrorUnprocessableEntity.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ErrorUnprocessableEntity = ErrorUnprocessableEntity;
class ErrorInternalServerError extends CustomError {
    metadata;
    code = 500;
    constructor(message, currentPath, metadata) {
        super(message, currentPath, metadata);
        this.metadata = metadata;
        Object.setPrototypeOf(this, ErrorInternalServerError.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ErrorInternalServerError = ErrorInternalServerError;
class ErrorBadRequest extends CustomError {
    metadata;
    code = 400;
    constructor(message, currentPath, metadata) {
        super(message, currentPath, metadata);
        this.metadata = metadata;
        Object.setPrototypeOf(this, ErrorBadRequest.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ErrorBadRequest = ErrorBadRequest;
class ErrorUnauthenticated extends CustomError {
    metadata;
    code = 403;
    constructor(message, currentPath, metadata) {
        super(message, currentPath, metadata);
        this.metadata = metadata;
        Object.setPrototypeOf(this, ErrorBadRequest.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ErrorUnauthenticated = ErrorUnauthenticated;
class ErrorUnauthorized extends CustomError {
    metadata;
    code = 401;
    constructor(message, currentPath, metadata) {
        super(message, currentPath, metadata);
        this.metadata = metadata;
        Object.setPrototypeOf(this, ErrorBadRequest.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ErrorUnauthorized = ErrorUnauthorized;
