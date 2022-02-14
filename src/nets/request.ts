import { server } from './service'
type Params = {
    [x: string]: any  // eslint-disable-line
}

export const get = (url: string, params?: Params) => {
    return new Promise<any>((resolve, reject) => {  // eslint-disable-line
        server.get(url, {
            params: params
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}

export const post = (url: string, params?: Params) => {
    return new Promise<Params>((resolve, reject) => {
        server.post(url, params).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}

export const del = (url: string, params?: Params) => {
    return new Promise<Params>((resolve, reject) => {
        server.delete(url, {
            params: params
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}

export const put = (url: string, params?: Params) => {
    return new Promise<Params>((resolve, reject) => {
        server.put(url, params).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}

export const patch = (url: string, params?: Params) => {
    return new Promise<Params>((resolve, reject) => {
        server.patch(url, params).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}