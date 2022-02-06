<template>
    <theme-container :background="StyleAttrs.sideBg" :filled="true" :customStyle="{ userSelect: 'none' }">
        <side-bar-logo />
        <el-menu
            mode="vertical"
            :collapse="isCollapse"
            background-color="transparent"
            text-color="#f2f2f2"
            :router="true"
            class="clear-border"
            :collapse-transition="false"
        >
            <el-menu-item index="dashboard" title="route.dashboard">
                <el-icon><odometer /></el-icon>
                <template #title>route.dashboard</template>
            </el-menu-item>
            <!-- <el-sub-menu index="1"> -->
                <!-- <template #title> -->
                    <!-- <el-icon></el-icon> -->
                    <!-- <span>Navigator One</span> -->
                <!-- </template> -->
            <!-- </el-sub-menu> -->
            <!-- <el-menu-item index="login"> -->
                <!-- <el-icon><icon-menu /></el-icon> -->
                <!-- <template #title>Navigator Two</template> -->
            <!-- </el-menu-item> -->
        </el-menu>
    </theme-container>
</template>
<script lang="ts">
import ThemeContainer, { StyleAttrs } from '@/components/container/theme-container/ThemeContainer.vue'
import { computed, defineComponent } from 'vue'
import SideBarLogo from './SideBarLogo.vue'
import { Odometer } from '@/plugins'
import { getState } from '@/store'
import { SideState } from '@/store/modules/sideStore'
export default defineComponent({
    components: {
        ThemeContainer,
        SideBarLogo,
        Odometer
    },
    setup () {
        const isCollapse = computed(() => getState<SideState>('sideStore').isCollapse)
        return {
            isCollapse,
            StyleAttrs
        }
    }
})
</script>
<style lang="scss" scoped>
.clear-border {
    border-right: none;
    --el-menu-hover-bg-color: rgb(21, 44, 99)!important;
}
</style>