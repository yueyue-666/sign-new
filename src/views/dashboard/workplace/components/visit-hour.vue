<template>
  <a-card :bordered="false" title="最近一周数据统计" :body-style="{ padding: '16px 6px 0 0' }">
    <v-chart ref="visitHourChartRef" :option="visitHourChartOption" style="height: 362px" />
  </a-card>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { message } from 'ant-design-vue/es';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components';
import VChart from 'vue-echarts';
import { getVisitHourList } from '@/api/dashboard';
import useEcharts from '@/utils/use-echarts';

use([
  CanvasRenderer,
  LineChart,
  GridComponent,
  TooltipComponent,
  LegendComponent
]);

//
const visitHourChartRef = ref(null);

useEcharts([visitHourChartRef]);

// 最近一周数据统计折线图配置
const visitHourChartOption = reactive({});

/* 获取最近一周数据统计数据 */
const getVisitHourData = () => {
  getVisitHourList()
    .then((data) => {
      Object.assign(visitHourChartOption, {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['IOS消耗量', 'IOS下载量', 'Android下载量'],
          right: 20
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: data.map((d) => d.datetime)
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'IOS消耗量',
            type: 'line',
            smooth: true,
            symbol: 'none',
            areaStyle: {
              opacity: 0.5
            },
            data: data.map((d) => d.downloadDeductCount)
          },
          {
            name: 'IOS下载量',
            type: 'line',
            smooth: true,
            symbol: 'none',
            areaStyle: {
              opacity: 0.5
            },
            data: data.map((d) => d.downloadCount)
          },
          {
            name: 'Android下载量',
            type: 'line',
            smooth: true,
            symbol: 'none',
            areaStyle: {
              opacity: 0.5
            },
            data: data.map((d) => d.downloadCountAndroid)
          }
        ]
      });
    })
    .catch((e) => {
      message.error(e.message);
    });
};

getVisitHourData();
</script>
