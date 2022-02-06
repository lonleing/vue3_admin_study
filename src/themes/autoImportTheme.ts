const themeNames = {} as { [x: string]: string }
const StyleAttrs = {} as StyleAttrs
const styleFiles = require.context('/src/themes/styles/skin', true, /^\.\/(?!base).*\.scss$/)
const themes = styleFiles.keys().reduce((result: Result, filePath) => {
    const data = new Proxy(styleFiles(filePath), {
        ownKeys (target) {
            return Reflect.ownKeys(target).filter(key => {
                return key !== 'name' && key !== 'name_ch'
            })
        }
    })
    if (data.name && data.name_ch) {
        Object.keys(data).forEach(item => {
            StyleAttrs[item] = item
        })
        themeNames[data.name] = data.name_ch
        result[data.name] = {
            name: data.name_ch,
            styles: {
                ...data
            }
        }
    }
    return result
}, {})

export {
    themes,
    themeNames,
    StyleAttrs
}