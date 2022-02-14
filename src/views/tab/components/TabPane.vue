<template>
  <div v-if="loading" class="tap_pane_loading">Loading ...</div>
  <el-table v-else :data="data" border>
    <el-table-column label="ID" prop="id" :width="65" align="center" />
    <el-table-column label="Date" prop="date" :width="180" align="center" />
    <el-table-column label="title" :min-width="240">
      <template #default="{ row }">
        {{ row.title }} <el-tag>{{ type }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="Author" prop="author" :width="180" align="center" />
    <el-table-column label="Importance" :width="120" align="center">
      <template #default="{ row }">
        {{ importanceCH[row.importance - 1] }}
      </template>
    </el-table-column>
    <el-table-column
      label="Readings"
      prop="reading"
      :width="95"
      align="center"
    />
    <el-table-column label="Status" :width="110" align="center">
      <template #default="{ row }">
        <el-tag>{{ row.status }}</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { Http } from '@/nets/httpApi'
import { get } from '@/nets/request'

export default defineComponent({
  props: {
    type: {
      type: String,
      default: 'CN',
    },
  },
  emits: ['create'],
  setup(_, { emit }) {
    const loading = ref(true)
    const importanceCH = ['一星', '二星', '三星']
    const data = ref([])

    async function getList() {
      emit('create')
      await get(Http.Tab, {
        type: _.type,
        limit: 5,
      }).then((res) => {
        data.value = res
        loading.value = false
      })
    }

    onMounted(() => {
      getList()
    })

    return {
      loading,
      importanceCH,
      data,
    }
  },
})
</script>
<style lang="scss" scoped>
.tap_pane_loading {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #808080;
}
</style>
