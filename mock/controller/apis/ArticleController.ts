import { Context } from "koa"
const ArticleModel = require('../../model/articleModel')
const BaseController = require('./BaseController')
const { prefix, get } = require('../../decorator')

@prefix('/article')
class ArticleController extends BaseController {
    @get('/list')
     getArticleList (ctx: Context) {
         return new Promise(resolve => {
            ArticleController.isLogin(ctx, () => {
                const article = new ArticleModel()
                const res = article.get()
                setTimeout(() => {
                    resolve(res)
                }, 1500)
            })
         }).then(res => {
            ArticleController.success(ctx, res)
         })
        
    }
}

module.exports = ArticleController