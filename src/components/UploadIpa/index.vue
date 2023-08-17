<!-- 用户导入弹窗 -->
<template>
  <ele-modal
    :width="520"
    :footer="null"
    :title="title"
    :visible="visible"
    @update:visible="updateVisible"
    v-bind="$attrs"
    @cancel="cancelModal"
  >
    <a-spin :spinning="loading">
      <div style="max-width: 800px; margin: 0 auto">
        <div style="margin: 10px 0 30px 0">
          <a-steps :current="active" size="small">
            <a-step title="第一步" description="选择应用" />
            <a-step title="第二步" description="解析完成" />
            <a-step title="第三步" description="上传完成" />
          </a-steps>
        </div>
      </div>
      <template v-if="active === 0">
        <div>
          <a-alert type="info">
            <template #description>
              <p class="upload-app-hint-title">上传ipa提示：</p>
              <p style="font-size: 12px;color: #666;">ipa包里必须要有embedded.mobileprovision，确保权限完整；</p>
              <p style="font-size: 12px;color: #666;">ipa包里确保info.plist里的bundleId与二进制执行文件中的bundleId一致；</p>
              <p style="font-size: 12px;color: #666;">ipa包最好是没有被其他机构重签过的包，不然可能会导致应用闪退；</p>
              <p style="font-size: 12px;color: #666;">ipa包包含有第三方服务且服务与bundleId有关联的，请选择证书推送（如第三方登录和地图等）；</p>
            </template>
          </a-alert>
          <a-divider style="margin: 0 0 15px 0" />
        </div>
        <a-upload-dragger accept=".ipa" :show-upload-list="false" :customRequest="doUpload" style="padding: 24px 0; margin-bottom: 16px">
          <p class="ant-upload-drag-icon">
            <cloud-upload-outlined />
          </p>
          <p class="ant-upload-hint">点击上传,或将IPA文件拖到此处，应用大小不超过2G</p>
        </a-upload-dragger>
      </template>
      <template v-if="active === 1">
        <div class="app-info-class">
          <div class="icon-class">
            <a-upload accept=".ipa" :show-upload-list="false" :customRequest="doUpload" v-if="errorUpload">
              <img :src="appInfo.icon" alt />
            </a-upload>
            <img :src="appInfo.icon" alt v-else />
          </div>
          <div class="tip-class" v-if="complete == 0">正在检查安装包，请稍等...</div>
          <div class="complete-class">
            <a-progress :percent="complete" />
            <div class="progress-bar-class" v-if="complete > 0">{{ fileSizeFmt((fileSize * complete) / 100) + '/' + fileSizeFmt(fileSize) }}</div>
          </div>
        </div>
      </template>
      <template v-if="active === 2">
        <a-form
          ref="formRef"
          :model="form"
          :rules="rules"
          :wrapper-col="{ lg: 20, md: 18, sm: 20, xs: 24 }"
          style="max-width: 580px; margin-top: 20px"
        >
          <a-form-item style="flex-wrap: nowrap">
            <div class="sub-app-info">
              <div>
                <img :src="appInfo.icon" alt />
              </div>
              <div class="info-class">
                <div>{{ appInfo.CFBundleDisplayName || appInfo.CFBundleName }}</div>
                <div>{{ appInfo.CFBundleShortVersionString }}</div>
                <div>{{ fileSizeFmt(fileSize) }}</div>
              </div>
            </div>
          </a-form-item>
          <a-form-item name="installType" style="flex-wrap: nowrap" required>
            <template #label>
              安装方式 &nbsp;
              <a-tooltip title="公开：用户可自主安装应用，滑块验证：用户下载应用时需要滑块验证通过后方可安装应用，下载码：用户下载应用时需要输入对应的下载码，验证通过后方可安装应用">
                <info-circle-outlined />
              </a-tooltip>
            </template>
            <a-radio-group v-model:value="form.installType">
              <a-radio :value="0">公开</a-radio>
              <a-radio :value="1">滑块验证</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item name="signType" style="flex-wrap: nowrap" required>
            <template #label>
              签名模式 &nbsp;
              <a-tooltip
                title="超级签名V2模式：MDM签名模式，安装时如果与其他家MDM平台冲突可能会出现MDM有效负载不匹配问题。，超级签V3模式：可以解决与其他家MDM冲突的问题，不会出现MDM有效负载不匹配的问题。，混合模式：当MDM的V2无法安装的情况下会自动切换到V3模式，确保用户能够正常下载APP。"
              >
                <info-circle-outlined />
              </a-tooltip>
            </template>
            <a-radio-group v-model:value="form.signType">
              <a-radio :value="0">V2 模式</a-radio>
              <a-radio :value="1">V3 模式</a-radio>
              <a-radio :value="2">混合模式</a-radio>

              <p
                v-if="form.signType === 0"
                style="color:red;font-size:12px;margin-bottom:0;"
              >MDM安装模式，若出现负载不匹配等情況，需要用户去设置里面卸载已有的移动管理文件，然后再进行签名安装。</p>
              <p v-if="form.signType === 1" style="color:red;font-size:12px;margin-bottom:0;">不会出现MDM负载不匹配的问题，可直接安装应用，但需要用户手动信任证书。</p>
              <p
                v-if="form.signType === 2"
                style="color:red;font-size:12px;margin-bottom:0;"
              >用户优先使用V2的MDM模式进行签名安装，若出现MDM负载不匹配等情况，用户可点击【重试】使用V3模式，减少用户操作步骤，保证用户都能安装成功，提高应用的注册率。</p>
            </a-radio-group>
          </a-form-item>
          <a-form-item name="antiCrash" style="flex-wrap: nowrap" required>
            <template #label>
              闪退助手 &nbsp;
              <a-tooltip title="签名完成后会提示用户安装闪退助手，桌面会生成一个闪退助手图标，打开闪退助手后可以直接重新下载当前应用，利于提高用户留存率">
                <info-circle-outlined />
              </a-tooltip>
            </template>
            <a-radio-group v-model:value="form.antiCrash">
              <a-radio :value="1">开启</a-radio>
              <a-radio :value="0">关闭</a-radio>
              <a-radio :value="2">自定义链接</a-radio>
              <a-input v-if="form.antiCrash === 2" v-model:value="form.antiCustomUrl" placeholder="建议输入您落地页的链接" allow-clear />
            </a-radio-group>
          </a-form-item>

          <a-form-item name="lang" required>
            <template #label>
              页面语言 &nbsp;
              <a-tooltip title="应用下载页面的显示语言">
                <info-circle-outlined />
              </a-tooltip>
            </template>
            <a-select v-model:value="form.lang" placeholder="请选择页面语言">
              <a-select-option :value="0">简体中文</a-select-option>
              <a-select-option :value="1">英语-English</a-select-option>
              <a-select-option :value="2">泰国语-ไทย</a-select-option>
              <a-select-option :value="3">越南语-Tiếng Việt</a-select-option>
              <a-select-option :value="4">印度语-हिंदी</a-select-option>
              <a-select-option :value="5">印度尼西亚-Indonesia</a-select-option>
              <a-select-option :value="6">繁體中文（台湾）</a-select-option>
              <a-select-option :value="7">自动识别</a-select-option>
              <a-select-option :value="8">日语</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item :wrapper-col="{ md: { offset: 6 } }">
            <a-button type="primary" :loading="subLoading" @click="save">{{ subLoading ? '提交中..' : '提交' }}</a-button>
          </a-form-item>
        </a-form>
      </template>
    </a-spin>
  </ele-modal>
</template>

<script setup>
import { onMounted, ref, reactive, computed } from 'vue';
import { message } from 'ant-design-vue/es';
import { CloudUploadOutlined } from '@ant-design/icons-vue';
// import { importUsers } from '@/api/system/user';
import requestImage from '@/utils/requestImage';
import request from '@/utils/request';
import { dataURLtoFile, fileSizeFmt, getLowerCharacter26 } from '@/utils/image';
import { InfoCircleOutlined } from '@ant-design/icons-vue';
const emit = defineEmits(['done', 'update:visible']);
import { useRouter } from 'vue-router';
const { push } = useRouter();
import axios from 'axios';
import { API_IPA_URL } from '@/config/setting';
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  signType: {
    type: Number,
    default: 0
  },
  title: {
    type: String,
    default: '发布应用'
  },
  isUpdate: {
    type: Boolean,
    default: false
  },
  uploadParams: {
    type: Object,
    default: {}
  }
});

// 导入请求状态
const loading = ref(false);
//提交
const subLoading = ref(false);
//上传失败可以直接点图片在选择文件上传一下
const errorUpload = ref(false);
const title = computed(() => {
  return props.title;
});
// 选中步骤
const active = ref(0);

// 表单数据
const form = reactive({
  downloadType: '',
  guideType: '',
  installType: 0,
  signType: props.signType,
  autoInstallFlag: 1,
  antiCrash: 0,
  lang: 0,
  cnzz: '',
  introduction: '',
  antiCustomUrl: ''
});
const rules = reactive({
  // nickname: [
  //   {
  //     required: true,
  //     message: '请输入昵称',
  //     type: 'string'
  //   }
  // ],
});

//提交
async function save() {
  const params = {
    ...props.uploadParams,
    appDisplayName:
      appInfo.value.CFBundleDisplayName || appInfo.value.CFBundleName,
    build: appInfo.value.CFBundleName,
    bundleId: appInfo.value.CFBundleIdentifier,
    bundleName: appInfo.value.CFBundleName,
    icon: iconPath.value,
    installType: form.installType,
    ipaPathOriginal: ipaPath.value,
    lang: form.lang,
    requireOsVersion: appInfo.value.MinimumOSVersion,
    size: fileSize.value,
    version: appInfo.value.CFBundleShortVersionString,
    isUpdateApp: 1,
    appId: appId.value,
    antiCrash: form.antiCrash,
    signType: form.signType,
    antiCustomUrl: form.antiCustomUrl
  };
  if (!iconPath.value) {
    let icourl = '/website-images/' + getLowerCharacter26() + '_icon.png';
    params['icon'] = icourl;
  }
  try {
    subLoading.value = true;
    const subResult = await request.post('/ipa/create_app', params);
    const path = '/dashboard/workplace/edit';
    push({
      path,
      query: { appId: subResult?.data?.data?.appId ?? undefined }
    });
    emit('update:visible', false);
    emit('done');
  } finally {
    subLoading.value = false;
  }
}

const onDone = (data) => {
  Object.assign(form, data);
  active.value = 1;
};

//
const onNext = () => {
  active.value = 2;
};

//
const onBack = () => {
  active.value = 0;
};
const complete = ref(0);
const appInfo = ref({
  CFBundleDisplayName: '',
  CFBundleName: '',
  CFBundleShortVersionString: ''
});
const appId = ref('');
const iconPath = ref('');
const ipaPath = ref('');
const fileSize = ref(0);

/* 上传 */
const doUpload = async ({ file }) => {
  if (file.size / 1024 / 1024 / 1024 > 2) {
    message.error('大小不能超过 2G');
    return false;
  }
  errorUpload.value = false;
  fileSize.value = file.size;
  active.value = 1;
  // const app =  new AppInfoParser(file);
  const parser = new window.AppInfoParser(file);
  appInfo.value = await parser.parse();
  console.log(appInfo.value);
  const iocnFile = dataURLtoFile(appInfo.value.icon, 'image/png');
  const formData = new FormData();
  const flagId = localStorage.getItem('flagId') || '';
  formData.append('flagId', flagId);
  formData.append('ipaFile', file);
  if (iocnFile) {
    formData.append('imgFile', iocnFile);
  }
  complete.value = 0;
  requestImage
    .post(`${API_IPA_URL}/file/uploadAppInfo`, formData, {
      onUploadProgress(progressEvent) {
        const schedule =
          ((progressEvent.loaded / progressEvent.total) * 100) | 0;
        if (schedule != 100) {
          complete.value = schedule;
        } else {
          complete.value = 99;
        }
      }
    })
    .then((res) => {
      // reload();
      // message.info('成功可以下一步');
      complete.value = 100;
      active.value = 2;
      iconPath.value = res.data.data.iconPath;
      appId.value = res.data.data.appId;
      ipaPath.value = res.data.data.ipaPath;
    })
    .catch((e) => {
      errorUpload.value = true;
      message.error('上传失败！');
    });

  // .then(result => {
  //   console.log('app info ----> ', result)
  //   console.log('icon base64 ----> ', result.icon)
  // }).catch(err => {
  //   console.log('err ----> ', err)
  // })
};

/* 更新 visible */
const updateVisible = (value) => {
  emit('update:visible', value);
};

function cancelModal() {
  window.location.reload();
}
onMounted(() => {
  loading.value = false;
});
</script>

<style scoped lang="less">
.sub-app-info {
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100px;
    height: 100px;
    border-radius: 20px;
  }

  .info-class {
    margin-left: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    row-gap: 10px;
  }
}

.app-info-class {
  .icon-class {
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 80px;
      height: 80px;
      border-radius: 10px;
    }
  }

  .tip-class {
    display: flex;
    justify-content: center;
    align-items: center;
    color: grey;
    margin-top: 20px;
  }

  .complete-class {
    margin-top: 20px;
    width: 100%;

    ::v-deep(.ant-progress-bg) {
      height: 18px !important;
    }

    .progress-bar-class {
      // display: flex;
      // justify-items: center;
      // align-items: center;
      margin-top: 20px;
      width: 100%;
      text-align: center;
    }
  }
}
</style>
