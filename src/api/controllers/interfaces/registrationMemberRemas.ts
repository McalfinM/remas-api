import { Request, Response } from 'express'

export interface IRegistrationMemberRemasController {
    create(req: Request, res: Response): Promise<Response>
    index(req: Request, res: Response): Promise<Response>
    findOne(req: Request, res: Response): Promise<Response>
}
