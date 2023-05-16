<!-- 统计卡片 -->
<template>
  <a-row :gutter="16" style="padding: 0 20px;">
    <a-col :lg="6" :md="12" :sm="12" :xs="24" style="margin-top: 20px;">
      <a-card :bordered="false" class="monitor-count-card">
        <ele-tag color="blue" shape="circle" size="large">
          <eye-filled />
        </ele-tag>
        <h1 class="monitor-count-card-num">{{superSign.todayCharged }}</h1>
        <div class="monitor-count-card-text">今日充值</div>
      </a-card>
    </a-col>
    <a-col :lg="6" :md="12" :sm="12" :xs="24" style="margin-top: 20px;">
      <a-card :bordered="false" class="monitor-count-card">
        <ele-tag color="orange" shape="circle" size="large">
          <fire-filled />
        </ele-tag>
        <h1 class="monitor-count-card-num">{{superSign.todayUsed }}</h1>
        <div class="monitor-count-card-text">今日消耗</div>
      </a-card>
    </a-col>
    <a-col :lg="6" :md="12" :sm="12" :xs="24" style="margin-top: 20px;">
      <a-card :bordered="false" class="monitor-count-card">
        <ele-tag color="red" shape="circle" size="large">
          <flag-filled />
        </ele-tag>
        <h1 class="monitor-count-card-num">{{superSign.yesterdayCharged }}</h1>
        <div class="monitor-count-card-text">昨日充值</div>
        <div class="monitor-count-card-trend ele-text-danger"></div>
      </a-card>
    </a-col>
    <a-col :lg="6" :md="12" :sm="12" :xs="24" style="margin-top: 20px;">
      <a-card :bordered="false" class="monitor-count-card">
        <ele-tag color="green" shape="circle" size="large">
          <thunderbolt-filled />
        </ele-tag>
        <h1 class="monitor-count-card-num">{{superSign.todayCharged }}</h1>
        <div class="monitor-count-card-text">昨日消耗</div>
      </a-card>
    </a-col>
    <a-col :lg="6" :md="12" :sm="12" :xs="24" style="margin-top: 20px;">
      <a-card :bordered="false" class="monitor-count-card">
        <ele-tag color="blue" shape="circle" size="large">
          <eye-filled />
        </ele-tag>
        <h1 class="monitor-count-card-num">{{superSign.thirtyDayUsed }}</h1>
        <div class="monitor-count-card-text">iOS三十日消耗量</div>
      </a-card>
    </a-col>
    <a-col :lg="6" :md="12" :sm="12" :xs="24" style="margin-top: 20px;">
      <a-card :bordered="false" class="monitor-count-card">
        <ele-tag color="orange" shape="circle" size="large">
          <fire-filled />
        </ele-tag>
        <h1 class="monitor-count-card-num">{{superSign.androidThirtyDayUsed }}</h1>
        <div class="monitor-count-card-text">Android三十日消耗量</div>
      </a-card>
    </a-col>
    <a-col :lg="6" :md="12" :sm="12" :xs="24" style="margin-top: 20px;">
      <a-card :bordered="false" class="monitor-count-card">
        <ele-tag color="red" shape="circle" size="large">
          <flag-filled />
        </ele-tag>
        <h1 class="monitor-count-card-num">{{superSign.appCount }}</h1>
        <div class="monitor-count-card-text">iOS应用数量</div>
        <div class="monitor-count-card-trend ele-text-danger"></div>
      </a-card>
    </a-col>
    <a-col :lg="6" :md="12" :sm="12" :xs="24" style="margin-top: 20px;">
      <a-card :bordered="false" class="monitor-count-card">
        <ele-tag color="green" shape="circle" size="large">
          <thunderbolt-filled />
        </ele-tag>
        <h1 class="monitor-count-card-num">{{superSign.androidAppCount }}</h1>
        <div class="monitor-count-card-text">Android应用数量</div>
      </a-card>
    </a-col>

    <a-col :lg="24" :md="24" :sm="24" :xs="24" style="padding-top: 20px;">
      <a-card title="超级签名V2" :bordered="false" style="height: 96%;">
        <ele-dashboard type="success" style="margin-right: 18px">
          <div style="line-height: 1">
            <span style="font-size: 48px">{{superSign.todayCharged }}</span>
          </div>
          <div style="margin-top: 4px">今日充值量</div>
        </ele-dashboard>
        <ele-dashboard type="warning" style="margin-right: 18px">
          <div style="line-height: 1">
            <span style="font-size: 48px">{{superSign.sevenDayCharged }}</span>
          </div>
          <div style="margin-top: 4px">七日充值量</div>
        </ele-dashboard>
        <ele-dashboard type="danger" style="margin-right: 18px">
          <div style="line-height: 1">
            <span style="font-size: 48px">{{ superSign.thirtyDayCharged }}</span>
          </div>
          <div style="margin-top: 4px">三十日充值量</div>
        </ele-dashboard>
        <ele-dashboard type="info" style="margin-right: 18px">
          <div style="line-height: 1">
            <span style="font-size: 48px">{{superSign.todayUsed }}</span>
          </div>
          <div style="margin-top: 4px">今日签发消耗量</div>
        </ele-dashboard>
        <ele-dashboard type="warning" style="margin-right: 18px">
          <div style="line-height: 1">
            <span style="font-size: 48px">{{superSign.sevenDayUsed }}</span>
          </div>
          <div style="margin-top: 4px">七日签发消耗量</div>
        </ele-dashboard>
        <ele-dashboard type="danger">
          <div style="line-height: 1">
            <span style="font-size: 48px">{{ superSign.thirtyDayUsed }}</span>
          </div>
          <div style="margin-top: 4px">三十日签发消耗量</div>
        </ele-dashboard>
      </a-card>
    </a-col>
    <!-- <a-col :lg="14" :md="12" :sm="12" :xs="24">
        <VisitHour />
    </a-col>-->
  </a-row>
</template>

<script setup>
import { ref } from 'vue';
import request from '@/utils/request';

// import VisitHour from './visit-hour.vue';

import {
  QuestionCircleOutlined,
  EyeFilled,
  FireFilled,
  FlagFilled,
  ThunderboltFilled,
  UpOutlined,
  DownOutlined
} from '@ant-design/icons-vue';

const superSign = ref({});

// androidAppCount
// androidThirtyDayUsed
// appCount
// sevenDayCharged
// sevenDayUsed
// thirtyDayCharged
// thirtyDayUsed
// thirtyDayUsedForOtherIds
// todayCharged
// todayUsed
// todayUsedForOtherIds
// yesterdayCharged
// yesterdayUsed
// yesterdayUsedForOtherIds

request
  .post('/backstage/superSignRecords', {})
  .then((res) => {
    superSign.value = res.data.data;
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
