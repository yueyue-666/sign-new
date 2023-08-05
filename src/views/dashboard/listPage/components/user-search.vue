<!-- 搜索表单 -->
<template>
  <a-form :label-col="{ xl: 7, lg: 5, md: 7, sm: 4 }" :wrapper-col="{ xl: 17, lg: 19, md: 17, sm: 20 }">
    <a-row :gutter="8">
      <a-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
        <a-form-item label="应用">
          <a-select v-model:value="form.appId" placeholder="请选择" allow-clear>
            <a-select-option :value="item.appId" v-for="(item,i) in appList" :key="i">{{ item.appName }}</a-select-option>
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
            <a-button type="primary" @click="search">查询</a-button>
            <a-button @click="reset">重置</a-button>
          </a-space>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script setup>
import { ref } from 'vue';
import useFormData from '@/utils/use-form-data';
import request from '@/utils/request';

const props = defineProps({
  // 默认搜索条件
  where: Object
});

const emit = defineEmits(['search']);

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
// 7天前的时间
date.setTime(date.getTime() - 168 * 60 * 60 * 1000);
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

/* 搜索 */
const search = () => {
  emit('search', form);
};

/*  重置 */
const reset = () => {
  resetFields();
  search();
};

getselect();
</script>
