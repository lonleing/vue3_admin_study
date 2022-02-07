const addRouter = require('./router')
const mockConfig = require('../src/config/default/mock.config')
const Koa = require('koa')
const KoaRouter = require('koa-router')

const app = new Koa()
const router = new KoaRouter()

addRouter(router)
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(mockConfig.port, function () {
    console.log(`Server running on http://${mockConfig.host}:${mockConfig.port}`)
})