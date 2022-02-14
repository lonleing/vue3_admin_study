<template>
  <el-dropdown trigger="click">
    <el-button plain style="padding: 10px 20px; min-height: auto">
      Comment: {{ disableComment ? 'closed' : 'opened' }}
      <el-icon><caret-bottom /></el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu style="padding: 0">
        <el-dropdown-item>
          <el-radio-group
            v-model="disableComment"
            style="padding: 10px; line-height: initial"
            @change="$emit('input', disableComment)"
          >
            <el-radio :label="true" size="small" style="height: auto"
              >Close comment</el-radio
            >
            <el-radio :label="false" size="small" style="height: auto"
              >Open comment</el-radio
            >
          </el-radio-group>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { CaretBottom } from '@/plugins'

export default defineComponent({
  components: {
    CaretBottom,
  },
  props: {
      value: {
          type: Boolean,
          default: true
      }
  },
  emits: ['input'],
  setup(_) {
    const val = computed(() => _.value)

    const disableComment = ref(_.value)
    watch(val, (newVal) => {
      disableComment.value = newVal
    })

    return {
      disableComment,
    }
  },
})
</script>
