<template>
  <a-card :bordered="false" title :body-style="{ padding: '16px 6px 0 0' }">
    <a-form :label-col="{ xl: 7, lg: 5, md: 7, sm: 4 }" :wrapper-col="{ xl: 17, lg: 19, md: 17, sm: 20 }">
      <a-row :gutter="8">
        <a-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
          <a-form-item label="日期">
            <a-date-picker class="ele-fluid" placeholder="请选择" value-format="YYYY-MM-DD HH:mm:ss" v-model:value="form.startTime" />
          </a-form-item>
        </a-col>
        <a-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
          <a-form-item>
            <a-date-picker class="ele-fluid" placeholder="请选择" value-format="YYYY-MM-DD HH:mm:ss" v-model:value="form.endTime" />
          </a-form-item>
        </a-col>
        <a-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
          <a-form-item>
            <a-input allow-clear :maxlength="20" placeholder="用户" v-model:value="form.username" />
          </a-form-item>
        </a-col>
        <a-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
          <a-form-item class="ele-text-right" :wrapper-col="{ span: 24 }">
            <a-space>
              <a-button type="primary" @click="getVisitHourData">查询</a-button>
              <a-button @click="reset">重置</a-button>
            </a-space>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>

    <v-chart ref="saleChartRef" :option="visitHourChartOption" style="padding-top:50px;height: 600px" />
    <a-card :bordered="false" title :body-style="{ padding: '16px 6px 0 0' }">
      <!-- 表格 -->
      <ele-pro-table
        ref="tableRef"
        row-key="userId"
        :columns="columns"
        :datasource="datasource"
        :scroll="{ x: 1000 }"
        :where="defaultWhere"
        cache-key="proSystemUserTable"
      ></ele-pro-table>
    </a-card>
  </a-card>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { message } from 'ant-design-vue/es';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import useFormData from '@/utils/use-form-data';
import request from '@/utils/request';
import {
  GridComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components';
import VChart from 'vue-echarts';
import { trendStat } from '@/api/system/user';
import useEcharts from '@/utils/use-echarts';

use([
  CanvasRenderer,
  LineChart,
  GridComponent,
  TooltipComponent,
  LegendComponent
]);

// 表格实例
const tableRef = ref(null);

// 表格列配置
const columns = ref([
  {
    title: '日期',
    dataIndex: 'day',
    width: 120,
    align: 'center',
    sorter: false,
    showSorterTooltip: false
  },
  {
    title: '充值量',
    dataIndex: 'totalCharges',
    align: 'center',
    width: 120,
    sorter: false,
    showSorterTooltip: false,
    customRender: ({ text }) => {
      if (text) {
        return text;
      } else {
        return '-';
      }
    }
  },
  {
    title: '签发消耗总量',
    dataIndex: 'totalSigns',
    align: 'center',
    width: 120,
    ellipsis: true,
    customRender: ({ text }) => {
      if (text) {
        return text;
      } else {
        return '-';
      }
    }
  }
]);

// 表格数据源
const datasource = ({ page, limit, where, orders }) => {
  return trendStat({ ...form, ...orders, page, size: limit });
};

const props = defineProps({
  // 默认搜索条件
  where: Object
});

// 默认搜索条件
const defaultWhere = reactive({});

// 日期范围选择
var date = new Date();
// 当前时间
var s1 =
  date.getFullYear() +
  '-' +
  ((date.getMonth() + 1 < 10
    ? '0' + (date.getMonth() + 1)
    : date.getMonth() + 1) +
    '-') +
  date.getDate();
// 20天前的时间
date.setTime(date.getTime() - 480 * 60 * 60 * 1000);
var s2 =
  date.getFullYear() +
  '-' +
  ((date.getMonth() + 1 < 10
    ? '0' + (date.getMonth() + 1)
    : date.getMonth() + 1) +
    '-') +
  (date.getDate() + 1 < 10 ? '0' + (date.getDate() + 1) : date.getDate() + 1);

// 表单数据
const { form, resetFields } = useFormData({
  ...props.form,
  // isCheckSub: false,
  startTime: s2 + ' 00:00:00',
  endTime: s1 + ' 23:59:59'
});

/*  重置 */
const reset = () => {
  resetFields();
  getVisitHourData();
};

const visitHourChartRef = ref(null);

useEcharts([visitHourChartRef]);

// 下载量
const DownloadList = reactive({});

// 最近一周数据统计折线图配置
const visitHourChartOption = reactive({});

/* 获取最近一周数据统计数据 */
const getVisitHourData = () => {
  trendStat(form)
    .then((data) => {
      Object.assign(visitHourChartOption, {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['充值量', '签发消耗总量'],
          right: 20
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: data.map((d) => d.day)
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '充值量',
            type: 'line',
            smooth: true,
            symbol: 'none',
            areaStyle: {
              opacity: 0.5
            },
            data: data.map((d) => d.totalCharges)
          },
          {
            name: '签发消耗总量',
            type: 'line',
            smooth: true,
            symbol: 'none',
            areaStyle: {
              opacity: 0.5
            },
            data: data.map((d) => d.totalSigns)
          }
        ]
      });

      Object.assign(DownloadList, data[0]);
    })
    .catch((e) => {
      message.error(e.message);
    });
};
getVisitHourData();
</script>

<script>
export default {
  name: 'statistics'
};
</script>
