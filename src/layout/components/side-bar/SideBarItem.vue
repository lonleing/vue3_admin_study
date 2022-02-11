<template>
  <el-menu-item
    v-if="onlyOne"
    :index="resolvePath(route.path)"
    :route="{ name: route.name }"
    :title="route.meta?.title"
  >
    <el-icon v-if="route.meta?.icon"
      ><component :is="route.meta.icon"
    /></el-icon>
    <template #title>route.{{ route.meta?.title }}</template>
  </el-menu-item>
  
  <el-sub-menu v-else :index="resolvePath(route.path)" popper-class="sub-menu-custom">
    <template #title>
      <el-icon v-if="route.meta?.icon"
        ><component :is="route.meta.icon"
      /></el-icon>
      <span>route.{{ route.meta?.title }}</span>
    </template>
    <side-bar-item
      v-for="r in route.children"
      :key="r.path"
      :route="r"
      :isFirst="false"
      :basePath="resolvePath(route.path)"
    />
  </el-sub-menu>
</template>
<script>
import { defineComponent, computed } from 'vue'
import { icons } from '@/plugins'
import path from 'path'

export default defineComponent({
  components: {
    ...icons,
  },
  props: {
    route: {
      type: Object,
    },
    isFirst: {
      type: Boolean,
      default: true,
    },
    basePath: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const onlyOne = computed(() => {
      if (props.route.meta && props.route.meta.onlyOne) {
        return true
      }
      if (!props.isFirst && !props.route.children) {
        return true
      }
      return false
    })

    const resolvePath = (routePath) => {
      return path.resolve(props.basePath, routePath)
    }

    return {
      onlyOne,
      resolvePath
    }
  },
})
</script>
<style>
.el-popper.is-dark {
  display: none;
}
.sub-menu-custom .el-menu-item{
  color: #8e9293;
}
</style>
