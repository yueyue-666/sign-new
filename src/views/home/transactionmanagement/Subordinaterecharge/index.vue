<template>
  <div class="ele-body">
    <a-card :bordered="false">
      <!-- 搜索 -->
      <a-form :label-col="{ xl: 7, lg: 5, md: 7, sm: 4 }" :wrapper-col="{ xl: 17, lg: 19, md: 17, sm: 20 }">
        <a-row :gutter="8">
          <a-col :xl="5" :lg="12" :md="12" :sm="24" :xs="24">
            <a-form-item>
              <a-select v-model:value="form.type" placeholder="请选择" allow-clear>
                <a-select-option value="0">超级签V2</a-select-option>
                <a-select-option value="1">超级签V3</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="5" :lg="12" :md="12" :sm="24" :xs="24">
            <a-form-item>
              <a-input allow-clear :maxlength="20" placeholder="用户" v-model:value="form.username" />
            </a-form-item>
          </a-col>
          <a-col :xl="4" :lg="12" :md="12" :sm="24" :xs="24">
            <a-form-item label="日期">
              <a-date-picker class="ele-fluid" placeholder="请选择" value-format="YYYY-MM-DD HH:mm:ss" v-model:value="form.startTime" />
            </a-form-item>
          </a-col>
          <a-col :xl="4" :lg="12" :md="12" :sm="24" :xs="24">
            <a-form-item>
              <a-date-picker class="ele-fluid" placeholder="请选择" value-format="YYYY-MM-DD HH:mm:ss" v-model:value="form.endTime" />
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
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'statuss'">
            <a-tag v-if="record.statuss === 0" color="green">处理成功</a-tag>
            <span v-else>-</span>
          </template>
          <template v-else-if="column.key === 'userName'">
            <a @click="openyonghu(record)">{{ record.userName }}</a>
          </template>
          <template v-else-if="column.key === 'action'">
            <a-space>
              <a @click="mark(record)">备注</a>
              <a-divider type="vertical" />
              <a class="ele-text-danger" v-if="record.isDeleted">已删除</a>
              <a-popconfirm placement="topRight" title="确定要删除此消息吗？" @confirm="remove(record)" v-else>
                <a class="ele-text-danger">删除</a>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </ele-pro-table>
    </a-card>

    <!-- 备注弹窗 -->
    <ele-modal
      :width="400"
      title="设置备注"
      v-model:visible="visible1"
      :resizable="true"
      :maxable="true"
      @cancel="visible1=false"
      @ok="remarksave"
    >
      <a-form ref="remarkformRef" :model="remarkform" :label-col="{ flex: '70px' }" :wrapper-col="{ flex: '1' }">
        <a-form-item label="备注" style="flex-wrap: nowrap">
          <a-textarea :rows="4" placeholder="请输入备注" v-model:value="remarkform.remark" />
        </a-form-item>
      </a-form>
    </ele-modal>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick } from 'vue';
import { toDateString } from 'ele-admin-pro/es';
import useFormData from '@/utils/use-form-data';
import request from '@/utils/request';
import { message, Modal } from 'ant-design-vue/es';
import { AllUserOrderByPage } from '@/api/system';
import { removePageTab } from '@/utils/page-tab-util';
import { useRouter } from 'vue-router';
// 表格实例
const tableRef = ref(null);

// 表格列配置
const columns = ref([
  {
    title: '流水号',
    dataIndex: 'orderNum',
    align: 'center',
    sorter: false,
    showSorterTooltip: false
  },
  {
    title: '用户',
    key: 'userName',
    align: 'center',
    sorter: false,
    showSorterTooltip: false
  },
  {
    title: '数量',
    dataIndex: 'amount',
    align: 'center',
    width: 120,
    ellipsis: true
  },
  {
    title: '金额',
    dataIndex: 'amount',
    align: 'center',
    sorter: false,
    showSorterTooltip: false,
    customRender: ({ text }) => '-'
  },
  {
    title: '类型',
    dataIndex: 'type',
    align: 'center',
    sorter: false,
    showSorterTooltip: false,
    customRender: ({ text }) => {
      if (text === 0) {
        return '超级签V2';
      } else if (text === 1) {
        return '应用分发';
      } else {
        return '-';
      }
    }
  },
  {
    title: '状态',
    key: 'statuss',
    align: 'center',
    sorter: false,
    showSorterTooltip: false
  },
  {
    title: '后台备注',
    dataIndex: 'remark',
    align: 'center',
    sorter: false,
    showSorterTooltip: false,
    customRender: ({ text }) => {
      if (text) {
        return text;
      } else {
        return '-';
      }
    }
  },
  {
    title: '创建时间',
    dataIndex: 'createTimestamp',
    align: 'center',
    sorter: false,
    showSorterTooltip: false
  },
  {
    title: '处理时间',
    dataIndex: 'updateTimestamp',
    align: 'center',
    sorter: false,
    showSorterTooltip: false
  },
  {
    title: '操作',
    key: 'action',
    width: 200,
    fixed: 'right',
    align: 'center'
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
      query: row ? { username: row.userName } : undefined
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
  type: '0',
  isCheckSub: true,
  startTime: s2 + ' 00:00:00',
  endTime: s1 + ' 23:59:59'
});

// /* 搜索 */
// const search = () => {
//   emit('search', form);
// };

// 删除
const remove = (row) => {
  let body = { appId: row.appId };
  request
    .post('/backstage/deleteOrderRecord', body)
    .then((res) => {
      reload();
      message.success(res.data.msg);
    })
    .catch((e) => {
      message.error(e.response.data.msg);
    });
};

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

// 点击备注
const mark = (row) => {
  visible1.value = true;
  remarkform.id = row.id;
  remarkform.remark = row.remark;
};

//
const remarkformRef = ref(null);

// 是否显示备注弹窗
const visible1 = ref(false);

// 备注数据
const remarkform = reactive({
  remark: '',
  id: ''
});

// 更改备注
const remarksave = () => {
  if (!remarkform.remark) {
    message.info('请输入备注');
    return;
  }
  let body = { id: remarkform.id, remark: remarkform.remark };
  request
    .post('/backstage/modifyOrderRecordRemark', body)
    .then((res) => {
      visible1.value = false;
      message.success(res.data.msg);
      reload();
    })
    .catch((e) => {
      message.error(e.response.data.msg);
    });
};
</script>

<script>
export default {
  name: 'Subordinaterecharge'
};
</script>
