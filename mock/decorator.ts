import 'reflect-metadata'
const { ROUTER_MAP, BASE_PATH_MAP } = require('./constant')
function createMethodDecorator(method: string) {
    return function (path: string) {
        return (target: any, name: string) => {
            target = target.constructor
            const routeMap = Reflect.getMetadata(ROUTER_MAP, target, 'method') || [];
            routeMap.push({ method, name, path })
            Reflect.defineMetadata(ROUTER_MAP, routeMap, target, 'method');
        }
    }
}

function createClassDecorator() {
    return function (basePath: string) {
        return (target: Function) => {
            const pathMap = Reflect.getMetadata(BASE_PATH_MAP, target, 'prefix') || []
            pathMap.push({ path: basePath })
            Reflect.defineMetadata(BASE_PATH_MAP, pathMap, target, 'prefix')
        }
    }
}

module.exports = {
    prefix: createClassDecorator(),
    post: createMethodDecorator('post'),
    get: createMethodDecorator('get'),
    del: createMethodDecorator('del'),
    put: createMethodDecorator('put'),
    patch: createMethodDecorator('patch'),
    options: createMethodDecorator('options'),
    head: createMethodDecorator('head'),
    all: createMethodDecorator('all')
}