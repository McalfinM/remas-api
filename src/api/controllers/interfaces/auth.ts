import { Request, Response } from 'express'

export interface IAuthController {
    login(req: Request, res: Response): Promise<Response>
    register(req: Request, res: Response): Response | Promise<Response>
}
