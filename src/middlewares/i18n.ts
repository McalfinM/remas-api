import { Request, Response, NextFunction } from "express";
import  httpContext from 'express-http-context' ;

export async function changeLang(req: Request, res: Response, next: NextFunction) {
    const lang = req.headers.lang as string ? req.headers.lang as string : "id"
    await req.i18n.changeLanguage(lang)
    next()
}

export function trans(req: Request,res: Response, next: NextFunction){
    httpContext.set('translate', req.t)
    next()
}