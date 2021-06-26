import { TypedSerializer } from "ts-typed";


type ExcludeMethods<T> = Pick<T, { [K in keyof T]: T[K] extends (_: any) => any ? never : K }[keyof T]>;

abstract class BaseEntity {
  constructor() { }

  toJSON(): ExcludeMethods<this> {
    let _this: any = this
    Object.keys(this).forEach(key => {
      if (typeof _this[key] === 'object' && _this[key] && _this[key].toJSON) {
        _this[key] = _this[key].toJSON()
      }
      if (_this[key] instanceof Array) {
        _this[key] = _this[key].map((row: any) => typeof row === 'object' && row && row.toJSON ? row.toJSON() : row)
      }

    })

    return TypedSerializer.serialize(this)
  }
}

export default BaseEntity;
