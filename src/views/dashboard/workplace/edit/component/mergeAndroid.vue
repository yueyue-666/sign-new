<template>
  <div class="merge-android-class">
    <a-card title="合并安卓" style="width: 500px">
      <template #extra>
        <a-switch v-model:checked="formState.isOpenAndroid" checked-children="开" :checkedValue="1" :unCheckedValue="0"
          @change="setIsOpenAndroid" un-checked-children="关" />
      </template>
      <a-form :model="formState" name="basic" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
        <a-form-item label="应用来源" name="apkSource" :rules="[{ required: true, message: '请选择应用来源' }]">
          <a-radio-group v-model:value="formState.apkSource" name="apkSource">
            <a-radio value="0">上传</a-radio>
            <a-radio value="1">使用外部链接</a-radio>
          </a-radio-group>
          <span style="color: green;" v-if="androidurllin">已上传</span>
        </a-form-item>


        <a-form-item label="上传APK" name="apkPath" :rules="[{ required: true, message: '请上传APK' }]"
          v-if="formState.apkSource == 0">
          <template v-if="getPakName">
            <div class="app-name-class">
              <div>{{ appInfo.name }}</div>
              <div v-if="complete > 0">
                <a-progress :percent="complete" />
                <div class="progress-bar-class" v-if="complete > 0">
                  {{ fileSizeFmt((fileSize * complete) / 100) + '/' + fileSizeFmt(fileSize) }}
                </div>
              </div>
              <div v-if="complete == 100">
                (上传成功)
              </div>
            </div>
          </template>
          <template v-else>
            <a-upload-dragger accept=".apk" v-model:fileList="formState.apkPath" :show-upload-list="false"
              :customRequest="doUpload" style="padding: 24px 0; margin-bottom: 16px">
              <p class="ant-upload-drag-icon">
                <cloud-upload-outlined />
              </p>
              <p class="ant-upload-hint">点击上传，或将APK拖到此处，应用大小不超过2G</p>
            </a-upload-dragger>
          </template>

        </a-form-item>

        <a-form-item label="外部链接" name="androidUrl" :rules="urlVerification" v-if="formState.apkSource == 1">
          <a-input v-model:value="formState.androidUrl" />
        </a-form-item>

        <a-form-item v-if="uploadSuccessful">
          <div class="sub-class">
            <a-button type="primary" html-type="submit">提交</a-button>
          </div>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>
<script setup>
import { ref, reactive, computed, unref, onMounted } from 'vue';
import { CloudUploadOutlined } from '@ant-design/icons-vue';
import { getBase64WithFile, fileSizeFmt } from '@/utils/image';
import requestImage from '@/utils/requestImage';
import request from '@/utils/request';
import { useRouter } from 'vue-router';
import { API_IPA_URL } from '@/config/setting';

const props = defineProps({
  form: Object
})
onMounted(() => {
  const isAndroidUrl = String(props.form?.androidUrl)?.indexOf('http') > -1;
  if (isAndroidUrl) {
    formState.apkSource = '1'
    formState.androidUrl = props.form?.androidUrl
    isDisabledOpenAndroid.value = true;
  } else {
    formState.apkSource = '0'
    isDisabledOpenAndroid.value = false;
  }
  if([0,1].includes( props.form?.isOpenAndroid)){
    formState.isOpenAndroid = props.form?.isOpenAndroid
  }

})
// 合并安卓是否开启 1开 0关
const isOpenAndroid = ref(0);
const isDisabledOpenAndroid = ref(true);

const formState = reactive({
  androidUrl: '',
  apkSource: '0', //0上传1连接
  isOpenAndroid: 0,
  apkPath: []
});
// isSetting 1
let verifyUrl = async (_rule, value) => {
  if (value === '') {
    return Promise.reject('请输入网站链接');
  } else {
    var reg1 = /^http[s]?:\/\/.+$/;
    var reg2 = /[\r\n\s'";]/;
    if (!(reg1.test(value) && !reg2.test(value))) {
      return Promise.reject('网站链接格式有误');
    }
    return Promise.resolve();
  }
};
// 设置开关
async function setIsOpenAndroid(e) {
  const { query } = unref(currentRoute);
  const params = {
    appId: query.appId,
    isOpenAndroid:e
  }
  const result = await request.post('/ipa/update_app', params);
  if (result.code == 200) {
  }
}

const uploadSuccessful = ref(true);
const urlVerification = [
  { required: true, validator: verifyUrl, trigger: 'blur' }
]
const { currentRoute, push } = useRouter();
const complete = ref(0);
const formData = new FormData();
const onFinish = async (values) => {
  const { query } = unref(currentRoute);

  if (formState.apkSource == 1) {
    const params = {
      androidUrl: formState.androidUrl,
      appId: query.appId,
      isOpenAndroid: formData.isOpenAndroid
    }
    const result = await request.post('/ipa/update_app', params);
    if (result.code == 200) {
      uploadSuccessful.value = false;
    }
    return false;
  }
  const flagId = localStorage.getItem('flagId') || '';
  formData.append('flagId', flagId);
  formData.append('appId', query.appId);
  complete.value = 0;
  requestImage.post(`${API_IPA_URL}/file/uploadAppInfo`, formData, {
    onUploadProgress(progressEvent) {
      const schedule = (progressEvent.loaded / progressEvent.total * 100 | 0)
      if (schedule != 100) {
        complete.value = schedule
      } else {
        complete.value = 99
      }
    },
  })
    .then(async (res) => {
      const apkPath = res.data.data.apkPath;
      const params = {
        androidUrl: apkPath,
        isOpenAndroid: formData.isOpenAndroid,
        appId: query.appId
      }
      const result = await request.post('/ipa/update_app', params);
      if (result.code == 200) {
        complete.value = 100;
        uploadSuccessful.value = false;
        localStorage.setItem('androidurllin', apkPath);
        isDisabledOpenAndroid.value = false;
      }

    })
    .catch((e) => {
      complete.value = 0;
      message.error('上传失败！');
      uploadSuccessful.value = true;
    });
};

const androidurllin = computed(() => {
  if (localStorage.getItem('androidurllin') || complete.value == 100) {
    return true;
  } else {
    return false;
  }
})

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
const appInfo = ref({});
const fileSize = ref(0);
async function doUpload({ file }) {
  // formState.apkPath = file
  // const base64 = await getBase64WithFile(file);
  // const parser = new window.AppInfoParser(base64.result);
  // appInfo.value = await parser.parse();
  if (file.size / 1024 / 1024 / 1024 > 2) {
    message.error('大小不能超过 2G');
    return false;
  }
  formData.append('apkFile', file);
  appInfo.value.name = file.name
  fileSize.value = file.size



}

const getPakName = computed(() => {
  if (unref(appInfo.value?.name)) {
    return true
  } else {
    return false
  }
})
</script>




<style lang='less' scoped>
.merge-android-class {
  .app-name-class {
    height: 180px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 1px dotted gray;
  }

  .sub-class {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
