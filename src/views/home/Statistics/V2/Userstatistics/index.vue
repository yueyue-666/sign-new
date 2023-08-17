<template>
  <div class="ele-body">
    <a-card :bordered="false">
      <!-- 搜索 -->
      <a-form :label-col="{ xl: 7, lg: 5, md: 7, sm: 4 }" :wrapper-col="{ xl: 17, lg: 19, md: 17, sm: 20 }">
        <a-row :gutter="8">
          <!-- <a-col :xl="5" :lg="12" :md="12" :sm="24" :xs="24">
            <a-form-item>
              <a-select v-model:value="form.type" placeholder="请选择" allow-clear>
                <a-select-option value="0">超级签V2</a-select-option>
                <a-select-option value="1">超级签V3</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>-->
          <a-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
            <a-form-item label="日期">
              <a-date-picker class="ele-fluid" placeholder="请选择" value-format="YYYY-MM-DD HH:mm:ss" v-model:value="form.startTime" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
            <a-form-item>
              <a-date-picker class="ele-fluid" placeholder="请选择" value-format="YYYY-MM-DD HH:mm:ss" v-model:value="form.endTime" />
            </a-form-item>
          </a-col>
          <a-col :xl="5" :lg="12" :md="12" :sm="24" :xs="24">
            <a-form-item>
              <a-input allow-clear :maxlength="20" placeholder="用户" v-model:value="form.username" />
            </a-form-item>
          </a-col>
          <a-col :xl="4" :lg="12" :md="12" :sm="24" :xs="24">
            <a-form-item class="ele-text-right" :wrapper-col="{ span: 24 }">
              <a-space>
                <a-button type="primary" @click="reload">查询</a-button>
                <a-button @click="reset">重置</a-button>
              </a-space>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <!-- 表格 -->
      <ele-pro-table
        ref="tableRef"
        row-key="userId"
        :columns="columns"
        :datasource="datasource"
        :scroll="{ x: 1000 }"
        :where="defaultWhere"
        cache-key="proSystemUserTable"
      >
        <template #bodyCell="{ column,record }">
          <template v-if="column.key === 'statuss'">
            <a-tag color="green">处理成功</a-tag>
          </template>
          <template v-else-if="column.key === 'username'">
            <a @click="openyonghu(record)">{{ record.username }}</a>
          </template>
        </template>
      </ele-pro-table>
    </a-card>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick } from 'vue';
import { toDateString } from 'ele-admin-pro/es';
import useFormData from '@/utils/use-form-data';
import request from '@/utils/request';
import { message, Modal } from 'ant-design-vue/es';
import { UserStatistics } from '@/api/system';
import { removePageTab } from '@/utils/page-tab-util';
import { useRouter } from 'vue-router';
// 表格实例
const tableRef = ref(null);

// 表格列配置
const columns = ref([
  {
    title: '用户',
    key: 'username',
    align: 'center',
    sorter: false,
    width: 120,
    showSorterTooltip: false
  },
  {
    title: '充值量',
    dataIndex: 'chargedAmount',
    align: 'center',
    width: 120,
    ellipsis: true
  },
  {
    title: '签发消耗总量',
    dataIndex: 'supersignUsed',
    align: 'center',
    width: 120,
    ellipsis: true
  },
  {
    title: 'V2签发消耗量',
    dataIndex: 'supersignUsed',
    align: 'center',
    width: 120,
    ellipsis: true
  },
  {
    title: 'V1签发消耗量',
    dataIndex: 'totalSuperSigns',
    align: 'center',
    width: 120,
    ellipsis: true
  }
]);

const { push } = useRouter();
// 打开用户界面
const openyonghu = (row) => {
  const path = '/home/UserManagemen';
  removePageTab({ key: path });
  nextTick(() => {
    push({
      path,
      query: row ? { username: row.username } : undefined
    });
  });
};

// 日期范围选择
var date = new Date();
// 当前时间
var s1 =
  date.getFullYear() +
  '-' +
  ((date.getMonth() + 1 < 10
    ? '0' + (date.getMonth() + 1)
    : date.getMonth() + 1) +
    '-') +
  (date.getDate() + 1 < 10 ? '0' + date.getDate() : date.getDate());
// 7天前的时间
date.setTime(date.getTime() - 480 * 60 * 60 * 1000);
var s2 =
  date.getFullYear() +
  '-' +
  ((date.getMonth() + 1 < 10
    ? '0' + (date.getMonth() + 1)
    : date.getMonth() + 1) +
    '-') +
  (date.getDate() + 1 < 10 ? '0' + (date.getDate() + 1) : date.getDate() + 1);

// 表单数据
const { form, resetFields } = useFormData({
  isCheckSub: true,
  startTime: s2 + ' 00:00:00',
  endTime: s1 + ' 23:59:59'
});

// /* 搜索 */
// const search = () => {
//   emit('search', form);
// };

/*  重置 */
const reset = () => {
  resetFields();
};

// 默认搜索条件
const defaultWhere = reactive({
  page: 1,
  size: 20
});

// 表格数据源
const datasource = ({ page, limit, where, orders }) => {
  return UserStatistics({ ...form, ...orders, page, size: limit });
};

/* 搜索 */
const reload = (where) => {
  tableRef?.value?.reload({ page: 1, ...form });
};
</script>

<script>
export default {
  name: 'mydeal'
};
</script>
