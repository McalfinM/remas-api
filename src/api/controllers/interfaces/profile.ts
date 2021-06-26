import { Request, Response } from 'express'

export interface IProfileController {
    index(req: Request, res: Response): Promise<Response>

}
