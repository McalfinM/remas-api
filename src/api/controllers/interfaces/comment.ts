import { Request, Response } from 'express'

export interface ICommentController {
    create(req: Request, res: Response): Promise<Response>
    update(req: Request, res: Response): Response | Promise<Response>
    findOne(req: Request, res: Response): Response | Promise<Response>
    delete(req: Request, res: Response): Response | Promise<Response>
}
