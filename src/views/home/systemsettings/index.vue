<template>
  <div>
    <a-card :bordered="false" :body-style="{ paddingTop: '0px', minHeight: '600px' }">
      <a-tabs v-model:active-key="active" size="large">
        <a-tab-pane tab="链接设置" key="1">1</a-tab-pane>
        <a-tab-pane tab="防封链接" key="2">2</a-tab-pane>
        <a-tab-pane tab="当前证书v2" key="3">3</a-tab-pane>
        <a-tab-pane tab="当前证书v3" key="4">4</a-tab-pane>
        <a-tab-pane tab="签名证书1" key="5">5</a-tab-pane>
        <a-tab-pane tab="签名证书2" key="6">6</a-tab-pane>
        <a-tab-pane tab="签名证书3" key="7">7</a-tab-pane>
        <a-tab-pane tab="签名证书4" key="8">8</a-tab-pane>
        <a-tab-pane tab="V3证书1" key="9">9</a-tab-pane>
        <a-tab-pane tab="V3证书2" key="10">10</a-tab-pane>
        <a-tab-pane tab="V3证书3" key="11">11</a-tab-pane>
        <a-tab-pane tab="MDM推送证书" key="12">12</a-tab-pane>
        <a-tab-pane tab="证书检测" key="13">13</a-tab-pane>
        <a-tab-pane tab="动态库bulid" key="14">14</a-tab-pane>
        <a-tab-pane tab="偷包检测" key="15">15</a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script setup>
import { createVNode, ref, unref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { message, Modal } from 'ant-design-vue/es';
import { getUser } from '@/api/system/user';
import { removePageTab } from '@/utils/page-tab-util';
import request from '@/utils/request';

import {
  InfoCircleOutlined,
  ExclamationCircleOutlined,
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

// tab 页选中
const active = ref('1');

// 保存按钮 loading
const loading = ref(false);
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
