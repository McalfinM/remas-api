import httpContext from 'express-http-context'
export function translate(message:string):string {
     return httpContext.get('translate')(message)
    
}