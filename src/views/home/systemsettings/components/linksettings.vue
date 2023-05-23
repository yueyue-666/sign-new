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
          <a-col :xl="12" :lg="12" :md="12" :sm="12" :xs="12">
            <a-form-item :label="item.typeStr" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
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
        </a-row>
      </a-card>
    </a-spin>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick } from 'vue';
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
