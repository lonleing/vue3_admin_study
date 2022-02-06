<template>
    <div
        :class="customClass"
        :style="{ height: numToStr(height), width: numToStr(width) }"
        ref="divEl"
    />
</template>

<script lang="ts">
import { computed, defineComponent, onActivated, onBeforeUnmount, onDeactivated, onMounted, PropType, ref, watch } from 'vue'
import lineChartOptions from './LineChartConfigure.json'
import initChart from '@/components/charts/mixins/demand'
export interface LineChartData {
  expectedData: number[]
  actualData: number[]
}
export default defineComponent({
    props: {
        customClass: {
            type: [String, Object],
            default: 'chart'
        },
        height: {
            type: [Number, String],
            default: '100%',
        },
        width: {
            type: [Number, String],
            default: '100%',
        },
        chartData: {
            type: Object as PropType<LineChartData>,
            required: true
        }
    },
    setup (props) {
        const divEl = ref<HTMLElement>()
        function numToStr(value: number|string) {
            value = typeof value === 'number' ? value+'px' : value
            return value
        }

        const chartData = computed(() => {
            lineChartOptions.dataset.source[1] = props.chartData.expectedData
            lineChartOptions.dataset.source[2] = props.chartData.actualData
            return props.chartData
        })

        const {
            createChart,
            setOptions,
            beforeDestroy,
            activated,
            deactivated
        } = initChart(lineChartOptions)

        watch(chartData, () =>{
            setOptions(lineChartOptions)
        })

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
            numToStr,
            divEl
        }
    }
})
</script>
<style lang="scss" scoped>
.chart {
    width: 100%;
    height: 100%;
}
</style>