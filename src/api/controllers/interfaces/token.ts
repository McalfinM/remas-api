import { Request, Response } from 'express'

export interface ITokenController {
    // create(req: Request, res: Response): Response | Promise<Response>
    update(req: Request, res: Response): Response | Promise<Response>
    findOne(req: Request, res: Response): Response | Promise<Response>
    findOneWithToken(req: Request, res: Response): Response | Promise<Response>
}
