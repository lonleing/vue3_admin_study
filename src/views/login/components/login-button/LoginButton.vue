<template>
    <div class="login_btn_box" :class="customClass" @click="$emit('loginEvent')">
        <theme-container :background="StyleAttrs.buttonBg">
            <button class="login_btn" :style="{padding: padding}">{{ text }}</button>
        </theme-container>
    </div>
</template>

<script lang="ts">
import ThemeContainer, { StyleAttrs } from '@/components/container/theme-container/ThemeContainer.vue'
import { defineComponent } from "vue"

export default defineComponent({
    props: {
        text: {
            type: String,
            default: '按钮'
        },
        customClass: {
            type: String,
            default: ''
        },
        padding: {
            type: String,
            default: '0 5px'
        }
    },
    emits: ['loginEvent'],
    components: {
        ThemeContainer
    },
    setup () {
        return {
            StyleAttrs
        }
    }
})
</script>

<style lang="scss" scoped>
.login_btn_box {
    border-radius: 5px;
    overflow: hidden;
    &:active {
        opacity: 0.9;
    }
    .login_btn {
        background-color: transparent;
        width: 100%;
        height: 36px;
        border-radius: 5px;
        outline: none;
        color: white;
        font-size: 14px;
        border: 1px solid #869ecc;
        cursor: pointer;
        white-space: nowrap;
    }
}
</style>