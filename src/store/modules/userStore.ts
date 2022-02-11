import BaseModule from './baseModule'
import { tokenKey, userInfoKey } from '@/config/cache_keys'

export interface UserState {
    token: string|null,
    userInfo: { [x: string]: string }|null
}

export default class User extends BaseModule<UserState> {
    state() {
        const userInfo = localStorage.getItem(userInfoKey) as string
        const token = localStorage.getItem(tokenKey)
        return {
            token: token,
            userInfo: JSON.parse(userInfo)
        }
    }
    mutations = {
        setToken (state: UserState, token: string) {
            state.token = token
            localStorage.setItem(tokenKey, token)
        },
        setUserInfo (state: UserState, userInfo: { [x: string]: string }) {
            state.userInfo = userInfo
            localStorage.setItem(userInfoKey, JSON.stringify(userInfo))
        }
    }

    actions = {}

}