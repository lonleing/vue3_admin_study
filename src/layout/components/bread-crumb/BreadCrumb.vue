<template>
  <div class="route-info-box">
    <div
      style="color: #c0c4cc; display: flex; align-items: center"
      v-for="(item, index) in breadcrumbs"
      :key="'bread_crumb_' + index"
    >
        <template v-if="index === 0">
            <router-link :to="{ name: 'Dashboard' }">
                route.{{ item.meta.title }}
            </router-link>
        </template>
        <template v-else>
            <el-icon style="font-size: 15px; margin: 0 6px"><arrow-right /></el-icon>
            route.{{ item.meta.title }}
        </template>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, ref, watch } from 'vue'
import { ArrowRight } from '@/plugins'
import { RouteLocationMatched, useRoute } from 'vue-router'

export default defineComponent({
  components: {
    ArrowRight,
  },
  setup() {
    const currentRoute = useRoute()
    const breadcrumbs = ref<RouteLocationMatched[]>([])
    function getRoute() {
      let matched = currentRoute.matched.filter(
        (item) => item.meta && item.meta.title
      )
      const firstRoute = matched[0]

      if (!isDashboard(firstRoute)) {
        matched = [
          { path: '/dashboard', meta: { title: 'dashboard' } } as any, // eslint-disable-line
        ].concat(matched)
      }
      breadcrumbs.value = matched.filter((item) => {
        return item.meta && item.meta.title && item.meta.breadcrumb !== false
      })
    }

    function isDashboard(route: RouteLocationMatched) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return (
        name.toString().trim().toLocaleLowerCase() ===
        'Dashboard'.toLocaleLowerCase()
      )
    }

    watch(currentRoute, () => {
      getRoute()
    })

    onBeforeMount(() => {
      getRoute()
    })

    return {
      breadcrumbs,
    }
  },
})
</script>

<style lang="scss" scoped>
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
</style>
