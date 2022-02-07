/*
 * @Description:配置文件
 * @Author: ZMT
 * @Date: 2021-12-29 23:11:00
 * @LastEditors: ZMT
 * @LastEditTime: 2021-12-30 10:40:00
 */
const path = require('path');
const webpackBar = require('webpackbar')
const dayjs = require('dayjs')
const time = dayjs().format('YYYY-M-D HH:mm:ss')
process.env.VUE_APP_UPDATE_TIME = time
const {
    publicPath,
    assetsDir,
    outputDir,
    lintOnSave,
    title,
    devPort,
    transpileDependencies
} = require('./src/config/default/vue.custom.config')
module.exports = {
    publicPath,
    outputDir,
    lintOnSave,
    assetsDir,
    transpileDependencies,
    filenameHashing: false,
    runtimeCompiler: false,
    productionSourceMap: false,
    crossorigin: undefined,
    integrity: false,
    devServer: {
        hot: true,
        open: true,
        port: devPort,
        noInfo: false,
        // progress: true,
        overlay: {
            errors: true,
            warnings: false
        }
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: [
                // path.resolve(__dirname, './src/themes/index.scss')
            ]
        }
    },
    configureWebpack() {
        return {
            resolve: {
                alias: {
                    '@images': path.resolve('src/assets/images')
                }
            },
            plugins: [
                new webpackBar({
                    name: title
                })
            ]
        }
    }
}
