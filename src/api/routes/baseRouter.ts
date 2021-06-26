import { Router } from 'express'
import IRouter from './interfaces/router';


abstract class BaseRouter implements IRouter {
  public router: Router

  constructor() {
    this.router = Router()
  }

  abstract routes(): IRouter

  protected bind<T>(_this:T | any):T {
    Object.getOwnPropertyNames(Object.getPrototypeOf(_this)).map((fname:any) => {
      _this[fname] = _this[fname].bind(_this)
    })
    return _this
  }

  protected bindings(): IRouter{
    const _this:any = this
    Object.getOwnPropertyNames(this).map((cname:string) => {
      if(['router'].indexOf(cname) == -1){
        Object.getOwnPropertyNames(Object.getPrototypeOf(_this[cname])).map((fname:any) => {
          if(_this[cname][fname] && _this[cname][fname].bind){
            _this[cname][fname] = _this[cname][fname].bind(_this[cname])
          }
        })
      }
    })
    
    return _this
  }
}

export default BaseRouter
