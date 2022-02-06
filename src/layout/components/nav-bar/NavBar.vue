<template>
    <theme-container :background="StyleAttrs.sideBg">
        <div class="navbar">
            <div>
                <div @click="hamburgerClickEvent" class="hamburger-container">
                    <el-icon color="white" style="font-size: 20px;">
                        <component :is="iconComponent" />
                    </el-icon>
                </div>
                <div class="route-info-box">
                    route.dashboard<div style="color: #c0c4cc;display: flex;align-items: center"><el-icon style="font-size: 15px;margin: 0 6px"><arrow-right /></el-icon>route.xxxxx</div>
                </div>
            </div>
            <div>
                <div class="theme-select-box">
                    <theme-select />
                </div>
            </div>
        </div>
    </theme-container>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue"
import ThemeContainer, { StyleAttrs } from '@/components/container/theme-container/ThemeContainer.vue'
import { Fold, Expand } from '@/plugins'
import { getState, setCommit } from '@/store'
import { SideState } from '@/store/modules/sideStore'
import { ArrowRight } from '@/plugins'
import ThemeSelect from '@/components/theme-select/ThemeSelect.vue'
enum ICON {
    Fold = 'Fold',
    Expand = 'Expand'
}
export default defineComponent({
    components: {
        Fold,
        Expand,
        ThemeContainer,
        ArrowRight,
        ThemeSelect
    },
    setup () {
        const isCollapse = computed(() => getState<SideState>('sideStore').isCollapse)
        const iconComponent = computed(() => {
            return isCollapse.value ? ICON.Expand : ICON.Fold
        })
        function hamburgerClickEvent () {
            setCommit('sideStore', 'setIsCollapse', !isCollapse.value)
        }
        return {
            hamburgerClickEvent,
            iconComponent,
            StyleAttrs
        }
    }
})
</script>

<style lang="scss" scoped>
.navbar {
    --el-menu-hover-bg-color: rgb(21, 44, 99);
    height: 50px;
    display: flex;
    justify-content: space-between;
    >div {
        height: 100%;
        display: flex;
        flex-shrink: 0;
    }
    .hamburger-container {
        padding: 0 15px;
        cursor: pointer;
        height: 100%;
        display: flex;
        align-items: center;
        &:hover {
            background-color: var(--el-menu-hover-bg-color);
        }
    }
    .route-info-box {
        height: 100%;
        display: flex;
        align-items: center;
        color: white;
        font-size: 14px;
    }
    .theme-select-box {
        display: flex;
        align-items: center;
        height: 100%;
        // padding: 10px;
    }
}
</style>