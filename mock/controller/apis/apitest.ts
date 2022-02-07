import { Context } from "koa";

const { prefix, get } = require('../../decorator')

// @prefix('/aaa')
class ApiTest {

    @get('/bbb')
    apiMethod (ctx: Context) {

    }
}

module.exports = ApiTest