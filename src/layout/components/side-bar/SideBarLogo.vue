<template>
    <div class="sidebar-logo-container">
        <router-link to="/" class="sidebar-logo-link">
            <img
                src="@images/logo.png"
                class="sidebar-logo"
                :class="{ 'compress-sidebar-logo': !mobile && isCollapse }"
            />
            <transition name="fade">
                <h1
                    v-if="!mobile && !isCollapse"
                    class="sidebar-logo-title"
                >后台管理系统</h1>
            </transition>
        </router-link>
    </div>
</template>

<script lang="ts">
import { getState } from '@/store'
import { SideState } from '@/store/modules/sideStore'
import { computed, defineComponent } from 'vue'
import { isMobile } from '@/units/helper'
export default defineComponent({
    setup () {
        const isCollapse = computed(() => getState<SideState>('sideStore').isCollapse)
        const mobile = isMobile()
        return {
            isCollapse,
            mobile
        }
    }
})
</script>

<style lang="scss" scoped>
.sidebar-logo-container {
    padding: 20px 0 30px;
    white-space: nowrap;
    height: 50px;
    box-sizing: content-box;
    .sidebar-logo-link {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        .sidebar-logo-title {
            font-size: 24px;
            font-family: Avenir,Helvetica Neue,Arial,Helvetica,sans-serif;
            font-weight: 600;
            color: white;
            margin-left: 12px;
            flex-shrink: 0;
        }
        .sidebar-logo {
            height: 100%;
            flex-shrink: 0;
            transition: all var(--drawer-animate-time);
        }
        .compress-sidebar-logo {
            height: 60%;
        }
    }
}
.fade-enter-from {
    opacity: 0;
}
.fade-enter-active {
    transition: opacity var(--drawer-animate-time) ease;
}
</style>