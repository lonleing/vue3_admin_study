/*
 * @Description: 
 * @Author: ZMT
 * @Date: 2021-12-29 23:11:00
 * @LastEditors: ZMT
 * @LastEditTime: 2021-12-30 10:57:00
 */
const vueDefaultConfig = {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV !== 'production' ? 'error' : false,
    transpileDependencies: [],
    //webpack 配置的项目名称
    title: 'admin-template',
    devPort: '9999',
    // titleSeparator: ' - ',
    // titleReverse: false,
    // abbreviation: 'vt2at',
    // providePlugin: {},
    // build7z: false,
    // startMessage:'欢迎使用vue3-ts-composition-admin-template,使用composition API和TS 玩转最潮技术'
}
module.exports = vueDefaultConfig