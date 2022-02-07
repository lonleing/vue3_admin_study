import { Context } from "koa"

const { post, get, del, put, patch, options, head, all, prefix } = require('../decorator')

@prefix('/greeter')
class Greeter {
    constructor () {}

    @post('/article')
    greet() {
        return "Hello, "
    }

    @get('/aaa')
    fn1 (ctx: Context) {
        ctx.body = 'adsadsa'
    }

    @del('/bbbb')
    fn2 () {
        return false
    }

    @put('/ccc')
    fn3 () {
        return false
    }

    @patch('/ddd')
    fn4 () {
        return false
    }

    @options('/eeee')
    fn5 () {
        return false
    }

    @head('/fff')
    fn6 () {
        return false
    }

    @all('/ggg')
    fn7 () {
        return true
    }
}

module.exports = Greeter