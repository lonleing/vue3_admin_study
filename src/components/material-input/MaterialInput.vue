<template>
  <div>
    <label
      :class="{
        move: isMove,
      }"
      :style="showLabelFocusColor ? { color: focusColor } : ''"
      ><span v-if="required" style="color: red">* </span>{{ text }}</label
    >
    <input
      :type="type"
      v-model="val"
      @focus="focus"
      @blur="blur"
      :required="required"
      :placeholder="placeholder"
      :readonly="readonly"
      :autocomplete="autocomplete"
      :name="name"
      :maxlength="maxlength"
      @change="$emit('update:modelValue', val)"
    />
    <div
      class="line_animate"
      :style="showLabelFocusColor ? { background: focusColor } : ''"
    ></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    focusColor: {
      type: String,
      default: '#2196f3',
    },
    type: {
      type: String,
      default: 'text',
    },
    required: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    autocomplete: {
      type: String,
      default: 'off',
    },
    name: {
      type: String,
      default: '',
    },
    maxlength: {
      type: Number,
      default: 20,
    },
    text: {
      type: String,
      default: '',
    },
  },
  emit: ['update:modelValue'],
  setup(_) {
    const modelVal = computed(() => _.modelValue)

    const showLabelFocusColor = ref(false)
    const val = ref(_.modelValue)
    const isMove = ref(val.value ? true : false)

    watch(modelVal, (newVal) => {
      val.value = newVal
      isMove.value = newVal ? true : false
    })

    const focus = () => {
      isMove.value = true
      showLabelFocusColor.value = true
    }
    const blur = () => {
      isMove.value = val.value ? true : false
      showLabelFocusColor.value = false
    }

    return {
      focus,
      blur,
      isMove,
      showLabelFocusColor,
      val,
    }
  },
})
</script>
<style lang="scss" scoped>
$focusColor: red;

label {
  font-size: 16px;
  color: #9e9e9e;
  padding-left: 5px;
  display: block;
  transform: translateY(28px);
  transition: all 0.3s ease;
}
label.move {
  transform: translateY(0);
  font-size: 14px;
}
// label.color {
//   color: $focusColor;
// }
input {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  border-bottom: 1px solid #e0e0e0;
  padding: 10px 10px 10px 5px;
  position: relative;
  z-index: 2;
}
.line_animate {
  width: 100%;
  position: relative;
  z-index: 3;
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    background: inherit;
    // background: $focusColor;
    width: 0;
    left: 50%;
    transition: width 0.3s ease;
  }
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    background: inherit;
    // background: $focusColor;
    width: 0;
    right: 50%;
    transition: width 0.3s ease;
  }
}
input:focus + .line_animate::before,
input:focus + .line_animate::after {
  height: 1px;
  width: 50%;
}
</style>
