<template>
  <el-dropdown trigger="click">
    <el-button plain style="padding: 10px 20px; min-height: auto">
      Platform({{ checkList.length }})
      <el-icon><caret-bottom /></el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu style="padding: 0">
        <el-dropdown-item>
          <el-checkbox-group v-model="checkList" @change="$emit('formDropdown', checkList)">
            <el-checkbox v-for="item in platformsOptions" :key="item.key" :label="item.key">{{ item.name }}</el-checkbox>
          </el-checkbox-group>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { CaretBottom } from '@/plugins'

export default defineComponent({
  components: { CaretBottom },
  props: {
      value: {
          type: Array,
          default: () => {
              return []
          }
      }
  },
  emits: ['formDropdown'],
  setup(_) {
    const val = computed(() => _.value)

    const checkList = ref(_.value)
    watch(val, (newVal) => {
      checkList.value = newVal
    })

    const platformsOptions = [
      { key: 'a', name: 'a-platform' },
      { key: 'b', name: 'b-platform' },
      { key: 'c', name: 'c-platform' },
    ]

    return {
      checkList,
      platformsOptions
    }
  },
})
</script>
