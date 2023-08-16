
<template>
  <div class="certificate-class">
    <a-spin :spinning="loading">
      <a-form autocomplete="off" :label-col="{ style: { width: '150px' } }" :wrapper-col="{ span: 10 }">
        <a-form-item label="证书状态" name="typeValue">
          <span :style="{color: color}">{{ formState.typeValue }}</span>
        </a-form-item>
        <a-form-item label="上次检测时间" name="updateTimestamp">{{ formState.updateTimestamp }}</a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onFinish">证书检测</a-button>
        </a-form-item>
      </a-form>
    </a-spin>
  </div>
</template>

<script setup lang='ts'>
import { computed, onMounted, reactive, ref, toRaw } from 'vue';
import { Form } from 'ant-design-vue';
import { CloudUploadOutlined } from '@ant-design/icons-vue';
import { number } from 'echarts/core';
import requestImage from '@/utils/requestImage';
import request from '@/utils/request';
import { message, Modal } from 'ant-design-vue/es';
import { API_P12_URL } from '@/config/setting';
const useForm = Form.useForm;

// 请求状态
const loading = ref(false);

const props = defineProps({
  type: Number
});

const formState = reactive({
  typeValue: '',
  updateTimestamp: ''
});

const color = ref('red');

const rulesRef = reactive({
  p12: [
    {
      required: true,
      message: '请上传P12文件'
    }
  ],
  mobileprovision: [
    {
      required: true,
      message: '请上传描述文件'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码'
    }
  ],
  cerName: [
    {
      required: true,
      message: '请输入整数名称'
    }
  ]
});
const { resetFields, validate, validateInfos, mergeValidateInfo } = useForm(
  formState,
  rulesRef
);

const onFinish = () => {
  validate()
    .then(async (res) => {
      const params = {};
      const result = await request.post('/ipa/cert/verify', params);
      getDetail();
    })
    .catch((err) => {
      console.log('error', err);
    });
};

function gettimezhuanhuan(times) {
  let datatime = new Date(times);
  let year = datatime.getFullYear();
  let mon =
    datatime.getMonth() + 1 < 10
      ? '0' + (datatime.getMonth() + 1)
      : datatime.getMonth() + 1;
  let datey =
    datatime.getDate() < 10 ? '0' + datatime.getDate() : datatime.getDate();
  let hou =
    datatime.getHours() < 10 ? '0' + datatime.getHours() : datatime.getHours();
  let minu =
    datatime.getMinutes() < 10
      ? '0' + datatime.getMinutes()
      : datatime.getMinutes();
  let sec =
    datatime.getSeconds() < 10
      ? '0' + datatime.getSeconds()
      : datatime.getSeconds();
  return year + '-' + mon + '-' + datey + ' ' + hou + ':' + minu + ':' + sec;
}

async function getDetail() {
  loading.value = true;
  const params = {};
  const result = await request.post('backstage/getAllConfig', params);
  result.data.data.forEach((element) => {
    if (element.type == 7) {
      if (element.typeValue == 0) {
        formState.typeValue = '证书有效';
        color.value = 'green';
      } else if (element.typeValue == 1) {
        formState.typeValue = '证书未知';
        color.value = 'red';
      } else if (element.typeValue == -1) {
        formState.typeValue = '证书撤销';
        color.value = 'red';
      } else if (element.typeValue == 2) {
        formState.typeValue = '验证异常';
        color.value = 'red';
      }
      formState.updateTimestamp = gettimezhuanhuan(element.updateTimestamp);
    }
  });
  loading.value = false;
}
onMounted(() => {
  getDetail();
});
</script>

<style lang='less' scoped>
.certificate-class {
  .red-class {
    color: red;
    margin-left: 10px;
  }
}
</style>
