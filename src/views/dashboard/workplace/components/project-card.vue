<!-- 项目进度 -->
<template>
  <a-card :title="title" :bordered="false" :body-style="{ padding: '14px' }">
    <ele-pro-table
      ref="tableRef"
      size="small"
      title
      row-key="menuId"
      :columns="projectColumns"
      :datasource="projectList"
      :need-page="false"
      :lazy-load="true"
      :expand-icon-column-index="1"
      :scroll="{ x: 600 }"
    >
      <template #bodyCell="{ column, record }">
        <!-- <template v-if="column.key === 'projectName'">
          <a>{{ record.projectName }}</a>
        </template>
        <template v-else-if="column.key === 'status'">
          <span v-if="record.status === 0" class="ele-text-success">进行中</span>
          <span v-else-if="record.status === 1" class="ele-text-danger">已延期</span>
          <span v-else-if="record.status === 2" class="ele-text-warning">未开始</span>
          <span v-else-if="record.status === 3" class="ele-text-info ele-text-delete">已结束</span>
        </template>
        <template v-else-if="column.key === 'progress'">
          <a-progress :percent="record.progress" size="small" />
        </template>-->
        <template v-if="column.key === 'name'">
          <div style="float: left;">
            <img :src="record.icon" style="width: 50px;height: 50px;border-radius: 6px;" />
          </div>
        </template>
        <template v-else-if="column.key === 'banben'">
          <div style="font-size: 12px;float: left;line-height: 30px;text-align: left;">
            <p>v{{ record.version }}</p>
            <p>{{ record.bundleId }}</p>
          </div>
        </template>
        <template v-else-if="column.key === 'downloadUrl'">
          <div style="font-size: 12px;float: left;line-height: 30px;text-align: left;">
            <p>
              <span>
                主用：
                <a :href="record.iosDownloadUrl" target="_blank" rel="noopener noreferrer">{{ record.iosDownloadUrl }}</a>
              </span>
            </p>
            <p>
              <span>
                备用：
                <a :href="record.backupUrl" target="_blank" rel="noopener noreferrer">{{ record.backupUrl }}</a>
              </span>
            </p>
          </div>
        </template>
        <template v-else-if="column.key === 'action'">
          <a-space>
            <a @click="reply(record)">设置</a>
            <a-divider type="vertical" />
            <a-popconfirm placement="topRight" title="确定要删除此消息吗？" @confirm="remove(record)">
              <a class="ele-text-danger">删除</a>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </ele-pro-table>
  </a-card>
</template>

<script setup>
import { ref } from 'vue';
import MoreIcon from './more-icon.vue';
import request from '@/utils/request';

defineProps({
  title: String
});

const emit = defineEmits(['remove', 'edit']);
const projectColumns = ref([
  {
    title: '应用名称',
    align: 'center',
    key: 'name',
    ellipsis: true,
    width: 200
  },
  {
    title: '版本',
    key: 'banben',
    align: 'center',
    width: 200,
    ellipsis: true
  },
  {
    title: 'Ios消耗量',
    dataIndex: 'downloadDeductCount',
    align: 'center',
    width: 200,
    ellipsis: true
  },
  {
    title: 'Android下载量',
    dataIndex: 'downloadCountAndroid',
    align: 'center',
    width: 200,
    ellipsis: true
  },
  {
    title: '下载地址',
    key: 'downloadUrl',
    align: 'center',
    minWidth: 200,
    ellipsis: true
  },
  {
    title: '应用状态',
    dataIndex: 'downloadUrl',
    align: 'center',
    width: 200,
    ellipsis: true
  },
  {
    title: '审核状态',
    dataIndex: 'downloadUrl',
    align: 'center',
    width: 200,
    ellipsis: true
  },
  {
    title: '安装方式',
    dataIndex: 'downloadUrl',
    align: 'center',
    width: 200,
    ellipsis: true,
    // if (index.installType === 1) {
    //     return '滑块验证';
    //   } else if (index.installType === 0) {
    //     return '公开';
    //   } else if (index.installType === 3) {
    //     return '下载码';
    //   }
    customCell: (record) => {
      return {
        onClick: (e) => {
          e.stopPropagation();
          message.info('点击了创建时间: ' + record.createTime);
        }
      };
    }
  },
  {
    title: '备注',
    width: 200,
    dataIndex: 'remark',
    align: 'center',
    ellipsis: true
  },
  {
    title: '更新时间',
    width: 200,
    dataIndex: 'updateTimestamp',
    align: 'center',
    ellipsis: true
  },
  {
    title: '操作',
    key: 'action',
    width: 200,
    fixed: 'right',
    align: 'center'
  }
]);

// 项目进度数据
const projectList = ref([]);

/* 查询项目进度 */
const queryProjectList = () => {
  let body = { isCheckSub: false, pageNo: 1, pageSize: 2 };
  request
    .post('/backstage/getCommonlyUserApp', body)
    .then((res) => {
      projectList.value = res.data.data;
    })
    .catch((e) => {
      console.error(e);
    });
};

/* 删除单个 */
const remove = (row) => {
  if (row.children?.length) {
    message.error('请先删除子节点');
    return;
  }
  const hide = messageLoading('请求中..', 0);
  removeMenu(row.menuId)
    .then((msg) => {
      hide();
      message.success(msg);
      reload();
    })
    .catch((e) => {
      hide();
      message.error(e.message);
    });
};

const onRemove = () => {
  emit('remove');
};

const onEdit = () => {
  emit('edit');
};

queryProjectList();
</script>
