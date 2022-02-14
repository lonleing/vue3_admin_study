import axios, { AxiosRequestHeaders } from 'axios'
import { ElMessage } from 'element-plus'
import { Http } from './httpApi'
import { Decrypt, Encrypt } from './secret'
// import { auth } from '@/config/default'
import Qs from 'qs'
import { getState } from '@/store'
import { UserState } from '@/store/modules/userStore'


axios.defaults.transformRequest = [
    data => {
        const params = { data: Encrypt(JSON.stringify(data)) }
        return Qs.stringify(params)
    }
]
axios.defaults.transformResponse = [
    data => {
        data = JSON.parse(data)
        data.data = JSON.parse(Decrypt(data.data))
        return data
    }
]
export const server = axios.create({
    timeout: 7000,
    baseURL: Http.BaseUrl,
    // auth: auth
})

server.interceptors.request.use(config => {
    ((config.headers as AxiosRequestHeaders ).common as unknown as { token: string })['token'] = getState<UserState>('userStore').token||''
    return config
}, error => {
    ElMessage({
        message: error,
        type: 'warning'
    })
    Promise.reject(error)
})

server.interceptors.response.use(response => {
    if (response.status == 200 && response.data.data.code == 200) {
        return response.data.data
    }
    ElMessage({
        message: response.data.data.message,
        type: 'warning'
    })
    Promise.reject(response.data.data.message)
}, error => {
    // console.log(error.response)
    ElMessage({
        message: error,
        type: 'warning'
    })
    return Promise.reject(error)
})


