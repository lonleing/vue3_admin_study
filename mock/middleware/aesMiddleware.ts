import { Next } from "koa"
import { Context } from "vm"
import { Decrypt, Encrypt } from '../../src/nets/secret'

function decrypt () {
    return async (ctx: Context, next: Next) => {
        if (ctx.request.body) {
            const encrypt = ctx.request.body.data
            const res = JSON.parse(Decrypt(encrypt))
            ctx.request.body = res
        }
        await next()
    }
}

function encrypt () {
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