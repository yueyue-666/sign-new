<!-- 用户编辑弹窗 -->
<template>
  <ele-modal
    :width="680"
    :visible="visible"
    :confirm-loading="loading"
    title="生成(webclip)闪退助手"
    :body-style="{ paddingBottom: '8px' }"
    @update:visible="updateVisible"
    @ok="save"
  >
    <a-form ref="formRef" :model="form" :rules="rules" :label-col="{ md: 7, sm: 4, xs: 24 }" :wrapper-col="{ md: 17, sm: 20, xs: 24 }">
      <a-row :gutter="24">
        <a-col :md="24" :sm="24" :xs="24">
          <a-form-item label="应用名称" name="appName">
            <a-input
              allow-clear
              :maxlength="20"
              placeholder="请输入应用名称"
              v-model:value="form.appName"
              @blur="validate('appName', { trigger: 'blur' }).catch(() => {})"
            />
          </a-form-item>
          <a-form-item label="应用图标" name="icon">
            <ele-image-upload
              v-model:value="form.icon"
              :limit="1"
              :before-upload="onBeforeUpload"
              :drag="true"
              @upload="onUpload"
              @item-click="onItemClick"
            />
          </a-form-item>
          <a-form-item label="网站链接" name="url">
            <a-input
              allow-clear
              :maxlength="20"
              placeholder="请输入网站链接，例如：https://www.baidu.com"
              v-model:value="form.url"
              @blur="validate('url', { trigger: 'blur' }).catch(() => {})"
            />
          </a-form-item>
          <a-form-item label="移除方式">
            <a-select v-model:value="form.isRemovable" placeholder="请选择" allow-clear>
              <a-select-option value="1">可移除</a-select-option>
              <a-select-option value="0">永不可移除</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </ele-modal>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { message } from 'ant-design-vue/es';
import { emailReg, phoneReg } from 'ele-admin-pro/es';
import useFormData from '@/utils/use-form-data';
import RoleSelect from './role-select.vue';
import SexSelect from './sex-select.vue';
import { addUser, updateUser, checkExistence } from '@/api/system/user';
import request from '@/utils/request';

const emit = defineEmits(['done', 'update:visible']);

const props = defineProps({
  // 弹窗是否打开
  visible: Boolean,
  // 修改回显的数据
  data: Object
});

//
const formRef = ref(null);

// 提交状态
const loading = ref(false);

// 表单数据
const { form, resetFields, assignFields } = useFormData({
  isRemovable: '1',
  icon: []
});

// 表单验证规则
const rules = reactive({
  appName: [
    {
      required: true,
      message: '请输入应用名称',
      type: 'string',
      trigger: 'blur'
    }
  ],
  url: [
    {
      required: true,
      message: '请输入网站链接',
      type: 'string',
      trigger: 'blur'
    }
  ],
  icon: [
    {
      required: true,
      message: '请上传图片',
      type: 'string',
      trigger: 'blur'
    }
  ]
});

/* 保存编辑 */
const save = () => {
  if (!formRef.value) {
    return;
  }
  formRef.value
    .validate()
    .then(() => {
      loading.value = true;
      const saveOrUpdate = addUser;
      saveOrUpdate(form)
        .then((msg) => {
          loading.value = false;
          message.success(msg);
          updateVisible(false);
          emit('done');
        })
        .catch((e) => {
          loading.value = false;
          message.error(e.message);
        });
    })
    .catch(() => {});
};

/* 更新visible */
const updateVisible = (value) => {
  emit('update:visible', value);
};

watch(
  () => props.visible,
  (visible) => {
    if (visible) {
      if (props.data) {
        assignFields({
          ...props.data
        });
      }
    } else {
      resetFields();
      formRef.value?.clearValidate();
    }
  }
);

/* 上传图片前钩子 */
const onBeforeUpload = (file) => {
  if (!file.type.startsWith('image')) {
    message.error('只能选择图片');
    return false;
  }
  if (file.size / 1024 / 1024 > 2) {
    message.error('大小不能超过 2MB');
    return false;
  }
};
const formData = new FormData();
/* 上传事件 */
const onUpload = (d) => {
  const item = form.icon.find((t) => t.uid === d.uid) ?? d;
  formData.append('file', item.file);
  // 图片上传

  request
    .post('/file/getPresignedUrl', formData)
    .then((res) => {
      console.log(res);
      // UserData.value = res.data.data;
    })
    .catch((e) => {
      console.error(e);
    });
};

/* item 点击事件 */
const onItemClick = (item) => {
  console.log('item-click:', item);
};
</script>
