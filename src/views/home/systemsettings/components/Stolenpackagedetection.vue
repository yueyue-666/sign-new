<template>
  <div class="ele-body">
    <a-card :bordered="false">
      <!-- 搜索 -->
      <a-form :label-col="{ xl: 7, lg: 5, md: 7, sm: 4 }" :wrapper-col="{ xl: 17, lg: 19, md: 17, sm: 20 }">
        <a-row :gutter="8">
          <a-col :xl="5" :lg="12" :md="12" :sm="24" :xs="24">
            <a-form-item label="日期">
              <a-date-picker class="ele-fluid" placeholder="请选择" value-format="YYYY-MM-DD HH:mm:ss" v-model:value="form.startTime" />
            </a-form-item>
          </a-col>
          <a-col :xl="5" :lg="12" :md="12" :sm="24" :xs="24">
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
        <template #toolbar>
          <a-alert type="info" description="当动态库下载量高于后台统计的下载量时，会被判断为偷包行为，这个时候请手动进行闪退处理"></a-alert>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <div class="name" v-if="record.signType === 1">
              <img :src="record.icon" class="nameicon" />
              <div class="nameright">
                <span>
                  <span style="color: #0000ff">
                    {{
                    record.name.length > 5
                    ? record.name.substring(0, 5) + '...'
                    : record.name
                    }}
                  </span>
                  <span v-if="record.signType == 1" class="namestyle">V3</span>
                </span>
                <span>
                  {{ record.size }}
                  <apple-Outlined />
                  <android-Outlined v-if="record.androidUrl" />
                </span>
              </div>
            </div>
            <div class="name" v-else-if="record.signType === 2">
              <img :src="record.icon" class="nameicon" />
              <div class="nameright">
                <span>
                  <span style="color: #0000ff">
                    {{
                    record.name.length > 5
                    ? record.name.substring(0, 5) + '...'
                    : record.name
                    }}
                  </span>
                  <span v-if="record.signType == 2" class="namestyle">混合</span>
                </span>
                <span>
                  {{ record.size }}
                  <apple-Outlined />
                  <android-Outlined v-if="record.androidUrl" />
                </span>
              </div>
            </div>
            <div class="name" v-else>
              <img :src="record.icon" class="nameicon" />
              <div class="nameright">
                <span>
                  <span style="color: #0000ff">
                    {{
                    record.name.length > 5
                    ? record.name.substring(0, 5) + '...'
                    : record.name
                    }}
                  </span>
                  <span v-if="record.type === 4" class="namestyle">V2</span>
                </span>
                <span>
                  {{ getfilesize(record.size) }}
                  <apple-Outlined />
                  <android-Outlined v-if="record.androidUrl" />
                </span>
              </div>
            </div>
          </template>
          <template v-else-if="column.key === 'userName'">
            <a @click="openyonghu(record)">{{ record.userName }}</a>
          </template>
          <template v-else-if="column.key === 'isCrash'">
            <a-tag v-if="record.isCrash === 0" color="green">正在运行中</a-tag>
            <a-tag v-else-if="record.isCrash === 1" color="red">闪退中</a-tag>
            <span v-else>-</span>
          </template>
          <template v-else-if="column.key === 'action'">
            <a-space>
              <a-popconfirm placement="topRight" title="确定立即闪退？" @confirm="remove(record,1,0)" v-if="record.isCrash===0">
                <a class="ele-text-center">立即闪退</a>
              </a-popconfirm>
              <a-popconfirm placement="topRight" title="确定取消闪退？" @confirm="settingCrash(record,0)" v-if="record.isCrash===1">
                <a class="ele-text-center">取消闪退</a>
              </a-popconfirm>
              <a-divider type="vertical" />
              <a-popconfirm placement="topRight" title="确定删除并闪退？" @confirm="remove(record,1,1)">
                <a class="ele-text-danger">删除并闪退</a>
              </a-popconfirm>
            </a-space>
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
import { getBadApp } from '@/api/system';
import { removePageTab } from '@/utils/page-tab-util';
import { useRouter } from 'vue-router';
// 表格实例
const tableRef = ref(null);

// 表格列配置
const columns = ref([
  {
    title: '应用名称',
    key: 'name',
    align: 'center',
    sorter: false,
    width: 150,
    showSorterTooltip: false
  },
  {
    title: '用户',
    key: 'userName',
    align: 'center',
    sorter: false,
    width: 150,
    showSorterTooltip: false
  },
  {
    title: '动态库下载量',
    dataIndex: 'downloadCountForDylib',
    align: 'center',
    width: 150,
    ellipsis: true
  },
  {
    title: '后台下载量',
    dataIndex: 'downloadCountForBackstage',
    align: 'center',
    width: 150,
    ellipsis: true
  },
  {
    title: '状态',
    key: 'isCrash',
    align: 'center',
    sorter: false,
    width: 150,
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
  startTime: s2 + ' 00:00:00',
  endTime: s1 + ' 23:59:59'
});

// /* 搜索 */
// const search = () => {
//   emit('search', form);
// };

// 删除并闪退
const remove = (row, isCrash, isDelete) => {
  let body = { appId: row.appId, isCrash: isCrash, isDelete: isDelete };
  request
    .post('/ipa/enter/settingCrash', body)
    .then((res) => {
      reload();
      message.success(res.data.msg);
    })
    .catch((e) => {
      message.error(e.response.data.msg);
    });
};

//  取消闪退
const settingCrash = (row, isCrash) => {
  let body = { appId: row.appId, isCrash: isCrash };
  request
    .post('ipa/enter/settingCrash', body)
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
  return getBadApp({ ...form, ...orders, page, size: limit });
};

/* 搜索 */
const reload = (where) => {
  tableRef?.value?.reload({ page: 1, ...form });
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
  name: 'systemsettings'
};
</script>
<style lang="less" scoped>
.name {
  display: flex;
  align-items: center;
}
.nameright {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 10px;
}
.nameicon {
  width: 50px;
  height: 50px;
  border-radius: 6px;
}
.namestyle {
  margin-left: 3px;
  padding: 0 5px;
  -webkit-transform-origin-x: 0;
  -webkit-transform: scale(0.7);
  background-color: #ffefde;
  color: #e4494a;
}
</style>
