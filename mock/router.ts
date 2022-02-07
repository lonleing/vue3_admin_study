import 'reflect-metadata'
import { RouteMeta } from './type'
const { ROUTER_MAP, BASE_PATH_MAP } = require('./constant')
const { apisDir } = require('../src/config/default/mock.config')
const path = require('path')
const fs = require('fs')

const addRouter = (router: any) => {
    function ergodicFile(dir: string, apisDirName='') {
        fs.readdirSync(dir).forEach((controllerItemPath: string) => {
            const controllerItemPathFull = path.join(dir, controllerItemPath)
            const isDir = fs.lstatSync(controllerItemPathFull).isDirectory()
            if (isDir) {
                ergodicFile(controllerItemPathFull, apisDir.includes(controllerItemPath) ? controllerItemPath : '')
            } else if (/\.(?:t|j)s$/.test(controllerItemPathFull)) {
                const classModule = require(controllerItemPathFull)
                const routeMap: RouteMeta[] | undefined = Reflect.getMetadata(ROUTER_MAP, classModule, 'method')
                const basePath = Reflect.getMetadata(BASE_PATH_MAP, classModule, 'prefix')?.pop()
                if (routeMap) {
                    const moduleInstances = new classModule()
                    routeMap.forEach((route) => {
                        const { name, method, path } = route
                        let newPath = basePath ? `${basePath.path}${path}` : path
                        newPath = apisDirName ? `/${apisDirName}${newPath}` : newPath
                        router[method](newPath, moduleInstances[name])
                    })
                }
            }
        })
    }

    const controllerPath = path.join(__dirname, 'controller')
    ergodicFile(controllerPath)
}
module.exports = addRouter