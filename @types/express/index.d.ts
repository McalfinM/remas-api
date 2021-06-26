declare namespace Express {
    import { AuthUserInterface } from '../../src/middlewares/auth'
    interface Request {
        user: any
        t: any
    }
}
