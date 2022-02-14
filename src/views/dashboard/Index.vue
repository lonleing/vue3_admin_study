<template>
  <div class="dashboard-container">
    <panel-group @handle-set-line-chart-data="handleSetLineChartData" />
    <div class="line-chart-container">
      <line-chart :height="350" :chartData="lineChartData" />
    </div>
    <el-row :gutter="32">
      <el-col :lg="8" :span="24">
        <div class="com-wrapper chart-wrapper">
          <radar-chart />
        </div>
      </el-col>
      <el-col :lg="8" :span="24">
        <div class="com-wrapper chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :lg="8" :span="24">
        <div class="com-wrapper chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="8">
      <el-col :lg="16" :span="24">
        <div class="com-wrapper" style="padding-right: 8px">
          <depends-table />
        </div>
      </el-col>
      <el-col :span="24" :lg="8">
        <div class="com-wrapper">
          <todo-list />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="8">
      <el-col :lg="16" :span="24">
        <div class="com-wrapper" style="padding-right: 8px">
          <update-time-line />
        </div>
      </el-col>
      <el-col :span="24" :lg="8">
        <div class="com-wrapper">
          <box-card />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/panel-group/PanelGroup.vue'
import RadarChart from './components/charts/radar-chart/RadarChart.vue'
import { ref } from 'vue'
import PieChart from './components/charts/pie-chart/PieChart.vue'
import BarChart from './components/charts/bar-chart/BarChart.vue'
import LineChart from './components/charts/line-chart/LineChart.vue'
import DependsTable from './components/depends-table/DependsTable.vue'
import TodoList from './components/todo-list/TodoList.vue'
import UpdateTimeLine from './components/update-time-line/UpdateTimeLine.vue'
import BoxCard from './components/box-card/boxCard.vue'
export default {
  components: {
    PanelGroup,
    LineChart,
    RadarChart,
    PieChart,
    BarChart,
    DependsTable,
    TodoList,
    UpdateTimeLine,
    BoxCard,
  },
  setup() {
    return new Promise((resolve) => {
      const data = {
        newVisitis: {
          expectedData: [100, 120, 161, 134, 105, 160, 165],
          actualData: [5, 82, 91, 154, 162, 140, 145],
        },
        messages: {
          expectedData: [200, 192, 120, 144, 160, 130, 140],
          actualData: [25, 160, 151, 106, 145, 150, 130],
        },
        purchases: {
          expectedData: [9, 100, 121, 104, 105, 90, 100],
          actualData: [120, 90, 100, 138, 142, 130, 130],
        },
        shoppings: {
          expectedData: [36, 140, 95, 142, 53, 150, 160],
          actualData: [120, 82, 91, 154, 162, 140, 130],
        },
      }
      const lineChartData = ref(data.newVisitis)

      function handleSetLineChartData(id) {
        lineChartData.value = data[id]
      }
      setTimeout(() => {
        return resolve({
          lineChartData,
          handleSetLineChartData,
        })
      }, 500)
    })
  },
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 32px;
  .line-chart-container {
    padding: 16px 16px 0;
    background: white;
    border-radius: 8px;
    margin-bottom: 32px;
  }
  .chart-wrapper {
    background: white;
    padding: 16px 16px 0;
    border-radius: 8px;
  }
  .com-wrapper {
    margin-bottom: 32px;
  }
}
</style>
