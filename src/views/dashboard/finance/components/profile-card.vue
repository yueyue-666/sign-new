<!-- 用户信息 -->
<template>
  <div>
    <a-card :bordered="false" :body-style="{ margin: '0 0 20px 0' }">
      <div class="ele-cell workplace-user-card">
        <div class="ele-cell-content ele-cell">
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
        </div>
        <div class="workplace-count-group">
          <div class="workplace-count-item">
            <a-button type="primary" @click="visible=true">充值</a-button>
          </div>
        </div>
      </div>

      <ele-modal :width="400" title="充值客服" v-model:visible="visible" :resizable="true" :maxable="true" :footer="false">
        <div style="padding: 30px 0;">请联系客服</div>
      </ele-modal>
    </a-card>
    <a-card :bordered="false" :body-style="{ padding: '20px' }">
      <ele-modal :width="400" title="充值客服" v-model:visible="visible" :resizable="true" :maxable="true" :footer="false">
        <div style="padding: 30px 0;">请联系客服</div>
      </ele-modal>
    </a-card>
  </div>
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
