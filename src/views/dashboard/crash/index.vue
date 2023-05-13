<template>
  <div class="ele-body">
    <a-card :bordered="false">
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
        <template #toolbar>
          <a-space>
            <a-button type="primary" class="ele-btn-icon" @click="openEdit()">
              <template #icon>
                <plus-outlined />
              </template>
              <span>生成(webclip)闪退助手</span>
            </a-button>
          </a-space>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'logo'">
            <a-avatar :size="50" :src="record.logo" />
          </template>
          <template v-else-if="column.key === 'downloadUrl'">
            <div style="font-size: 12px;float: left;line-height: 30px;text-align: left;">
              <p>
                <span>
                  <a :href="record.downloadUrl" target="_blank" rel="noopener noreferrer">{{ record.downloadUrl }}</a>
                  <copy-outlined @click="copyDetail(record.downloadUrl)" style="font-size:15px;" />
                </span>
              </p>
            </div>
          </template>
          <template v-else-if="column.key === 'QRdownloadUrl'">
            <ele-qr-code-svg :value="record.downloadUrl" :size="60" />
          </template>
          <template v-if="column.key === 'isRemovable'">
            <a-tag color="red" v-if="record.isRemovable===0">不可移除</a-tag>
            <a-tag color="green" v-else>可移除</a-tag>
          </template>
        </template>
      </ele-pro-table>
    </a-card>
    <!-- 生成(webclip)闪退助手弹窗 -->
    <user-edit v-model:visible="showEdit" :data="current" @done="reload" />
  </div>
</template>

<script setup>
import { createVNode, ref, reactive } from 'vue';
import { message, Modal } from 'ant-design-vue/es';
import {
  PlusOutlined,
  CopyOutlined,
  DeleteOutlined,
  UploadOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons-vue';
import { toDateString } from 'ele-admin-pro/es';
import UserEdit from './components/user-edit.vue';
import { WebClipList } from '@/api/system/user';

// 表格实例
const tableRef = ref(null);

// 表格列配置
const columns = ref([
  {
    title: '应用名称',
    dataIndex: 'name',
    align: 'center',
    sorter: false,
    showSorterTooltip: false
  },
  {
    title: '应用图标',
    key: 'logo',
    align: 'center',
    width: 120,
    ellipsis: true
  },
  {
    title: '下载地址',
    key: 'downloadUrl',
    align: 'center',
    width: 120,
    ellipsis: true
  },
  {
    title: '二维码',
    key: 'QRdownloadUrl',
    align: 'center',
    width: 120,
    ellipsis: true
  },
  {
    title: '移除方式',
    key: 'isRemovable',
    align: 'center',
    width: 120,
    ellipsis: true
  },
  {
    title: '嵌入网址',
    dataIndex: 'url',
    align: 'center',
    width: 120,
    ellipsis: true
  },
  {
    title: '创建时间',
    align: 'center',
    dataIndex: 'createTimestamp',
    sorter: false,
    showSorterTooltip: false,
    customRender: ({ text }) => toDateString(text)
  }
]);

// 当前编辑数据
const current = ref(null);

// 是否显示编辑弹窗
const showEdit = ref(false);

// 是否显示用户导入弹窗
const showImport = ref(false);

// 默认搜索条件
const defaultWhere = reactive({});

// 表格数据源
const datasource = ({ page, limit, where, orders }) => {
  return WebClipList({ ...where, ...orders, page, size: limit });
};

/* 搜索 */
// const reload = (where) => {
//   tableRef?.value?.reload({ page: 1, where });
// };

/* 打开编辑弹窗 */
const openEdit = (row) => {
  current.value = row ?? null;
  showEdit.value = true;
};

/* 打开编辑弹窗 */
const openImport = () => {
  showImport.value = true;
};

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
</script>

<script>
export default {
  name: 'crash'
};
</script>
