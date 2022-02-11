<template>
  <div v-if="mobile" class="theme_select" @click="mobileThemeClick">
    <div class="selected_box" style="padding: 0 10px">
      <el-icon v-if="isIcon" style="font-size: 20px">
        <magicStick />
      </el-icon>
      <div :style="{ fontSize: textSize + 'px' }" v-if="title">{{ title }}</div>
    </div>
    <selector-dialog
      v-model:is-show="is_show"
      @optionTap="optionTap"
      :list="themeNames"
      :active="theme_selected"
    ></selector-dialog>
  </div>
  <div
    v-else
    class="theme_select"
    :style="{ width: width + 'px' }"
    @mouseenter="select_open"
    @mouseleave="select_close"
  >
    <div class="selected_box" style="width: 74px">
      <el-icon v-if="isIcon" style="font-size: 20px">
        <magicStick />
      </el-icon>
      <div :style="{ fontSize: textSize + 'px' }" v-if="title">{{ title }}</div>
    </div>
    <div ref="options_el" class="theme_options" :style="styles">
      <theme-container :background="StyleAttrs.sideBg">
        <div
          class="option_item"
          :class="{ active: theme_selected === key }"
          v-for="(item, key) in themeNames"
          :key="'theme_' + key"
          @click="option_tap(key)"
        >
          {{ item }}
        </div>
      </theme-container>
    </div>
  </div>
</template>

<script lang="ts">
import { getCurrentTheme, setTheme, themeNames } from '@/themes'
import { isMobile } from '@/units/helper'
import { MagicStick } from '@/plugins'
import {
  computed,
  defineAsyncComponent,
  defineComponent,
  onMounted,
  ref,
} from 'vue'
import ThemeContainer, {
  StyleAttrs,
} from '../container/theme-container/ThemeContainer.vue'
const SelectorDialog = defineAsyncComponent(
  () => import('@/components/selector-dialog/SelectorDialog.vue')
)
interface Styles {
  height: string
  visibility?: string
  borderWidth?: string
}
export default defineComponent({
  components: {
    SelectorDialog,
    MagicStick,
    ThemeContainer,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    isIcon: {
      type: Boolean,
      default: true,
    },
    textSize: {
      type: Number,
      default: 12,
    },
    textColor: {
      type: String,
      default: 'grey',
    },
    width: {
      type: Number,
      default: 74,
    },
  },
  setup() {
    const theme_selected = computed(() => getCurrentTheme())
    /* 手机 */
    const is_show = ref(false)
    const mobileThemeClick = () => {
      is_show.value = true
    }
    const optionTap = (val: string) => {
      setTheme(val)
    }

    /* pc */
    const styles = ref<Styles>({ visibility: 'hidden', height: 'auto' })
    const options = ref<HTMLElement>()
    let max_height: number
    onMounted(() => {
      max_height = options.value?.clientHeight as number
    })
    const select_open = () => {
      styles.value = { height: '0px' }
      setTimeout(() => {
        styles.value = { height: `${max_height}px`, borderWidth: '0 1px 1px' }
      })
    }
    const select_close = () => {
      styles.value = { height: '0px', borderWidth: '0' }
    }
    const option_tap = (val: string) => {
      select_close()
      setTheme(val)
    }

    const mobile = isMobile(() => {
      if (window.innerWidth >= 800 && is_show.value) {
        is_show.value = false
      }
    })
    return {
      options_el: options,
      mobile,
      is_show,
      themeNames,
      theme_selected,
      styles,
      StyleAttrs,
      mobileThemeClick,
      optionTap,
      select_open,
      select_close,
      option_tap,
    }
  },
})
</script>

<style lang="scss" scoped>
.theme_select {
  height: 100%;
  text-align: center;
  cursor: pointer;
  position: relative;
  user-select: none;
  font-size: 14px;
  color: grey;
  z-index: 99999;
  .selected_box {
    cursor: context-menu;
    color: white;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &:hover {
      background: rgb(21, 44, 99);
    }
  }
  .theme_options {
    position: absolute;
    width: 100%;
    overflow: hidden;
    transition: height 0.1s;
    border-style: solid;
    border-color: #5e5e5e;
    .active {
      color: white;
      &::after {
        content: '';
        height: 1px;
        width: 20px;
        display: block;
        background-color: white;
        margin: 2px auto 0;
      }
    }
    .option_item {
      white-space: nowrap;
      width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
      padding: 4px 0;
      &:hover {
        color: white;
        background: rgb(21, 44, 99);
      }
    }
  }
}
</style>