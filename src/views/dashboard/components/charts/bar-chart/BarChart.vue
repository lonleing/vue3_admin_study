<template>
    <div
        :class="customClass"
        :style="{ height: numToStr(height), width: numToStr(width) }"
        ref="divEl"
    />
</template>

<script lang="ts">
import { defineComponent, onActivated, onBeforeUnmount, onDeactivated, onMounted, ref } from 'vue'
import initChart from '@/components/charts/mixins/demand'
import BarChartOptions from './BarChartConfigure.json'

export default defineComponent({
    props: {
        customClass: {
            type: [String, Object],
            default: 'chart'
        },
        height: {
            type: [Number, String],
            default: '360px',
        },
        width: {
            type: [Number, String],
            default: '100%',
        }
    },
    setup() {
        const divEl = ref<HTMLElement>()
        function numToStr(value: number|string) {
            value = typeof value === 'number' ? value+'px' : value
            return value
        }

        const {
            createChart,
            beforeDestroy,
            activated,
            deactivated
        } = initChart(BarChartOptions)

        onMounted(() => {
            createChart(divEl.value as HTMLElement)
        })

        onBeforeUnmount(() => {
            beforeDestroy()
        })

        onActivated(() => {
            activated()
        })

        onDeactivated(() => {
            deactivated()
        })
        
        return {
            divEl,
            numToStr
        }
    }
})
</script>
