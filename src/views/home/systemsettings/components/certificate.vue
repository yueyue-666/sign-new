
<template>
  <div class="certificate-class">
    <a-form autocomplete="off" :label-col="{ style: { width: '150px' } }" :wrapper-col="{ span: 10 }">
      <a-form-item label="P12文件" name="p12" v-bind="validateInfos.p12">
        <a-upload accept=".p12" :show-upload-list="false" :customRequest="doUpload">
          <a-button type="primary">
            <cloud-upload-outlined />请上传P12格式的证书
          </a-button>
          <span class="red-class">{{ getIsUploadP12 }}</span>
        </a-upload>
      </a-form-item>
      <a-form-item label="描述文件" name="mobileprovision" v-bind="validateInfos.mobileprovision">
        <a-upload accept=".mobileprovision" :show-upload-list="false" :customRequest="doUploadMo">
          <a-button type="primary">
            <cloud-upload-outlined />请上传mobileprovision格式的证书
          </a-button>
          <span class="red-class">{{ getIsUploadMobileprovision }}</span>
        </a-upload>
      </a-form-item>
      <a-form-item label="密码" name="password" v-bind="validateInfos.password">
        <a-input v-model:value="formState.password" placeholder="请输入证书密码" />
      </a-form-item>
      <a-form-item label="证书名称" name="cerName" v-bind="validateInfos.cerName">
        <a-input v-model:value="formState.cerName" placeholder="请输入证书名称" />
      </a-form-item>
      <a-form-item label="证书状态" name="cerStatus">{{ formState.cerStatus }}</a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onFinish">提交</a-button>
      </a-form-item>
    </a-form>
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

const props = defineProps({
  type: Number
});

const formState = reactive({
  p12: localStorage.getItem(`p12type${props.type}`)
    ? [localStorage.getItem(`p12type${props.type}`)]
    : [],
  mobileprovision: localStorage.getItem(`mobileprovisiontype${props.type}`)
    ? [localStorage.getItem(`mobileprovisiontype${props.type}`)]
    : [],
  password: '', //密码
  cerName: '', //证书名称
  cerStatus: '请上传证书' //证书状态
});
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

const p12Status = ref('');
const mobileprovisionStatus = ref('');

async function doUpload({ file }) {
  const type = props.type;
  const flagId = localStorage.getItem('flagId') || '';
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', type);
  formData.append('flagId', flagId);
  const res = await requestImage.post(`${API_P12_URL}/api/file/p12/upload`, formData);
  if (res.data.status == 200) {
    localStorage.setItem(`p12type${type}`, 'true');
    p12Status.value = 'true';
    formState.p12 = ['true'];
  }
}

async function doUploadMo({ file }) {
  const type = props.type;
  const flagId = localStorage.getItem('flagId') || '';
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', type);
  formData.append('flagId', flagId);
  const res = await requestImage.post(`${API_P12_URL}/api/file/mobileprovision/upload`, formData);
  if (res.data.status == 200) {
    localStorage.setItem(`mobileprovisiontype${type}`, 'true');
    mobileprovisionStatus.value = 'true';
    formState.mobileprovision = ['true'];
    message.success('上传成功！');
  }
}

const getIsUploadP12 = computed(() => {
  return localStorage.getItem(`p12type${props.type}`) ||
    p12Status.value == 'true'
    ? '已上传'
    : '';
});
const getIsUploadMobileprovision = computed(() => {
  return localStorage.getItem(`mobileprovisiontype${props.type}`) ||
    mobileprovisionStatus.value == 'true'
    ? '已上传'
    : '';
});

const onFinish = () => {
  validate()
    .then(async (res) => {
      const type = props.type;
      const params = {
        type: type,
        cerName: formState.cerName,
        password: formState.password
      };
      const result = await request.post('/file/save', params);
      getDetail();
    })
    .catch((err) => {
      console.log('error', err);
    });
};

async function getDetail() {
  const type = props.type;
  const params = {
    type: type
  };
  const result = await request.post('/cer/detail', params);
  formState.cerName = result.data.data.cerName;
  formState.cerStatus = result.data.data.cerStatus;
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
