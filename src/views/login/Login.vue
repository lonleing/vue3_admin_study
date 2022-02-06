<template>
    <theme-container :background="StyleAttrs.loginBg" :filled="true">
        <bubble-animation :limit="12">
            <div class="login_page">
                <div class="login_header">
                    <theme-select />
                </div>
                <auth></auth>
            </div>
        </bubble-animation>
    </theme-container>
</template>

<script lang="ts">
import ThemeContainer, { StyleAttrs } from '@/components/container/theme-container/ThemeContainer.vue'
import BubbleAnimation from '@/components/animation/BubbleAnimation.vue'
import Auth from './components/Auth.vue'
import ThemeSelect from '@/components/theme-select/ThemeSelect.vue'
export default {
    components: {
        ThemeContainer,
        BubbleAnimation,
        Auth,
        ThemeSelect
    },
    setup () {
        return {
            StyleAttrs,
        }
    }
}
</script>

<style lang="scss" scoped>
.login_page {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    .login_header {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        color: white;
        display: flex;
        justify-content: flex-end;
        padding: 10px 20px;
    }
}
</style>