"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_typed_1 = require("ts-typed");
class BaseEntity {
    constructor() { }
    toJSON() {
        let _this = this;
        Object.keys(this).forEach(key => {
            if (typeof _this[key] === 'object' && _this[key] && _this[key].toJSON) {
                _this[key] = _this[key].toJSON();
            }
            if (_this[key] instanceof Array) {
                _this[key] = _this[key].map((row) => typeof row === 'object' && row && row.toJSON ? row.toJSON() : row);
            }
        });
        return ts_typed_1.TypedSerializer.serialize(this);
    }
}
exports.default = BaseEntity;
