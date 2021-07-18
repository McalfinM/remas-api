"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpResponse {
    success(req, res, data) {
        return res.status(200).jsonp(data);
    }
    created(req, res, data) {
        return res.status(201).jsonp(data);
    }
    errorRequest(req, res, data) {
        return res.status(400).jsonp(data);
    }
    notFound(req, res, data) {
        return res.status(404).jsonp(data);
    }
    unprocessable(req, res, data) {
        return res.status(422).jsonp(data);
    }
    errorServer(req, res, data) {
        return res.status(500).jsonp(data);
    }
}
exports.default = new HttpResponse();
