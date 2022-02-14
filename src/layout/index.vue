<template>
  <div class="app-wrapper" :class="{ 'mobile-compress-app-wrapper': mobile }">
    <div
      v-if="mobile && !isCollapse"
      class="drawer-modal-bg"
      @click="handleClickOutside"
    />

    <div
      class="sidebar-container ltr-drawer-container"
      :class="{
        'm-ltr-drawer-container-animate': mobile && !isCollapse,
        'ltr-drawer-container-animate': !mobile && isCollapse,
      }"
    >
      <side-bar />
    </div>

    <div
      class="main-container"
      :class="{ 'main-container-animate': !mobile && isCollapse }"
    >
      <nav-bar />
      <el-scrollbar wrap-class="content-container">
        <router-view></router-view>
      </el-scrollbar>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, nextTick, onMounted } from 'vue'
import SideBar from './components/side-bar/SideBar.vue'
import NavBar from './components/nav-bar/NavBar.vue'
import { getState, setCommit } from '@/store'
import { SideState } from '@/store/modules/sideStore'
import { isMobile } from '@/units/helper'
import { loadTime } from '@/config/default'

export default defineComponent({
  components: {
    SideBar,
    NavBar,
  },
  setup() {
    const isCollapse = computed(
      () => getState<SideState>('sideStore').isCollapse
    )
    const mobile = isMobile(() => {
      if (window.innerWidth < 1100 && isCollapse.value === false) {
        setCommit('sideStore', 'setIsCollapse', true)
      }
    })
    const handleClickOutside = () => {
      setCommit('sideStore', 'setIsCollapse', !isCollapse.value)
    }
    onMounted(() => {
      nextTick(() => {
        setTimeout(() => {
          const div = document.querySelector(
            '#first_load_screen'
          ) as HTMLElement
          div.style.display = 'none'
        }, loadTime)
      })
    })
    return {
      isCollapse,
      mobile,
      handleClickOutside,
    }
  },
})
</script>

<style lang="scss" scoped>
.app-wrapper {
  --ltr-drawer-container-max-width: 300px;
  --ltr-drawer-container-min-width: 64px;
  height: 100%;
  width: 100%;
  position: relative;
  .ltr-drawer-container {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    z-index: 999999999;
    width: var(--ltr-drawer-container-max-width);
    transition: width var(--drawer-animate-time);
  }
  .main-container {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    transition: width var(--drawer-animate-time) ease;
    width: calc(100% - var(--ltr-drawer-container-max-width));
    .content-container {
      flex: 1 0 0;
    }
  }
  .ltr-drawer-container-animate {
    width: var(--ltr-drawer-container-min-width);
  }
  .main-container-animate {
    width: calc(100% - var(--ltr-drawer-container-min-width));
  }

  &.mobile-compress-app-wrapper {
    --ltr-drawer-container-min-width: 0px;
    .main-container {
      width: 100%;
    }
    .ltr-drawer-container {
      overflow: hidden;
      width: var(--ltr-drawer-container-min-width);
      opacity: 1;
    }
    .m-ltr-drawer-container-animate {
      width: var(--ltr-drawer-container-max-width);
      opacity: 1;
    }
  }

  .drawer-modal-bg {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background: #000;
    opacity: 0.3;
    z-index: 1;
  }
}
</style>