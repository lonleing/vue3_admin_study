import { Context } from "koa"
const ArticleModel = require('../../model/ArticleModel')
const BaseController = require('./BaseController')
const { prefix, get } = require('../../decorator')

@prefix('/tab')
class ArticleController extends BaseController {
    @get('/getList')
    async getTabList(ctx: Context) {
        await ArticleController.isLogin(ctx, () => {
            return new Promise((resolve) => {
                interface Count {
                    CN: number;
                    US: number;
                    JP: number;
                    EU: number;
                    [x: string]: number
                }

                const params = ctx.request.query
                let starts: Count = {
                    CN: 0,
                    US: 5,
                    JP: 10,
                    EU: 15
                }
                const max = starts[params.type as  string] + Number(params.limit)
                const article = new ArticleModel()
                const res = article.limit(starts[params.type as  string], max).all()
                setTimeout(() => {
                    ArticleController.success(ctx, res)
                    resolve(true)
                }, 500)
            })
        })
    }
}

module.exports = ArticleController