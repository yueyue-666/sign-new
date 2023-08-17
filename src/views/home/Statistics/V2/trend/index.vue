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
import { ref, reactive, unref } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue/es';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import useFormData from '@/utils/use-form-data';
import { BarChart } from 'echarts/charts';
import request from '@/utils/request';
import {
  GridComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components';
import VChart from 'vue-echarts';
import { trendStat } from '@/api/system';
import useEcharts from '@/utils/use-echarts';
use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  LegendComponent,
  TooltipComponent
]);
const { currentRoute } = useRouter();

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
  (date.getDate() + 1 < 10 ? '0' + date.getDate() : date.getDate());
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

const { query } = unref(currentRoute);

// 表单数据
const { form, resetFields } = useFormData({
  ...props.form,
  username: query.username ? query.username : '',
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
    .then((res) => {
      const data = res.sort((a, b) => {
        return new Date(a.day) - new Date(b.day);
      });
      Object.assign(visitHourChartOption, {
        tooltip: {
          trigger: 'axis'
        },
        xAxis: [
          {
            type: 'category',
            data: data.map((d) => d.day)
          }
        ],

        legend: {
          // top: '5%', // 控制 板块控制器的位置
          right: 'center',
          // icon: 'rect',//形状  类型包括 circle，rect,line，roundRect，triangle，diamond，pin，arrow，none
          // itemWidth: 10,  // 设置宽度
          // itemHeight: 4, // 设置高度
          itemGap: 40, // 设置两个legend之间的间距
          data: [
            {
              name: '充值量', // 这个name需要和 series 里面的 name 对应起来
              textStyle: {
                color: '#5470c6' // 单独设置某一个图列的颜色
              }
            },
            {
              name: '签发消耗总量', // 这个name需要和 series 里面的 name 对应起来
              textStyle: {
                color: '#9cc986' // 单独设置某一个图列的颜色
              }
            }
          ]
        },
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '充值量', // 这个name需要和 legend下面data里面的 name 对应起
            type: 'bar',
            itemStyle: {
              color: '#5470c6' // 蓝色柱子颜色
            },
            data: data.map((d) => d.totalSigns)
          },
          {
            name: '签发消耗总量', // 这个name需要和 legend下面data里面的 name 对应起来
            type: 'bar',
            itemStyle: {
              color: '#9cc986' // 蓝色柱子颜色
            },
            data: data.map((d) => d.totalCharges)
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

<script>
export default {
  name: 'statistics'
};
</script>
