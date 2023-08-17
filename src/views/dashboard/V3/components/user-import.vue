<!-- 用户导入弹窗 -->
<template>
  <ele-modal :width="520" :footer="null" title="发布应用" :visible="visible" @update:visible="updateVisible">
    <a-spin :spinning="loading">
      <div style="max-width: 800px; margin: 0 auto">
        <div style="margin: 10px 0 30px 0">
          <a-steps :current="active">
            <a-step title="第一步" description="选择应用" />
            <a-step title="第二步" description="解析完成" />
            <a-step title="第三步" description="上传完成" />
          </a-steps>
        </div>
        <!-- <step-edit v-if="active === 0" @done="onDone" />
        <step-confirm v-if="active === 1" :data="form" @done="onNext" @back="onBack" />
        <step-success v-if="active === 2" :data="form" @back="onBack" />-->
      </div>
      <div v-if="active === 0">
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
    </a-spin>
  </ele-modal>
</template>

<script setup>
import { ref } from 'vue';
import { message } from 'ant-design-vue/es';
import { CloudUploadOutlined } from '@ant-design/icons-vue';

const emit = defineEmits(['done', 'update:visible']);

defineProps({
  // 是否打开弹窗
  visible: Boolean
});

// 导入请求状态
const loading = ref(false);

// 选中步骤
const active = ref(0);

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
/* 上传 */
const doUpload = ({ file }) => {
  if (file.size / 1024 / 1024 / 1024 > 2) {
    message.error('大小不能超过 2G');
    return false;
  }
  loading.value = true;

  const formData = new FormData();
  formData.append('file', file);
  // const res = await request.post('/system/user/import', formData);
  // if (res.data.code === 0) {
  //   return res.data.message;
  // }
};

/* 更新 visible */
const updateVisible = (value) => {
  emit('update:visible', value);
};
</script>
