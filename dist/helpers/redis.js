"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCacheData = exports.setCacheData = exports.TOKEN_EXPIRE_TIME_IN_SECOND = void 0;
const redis_1 = __importDefault(require("redis"));
const date_1 = require("./date");
exports.TOKEN_EXPIRE_TIME_IN_SECOND = 60 * 15;
const redisClient = redis_1.default.createClient({
    host: process.env?.REDIS_HOST ?? 'localhost',
    port: +(process.env?.REDIS_PORT ?? 6379),
});
redisClient.on('error', (error) => {
    console.error('redis client error:', error);
});
const setCacheData = (key, value, expire_time_in_second = exports.TOKEN_EXPIRE_TIME_IN_SECOND) => {
    redisClient.set(key, value, (err, reply) => {
        if (err === null) {
            // console.log(`Caching ${key}:`, reply)
            redisClient.expireat(key, date_1.dateToUnixTimestamp(new Date()) + expire_time_in_second);
        }
    });
};
exports.setCacheData = setCacheData;
const getCacheData = async (key, callback) => {
    redisClient.get(key, callback);
};
exports.getCacheData = getCacheData;
