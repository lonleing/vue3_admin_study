import { Context } from "koa"
const TabModel = require('../../model/TabModel')
const BaseController = require('./BaseController')
const { prefix, get } = require('../../decorator')

@prefix('/tab')
class ArticleController extends BaseController {
    @get('/getTab')
    async getTab(ctx: Context) {
        await ArticleController.isLogin(ctx, () => {
            const tab = new TabModel()
            const res = tab.all()
            ArticleController.success(ctx, res)
        })
    }
}

module.exports = ArticleController