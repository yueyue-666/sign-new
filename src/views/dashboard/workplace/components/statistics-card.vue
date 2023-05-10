<!-- 统计卡片 -->
<template>
  <a-row :gutter="16">
    <a-col :lg="6" :md="12" :sm="12" :xs="24">
      <a-card :bordered="false" class="monitor-count-card">
        <ele-tag color="blue" shape="circle" size="large">
          <eye-filled />
        </ele-tag>
        <h1 class="monitor-count-card-num">{{UserData.iosTodayUsed }}</h1>
        <div class="monitor-count-card-text">今日iOS消耗量</div>
      </a-card>
    </a-col>
    <a-col :lg="6" :md="12" :sm="12" :xs="24">
      <a-card :bordered="false" class="monitor-count-card">
        <ele-tag color="orange" shape="circle" size="large">
          <fire-filled />
        </ele-tag>
        <h1 class="monitor-count-card-num">{{UserData.iosLastDayUsed }}</h1>
        <div class="monitor-count-card-text">昨日iOS消耗量</div>
      </a-card>
    </a-col>
    <a-col :lg="6" :md="12" :sm="12" :xs="24">
      <a-card :bordered="false" class="monitor-count-card">
        <ele-tag color="red" shape="circle" size="large">
          <flag-filled />
        </ele-tag>
        <h1 class="monitor-count-card-num">{{UserData.androidTodayUsed }}</h1>
        <div class="monitor-count-card-text">今日Android下载量</div>
        <div class="monitor-count-card-trend ele-text-danger"></div>
      </a-card>
    </a-col>
    <a-col :lg="6" :md="12" :sm="12" :xs="24">
      <a-card :bordered="false" class="monitor-count-card">
        <ele-tag color="green" shape="circle" size="large">
          <thunderbolt-filled />
        </ele-tag>
        <h1 class="monitor-count-card-num">{{UserData.androidLastDayUsed }}</h1>
        <div class="monitor-count-card-text">昨日Android下载量</div>
      </a-card>
    </a-col>

    <a-col :lg="10" :md="12" :sm="12" :xs="24">
      <a-card title="数据统计" :bordered="false" style="height: 96%;">
        <ele-dashboard type="success" style="margin-right: 18px">
          <div style="line-height: 1">
            <span style="font-size: 48px">{{UserData.iosTotalUsed }}</span>
          </div>
          <div style="margin-top: 4px">iOS累计消耗量</div>
        </ele-dashboard>
        <ele-dashboard type="warning" style="margin-right: 18px">
          <div style="line-height: 1">
            <span style="font-size: 48px">{{UserData.androidTotalUsed }}</span>
          </div>
          <div style="margin-top: 4px">Android累计下载量</div>
        </ele-dashboard>
        <ele-dashboard type="danger">
          <div style="line-height: 1">
            <span style="font-size: 48px">{{ UserData.appCounts }}</span>
          </div>
          <div style="margin-top: 4px">应用数量</div>
        </ele-dashboard>
      </a-card>
    </a-col>
    <a-col :lg="14" :md="12" :sm="12" :xs="24">
      <VisitHour />
    </a-col>
  </a-row>
</template>

<script setup>
import { ref } from 'vue';
import request from '@/utils/request';

import VisitHour from './visit-hour.vue';

import {
  QuestionCircleOutlined,
  EyeFilled,
  FireFilled,
  FlagFilled,
  ThunderboltFilled,
  UpOutlined,
  DownOutlined
} from '@ant-design/icons-vue';

const UserData = ref({});

request
  .post('/backstage/getUserData', {})
  .then((res) => {
    UserData.value = res.data.data;
  })
  .catch((e) => {
    console.error(e);
  });
</script>

<style lang="less" scoped>
.monitor-count-card {
  text-align: center;

  .monitor-count-card-num {
    margin-top: 6px;
    font-size: 32px;
  }

  .monitor-count-card-text {
    font-size: 12px;
    margin: 8px 0;
    opacity: 0.8;
  }

  .monitor-count-card-trend {
    font-weight: bold;
    line-height: 26px;

    & > .anticon {
      margin-right: 6px;
    }
  }

  .monitor-count-card-tips {
    position: absolute;
    top: 16px;
    right: 16px;
    cursor: pointer;
    opacity: 0.6;
  }
}
</style>
