<!-- 顶栏右侧区域 -->
<template>
  <div class="ele-admin-header-tool">
    <!-- 全屏切换 -->
    <div class="ele-admin-header-tool-item hidden-sm-and-down" @click="toggleFullscreen">
      <fullscreen-exit-outlined v-if="fullscreen" />
      <fullscreen-outlined v-else />
    </div>
    <!-- 语言切换 -->
    <!-- <div class="ele-admin-header-tool-item">
      <i18n-icon />
    </div>-->
    <!-- 消息通知 -->
    <div class="ele-admin-header-tool-item">
      <header-notice />
    </div>
    <!-- 用户信息 -->
    <div class="ele-admin-header-tool-item">
      <a-dropdown placement="bottom" :overlay-style="{ minWidth: '120px' }">
        <div class="ele-admin-header-avatar">
          <a-avatar src="../src/assets/portrait.jpeg">
            <template v-if="!loginUser.avatar" #icon>
              <user-outlined />
            </template>
          </a-avatar>
          <span class="hidden-sm-and-down">{{ username }}</span>
          <down-outlined style="margin-left: 6px" />
        </div>
        <template #overlay>
          <a-menu :selectable="false" @click="onUserDropClick">
            <a-menu-item key="profile">
              <div class="ele-cell">
                <user-outlined />
                <div class="ele-cell-content">
                  {{
                  adminrouter ? '用户主页' : t('layout.header.profile')
                  }}
                </div>
              </div>
            </a-menu-item>
            <a-menu-divider v-if="!adminrouter && userRole==='2'" />
            <a-menu-item v-if="!adminrouter && userRole==='2'" key="marginAlert">
              <div class="ele-cell">
                <warning-outlined />
                <div class="ele-cell-content">{{ t('layout.header.profile3') }}</div>
              </div>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="password">
              <div class="ele-cell">
                <key-outlined />
                <div class="ele-cell-content">{{ t('layout.header.password') }}</div>
              </div>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="logout">
              <div class="ele-cell">
                <logout-outlined />
                <div class="ele-cell-content">{{ t('layout.header.logout') }}</div>
              </div>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
    <!-- 主题设置 -->
    <div class="ele-admin-header-tool-item" @click="openSetting">
      <more-outlined />
    </div>
  </div>
  <!-- 修改密码弹窗 -->
  <password-modal v-model:visible="passwordVisible" />
  <!-- 主题设置抽屉 -->
  <setting-drawer v-model:visible="settingVisible" />

  <!-- 余量报警弹窗 -->
  <margin-modal v-model:visible="marginVisible" />
</template>

<script setup>
import { computed, createVNode, ref, unref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { Modal } from 'ant-design-vue/es';
import router from '@/router';
import {
  DownOutlined,
  MoreOutlined,
  UserOutlined,
  KeyOutlined,
  LogoutOutlined,
  ExclamationCircleOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  WarningOutlined
} from '@ant-design/icons-vue';
import HeaderNotice from './header-notice.vue';
import PasswordModal from './password-modal.vue';
import marginModal from './margin-modal.vue';
import SettingDrawer from './setting-drawer.vue';
import I18nIcon from './i18n-icon.vue';
import { useUserStore } from '@/store/modules/user';
import { goHomeRoute, logout } from '@/utils/page-tab-util';
const emit = defineEmits(['fullscreen']);

defineProps({
  // 是否是全屏
  fullscreen: Boolean
});

const userRole = localStorage.getItem('userRole');

const { push } = useRouter();
const { t } = useI18n();
const userStore = useUserStore();

// 是否显示修改密码弹窗
const passwordVisible = ref(false);

// 是否显示主题设置抽屉
const settingVisible = ref(false);

// 是否显示修改密码弹窗
const marginVisible = ref(false);

// 当前用户信息
const loginUser = computed(() => userStore.info ?? {});

const username = localStorage.getItem('username');

const adminrouter = JSON.parse(localStorage.getItem('adminrouter'));

/* 跳转到首页 */
const goHome = () => {
  const { query } = unref(currentRoute);
  goHomeRoute(query.from);
};

/* 用户信息下拉点击 */
const onUserDropClick = ({ key }) => {
  if (key === 'password') {
    passwordVisible.value = true;
  } else if (key === 'marginAlert') {
    marginVisible.value = true;
  } else if (key === 'profile') {
    if (adminrouter) {
      localStorage.setItem('adminrouter', JSON.stringify(false));
      router.push('/dashboard/workplace');
      // const historyLength = window.history.length;
      // window.history.go(-(historyLength - 1));
      // router.push('/');
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } else {
      localStorage.setItem('adminrouter', JSON.stringify(true));
      router.push('/home/frontpage');
      // const historyLength = window.history.length;
      // window.history.go(-(historyLength - 1));
      // router.push('/');
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  } else if (key === 'logout') {
    // 退出登录
    Modal.confirm({
      title: t('layout.logout.title'),
      content: t('layout.logout.message'),
      icon: createVNode(ExclamationCircleOutlined),
      maskClosable: true,
      onOk: () => {
        logout();
      }
    });
  }
};

/* 切换全屏 */
const toggleFullscreen = () => {
  emit('fullscreen');
};

/* 打开主题设置抽屉 */
const openSetting = () => {
  settingVisible.value = true;
};
</script>
