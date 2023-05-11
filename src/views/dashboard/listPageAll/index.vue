<template>
  <div class="ele-body">
    <a-card :bordered="false">
      <!-- 搜索表单 -->
      <search-form @search="reload" @expand-change="onExpandChange" />
      <!-- 表格 -->
      <ele-pro-table
        :bordered="bordered"
        :custom-row="customRow"
        :striped="striped"
        :tools-theme="toolDefault ? 'default' : 'none'"
        :full-height="fixedHeight ? 'calc(100vh - 168px)' : void 0"
        :height="tableHeight"
        ref="tableRef"
        row-key="appId"
        :columns="columns"
        :datasource="datasource"
        :scroll="{ x: 1000 }"
        :where="defaultWhere"
        cache-key="proSystemUserTable"
      >
        <template #toolkit>
          <a-space size="middle" style="flex-wrap: wrap">
            <div class="list-tool-item">
              <span>边框</span>
              <a-switch v-model:checked="bordered" size="small" />
            </div>
            <a-divider type="vertical" />
            <div class="list-tool-item">
              <span>斑马线</span>
              <a-switch v-model:checked="striped" size="small" />
            </div>
            <a-divider type="vertical" />
            <div class="list-tool-item">
              <span>表头背景</span>
              <a-switch v-model:checked="toolDefault" size="small" />
            </div>
            <a-divider type="vertical" />
            <div class="list-tool-item">
              <span>高度铺满</span>
              <a-switch v-model:checked="fixedHeight" size="small" />
            </div>
            <a-divider type="vertical" />
          </a-space>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <div style="display: flex;align-items: center;" v-if="record.signType === 1">
              <img :src="record.icon" style="width: 50px;height: 50px;border-radius: 6px;" />
              <div style="display: flex;flex-direction: column;align-items: flex-start;padding-left:10px;">
                <span>
                  <span style="color: #0000ff;">{{ record.name.length>5 ? record.name.substring(0, 5) + "..." : record.name}}</span>
                  <span
                    v-if="record.type === 4"
                    style="padding: 0 5px;-webkit-transform-origin-x: 0;-webkit-transform: scale(0.7);background-color: #FFEFDE;color: #E4494A;"
                  >V3</span>
                </span>
                <span>
                  {{ record.size }}
                  <android-Outlined v-if="record.apkDownPath" />
                  <apple-Outlined v-else />
                </span>
              </div>
            </div>
            <div style="display: flex;align-items: center;" v-else-if="record.signType === 2">
              <img :src="record.icon" style="width: 50px;height: 50px;border-radius: 6px;" />
              <div style="display: flex;flex-direction: column;align-items: flex-start;padding-left:10px;">
                <span>
                  <span style="color: #0000ff;">{{ record.name.length>5 ? record.name.substring(0, 5) + "..." : record.name}}</span>
                  <span
                    v-if="record.type === 4"
                    style="padding: 0 5px;-webkit-transform-origin-x: 0;-webkit-transform: scale(0.7);background-color: #FFEFDE;color: #E4494A;"
                  >混合</span>
                </span>
                <span>
                  {{ record.size }}
                  <android-Outlined v-if="record.apkDownPath" />
                  <apple-Outlined v-else />
                </span>
              </div>
            </div>
            <div style="display: flex;align-items: center;" v-else>
              <img :src="record.icon" style="width: 50px;height: 50px;border-radius: 6px;" />
              <div style="display: flex;flex-direction: column;align-items: flex-start;padding-left:10px;">
                <span>
                  {{ record.name.length>5 ? record.name.substring(0, 5) + "..." : record.name}}
                  <span
                    v-if="record.type === 4"
                    style="padding: 0 5px;-webkit-transform-origin-x: 0;-webkit-transform: scale(0.7);background-color: #FFEFDE;color: #E4494A;"
                  >V2</span>
                </span>
                <span>
                  {{ getfilesize(record.size) }}
                  <android-Outlined v-if="record.apkDownPath" />
                  <apple-Outlined v-else />
                </span>
              </div>
            </div>
          </template>
          <template v-else-if="column.key === 'auditStatus'">
            <a-tag v-if="record.auditStatus === 0" color="blue">审核中</a-tag>
            <a-tag v-else-if="record.auditStatus === 1" color="green">审核通过</a-tag>
            <a-tag v-else color="red">拒绝</a-tag>
          </template>
          <template v-else-if="column.key === 'banben'">
            <div style="font-size: 12px;float: left;line-height: 30px;text-align: left;">
              <p>v{{ record.version }}</p>
              <p>{{ record.bundleId }}</p>
            </div>
          </template>
          <template v-else-if="column.key === 'status'">
            <a-switch
              :checked="record.appStatus === 1"
              @change="(checked) => editStatus(checked, record)"
              checked-children="上架"
              un-checked-children="下架"
            />
          </template>
          <template v-else-if="column.key === 'dlUrl'">
            <div style="font-size: 12px;float: left;line-height: 30px;text-align: left;">
              <p>
                <span>
                  主用：
                  <a :href="record.iosDownloadUrl" target="_blank" rel="noopener noreferrer">{{ record.iosDownloadUrl }}</a>
                  <copy-outlined @click="copyDetail(record.iosDownloadUrl)" style="font-size:15px;" />
                </span>
              </p>
              <p>
                <span>
                  备用：
                  <a :href="record.backupUrl" target="_blank" rel="noopener noreferrer">{{ record.backupUrl }}</a>
                  <copy-outlined @click="copyDetail(record.backupUrl)" style="font-size:15px;" />
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
        <template #customFilterDropdown>
          <span class="tooltiptext">
            设置里可修改安装方式
            <br />公开：用户可自主安装应用
            <br />滑块验证：用户下载应用时需要滑块验证通过后方可安装应用
            <br />下载码：用户下载应用时需要输入对应的下载码，验证通过后方可安装应用，设置里可生成下载码
          </span>
        </template>
      </ele-pro-table>
    </a-card>
  </div>
</template>

<script setup>
import { createVNode, ref, reactive, computed } from 'vue';
import { message, Modal } from 'ant-design-vue/es';
import {
  ExclamationCircleOutlined,
  CopyOutlined,
  AppleOutlined,
  AndroidOutlined
} from '@ant-design/icons-vue';
import searchForm from './components/search-form.vue';

import request from '@/utils/request';
import { pageUsers } from '@/api/system/user';

// 表格实例
const tableRef = ref(null);

// 表格列配置
const columns = ref([
  {
    title: '应用名称',
    align: 'center',
    key: 'name',
    ellipsis: true,
    width: 200,
    Tooltip: true
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
    width: 120,
    ellipsis: true
  },
  {
    title: 'Android下载量',
    dataIndex: 'downloadCountAndroid',
    align: 'center',
    width: 120,
    ellipsis: true
  },
  {
    title: '下载地址',
    key: 'dlUrl',
    dataIndex: '',
    align: 'center',
    width: 350,
    ellipsis: true
  },
  {
    title: '应用状态',
    key: 'status',
    dataIndex: '',
    align: 'center',
    width: 120,
    ellipsis: true
  },
  {
    title: '审核状态',
    key: 'auditStatus',
    align: 'center',
    width: 120,
    ellipsis: true
  },
  {
    title: '安装方式',
    dataIndex: 'installType',
    align: 'center',
    width: 200,
    ellipsis: true,
    customFilterDropdown: true,
    customRender: ({ text }) => {
      if (text === 1) {
        return '滑块验证';
      } else if (text === 0) {
        return '公开';
      } else {
        return '下载码';
      }
    }
  },
  {
    title: '备注',
    width: 200,
    dataIndex: 'remark',
    align: 'center',
    ellipsis: true,
    customRender: ({ text }) => {
      if (text) {
        return text;
      } else {
        return '--';
      }
    }
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

// 表格是否显示边框
const bordered = ref(false);

// 表格是否斑马纹
const striped = ref(false);

// 表头工具栏风格
const toolDefault = ref(false);

// 表格固定高度
const fixedHeight = ref(false);
// 搜索是否展开
const searchExpand = ref(false);
// 表格高度
const tableHeight = computed(() => {
  return fixedHeight.value
    ? searchExpand.value
      ? 'calc(100vh - 618px)'
      : 'calc(100vh - 562px)'
    : void 0;
});
const customRow = (record) => {
  return {
    // 行点击事件
    onClick: () => {
      if (selection.value.some((d) => d.userId === record.userId)) {
        selection.value = selection.value.filter(
          (d) => d.userId !== record.userId
        );
      } else {
        selection.value = selection.value.concat([record]);
      }
    }
  };
};
// 默认搜索条件
const defaultWhere = reactive({});

// 表格数据源
const datasource = ({ page, where, orders, limit }) => {
  return pageUsers({
    ...where,
    ...orders,
    page: page,
    size: limit,
    isCheckSub: false,
    signType: 2,
    type: '0'
  });
};

/* 搜索 */
const reload = (where) => {
  tableRef?.value?.reload({ page: 1, where });
};
// 删除
const remove = (row) => {
  let body = { appId: row.appId };
  request
    .post('/ipa/delete_app', body)
    .then((res) => {
      reload();
      message.info(res.data.msg);
    })
    .catch((e) => {
      message.error(e.response.data.msg);
    });
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

/* 修改应用状态 */

const editStatus = (checked, row) => {
  const status = checked ? 1 : 0;
  var hint = status === 1 ? '上架' : '下架';
  Modal.confirm({
    title: '提示',
    content: '确定' + hint + '吗？',
    icon: createVNode(ExclamationCircleOutlined),
    maskClosable: true,
    onOk: () => {
      let body = { appId: row.appId, appStatus: status };
      request
        .post('/ipa/update_app', body)
        .then((res) => {
          reload();
          message.success(res.data.msg);
        })
        .catch((e) => {
          message.error(e.response.data.msg);
        });
    }
  });
};
const getfilesize = (size) => {
  if (!size) return '';
  var num = 1024.0;
  if (size < num) return size + 'B';
  if (size < Math.pow(num, 2)) return (size / num).toFixed(2) + 'KB';
  if (size < Math.pow(num, 3))
    return (size / Math.pow(num, 2)).toFixed(2) + 'M';
  if (size < Math.pow(num, 4))
    return (size / Math.pow(num, 3)).toFixed(2) + 'G';
  return (size / Math.pow(num, 4)).toFixed(2) + 'T';
};
</script>

<script>
export default {
  name: 'V3'
};
</script>

<style lang="less" scoped>
.ant-table-filter-dropdown {
  position: relative;
  display: inline-block;
  /* 设置底部的边框 */
  border-bottom: 1px dashed black;
}

.ant-table-filter-dropdown .tooltiptext {
  font-size: 12px;
  /* 隐藏该元素 */
  width: 160px;
  background-color: #555;
  color: #fff;
  text-align: left;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  top: 125%;
  left: 50%;
  margin-left: -60px;
  transition: opacity 1s;
}

.ant-table-filter-dropdown .tooltiptext::before {
  content: '';
  position: absolute;
  top: -10px;
  left: 70%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent #555 transparent;
}
</style>
