<!-- 用户信息 -->
<template>
  <a-card :bordered="false" :body-style="{ padding: '20px' }">
    <div class="ele-cell workplace-user-card">
      <div class="ele-cell-content ele-cell">
        <a-avatar :size="68" :src="loginUser.avatar" />
        <div class="ele-cell-content">
          <h4 class="ele-elip">{{ UserInfo.username }}</h4>
          <div class="ele-elip ele-text-secondary">
            <cloud-outlined />
            <em>{{ UserInfo.userRole === 1 ? '普通用户' : UserInfo.userRole === 2 ? '代理用户' : '后台管理员'}}</em>
          </div>
        </div>
      </div>
      <div class="workplace-count-group">
        <div class="workplace-count-item">
          <div class="workplace-count-header">
            <ele-tag color="blue" shape="circle" size="small">
              <appstore-filled />
            </ele-tag>
            <span class="workplace-count-name">超级签名V2余量</span>
          </div>
          <h2>0台</h2>
        </div>
        <div class="workplace-count-item">
          <div class="workplace-count-header">
            <ele-tag color="orange" shape="circle" size="small">
              <check-square-outlined />
            </ele-tag>
            <span class="workplace-count-name">超级签名V3余量</span>
          </div>
          <h2>0台</h2>
        </div>
        <div class="workplace-count-item">
          <a-button type="primary">充值</a-button>
          <!-- <div class="workplace-count-header">
            <ele-tag color="green" shape="circle" size="small">
              <bell-filled />
            </ele-tag>
            <span class="workplace-count-name">消息</span>
          </div>
          <h2>1,689</h2>-->
        </div>
      </div>
    </div>
  </a-card>
</template>

<script setup>
import { computed } from 'vue';
import {
  CloudOutlined,
  AppstoreFilled,
  CheckSquareOutlined,
  BellFilled
} from '@ant-design/icons-vue';
import { useUserStore } from '@/store/modules/user';

const userStore = useUserStore();

// 当前登录用户信息
const loginUser = computed(() => userStore.info ?? {});

const UserInfo = computed(() => {
  return { username: 'admin', userRole: 3 };
});
</script>

<style lang="less" scoped>
.workplace-user-card {
  .ele-cell-content {
    overflow: hidden;
  }

  h4 {
    margin-bottom: 6px;
  }
}

.workplace-count-group {
  white-space: nowrap;
  text-align: right;
  flex-shrink: 0;
}

.workplace-count-item {
  display: inline-block;
  margin: 0 4px 0 24px;
}

.workplace-count-name {
  margin-left: 8px;
}

@media screen and (max-width: 992px) {
  .workplace-count-item {
    margin: 0 2px 0 12px;
  }
}

@media screen and (max-width: 768px) {
  .workplace-user-card {
    display: block;
  }

  .workplace-count-group {
    margin-top: 8px;
  }
}
</style>
