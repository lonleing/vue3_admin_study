import BaseModule from './baseModule'

export interface ThemeState {
    theme_type: string
}

export default class Theme extends BaseModule<ThemeState> {
    state () {
        return {
            theme_type: 'light'
        }
    }

    mutations = {
        set_theme_type (state: ThemeState, theme_type: string) {
            state.theme_type = theme_type
        }
    }

    actions = {}
}