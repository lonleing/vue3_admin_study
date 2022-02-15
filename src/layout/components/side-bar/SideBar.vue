<template>
  <theme-container
    :background="StyleAttrs.sideBg"
    :filled="true"
    :customStyle="{ userSelect: 'none' }"
  >
    <side-bar-logo />
    <el-menu
      mode="vertical"
      :collapse="isCollapse"
      background-color="transparent"
      text-color="#f2f2f2"
      router
      class="clear-border"
      :active-text-color="activeTextColor"
      :default-active="activeMenu"
      :collapse-transition="false"
      unique-opened
    >
      <el-menu-item
        index="/dashboard"
        :route="{ name: 'Dashboard' }"
      >
        <el-icon><odometer /></el-icon>
        <template #title>route.dashboard</template>
      </el-menu-item>

      <side-bar-item
        v-for="route in routes"
        :key="`sidebar_item_${route.path}`"
        :route="route"
        :basePath="route.path"
      />
    </el-menu>
  </theme-container>
</template>
<script lang="ts">
import ThemeContainer, {
  StyleAttrs,
} from '@/components/container/theme-container/ThemeContainer.vue'
import { computed, defineComponent } from 'vue'
import SideBarLogo from './SideBarLogo.vue'
import { Odometer } from '@/plugins'
import { getState } from '@/store'
import { SideState } from '@/store/modules/sideStore'
import { themes, getCurrentTheme } from '@/themes'
import { asyncRoutes } from '@/router'
import SideBarItem from './SideBarItem.vue'
import { useRoute } from 'vue-router'
export default defineComponent({
  components: {
    ThemeContainer,
    SideBarLogo,
    SideBarItem,
    Odometer,
  },
  setup() {
    const route = useRoute()
    const isCollapse = computed(
      () => getState<SideState>('sideStore').isCollapse
    )

    const activeMenu = computed(() => {
      if (route.meta && route.meta.activeMenu) {
        return route.meta.activeMenu
      }
      return route.path
    })

    const activeTextColor = computed(
      () => themes[getCurrentTheme()].styles.sideActiveColor
    )

    return {
      isCollapse,
      StyleAttrs,
      activeTextColor,
      routes: asyncRoutes,
      activeMenu
    }
  },
})
</script>
<style lang="scss" scoped>
.clear-border {
  border-right: none;
  --el-menu-hover-bg-color: rgb(21, 44, 99) !important;
}
</style>