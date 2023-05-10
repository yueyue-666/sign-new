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
          <h2>{{ UserInfo.superSignBalance }}台</h2>
        </div>
        <div class="workplace-count-item">
          <div class="workplace-count-header">
            <ele-tag color="orange" shape="circle" size="small">
              <check-square-outlined />
            </ele-tag>
            <span class="workplace-count-name">超级签名V3余量</span>
          </div>
          <h2>{{ UserInfo.enterpriseSignBalance }}台</h2>
        </div>
        <div class="workplace-count-item">
          <a-button type="primary" @click="visible=true">充值</a-button>
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

    <ele-modal :width="400" title="充值客服" v-model:visible="visible" :resizable="true" :maxable="true" :footer="false">
      <div style="padding: 30px 0;">请联系客服</div>
    </ele-modal>
  </a-card>
</template>

<script setup>
import { ref, computed } from 'vue';
import {
  CloudOutlined,
  AppstoreFilled,
  CheckSquareOutlined,
  BellFilled
} from '@ant-design/icons-vue';
import { useUserStore } from '@/store/modules/user';
import request from '@/utils/request';

const userStore = useUserStore();

// 当前登录用户信息
const loginUser = computed(() => userStore.info ?? {});

// const UserInfo = computed(() => {
//   return { username: 'admin', userRole: 3 };
// });

// 充值
const visible = ref(false);

const UserInfo = ref({});

request
  .post('/backstage/getUserInfo', {})
  .then((res) => {
    console.log(res);
    UserInfo.value = res.data.data;
  })
  .catch((e) => {
    console.error(e);
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
