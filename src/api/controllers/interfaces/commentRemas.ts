import { Request, Response } from 'express'

export interface ICommentRemasController {
    create(req: Request, res: Response): Promise<Response>
    update(req: Request, res: Response): Response | Promise<Response>
    findOne(req: Request, res: Response): Response | Promise<Response>
    delete(req: Request, res: Response): Response | Promise<Response>
}
