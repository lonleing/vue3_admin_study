import { Context, Next } from 'koa'
import mockConfig = require('../src/config/default/mock.config')
const Koa = require('koa')
// const KoaRouter = require('koa-router')
// import addRouter = require('./router')

const app = new Koa()
// const router = new KoaRouter()

// app.use(async function (ctx: Context, next: Next) {
//     const start = Date.now()
//     await next()
//     const ms = Date.now() - start
//     ctx.set('X-Response-Time', `${ms}ms`)
//     console.log(ctx)
// })
// app.use(async function (ctx: Context) {
//     ctx.body = 'Hello World'
// })
app.use(async function (ctx: Context, next: Next) {
    ctx.throw(404)
})

// addRouter(router)
// app.use(router.routes())

app.on('error', function (err: Error) {
    console.log(err)
})

app.listen(mockConfig.port, function () {
    console.log(`Server running on http://localhost:${mockConfig.port}`)
})