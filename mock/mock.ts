import { Context, Next } from "koa"

const addRouter = require('./router')
const mockConfig = require('../src/config/default/mock.config')
const Koa = require('koa')
const KoaRouter = require('koa-router')
const cors = require('koa-cors')
const bodyParser = require('koa-bodyparser')
const aes = require('./middleware/aesMiddleware')

const app = new Koa()
const router = new KoaRouter()
addRouter(router)

app.use(cors({
    origin: function () {
        return mockConfig.originUrl
    }
}))
app.use(bodyParser())
app.use(aes.decrypt())
app.use(aes.encrypt())
app.use(router.routes())
app.use(router.allowedMethods())
router.get('/',async (ctx:Context, next: Next) => {
    await next()
    ctx.body = `
        <div style="display: flex;align-items: center;justify-content: center;background: #f2f2f2; color: black;flex-direction: column">
            <h1>Welcome to ZMock</h1>
            <h3 style="font-weight: 400">Author: Mr.Z</h3>
        <div>
    `
})


app.listen(mockConfig.port, function () {
    console.log(`Server running on http://${mockConfig.host}:${mockConfig.port}`)
})