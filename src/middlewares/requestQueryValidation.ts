import { Request, Response, NextFunction, query } from 'express'
import HttpResponse from '../helpers/httpResponse'

const allowPositiveIntegerAndUndefinedPattern: RegExp = new RegExp(/^[0-9]*$/)

class RequestQueryValidation {

  validatePage(req: Request, res: Response, next: NextFunction): void {
    const { query: { page } } = req
    if (page) {
      if (allowPositiveIntegerAndUndefinedPattern.test(page as string)) {
        next()
      } else {
        HttpResponse.errorRequest(req, res)
      }
    } else {
      next()
    }
  }

  validateLimit(req: Request, res: Response, next: NextFunction): void {
    const { query: { limit } } = req
    if (limit) {
      if (allowPositiveIntegerAndUndefinedPattern.test(limit as string)) {
        next()
      } else {
        HttpResponse.errorRequest(req, res)
      }
    } else {
      next()
    }
  }

}

export default new RequestQueryValidation()
