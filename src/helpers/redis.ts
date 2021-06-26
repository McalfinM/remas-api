import redis from 'redis'
import { dateToUnixTimestamp } from './date'

export const TOKEN_EXPIRE_TIME_IN_SECOND = 60 * 15

const redisClient = redis.createClient({
    host: process.env?.REDIS_HOST ?? 'localhost',
    port: +(process.env?.REDIS_PORT ?? 6379),
})

redisClient.on('error', (error) => {
    console.error('redis client error:', error);
})

export const setCacheData = (key: string, value: string, expire_time_in_second: number = TOKEN_EXPIRE_TIME_IN_SECOND) => {
    redisClient.set(key, value, (err, reply) => {
        if (err === null) {
            // console.log(`Caching ${key}:`, reply)
            redisClient.expireat(key, dateToUnixTimestamp(new Date()) + expire_time_in_second)
        }
    })
}

export const getCacheData = async (key: string, callback: { (error: Error | null, reply: string | null): void }) => {
    redisClient.get(key, callback)
}
