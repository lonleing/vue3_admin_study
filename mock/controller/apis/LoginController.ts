import { Context } from "vm"
const { prefix, post } = require('../../decorator')
const User = require('../../model/userModel')
const cryptoJS = require('crypto-js')
const BaseController = require('./BaseController')

@prefix('/login')
class LoginController extends BaseController {
    
    @post()
    postLogin(ctx: Context) {
        const verify = LoginController.verify(ctx.request.body, {
            username: 'required',
            password: 'required'
        }, {
            'username.required': '用户名不能为空',
            'password.required': '密码不能为空'
        })
        if (verify) {
            return LoginController.error(ctx, 400, verify)
        }

        const username = ctx.request.body.username
        const password = cryptoJS.MD5(ctx.request.body.password||'').toString()
        const user = new User()
        const res = user.where('username', username).select(['id', 'username']).get()
        if (res && res.password == password) {
            LoginController.success(ctx, res)
        } else {
            LoginController.error(ctx, 401.1, '用户名或密码错误！')
        }
    }
}

module.exports = LoginController