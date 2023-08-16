<template>
  <ele-modal :width="680" :visible="visible" :confirm-loading="loading" title="生成(webclip)闪退助手"
    :body-style="{ paddingBottom: '8px' }" @update:visible="updateVisible" @ok="save">
    <a-form ref="formRef" :model="form" :rules="rules" :label-col="{ md: 7, sm: 4, xs: 24 }"
      :wrapper-col="{ md: 17, sm: 20, xs: 24 }">
      <a-row :gutter="24">
        <a-col :md="24" :sm="24" :xs="24">
          <a-form-item label="应用名称" name="appName">
            <a-input allow-clear :maxlength="20" placeholder="请输入应用名称" v-model:value="form.appName"
              @blur="validate('appName', { trigger: 'blur' }).catch(() => { })" />
          </a-form-item>
          <a-form-item label="应用图标" name="icons">
            <ele-image-upload v-model:value="form.icons" :limit="1" :before-upload="onBeforeUpload" :drag="true"
              @upload="onUpload" @item-click="onItemClick" />
          </a-form-item>
          <a-form-item label="网站链接" name="url">
            <a-input allow-clear placeholder="请输入网站链接，例如：https://www.baidu.com" v-model:value="form.url"
              @blur="validate('url', { trigger: 'blur' }).catch(() => { })" />
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
<!-- 用户编辑弹窗 -->
<script setup>
import { ref, reactive, watch } from 'vue';
import { message } from 'ant-design-vue/es';
import { emailReg, phoneReg } from 'ele-admin-pro/es';
import useFormData from '@/utils/use-form-data';
import RoleSelect from './role-select.vue';
import SexSelect from './sex-select.vue';
import { addUser, updateUser, checkExistence } from '@/api/system/user';
import request from '@/utils/request';
import axios from 'axios';


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
  icon: '',
  icons: [],
  appName: '',
  url: '',
});
const action = ref('');
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
      required: true, validator: verifyUrl, trigger: 'blur'
    },
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
      const params = form
      delete params['icons']
      request.post('/ipa/getWebClipApp', params).then((msg) => {
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
    .catch(() => { });
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
function getLowerCharacter10() {

  var str_big = '';
  for (var i = 0; i < 10; i++) {
    str_big += getCharacter("lower")
  }
  return str_big;
}

function getCharacter(flag) {
  var character = ''
  const arr = 'abcdefghijklmnopqrstuvwxyz1234567890'
  const maxPos = arr.length

  character += arr.charAt(Math.floor(Math.random() * maxPos))

  return character
}
const objectName = ref('');

/* 上传图片前钩子 */
const onBeforeUpload = async (file) => {
  if (!file.type.startsWith('image')) {
    message.error('只能选择图片');
    return false;
  }
  if (file.size / 1024 / 1024 > 2) {
    message.error('大小不能超过 2MB');
    return false;
  }
  objectName.value = `${getLowerCharacter10()}_webclip.png`
  const params = {
    bucketName: "website-images",
    objectName: objectName.value
  }
  const result = await request.post('/file/getPresignedUrl', params);
  action.value = result.data.data.presignedUrl

};
const formData = new FormData();
/* 上传事件 */
const onUpload = (file) => {
  axios.put(action.value, { data: file }).then((res) => {
    if (res.status == 200) {
      form.icon = "/website-images/" + objectName.value
    }
  })

  // 图片上传

};


/* item 点击事件 */
const onItemClick = (item) => {
  console.log('item-click:', item);
};
</script>
