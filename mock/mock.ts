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


app.listen(mockConfig.port, function () {
    console.log(`Server running on http://${mockConfig.host}:${mockConfig.port}`)
})