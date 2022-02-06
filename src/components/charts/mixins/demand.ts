import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    DatasetComponent
} from 'echarts/components'

import { LineChart, RadarChart, PieChart, BarChart } from 'echarts/charts'
import * as echarts from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { resize } from './resize'
import { ECBasicOption } from 'echarts/types/dist/shared'
import { nextTick, watch } from 'vue'

echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    CanvasRenderer,
    LegendComponent,
    DatasetComponent,
    LineChart,
    RadarChart,
    PieChart,
    BarChart
])

export const init = echarts.init

export default function (options: ECBasicOption) {
    const { chart, mounted, beforeDestroy, deactivated, activated } = resize()

    watch(chart, (newVal) => {
        if (newVal) {
            setOptions(options)
        }
    })

    function createChart(element: HTMLElement) {
        nextTick(() => {
            if (!chart.value) {
                const initChart = echarts.init(element, 'macarons')
                initChart.setOption(options)
                chart.value = initChart
            }
            mounted()
        })
    }

    function setOptions (newOptions: ECBasicOption) {
        if (chart.value) {
            chart.value.setOption(newOptions)
        }
    }
    
    return {
        createChart,
        setOptions,
        beforeDestroy,
        deactivated,
        activated
    }
}

