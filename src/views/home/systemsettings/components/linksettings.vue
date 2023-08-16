<template>
  <div class="ele-body">
    <a-spin :spinning="loading">
      <a-card :bordered="false">
        <a-row
          :gutter="8"
          v-for="(item,i) in AllConfigList"
          :key="i"
          v-show="[1, 2, 4,9,10,11,12,14,16,17,18,20,21,22,23,24,25,32,33,35,37,38,39,40].includes(item.type)"
        >
          <a-col :xl="12" :lg="12" :md="18" :sm="18" :xs="24">
            <a-form-item :label="item.type===17?'自动切换oss':item.typeStr" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
              <a-input allow-clear :maxlength="20" placeholder="请输入" v-model:value="item.typeValue" />
            </a-form-item>
          </a-col>
          <a-col :xl="2" :lg="2" :md="2" :sm="2" :xs="2">
            <a-form-item class="ele-text-right" :wrapper-col="{ span: 24 }">
              <a-space>
                <a-button type="primary" @click="updateConfig(item)">提交</a-button>
              </a-space>
            </a-form-item>
          </a-col>
          <span style="color: red;">{{ sum(tipsList,item.type) ? sum(tipsList,item.type) : '' }}</span>
        </a-row>
      </a-card>
    </a-spin>
  </div>
</template>

<script setup>
import { ref, computed, reactive, nextTick } from 'vue';
import { toDateString } from 'ele-admin-pro/es';
import useFormData from '@/utils/use-form-data';
import request from '@/utils/request';
import { message, Modal } from 'ant-design-vue/es';
import { getBadApp } from '@/api/system/user';
import { removePageTab } from '@/utils/page-tab-util';
import { useRouter } from 'vue-router';

// 请求状态
const loading = ref(false);

const AllConfigList = ref([]);
const tipsList = ref([
  {
    key: 17,
    text: '0: 阿里云   1: AWS   2: 自建香港oss'
  },
  {
    key: 18,
    text: '0: 不区分   1: AWS   2: 自建香港oss'
  },
  {
    key: 20,
    text: '0: 私有   1: 公开'
  },
  {
    key: 21,
    text: '0: 阿里云   1: AWS'
  },
  {
    key: 23,
    text: '0: 默认   1: 使用阿里云oss'
  },
  {
    key: 39,
    text: '0: 香港自建oss   1: 阿里云   2: AWS'
  },
  {
    key: 40,
    text: '0: 不区分   1: 海外AWS'
  }
]);

let sum = computed(() => (num1, num2) => {
  return num1.findIndex((element) => element.key === num2) !== -1
    ? num1[num1.findIndex((element) => element.key === num2)].text
    : false;
});

const getAllConfig = () => {
  loading.value = true;
  request
    .post('/backstage/getAllConfig', {})
    .then((res) => {
      AllConfigList.value = res.data.data;
      loading.value = false;
    })
    .catch((e) => {
      loading.value = false;
      message.error(e.response.data.msg);
    });
};

const updateConfig = (row) => {
  if (row.typeValue === '') {
    message.info('提交不能为空！');
    return;
  }
  loading.value = true;
  let body = { type: row.type, typeValue: row.typeValue };
  request
    .post('/backstage/updateConfig', body)
    .then((res) => {
      loading.value = false;
      getAllConfig();
    })
    .catch((e) => {
      loading.value = false;
      message.error(e.response.data.msg);
    });
};

getAllConfig();
</script>

<script>
export default {
  name: 'linksettings'
};
</script>
<style lang="less" scoped>
</style>
