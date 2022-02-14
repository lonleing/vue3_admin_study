import BaseModule from './baseModule'
import { themeKey } from '@/config/cache_keys'

export interface ThemeState {
    theme_type: string
}

export default class Theme extends BaseModule<ThemeState> {
    state () {
        const currentTheme = localStorage.getItem(themeKey)
        return {
            theme_type: currentTheme ? currentTheme : 'light'
        }
    }

    mutations = {
        set_theme_type (state: ThemeState, theme_type: string) {
            state.theme_type = theme_type
            localStorage.setItem(themeKey, theme_type)
        }
    }

    actions = {}
}