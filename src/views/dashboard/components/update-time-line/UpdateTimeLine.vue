<template>
  <el-card shadow="never" style="padding-left: 40px">
    <el-timeline>
      <el-timeline-item
        v-for="(timeline_item, index) in timeline_datas"
        :key="'timeline_' + index"
        :timestamp="timeline_item.timestamp"
        placement="top"
      >
        <el-card>
          <h4>{{ timeline_item.title }}</h4>
          <p
            v-for="(item, index) in timeline_item.list"
            :key="'timeline_list_item_' + index"
          >
            {{ item.nickname }} {{ item.action }}于 {{ item.time }}
          </p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const timeline_datas = [
      {
        timestamp: '2022/02/04',
        title: '更新 Github 模板',
        list: [
          {
            nickname: '王一虎',
            time: '2022/02/04 20:46',
            action: '提交'
          },
          {
            nickname: '王二虎',
            time: '2022/02/05 19:35',
            action: '提交'
          },
          {
            nickname: '王三虎',
            time: '2022/02/06 18:24',
            action: '提交'
          }
        ]
      },
      {
        timestamp: '2022/02/02',
        title: '更新 Github 模板',
        list: [
          {
            nickname: '王四虎',
            time: '2022/02/02 16:13',
            action: '提交'
          },
          {
            nickname: '王五虎',
            time: '2022/02/03 15:02',
            action: '提交'
          }
        ]
      },
      {
        timestamp: '2022/02/01',
        title: '更新 Github 模板',
        list: [
          {
            nickname: '王小虎',
            time: '2022/02/01 14:51',
            action: '提交'
          }
        ]
      }
    ]
    return {
      timeline_datas,
    }
  },
})
</script>
<style scoped>
h4 {
  margin: 1.33em 0;
}
p {
  margin: 1em 0;
}
</style>
