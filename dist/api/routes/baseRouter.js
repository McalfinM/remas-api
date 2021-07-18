"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class BaseRouter {
    router;
    constructor() {
        this.router = express_1.Router();
    }
    bind(_this) {
        Object.getOwnPropertyNames(Object.getPrototypeOf(_this)).map((fname) => {
            _this[fname] = _this[fname].bind(_this);
        });
        return _this;
    }
    bindings() {
        const _this = this;
        Object.getOwnPropertyNames(this).map((cname) => {
            if (['router'].indexOf(cname) == -1) {
                Object.getOwnPropertyNames(Object.getPrototypeOf(_this[cname])).map((fname) => {
                    if (_this[cname][fname] && _this[cname][fname].bind) {
                        _this[cname][fname] = _this[cname][fname].bind(_this[cname]);
                    }
                });
            }
        });
        return _this;
    }
}
exports.default = BaseRouter;
