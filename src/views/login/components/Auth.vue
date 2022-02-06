<template>
    <theme-container :background="StyleAttrs.loginCenterBg" :boxShadow="StyleAttrs.loginCenterShadow" :customStyle="{ borderRadius: '10px' }">
        <component :is="currentComponent"></component>
    </theme-container>
</template>

<script lang="ts">
import ThemeContainer, { StyleAttrs } from '@/components/container/theme-container/ThemeContainer.vue'
import { defineComponent, provide, ref } from "@vue/runtime-core"
import AuthLogin from './AuthLogin.vue'
import ForgetPassword from './ForgetPassword .vue'

export default defineComponent({
    components: {
        ThemeContainer,
        AuthLogin,
        ForgetPassword
    },
    setup () {
        const currentComponent = ref('AuthLogin')
        const toComponent = (component: string) => {
            currentComponent.value = component
        }
        provide('toComponent', toComponent)
        return {
            currentComponent,
            StyleAttrs
        }
    }
})
</script>