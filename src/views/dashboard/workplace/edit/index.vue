<template>
  <!-- <a-card :bordered="false">
      <a-spin :spinning="loading">
        <a-space size="middle">
          <a-button @click="onClose">关闭</a-button>
          <a-button type="primary" :loading="loading" @click="save">保存</a-button>
        </a-space>
      </a-spin>
  </a-card>-->
  <div class="ele-body ele-body-card">
    <a-row :gutter="16">
      <a-col :xxl="6" :xl="7" :lg="9" :md="10" :sm="24" :xs="24">
        <a-card :bordered="false">
          <div class="user-info-list" style="margin-top:0;">
            <div class="ele-text-center">
              <div class="user-info-avatar-group" @click="openCropper">
                <a-avatar :size="70" :src="AppInfo.icon" shape="square" />
                <upload-outlined class="user-info-avatar-icon" />
              </div>
            </div>
            <div class="ele-cell">
              <edit-outlined />
              <div class="ele-cell-content">
                <span @click="visible1=true">备注</span>
              </div>
            </div>
            <div class="ele-cell">
              <tag-outlined />
              <div class="ele-cell-content">
                <span>{{ AppInfo.name }}</span> &nbsp;&nbsp;&nbsp;&nbsp;
                <ele-tag size="mini" shape="round" color="red" v-if="AppInfo.signType===1">V3</ele-tag>
                <ele-tag size="mini" shape="round" color="red" v-else-if="AppInfo.signType===2">混合</ele-tag>
                <ele-tag size="mini" shape="round" color="red" v-else>V2</ele-tag>
              </div>
            </div>
            <div class="ele-cell">
              <tag-outlined />
              <div class="ele-cell-content">大小：{{ getfilesize(AppInfo.size) }}</div>
            </div>
            <div class="ele-cell">
              <tag-outlined />
              <div class="ele-cell-content">版本：{{ AppInfo.version }}</div>
            </div>
            <div class="ele-cell">
              <tag-outlined />
              <div class="ele-cell-content">Bundle ID：{{ AppInfo.bundleId }}</div>
            </div>
          </div>
          <a-divider dashed />
          <a-card :bordered="false" :body-style="{ padding: '2px 0px' }">
            <div class="ele-cell-content">
              <div class="ele-text-secondary ele-cell">
                <p class="ele-cell-content">
                  下载地址
                  <a-tag color="green" @click="copyDetail(AppInfo.iosDownloadUrl)">复制</a-tag>
                </p>
                <span style="margin-bottom:1em;">
                  <a-tooltip>
                    <template #title>
                      <ele-qr-code-svg :value="AppInfo.iosDownloadUrl" :size="82" />
                      <br />手机扫码下载
                    </template>
                    <qrcode-outlined />
                  </a-tooltip>
                </span>
              </div>
              <a :href="AppInfo.iosDownloadUrl" target="_blank" rel="noopener noreferrer">{{ AppInfo.iosDownloadUrl }}</a>
            </div>
            <a-divider style="margin:10px 0;" dashed />
            <div class="ele-cell-content">
              <div class="ele-text-secondary ele-cell">
                <p class="ele-cell-content">
                  备用地址
                  <a-tag color="green" @click="copyDetail(AppInfo.backupUrl)">复制</a-tag>
                </p>
                <span style="margin-bottom:1em;">
                  <a-tooltip>
                    <template #title>
                      <ele-qr-code-svg :value="AppInfo.backupUrl" :size="82" />
                      <br />手机扫码下载
                    </template>
                    <qrcode-outlined />
                  </a-tooltip>
                </span>
              </div>
              <a :href="AppInfo.backupUrl" target="_blank" rel="noopener noreferrer">{{ AppInfo.backupUrl }}</a>
            </div>
          </a-card>
          <a-divider style="margin:10px 0;" dashed />
          <div>
            <!-- <div class="demo-monitor-title">门店销售额排名</div> -->
            <div class="demo-monitor-rank-item ele-cell">
              <ele-tag shape="circle" :color="''" style="border: none">1</ele-tag>
              <div class="ele-cell-content ele-elip">今日iOS消耗量</div>
              <div class="ele-text-secondary">{{ UserData.iosTodayUsed }}</div>
            </div>
            <a-divider style="margin:10px 0;" dashed />
            <div class="demo-monitor-rank-item ele-cell">
              <ele-tag shape="circle" :color="''" style="border: none">2</ele-tag>
              <div class="ele-cell-content ele-elip">昨日iOS消耗量</div>
              <div class="ele-text-secondary">{{ UserData.iosLastDayUsed }}</div>
            </div>
            <a-divider style="margin:10px 0;" dashed />
            <div class="demo-monitor-rank-item ele-cell">
              <ele-tag shape="circle" :color="''" style="border: none">3</ele-tag>
              <div class="ele-cell-content ele-elip">iOS累计消耗量</div>
              <div class="ele-text-secondary">{{ UserData.iosTotalUsed }}</div>
            </div>
            <a-divider style="margin:10px 0;" dashed />
            <div class="demo-monitor-rank-item ele-cell">
              <ele-tag shape="circle" :color="''" style="border: none">4</ele-tag>
              <div class="ele-cell-content ele-elip">今日Android下载量</div>
              <div class="ele-text-secondary">{{ UserData.androidTodayUsed }}</div>
            </div>
            <a-divider style="margin:10px 0;" dashed />
            <div class="demo-monitor-rank-item ele-cell">
              <ele-tag shape="circle" :color="''" style="border: none">5</ele-tag>
              <div class="ele-cell-content ele-elip">昨日Android下载量</div>
              <div class="ele-text-secondary">{{ UserData.androidLastDayUsed }}</div>
            </div>
            <a-divider style="margin:10px 0;" dashed />
            <div class="demo-monitor-rank-item ele-cell">
              <ele-tag shape="circle" :color="''" style="border: none">6</ele-tag>
              <div class="ele-cell-content ele-elip">Android累计下载量</div>
              <div class="ele-text-secondary">{{ UserData.androidTotalUsed }}</div>
            </div>
          </div>
          <a-divider style="margin:10px 0;" dashed />
          <div class="ele-text-center">
            <a-button type="primary" danger>下架</a-button>&nbsp;&nbsp;
            <a-button type="primary">更新</a-button>&nbsp;&nbsp;
            <a-button @click="onClose">关闭</a-button>
          </div>
        </a-card>
      </a-col>
      <a-col :xxl="18" :xl="17" :lg="15" :md="14" :sm="24" :xs="24">
        <a-card :bordered="false" :body-style="{ paddingTop: '0px', minHeight: '600px' }">
          <a-tabs v-model:active-key="active" size="large">
            <a-tab-pane tab="基本信息" key="info">
              <a-form
                ref="formRef"
                :model="form"
                :rules="rules"
                :label-col="{ lg: 4, md: 6, sm: 4, xs: 24 }"
                :wrapper-col="{ lg: 20, md: 18, sm: 20, xs: 24 }"
                style="max-width: 580px; margin-top: 20px"
              >
                <a-form-item label="昵称" name="nickname">
                  <a-input v-model:value="form.nickname" placeholder="请输入昵称" allow-clear />
                </a-form-item>
                <a-form-item label="性别" name="sex">
                  <a-select v-model:value="form.sex" placeholder="请选择性别" allow-clear>
                    <a-select-option value="保密">保密</a-select-option>
                    <a-select-option value="男">男</a-select-option>
                    <a-select-option value="女">女</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item label="邮箱" name="email">
                  <a-input v-model:value="form.email" placeholder="请输入邮箱" allow-clear />
                </a-form-item>
                <a-form-item label="个人简介">
                  <a-textarea v-model:value="form.introduction" placeholder="请输入个人简介" :rows="4" />
                </a-form-item>
                <a-form-item label="街道地址">
                  <a-input v-model:value="form.address" placeholder="请输入街道地址" allow-clear />
                </a-form-item>
                <a-form-item label="联系电话:">
                  <div class="ele-cell">
                    <a-input v-model:value="form.tellPre" style="width: 65px" />
                    <div class="ele-cell-content">
                      <a-input v-model:value="form.tell" placeholder="请输入联系电话" allow-clear />
                    </div>
                  </div>
                </a-form-item>
                <a-form-item :wrapper-col="{ md: { offset: 6 } }">
                  <a-button type="primary" :loading="loading" @click="save">{{ loading ? '保存中..' : '保存更改' }}</a-button>
                </a-form-item>
              </a-form>
            </a-tab-pane>
            <a-tab-pane tab="账号绑定" key="account">
              <div class="user-account-list">
                <div class="ele-cell">
                  <div class="ele-cell-content">
                    <div class="ele-cell-title">密保手机</div>
                    <div class="ele-cell-desc">已绑定手机: 138****8293</div>
                  </div>
                  <a>去修改</a>
                </div>
                <a-divider />
                <div class="ele-cell">
                  <div class="ele-cell-content">
                    <div class="ele-cell-title">密保邮箱</div>
                    <div class="ele-cell-desc">已绑定邮箱: eleadmin@eclouds.com</div>
                  </div>
                  <a>去修改</a>
                </div>
                <a-divider />
                <div class="ele-cell">
                  <div class="ele-cell-content">
                    <div class="ele-cell-title">密保问题</div>
                    <div class="ele-cell-desc">未设置密保问题</div>
                  </div>
                  <a>去设置</a>
                </div>
                <a-divider />
                <div class="ele-cell">
                  <qq-outlined class="user-account-icon" />
                  <div class="ele-cell-content">
                    <div class="ele-cell-title">绑定QQ</div>
                    <div class="ele-cell-desc">当前未绑定QQ账号</div>
                  </div>
                  <a>去绑定</a>
                </div>
                <a-divider />
                <div class="ele-cell">
                  <wechat-outlined class="user-account-icon" />
                  <div class="ele-cell-content">
                    <div class="ele-cell-title">绑定微信</div>
                    <div class="ele-cell-desc">当前未绑定绑定微信账号</div>
                  </div>
                  <a>去绑定</a>
                </div>
                <a-divider />
                <div class="ele-cell">
                  <alipay-outlined class="user-account-icon" />
                  <div class="ele-cell-content">
                    <div class="ele-cell-title">绑定支付宝</div>
                    <div class="ele-cell-desc">当前未绑定绑定支付宝账号</div>
                  </div>
                  <a>去绑定</a>
                </div>
              </div>
            </a-tab-pane>
          </a-tabs>
        </a-card>
      </a-col>
    </a-row>
    <!-- 头像裁剪弹窗 -->
    <ele-cropper-modal
      :src="form.avatar"
      v-model:visible="visible"
      :options="{ autoCropArea: 1, viewMode: 1, dragMode: 'move' }"
      @done="onCrop"
    />
    <!-- 备注弹窗 -->
    <ele-modal :width="400" title="设置备注" v-model:visible="visible1" :resizable="true" :maxable="true">
      <a-form ref="formRef" :model="form" :rules="rules" :label-col="{ flex: '70px' }" :wrapper-col="{ flex: '1' }">
        <a-form-item label="用户名" name="nickname" style="flex-wrap: nowrap">
          <a-input allow-clear placeholder="请输入用户名" v-model:value="form.nickname" />
        </a-form-item>
        <a-form-item label="性别" name="sex">
          <a-select allow-clear placeholder="请选择性别" v-model:value="form.sex">
            <a-select-option value="男">男</a-select-option>
            <a-select-option value="女">女</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="手机号" name="phone" style="flex-wrap: nowrap">
          <a-input allow-clear placeholder="请输入手机号" v-model:value="form.phone" />
        </a-form-item>
        <a-form-item label="邮箱" name="email" style="flex-wrap: nowrap">
          <a-input allow-clear placeholder="请输入邮箱" v-model:value="form.email" />
        </a-form-item>
        <a-form-item label="个人简介" style="flex-wrap: nowrap">
          <a-textarea :rows="4" placeholder="请输入个人简介" v-model:value="form.introduction" />
        </a-form-item>
      </a-form>
    </ele-modal>
  </div>
</template>

<script setup>
import { ref, unref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue/es';
import { getUser } from '@/api/system/user';
import { removePageTab } from '@/utils/page-tab-util';
import request from '@/utils/request';
import {
  EditOutlined,
  QrcodeOutlined,
  UploadOutlined,
  UserOutlined,
  HomeOutlined,
  EnvironmentOutlined,
  TagOutlined,
  QqOutlined,
  WechatOutlined,
  AlipayOutlined,
  CopyOutlined
} from '@ant-design/icons-vue';

import { useUserStore } from '@/store/modules/user';
const userStore = useUserStore();

//
const formRef = ref(null);

// tab 页选中
const active = ref('info');

// 保存按钮 loading
const loading = ref(false);

// 是否显示裁剪弹窗
const visible = ref(false);

// 是否显示备注弹窗
const visible1 = ref(false);

// 登录用户信息
const loginUser = computed(() => userStore.info ?? {});

// 表单数据
const form = reactive({
  nickname: loginUser.value.nickname,
  sex: '保密',
  email: 'eleadmin@eclouds.com',
  introduction: loginUser.value.introduction,
  address: '',
  tellPre: '0752',
  tell: '',
  avatar: 'https://cdn.eleadmin.com/20200610/avatar.jpg'
});

// 表单验证规则
const rules = reactive({
  nickname: [
    {
      required: true,
      message: '请输入昵称',
      type: 'string'
    }
  ],
  sex: [
    {
      required: true,
      message: '请选择性别',
      type: 'string'
    }
  ],
  email: [
    {
      required: true,
      message: '请输入邮箱',
      type: 'string'
    }
  ]
});

/* 修改登录用户 */
const updateLoginUser = (obj) => {
  userStore.setInfo({ ...loginUser.value, ...obj });
};

/* 保存更改 */
const save = () => {
  if (!formRef.value) {
    return;
  }
  formRef.value
    .validate()
    .then(() => {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
        message.success('保存成功');
        updateLoginUser(form);
      }, 800);
    })
    .catch(() => {});
};

/* 头像裁剪完成回调 */
const onCrop = (result) => {
  form.avatar = result;
  visible.value = false;
  updateLoginUser(form);
};

/* 打开图片裁剪 */
const openCropper = () => {
  visible.value = true;
};

const { currentRoute, push } = useRouter();

// 查询状态
// const loading = ref(false);

const AppInfo = ref({});

// 获取应用详情
const downloadAppInfo = () => {
  const { query } = unref(currentRoute);
  let body = { appId: query.appId, isSetting: 1 };
  request
    .post('/ipa/download_app_info', body)
    .then((res) => {
      AppInfo.value = res.data.data;
      // message.success(res.data.msg);
    })
    .catch((e) => {
      message.error(e.response.data.msg);
    });
};

const UserData = ref({});

// 获取应用详情
const UserDataList = () => {
  const { query } = unref(currentRoute);
  let body = { appId: query.appId };
  request
    .post('/backstage/getUserData', body)
    .then((res) => {
      UserData.value = res.data.data;
      // message.success(res.data.msg);
    })
    .catch((e) => {
      message.error(e.response.data.msg);
    });
};

// 用户信息
const user = ref();

/* 关闭当前页面并跳转到账户首页 */
const onClose = () => {
  removePageTab({ key: unref(currentRoute).path });
  push('/dashboard/workplace');
};

/* 查询用户信息 */
// const query = () => {
//   const { query } = unref(currentRoute);
//   if (query.id) {
//     getUser(Number(query.id))
//       .then((data) => {
//         loading.value = false;
//         user.value = data;
//       })
//       .catch((e) => {
//         message.error(e.message);
//       });
//   }
// };

// query();

// 复制下载地址
const copyDetail = (value) => {
  var input_temp = document.createElement('input');
  input_temp.value = value;
  document.body.appendChild(input_temp);
  input_temp.select();
  document.execCommand('copy');
  document.body.removeChild(input_temp);
  message.success('复制成功！');
};

const getfilesize = (size) => {
  if (!size) return '';
  var num = 1024.0;
  if (size < num) return size + 'B';
  if (size < Math.pow(num, 2)) return (size / num).toFixed(2) + 'KB';
  if (size < Math.pow(num, 3))
    return (size / Math.pow(num, 2)).toFixed(2) + 'M';
  if (size < Math.pow(num, 4))
    return (size / Math.pow(num, 3)).toFixed(2) + 'G';
  return (size / Math.pow(num, 4)).toFixed(2) + 'T';
};

// 获取应用详情
downloadAppInfo();
//获取下载量
UserDataList();
</script>

<script>
export default {
  name: 'ListBasicEdit'
};
</script>
<style lang="less" scoped>
/* 用户资料卡片 */
.user-info-avatar-group {
  margin: 16px 0;
  display: inline-block;
  position: relative;
  cursor: pointer;

  .user-info-avatar-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 30px;
    display: none;
    z-index: 2;
  }

  &:hover .user-info-avatar-icon {
    display: block;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: transparent;
    transition: background-color 0.3s;
  }

  &:hover:after {
    background-color: rgba(0, 0, 0, 0.4);
  }

  & + h1 {
    margin-bottom: 8px;
  }
}

/* 用户信息列表 */
.user-info-list {
  margin: 47px 0 32px 0;

  .ele-cell + .ele-cell {
    margin-top: 16px;
  }

  & + .ant-divider {
    margin-bottom: 16px;
  }
}

/* 用户标签 */
.user-info-tags {
  margin: 16px 0 4px 0;

  .ant-tag {
    margin: 0 12px 8px 0;
  }
}

/* 用户账号绑定列表 */
.user-account-list {
  & > .ele-cell {
    padding: 16px 8px;
  }

  .user-account-icon {
    color: #fff;
    padding: 8px;
    font-size: 26px;
    border-radius: 50%;

    &.anticon-qq {
      background: #3492ed;
    }

    &.anticon-wechat {
      background: #4daf29;
    }

    &.anticon-alipay {
      background: #1476fe;
    }
  }
}
</style>
