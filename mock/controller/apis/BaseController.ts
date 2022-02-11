import { Context } from "koa"

const User = require('../../model/UserModel')

interface Rule {
    [x: string]: string
}

class BaseController {
    protected static isLogin(ctx: Context, callback?: () => void) {
        const token = ctx.request.header.token
        const user = new User()
        const res = user.where('token', token).get()
        if (res && callback) {
            callback()
        } else {
            BaseController.error(ctx, 401, '未登录')
        }
    }

    protected static error(ctx: Context, code: number, message: string) {
        ctx.body = {
            code,
            message
        }
    }

    protected static success(ctx: Context, data: any) {
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