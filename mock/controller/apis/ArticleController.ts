import { Context } from "koa"
const ArticleModel = require('../../model/ArticleModel')
const BaseController = require('./BaseController')
const { prefix, get } = require('../../decorator')

@prefix('/article')
class ArticleController extends BaseController {
    @get('/list')
    async getArticleList(ctx: Context) {
        await ArticleController.isLogin(ctx, () => {
            const article = new ArticleModel()
            const res = { list: article.all() }
            ArticleController.success(ctx, res)
        })
    }

    @get('/info')
    async getArticleInfo(ctx: Context) {
        await ArticleController.isLogin(ctx, () => {
            return new Promise((resolve) => {
                const query = ctx.request.query
                const article = new ArticleModel()
                const res = article.where('id', query.id).get()
                setTimeout(() => {
                    ArticleController.success(ctx, res)
                    resolve(true)
                }, 1500)
            })
        })
    }
}

module.exports = ArticleController