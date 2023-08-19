<!-- 项目进度 -->
<template>
  <a-card :title="title" :bordered="false" :body-style="{ padding: '14px' }">
    <a-table
      row-key="id"
      size="middle"
      :pagination="false"
      :lazy-load="true"
      :data-source="projectList"
      :columns="projectColumns"
      :scroll="{ x: 600 }"
    >
      <template #headerCell="{ column }">
        <template v-if="column.key === 'installType'">
          <span>安装方式</span>&nbsp;
          <a-tooltip>
            <template #title>
              <p>
                设置里可修改安装方式
                <br />公开：用户可自主安装应用
                <br />滑块验证：用户下载应用时需要滑块验证通过后方可安装应用
                <br />下载码：用户下载应用时需要输入对应的下载码，验证通过后方可安装应用，设置里可生成下载码
              </p>
            </template>
            <info-circle-outlined />
          </a-tooltip>
        </template>
        <template v-if="column.key === 'downloadDeductCount'">
          <span>Ios消耗量</span>&nbsp;
          <a-tooltip>
            <template #title>
              <p>
                应用的累计消耗设备量：
                <br />同一苹果手机设备多次下载
                <br />同一应用只计算一次消耗量
              </p>
            </template>
            <info-circle-outlined />
          </a-tooltip>
        </template>
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
          <a-tag v-else-if="record.auditStatus === 1" color="green">通过</a-tag>
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
            <a @click.stop="openEdit(record)">设置</a>
            <a-divider type="vertical" />
            <a-popconfirm placement="topRight" title="确定要删除此消息吗？" @confirm="remove(record)">
              <a class="ele-text-danger">删除</a>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </a-table>
  </a-card>
</template>

<script setup>
import { ref, createVNode, nextTick } from 'vue';
import MoreIcon from './more-icon.vue';
import request from '@/utils/request';
import { messageLoading } from 'ele-admin-pro/es';
import { removePageTab } from '@/utils/page-tab-util';
import { useRouter } from 'vue-router';
import {
  InfoCircleOutlined,
  CopyOutlined,
  AppleOutlined,
  AndroidOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons-vue';
import { message, Modal } from 'ant-design-vue/es';
defineProps({
  title: String
});
const { push } = useRouter();
const emit = defineEmits(['remove', 'edit']);
const projectColumns = ref([
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
    name: 'Ios消耗量',
    dataIndex: 'downloadDeductCount',
    key: 'downloadDeductCount',
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
    name: '安装方式',
    dataIndex: 'installType',
    key: 'installType',
    align: 'center',
    width: 200,
    ellipsis: true,
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

/* 设置 */
const openEdit = (row) => {
  const path = '/dashboard/workplace/edit';
  removePageTab({ key: path });
  nextTick(() => {
    push({
      path,
      query: row ? { appId: row.appId } : undefined
    });
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
          queryProjectList();
          message.success(res.data.msg);
        })
        .catch((e) => {
          message.error(e.response.data.msg);
        });
    }
  });
};

// 常用应用列表
const projectList = ref([]);

/* 查询常用应用列表 */
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

/* 删除 */
const remove = (row) => {
  let body = { appId: row.appId };
  request
    .post('/ipa/delete_app', body)
    .then((res) => {
      queryProjectList();
      message.info(res.data.msg);
    })
    .catch((e) => {
      message.error(e.response.data.msg);
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

// const onRemove = () => {
//   emit('remove');
// };

// const onEdit = () => {
//   emit('edit');
// };

queryProjectList();
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
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  /* 设置该元素在z轴处于优先显示的位置，因为其他元素没有设置z—index */
  z-index: 1;
  /* 超过了100%就是反向距离 */
  top: 125%;
  left: 50%;
  margin-left: -60px;
  /* 延迟一秒再变为清晰度是1 */
  transition: opacity 1s;
}

/* 设置提示框的after属性，并添加一个尖角 */

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
