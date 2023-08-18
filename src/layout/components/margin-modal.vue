<!-- 余量报警弹窗 -->
<template>
  <ele-modal
    :width="400"
    title="余量报警"
    :visible="visible"
    :resizable="true"
    :confirm-loading="loading"
    :maxable="true"
    @update:visible="updateVisible"
    @cancel="onCancel"
    @ok="BalanceNoticesave"
  >
    <a-form ref="formRef" :model="form" :label-col="{ flex: '120px' }" :wrapper-col="{ flex: '1' }">
      <a-form-item>
        <template #label>
          V2报警余量 &nbsp;
          <a-tooltip title="设置为0则不报警">
            <info-circle-outlined />
          </a-tooltip>
        </template>
        <a-input class="ele-fluid" placeholder="可用账户余量低于该值报警" v-model:value="form.publicAlarmNum" />
      </a-form-item>
      <a-form-item>
        <template #label>
          V3报警余量 &nbsp;
          <a-tooltip title="设置为0则不报警">
            <info-circle-outlined />
          </a-tooltip>
        </template>
        <a-input class="ele-fluid" placeholder="可用账户余量低于该值报警" v-model:value="form.publicAlarmNumV3" />
      </a-form-item>
      <a-form-item label="Telegram账号ID">
        <a-input class="ele-fluid" placeholder="多个用逗号(英文)分隔" v-model:value="form.publicAlarmTelegrams" />
      </a-form-item>
      <div class="layui-inline layui-col-md12">
        <p style="margin-left: 35px; margin-bottom: 5px;color: #9ea6bc; font-size: 10px">
          如何获取Telegram账号ID?
          <br />1. 打开Telegram，在搜索栏搜索 @userinfobot.
          <br />2. 选择点击灰色头像.
          <br />3. 点击Start.
          <br />4. 第二行Id即为您的UserID.
          <br />
        </p>
        <a
          style="color: #1E9FFF; margin-left: 35px;"
          target="_blank"
          href="https://bigone.zendesk.com/hc/zh-cn/articles/360008014894-%E5%8D%81-%E5%A6%82%E4%BD%95%E8%8E%B7%E5%8F%96%E8%87%AA%E5%B7%B1%E7%9A%84-Telegram-userid"
        >查看详情</a>
      </div>
    </a-form>
  </ele-modal>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { message } from 'ant-design-vue/es';
import useFormData from '@/utils/use-form-data';
import request from '@/utils/request';

const emit = defineEmits(['update:visible']);

defineProps({
  visible: Boolean
});

//
const formRef = ref(null);

// 提交loading
const loading = ref(false);

// 表单数据
const { form, resetFields } = useFormData({
  userId: localStorage.getItem('userId')
});

/* 修改visible */
const updateVisible = (value) => {
  emit('update:visible', value);
};

// 密码
const BalanceNoticesave = () => {
  var alarms = form.publicAlarmTelegrams;
  if (alarms) {
    var reg = /^([\-\+\d]+(,)?)+$/;
    if (!reg.test(alarms) || alarms.endsWith(',')) {
      message.error('账号格式错误');
      return false;
    }
    // form.publicAlarmTelegrams = JSON.stringify(alarms.split(','));
  }
  let body = {
    userId: form.userId,
    balance: form.publicAlarmNum,
    balanceV3: form.publicAlarmNumV3,
    telegramIds: JSON.stringify(alarms.split(','))
  };
  request
    .post('/backstage/settingBalanceNotice', body)
    .then((res) => {
      loading.value = false;
      updateVisible(false);
      resetFields();
      message.success(res.data.msg);
    })
    .catch((e) => {
      loading.value = false;
      message.error(e.response.data.msg);
    });
};

/* 关闭回调 */
const onCancel = () => {
  resetFields();
  formRef.value?.clearValidate();
  loading.value = false;
};
</script>
