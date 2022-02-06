<template>
    <div :style="themeStyles" :class="{ filled }">
        <slot />
    </div>
</template>

<script lang="ts">
export { StyleAttrs } from '@/themes'
import { computed, defineComponent } from 'vue'
import { themes, Props, curstomStyleAttrs, getCurrentTheme } from '@/themes'
interface PropsTolerant {
    [x: string]: string
}

const props = curstomStyleAttrs.reduce((result, attr) => {
    result[attr] = {
        type: String,
        default: ''
    }
    return result
}, {} as Props)

export default defineComponent({
    props: {
        ...props,
        filled: {
            type: Boolean,
            default: false
        },
        customStyle: {
            type: Object,
            default: (function () {
                return {}
            })()
        }
    },
    setup (props) {
        const p: PropsTolerant = props as unknown as PropsTolerant
        const themeStyles = computed(() => {
            const currentTheme = getCurrentTheme()
            let styles: PropsTolerant = Object.keys(props.customStyle).length ? props.customStyle : {}
            curstomStyleAttrs.forEach(styleAttrs => {
                if (p[styleAttrs]) {
                    styles[styleAttrs] = themes[currentTheme].styles[p[styleAttrs]]
                }
            })
            return styles
        })

        return {
            themeStyles
        }
    }
})
</script>

<style scoped>
    .filled {
        height: 100%;
        width: 100%;
    }
</style>