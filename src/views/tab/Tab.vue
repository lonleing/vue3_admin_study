<template>
  <div class="tab-container">
    <div class="tip-container">
      <el-tag>mounted times ：{{ createdTimes }}</el-tag>
      <el-alert
        type="success"
        title="Tab with keep-alive"
        style="width: auto; margin-left: 30px"
        :closable="false"
      />
    </div>
    <el-tabs type="border-card" v-model="activeKey" @tab-click="tabClick">
      <el-tab-pane
        v-for="option in tabMapOptions"
        :key="'el_tab_pane_' + option.id"
        lazy
        :label="option.label"
      >
        <keep-alive>
          <tab-pane :type="option.key" @create="showCreatedTimes" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import TabPane from './components/TabPane.vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  components: {
    TabPane,
  },
  setup() {
    const activeKey = ref('0')
    const router = useRouter()
    const route = useRoute()
    const createdTimes = ref(0)
    const tabMapOptions = [
      {label: 'China', key: 'CN' },
      {label: 'USA', key: 'US' },
      {label: 'Japan', key: 'JP' },
      {label: 'Eurozone', key: 'EU' },
    ]

    function tabClick (tab: any) {  // eslint-disable-line
      const index = tab.index
      router.push(`${route.path}?tab=${tabMapOptions[index].key}`).catch((err) => {
        console.warn(err)
      })
    }

    function showCreatedTimes() {
      createdTimes.value += 1
    }

    onMounted(() => {
      const tab = route.query.tab as string
      if (tab) {
        tabMapOptions.forEach((item, index) => {
          if (item.key === tab) {
            activeKey.value = index.toString()
          }
        })
      }
    })

    return {
      tabMapOptions,
      createdTimes,
      activeKey,
      showCreatedTimes,
      tabClick
    }
  },
})
</script>

<style lang="scss" scoped>
.tab-container {
  padding: 30px;
}
.tip-container {
  display: flex;
  padding-bottom: 15px;
  align-items: center;
}
</style>