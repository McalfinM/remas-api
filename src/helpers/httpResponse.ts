import { Request, Response } from 'express'

class HttpResponse {
  success(req: Request, res: Response, data?: any): Response {
    return res.status(200).jsonp(data)
  }

  created(req: Request, res: Response, data?: any): Response {
    return res.status(201).jsonp(data)
  }

  errorRequest(req: Request, res: Response, data?: any): Response {
    return res.status(400).jsonp(data)
  }

  notFound(req: Request, res: Response, data?: any): Response {
    return res.status(404).jsonp(data)
  }

  unprocessable(req: Request, res: Response, data?: any): Response {
    return res.status(422).jsonp(data)
  }

  errorServer(req: Request, res: Response, data?: any): Response {
    return res.status(500).jsonp(data)
  }
}

export default new HttpResponse()
