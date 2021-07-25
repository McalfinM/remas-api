import { Request, Response } from 'express'

export interface IRequestRemasController {
    create(req: Request, res: Response): Promise<Response>
    findOne(req: Request, res: Response): Response | Promise<Response>
    delete(req: Request, res: Response): Response | Promise<Response>
    findWithUserUuid(req: Request, res: Response): Response | Promise<Response>
}
