import { Request, Response } from 'express'

export interface IProfileController {
    index(req: Request, res: Response): Promise<Response>
    findOneBySlug(req: Request, res: Response): Promise<Response>
    profile(req: Request, res: Response): Promise<Response>
    update(req: Request, res: Response): Promise<Response>
}
