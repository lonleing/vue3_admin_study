import { Context } from "koa"

const User = require('../../model/UserModel')

interface Rule {
    [x: string]: string
}

class BaseController {
    protected static isLogin(ctx: Context, callback?: () => Promise<any>|void) {
        return new Promise((resolve, reject) => {
            const token = ctx.request.header.token
            const user = new User()
            const res = user.where('token', token).get()
            if (res && callback) {
                const call = callback()
                if (call && call.then) {
                    return call.then(() => {
                        resolve(true)
                    })
                }
                return resolve(true)
            }
            reject()
        }).catch(() => {
            BaseController.error(ctx, 401, '未登录')
        })
    }

    protected static error(ctx: Context, code: number, message: string) {
        ctx.body = {
            code,
            message
        }
    }

    protected static success(ctx: Context, data: any) {
        ctx.append('access-response-type-api', 'api')
        ctx.body = {
            code: 200,
            data
        }
    }

    protected static verify(data: any, rules: Rule, messages: Rule) {
        for (let field in rules) {
            const ruleArr = rules[field].split('|')
            for (let i in ruleArr) {
                const rule = ruleArr[i]
                if (rule == 'required' && !data[field]) {
                    return messages[`${field}.${rule}`]
                }
            }
        }
        return false
    }
}

module.exports = BaseController