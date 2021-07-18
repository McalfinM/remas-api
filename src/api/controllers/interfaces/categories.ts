import { Request, Response } from 'express'

export interface ICategoryConrtoller {
    findAll(req: Request, res: Response): Promise<Response>
}
