import { App } from "vue"
export * from './elements/element.icons'

export function loadAllPlugins (app: App<Element>) {
    const files = require.context('.', true, /[^.]\/index\.(?:ts|js)$/)
    files.keys().forEach(filePath => {
        const res = files(filePath)
        if (typeof res.default === 'function') {
            res.default(app)
        }
    })
}