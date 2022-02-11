import { Next } from "koa"
import { Context } from "vm"
import { Decrypt, Encrypt } from '../../src/nets/secret'

function decrypt() {
    return async (ctx: Context, next: Next) => {
        if (Object.keys(ctx.request.body).length) {
            const encrypt = ctx.request.body.data
            const decrypt = Decrypt(encrypt)
            const res = decrypt === 'undefined' ? null : JSON.parse(decrypt)
            ctx.request.body = res
        }
        await next()
    }
}

function encrypt() {
    return async (ctx: Context, next: Next) => {
        await next()
        if (ctx.body) {
            const word = typeof ctx.body == 'object' ? JSON.stringify(ctx.body) : ctx.body.toString()
            const data = Encrypt(word)
            ctx.body = {
                data: data
            }
        }
    }
}

module.exports = {
    decrypt,
    encrypt
}