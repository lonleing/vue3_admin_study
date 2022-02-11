<template>
  <div class="login_input_box">
    <div v-if="label.length > 0" class="login_label">{{ label }}</div>
    <input
      :type="type"
      :placeholder="placeholder"
      :maxlength="maxLength"
      :value="modelValue"
      @input="input"
      class="login_input"
      @keyup.enter="$emit('enter')"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  props: {
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    maxLength: {
      type: Number,
      default: 11,
    },
    modelValue: String,
  },
  emits: ['update:modelValue', 'enter'],
  setup(props, { emit }) {
    // 传过来的v-model必须是响应式的值
    const input = (event: { target: { value: string } }) => {
      emit('update:modelValue', event.target.value)
    }
    return {
      input,
    }
  },
})
</script>

<style lang="scss" scoped>
.login_input_box {
  padding-top: 10px;
  .login_label {
    color: white;
    font-size: 12px;
    margin-bottom: 6px;
    padding-left: 2px;
  }
  .login_input {
    border: 1px solid #869ecc;
    background-color: transparent;
    outline: none;
    height: 36px;
    width: 100%;
    border-radius: 5px;
    padding: 0 10px;
    color: #d3e6f4;
    font-size: 14px;
    &::-webkit-input-placeholder {
      color: grey;
      font-size: 14px;
    }
  }
}
</style>