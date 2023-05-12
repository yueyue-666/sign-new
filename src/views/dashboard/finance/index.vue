<template>
  <div class="ele-body">
    <profile-card />
    <a-card :bordered="false">
      <!-- 搜索 -->
      <a-form :label-col="{ xl: 7, lg: 5, md: 7, sm: 4 }" :wrapper-col="{ xl: 17, lg: 19, md: 17, sm: 20 }">
        <a-row :gutter="8">
          <a-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
            <a-form-item label>
              <a-select v-model:value="form.type" placeholder="请选择" allow-clear>
                <a-select-option value="0">超级签V2</a-select-option>
                <a-select-option value="1">超级签V3</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
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
          <a-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
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
        sub-title="充值记录"
        ref="tableRef"
        row-key="userId"
        :columns="columns"
        :datasource="datasource"
        :scroll="{ x: 1000 }"
        :where="defaultWhere"
        cache-key="proSystemUserTable"
      >
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'statuss'">
            <a-tag color="green">处理成功</a-tag>
          </template>
        </template>
      </ele-pro-table>
    </a-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { toDateString } from 'ele-admin-pro/es';
import useFormData from '@/utils/use-form-data';
import request from '@/utils/request';
import ProfileCard from './components/profile-card.vue';

import { AllUserOrderByPage } from '@/api/system/user';

// 表格实例
const tableRef = ref(null);

// 表格列配置
const columns = ref([
  {
    title: '订单号',
    dataIndex: 'orderNum',
    align: 'center',
    sorter: false,
    showSorterTooltip: false
  },
  {
    title: '商品',
    dataIndex: 'orderNum',
    align: 'center',
    sorter: false,
    showSorterTooltip: false,
    customRender: ({ text }) => '超级签V2设备数'
  },
  {
    title: '数量',
    dataIndex: 'amount',
    align: 'center',
    width: 120,
    ellipsis: true
  },
  {
    title: '状态',
    key: 'statuss',
    align: 'center',
    width: 120,
    ellipsis: true
  },
  {
    title: '交易时间',
    align: 'center',
    dataIndex: 'createTimestamp',
    sorter: false,
    showSorterTooltip: false,
    customRender: ({ text }) => toDateString(text)
  }
]);

const appList = ref({});
// 获取应用下拉
const getselect = () => {
  let body = { isCheckSub: 'false', userId: localStorage.getItem('userId') };
  request
    .post('/backstage/getAppList', body)
    .then((res) => {
      appList.value = res.data.data;
    })
    .catch((e) => {
      message.error(e.response.data.msg);
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
  date.getDate();
// 20天前的时间
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
  type: '0',
  isCheckSub: false,
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
  return AllUserOrderByPage({ ...form, ...orders, page, size: limit });
};

/* 搜索 */
const reload = (where) => {
  tableRef?.value?.reload({ page: 1, ...form });
};

getselect();
</script>

<script>
export default {
  name: 'SystemUser'
};
</script>
