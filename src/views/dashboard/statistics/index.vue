<template>
  <a-card :bordered="false" title :body-style="{ padding: '16px 6px 0 0' }">
    <a-form :label-col="{ xl: 7, lg: 5, md: 7, sm: 4 }" :wrapper-col="{ xl: 17, lg: 19, md: 17, sm: 20 }">
      <a-row :gutter="8">
        <a-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
          <a-form-item label="应用">
            <a-select v-model:value="form.appId" placeholder="请选择" allow-clear>
              <a-select-option :value="item.appId" v-for="(item, i) in appList" :key="i">
                {{ item.appName
                }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
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
          <a-form-item class="ele-text-right" :wrapper-col="{ span: 24 }">
            <a-space>
              <a-button type="primary" @click="getVisitHourData">查询</a-button>
              <a-button @click="reset">重置</a-button>
            </a-space>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <!--
    <a-row :gutter="24">
      <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
        <a-alert show-icon type="info" icon>
          <template #message>
            <div class="ele-cell">
              <div class="ele-cell-content">
                <span>IOS上月下载:&nbsp;&nbsp;&nbsp;</span>
                <ele-tag size="mini" shape="round" color="green">{{ DownloadList.lastMonthUsed
                }}</ele-tag>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span>IOS当月下载:&nbsp;&nbsp;&nbsp;</span>
                <ele-tag size="mini" shape="round" color="green">{{ DownloadList.currentMonthUsed }}</ele-tag>
              </div>
            </div>
          </template>
        </a-alert>
      </a-col>
    </a-row>-->

    <v-chart ref="visitHourChartRef" :option="visitHourChartOption" style="padding-top:50px;height: 600px" />
  </a-card>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { message } from 'ant-design-vue/es';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts';
import useFormData from '@/utils/use-form-data';
import request from '@/utils/request';
import {
  GridComponent,
  LegendComponent,
  TooltipComponent
} from 'echarts/components';
import VChart from 'vue-echarts';
import { getSevenDaysDownload } from '@/api/dashboard';
import useEcharts from '@/utils/use-echarts';

use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  LegendComponent,
  TooltipComponent
]);

const props = defineProps({
  // 默认搜索条件
  where: Object
});

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

// 表单数据
const { form, resetFields } = useFormData({
  ...props.form,
  isCheckSub: false,
  startTime: s2 + ' 00:00:00',
  endTime: s1 + ' 23:59:59'
});

/*  重置 */
const reset = () => {
  resetFields();
  getVisitHourData();
};

const visitHourChartRef = ref(null);

const appList = ref({});
// 获取应用下拉
const getselect = () => {
  let body = { isCheckSub: 'false', userId: localStorage.getItem('userId') };
  request
    .post('/backstage/getAppList', body)
    .then((res) => {
      appList.value = res.data.data;
    })
    .catch((e) => {
      message.error(e.response.data.msg);
    });
};

useEcharts([visitHourChartRef]);

// 下载量
const DownloadList = reactive({});

// 最近一周数据统计折线图配置
const visitHourChartOption = reactive({});

/* 获取最近一周数据统计数据 */
const getVisitHourData = () => {
  getSevenDaysDownload(form)
    .then((res) => {
      const data = res.sort((a, b) => {
        return new Date(a.datetime) - new Date(b.datetime);
      });
      Object.assign(visitHourChartOption, {
        tooltip: {
          trigger: 'axis'
        },
        xAxis: [
          {
            type: 'category',
            data: data.map((d) => d.datetime)
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
              name: 'iOS消耗量', // 这个name需要和 series 里面的 name 对应起来
              textStyle: {
                color: '#5daeff' // 单独设置某一个图列的颜色
              }
            },
            {
              name: 'iOS下载量', // 这个name需要和 series 里面的 name 对应起来
              textStyle: {
                color: '#43cdcf' // 单独设置某一个图列的颜色
              }
            },
            {
              name: 'Android下载量', // 这个name需要和 series 里面的 name 对应起来
              textStyle: {
                color: '#f9904f' // 单独设置某一个图列的颜色
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
            name: 'iOS消耗量', // 这个name需要和 legend下面data里面的 name 对应起
            type: 'bar',
            itemStyle: {
              color: '#5daeff' // 蓝色柱子颜色
            },
            data: data.map((d) => d.downloadDeductCount)
          },
          {
            name: 'iOS下载量', // 这个name需要和 legend下面data里面的 name 对应起来
            type: 'bar',
            itemStyle: {
              color: '#43cdcf' // 蓝色柱子颜色
            },
            data: data.map((d) => d.downloadCount)
          },
          {
            name: 'Android下载量', // 这个name需要和 legend下面data里面的 name 对应起来
            type: 'bar',
            itemStyle: {
              color: '#f9904f' // 蓝色柱子颜色
            },
            data: data.map((d) => d.downloadCountAndroid)
          }
        ]
      });

      // Object.assign(DownloadList, data[0]);
    })
    .catch((e) => {
      message.error(e.message);
    });
};
getselect();
getVisitHourData();
</script>

<script>
export default {
  name: 'statistics'
};
</script>
