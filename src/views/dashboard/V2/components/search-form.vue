<!-- 搜索表单 -->
<template>
  <a-card :bordered="false" :body-style="{ paddingBottom: 0 }">
    <a-form :label-col="{ xl: 7, lg: 5, md: 7, sm: 4 }" :wrapper-col="{ xl: 17, lg: 19, md: 17, sm: 20 }">
      <a-row :gutter="8">
        <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
          <a-form-item label="应用名称">
            <a-input v-model:value.trim="form.name" placeholder="请输入" allow-clear />
          </a-form-item>
        </a-col>
        <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
          <a-form-item class="ele-text-right" :wrapper-col="{ span: 24 }">
            <a-space>
              <a-button type="primary" @click="search">查询</a-button>
              <a-button @click="reset">重置</a-button>
            </a-space>
          </a-form-item>
        </a-col>
        <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
          <a-form-item class="ele-text-right" :wrapper-col="{ span: 24 }">
            <a-space>
              <a-button type="primary" @click="openDialog1">发布应用</a-button>
            </a-space>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>

    <ele-modal
      :width="750"
      title="服务协议"
      v-model:visible="visible1"
      :resizable="true"
      :maxable="true"
      :multiple="true"
      :destroy-on-close="false"
      :move-out="true"
      :move-out-positive="true"
      position="center"
    >
      <div style="padding: 20px 0">
        <div class="info-item">
          <p>请在使用iOS 超级签名服务前，仔细阅读并充分理解以下内容及条款：</p>
          <ul>
            <li>
              <p>您知晓并同意，您提交给超级签名的App，不包括任何违反中国境内相关法律的内容，也不会用于违反中国境内相关法律的任何用途。否则，由此而出现的任何法律风险和后果，将由您自行全部承担；</p>
            </li>
            <li>
              <p>您知晓并同意，您并不会将超级签名所提供的任何一项服务用于违反中国相关法律的用途，否则，由此而出现的所有法律后果，将由您自行全部承担；</p>
            </li>
            <li>
              <p>您知晓并同意，您没有向超级签名提交任何的虚假信息或材料，也没有故意隐瞒您的 App 中可能存在的违法内容。否则，由此出现的所有后果，将由您自行全部承担；</p>
            </li>
            <li>
              <p>您知晓并同意，您向我们提供的 App（手机应用程序）保证您拥有完整独立的知识产权，包括但不限于外观设计、著作权、文本，图形，徽标，按钮图标，图像，音频剪辑，且不会被用于未经许可的任何有关产品或服务；</p>
            </li>
            <li>
              <p>您知晓并同意，我们在需要时通过技术手段合法收集和使用有关您及您提供的App（手机应用程序）所使用本服务的技术性或诊断性信息，收集到的这些信息将用于改进我们的服务内容，提升我们的服务品质。我们不会将您的信息和内容分享或出售给其他的组织；</p>
            </li>
            <li>
              <p>我们作为第三方中立平台，不具有对您上传的 App 进行审查的义务，但我们在认为有需要时，我们有权利对您上传的内容进行审查，审查结果及审查后的进一步动作可由我们进行自行裁定。您对此表示理解并同意，并愿意承担因审查出现的全部后果；</p>
            </li>
            <li class="font-bold">
              <p>您知晓并同意，由我们提供软件签名的技术，您购买此服务是用于您的 App 的内部测试之用途，且需符合苹果iOS 超级签名的所有规定，否则，因此而产生的法律后果由您自行全部承担；</p>
            </li>
            <li class="font-bold">
              <p>您知晓并同意，苹果iOS 超级签名因受到苹果政策影响，在未来可能会存在被苹果撤销从而导致应用出现无法安装、或已经安装的应用无法打开等情况，您同意并愿意独立承担该风险以及该风险导致的后续一切损失，并接受我们在后续可能为此而做出任何补偿等措施；</p>
            </li>
            <li class="font-bold">
              <p>您知晓并同意，我们提供签名技术来供您下载您的应用，因您对外分发导致App被滥用、恶意下载、刷量而造成的损失，我们仅提供必要的数据支持和反作弊服务，您同意并愿意独立承担因对外分发和推广而导致的风险和风险后续的一切损失。</p>
            </li>
          </ul>
          <p>您已仔细阅读并同意《超级签名服务协议》中的全部内容。</p>
          <p>点击“我同意”代表您已仔细阅读并同意以上所有内容。</p>
        </div>
      </div>

      <template #footer>
        <a-button @click="visible1=false">取消</a-button>
        <a-button type="primary" @click="onOk">我同意</a-button>
      </template>
    </ele-modal>

    <ele-modal
      :width="750"
      title="发布应用"
      v-model:visible="visible2"
      :resizable="true"
      :maxable="true"
      :multiple="true"
      :destroy-on-close="false"
      :move-out="true"
      :move-out-positive="true"
      position="center"
      :footer="false"
    ></ele-modal>
  </a-card>
</template>

<script setup>
import { ref } from 'vue';
import useFormData from '@/utils/use-form-data';

const emit = defineEmits(['search', 'expand-change']);

// 表单数据
const { form, resetFields } = useFormData({
  name: ''
});

const visible1 = ref(false);
const visible2 = ref(false);

/* 打开弹窗1 */
const openDialog1 = () => {
  visible1.value = true;
};
/* 打开弹窗2 */
const openDialog2 = () => {
  visible2.value = true;
};

/* 搜索 */
const search = () => {
  emit('search', form);
};

/*  重置 */
const reset = () => {
  resetFields();
  search();
};

/* 同意协议 */
const onOk = () => {};
</script>
<style lang="less" scoped>
li,
ul,
p {
  list-style: none;
  margin: 0;
  padding: 0;
}
.info-item {
  padding: 0 10px;
  font-size: 12px;
  line-height: 1.5;
}
.info-item p {
  color: #7b7f83;
  line-height: 24px;
}
.font-bold {
  font-weight: 700;
}
.font-bold p {
  color: #f72c2c !important;
}
</style>
