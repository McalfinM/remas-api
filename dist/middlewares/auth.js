"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = exports.TOKEN_EXPIRE_TIME_IN_SECOND = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const date_1 = require("../helpers/date");
const errors_1 = require("../helpers/errors");
exports.TOKEN_EXPIRE_TIME_IN_SECOND = 60 * 60 * 24; // 24 hours
const authenticate = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            throw new errors_1.ErrorUnauthenticated('unauthenticated', "authenticate");
        }
        const token = authorization?.split(' ')[1];
        let decoded = jsonwebtoken_1.default.verify(token ?? '', process?.env?.JWT_SECRET ?? '');
        if (date_1.dateToUnixTimestamp(new Date()) > (decoded.iat + exports.TOKEN_EXPIRE_TIME_IN_SECOND)) {
            throw new errors_1.ErrorUnauthenticated('expired_token', "authenticate");
        }
        // getCacheData(`auth_update:::${decoded.uuid}`, (err, reply) => {
        //     let accountDataOnRedis: {[k: string]: any} = {}
        //     if (reply) {
        //         accountDataOnRedis = JSON.parse(reply)
        //     }
        //     console.log('accountDataOnRedis.uuid:', accountDataOnRedis.uuid)
        //     // prioritas menggunakan data dari redis
        //     if (accountDataOnRedis.uuid) {
        //         req.user = accountDataOnRedis
        //     } else {
        //         // jika token BELUM expire, maka gunakan data dari token
        //         req.user = decoded
        //     }
        //     console.log('req.user.uuid:', req.user?.uuid)
        //     next();
        // })
        req.user = {
            uuid: decoded.uuid,
            // roles: decoded.roles,
            // accesses: decoded.accesses,
            name: decoded.name,
            email: decoded.email,
            // phone_number: decoded.phone_number,
            iat: decoded.iat,
        };
        next();
    }
    catch (err) {
        return res.status(500).json({
            message: "something error"
        });
    }
};
exports.authenticate = authenticate;
// export const authorize = (allowedAccesses: string[]) => (req: Request, res: Response, next: NextFunction): void => {
//     let isAllowed = false
//     const userAccesses: string[] = req.user.accesses
//     for (let i = 0; i < allowedAccesses.length; i++) {
//         if (userAccesses.includes(allowedAccesses[i])) {
//             isAllowed = true
//         }
//     }
//     if (isAllowed === true) {
//         next()
//     } else {
//         return HttpErrorHandler(new ErrorUnauthenticated('unauthenticated', "authenticate"), req, res)
//     }
// }
// export interface AuthUserInterface {
//     uuid: string
//     roles: string[]
//     accesses: string[]
//     full_name: string
//     email: string
//     phone_number: string
//     iat: number
// }
