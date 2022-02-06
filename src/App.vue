<template>
  <theme-container :color="StyleAttrs.mainCol" :background="StyleAttrs.mainBg" :filled="true">
    <router-view />
  </theme-container>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ThemeContainer, { StyleAttrs } from './components/container/theme-container/ThemeContainer.vue'
export default defineComponent({
  setup () {
    return {
      StyleAttrs
    }
  },
  components: {
    ThemeContainer
  }
})
</script>
