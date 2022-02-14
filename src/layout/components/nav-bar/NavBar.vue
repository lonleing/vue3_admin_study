<template>
  <theme-container :background="StyleAttrs.sideBg">
    <div class="navbar">
      <div>
        <div @click="hamburgerClickEvent" class="hamburger-container">
          <el-icon color="white" style="font-size: 20px">
            <component :is="iconComponent" />
          </el-icon>
        </div>
        <bread-crumb />
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
import { computed, defineComponent } from 'vue'
import ThemeContainer, {
  StyleAttrs,
} from '@/components/container/theme-container/ThemeContainer.vue'
import { Fold, Expand } from '@/plugins'
import { getState, setCommit } from '@/store'
import { SideState } from '@/store/modules/sideStore'
import ThemeSelect from '@/components/theme-select/ThemeSelect.vue'
import BreadCrumb from '../bread-crumb/BreadCrumb.vue'
enum ICON {
  Fold = 'Fold',
  Expand = 'Expand',
}
export default defineComponent({
  components: {
    Fold,
    Expand,
    ThemeContainer,
    ThemeSelect,
    BreadCrumb,
  },
  setup() {
    const isCollapse = computed(
      () => getState<SideState>('sideStore').isCollapse
    )
    const iconComponent = computed(() => {
      return isCollapse.value ? ICON.Expand : ICON.Fold
    })
    function hamburgerClickEvent() {
      setCommit('sideStore', 'setIsCollapse', !isCollapse.value)
    }
    return {
      hamburgerClickEvent,
      iconComponent,
      StyleAttrs,
    }
  },
})
</script>

<style lang="scss" scoped>
.navbar {
  --el-menu-hover-bg-color: rgb(21, 44, 99);
  height: 50px;
  display: flex;
  justify-content: space-between;
  > div {
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
}
</style>