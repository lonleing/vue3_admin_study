import { ECharts } from "echarts/core"
import { ref } from "vue"

export function resize() {
    const sidebarEl = ref<Element>()
    const chart = ref<ECharts>()

    function chartResizeHandler () {
        if (chart.value) {
            chart.value.resize()
        }
    }

    function initResizeEvent () {
        addEventListener('resize', chartResizeHandler)
    }

    function destroyResizeEvent () {
        removeEventListener('resize', chartResizeHandler)
        if (chart.value) chart.value.dispose()
        chart.value = undefined
    }
    
    function sidebarResizeHandler (e: TransitionEvent) {
        if (e.propertyName == 'width') chartResizeHandler()
    }

    function initSidebarResizeEvent () {
        sidebarEl.value = document.getElementsByClassName('sidebar-container')[0]
        if (sidebarEl.value) sidebarEl.value.addEventListener('transitionend', sidebarResizeHandler as EventListener)
    }

    function destroySidebarResizeEvent () {
        if (sidebarEl.value) {
            sidebarEl.value.removeEventListener('transitionend', sidebarResizeHandler as EventListener)
            sidebarEl.value = undefined
        }
    }
    
    function mounted () {
        initResizeEvent()
        initSidebarResizeEvent()
    }

    const activated = () => {
        initResizeEvent()
        initSidebarResizeEvent()
    }

    function beforeDestroy () {
        destroyResizeEvent()
        destroySidebarResizeEvent()
    }

    function deactivated () {
        destroyResizeEvent()
        destroySidebarResizeEvent()
    }

    return {
        chart,
        mounted,
        beforeDestroy,
        deactivated,
        activated
    }
}