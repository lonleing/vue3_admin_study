<template>
  <div class="example_list-container">
    <el-table :data="list" border>
      <el-table-column
        prop="id"
        label="ID"
        header-align="center"
        align="center"
        :width="80"
      />
      <el-table-column
        prop="date"
        label="Date"
        header-align="center"
        align="center"
        :width="180"
      />
      <el-table-column
        prop="author"
        label="Author"
        header-align="center"
        align="center"
        :width="180"
      />
      <el-table-column
        label="Importance"
        header-align="center"
        align="center"
        :width="105"
      >
        <template #default="{ row }">
          {{ importances[row.importance - 1] }}
        </template>
      </el-table-column>
      <el-table-column
        label="Status"
        header-align="center"
        align="center"
        :width="110"
      >
        <template #default="{ row }">
          <el-tag>{{ row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="Title"
        header-align="left"
        :min-width="300"
      >
        <template #default="{row}">
          <router-link :to="{name: 'ArticleEdit', params: { id: row.id }}">
            <span>{{ row.title }}</span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        label="Actions"
        header-align="center"
        align="center"
        :width="120"
      >
        <template #default="{ row }">
          <router-link :to="{ name: 'ArticleEdit', params: { id: row.id } }">
            <el-button type="primary" size="small">
              <el-icon color="white">
                <svg
                  t="1639990532110"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="12171"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  data-v-042ca774=""
                >
                  <path
                    d="M199.04 672.64l193.984 112 224-387.968-193.92-112-224 388.032z m-23.872 60.16l32.896 148.288 144.896-45.696-177.792-102.592zM455.04 229.248l193.92 112 56.704-98.112-193.984-112-56.64 98.112zM104.32 708.8l384-665.024 304.768 175.936-383.936 665.088h0.064l-248.448 78.336-56.448-254.336z m384 254.272v-64h448v64h-448z"
                    p-id="12172"
                  ></path>
                </svg>
              </el-icon>
              Edit
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { get } from '@/nets/request'
import { Http } from '@/nets/httpApi'

export default defineComponent({
  async setup() {
    const list = ref([])
    const importances = ['一星', '二星', '三星']
    await get(Http.ArticleList).then((data) => {
      list.value = data.list
    })

    return {
      list,
      importances,
    }
  },
})
</script>
<style lang="scss" scoped>
.example_list-container {
  padding: 20px;
}
</style>
