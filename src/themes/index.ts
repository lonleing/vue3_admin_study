/// <reference path="index.d.ts" />

import { getState, setCommit } from '@/store'
import { ThemeState } from '@/store/modules/themeStore'
export { themes, StyleAttrs, themeNames } from './autoImportTheme'

export interface Props {
    background: PropChild;
    color: PropChild;
    boxShadow: PropChild;
    [x: string]: PropChild;
}

export const curstomStyleAttrs = [
    'background',
    'color',
    'boxShadow'
]

export function setTheme (theme: string) {
    setCommit('themeStore', 'set_theme_type', theme)
}


export function getCurrentTheme() {
    const { theme_type } = getState<ThemeState>('themeStore')
    return theme_type
}