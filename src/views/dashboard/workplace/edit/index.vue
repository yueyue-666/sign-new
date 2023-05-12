<template>
  <div class="ele-body">
    <a-card :bordered="false">
      <a-spin :spinning="loading">
        <a-space size="middle">
          <a-button @click="onClose">关闭</a-button>
          <a-button type="primary" :loading="loading" @click="save">保存</a-button>
        </a-space>
      </a-spin>
    </a-card>
  </div>
</template>

<script setup>
import { ref, unref } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue/es';
import { getUser } from '@/api/system/user';
import { removePageTab } from '@/utils/page-tab-util';

const { currentRoute, push } = useRouter();

// 查询状态
const loading = ref(false);

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
</script>

<script>
export default {
  name: 'ListBasicEdit'
};
</script>
