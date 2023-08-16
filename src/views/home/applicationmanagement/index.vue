<template>
  <div class="ele-body">
    <a-card :bordered="false">
      <!-- 搜索 -->
      <a-form :label-col="{ xl: 7, lg: 5, md: 7, sm: 4 }" :wrapper-col="{ xl: 17, lg: 19, md: 17, sm: 20 }">
        <a-row :gutter="8">
          <a-col :xl="5" :lg="6" :md="7" :sm="24" :xs="24" v-if="userRole === '3'">
            <a-form-item label="应用类型">
              <a-select v-model:value="form.orderParam" placeholder="请选择" allow-clear>
                <a-select-option value="0">最近更新</a-select-option>
                <a-select-option value="1">日消耗</a-select-option>
                <a-select-option value="2">消耗总量</a-select-option>
                <a-select-option value="3">最近删除</a-select-option>
                <a-select-option value="4">小客户链接</a-select-option>
                <a-select-option value="5">中客户链接</a-select-option>
                <a-select-option value="6">大客户链接1</a-select-option>
                <a-select-option value="7">大客户链接2</a-select-option>
                <a-select-option value="8">IP链接</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="5" :lg="6" :md="7" :sm="24" :xs="24" v-else>
            <a-form-item label="应用类型">
              <a-select v-model:value="form.orderParamro" placeholder="请选择" allow-clear>
                <a-select-option value="0">最近更新</a-select-option>
                <a-select-option value="1">日消耗</a-select-option>
                <a-select-option value="2">消耗总量</a-select-option>
                <a-select-option value="4">小客户链接</a-select-option>
                <a-select-option value="5">中客户链接</a-select-option>
                <a-select-option value="6">大客户链接1</a-select-option>
                <a-select-option value="7">大客户链接2</a-select-option>
                <a-select-option value="8">IP链接</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="5" :lg="6" :md="7" :sm="24" :xs="24">
            <a-form-item label="应用名称">
              <a-input allow-clear :maxlength="20" placeholder="请输入" v-model:value="form.name" />
            </a-form-item>
          </a-col>
          <a-col :xl="4" :lg="6" :md="7" :sm="24" :xs="24">
            <a-form-item class="ele-text-right" :wrapper-col="{ span: 24 }">
              <a-space>
                <a-button type="primary" @click="reload">查询</a-button>
                <a-button @click="reset">重置</a-button>
              </a-space>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <a-row :gutter="8" style="padding: 0 0 10px 0">
        <a-col :xl="5" :lg="6" :md="7" :sm="24" :xs="24">
          <a-select v-model:value="signform.cerNameOld" placeholder="请选择" allow-clear>
            <a-select-option :value="item" v-for="(item, i) in SignNewList" :key="i">{{ item }}</a-select-option>
          </a-select>&nbsp;替换为&nbsp;
          <a-select v-model:value="signform.cerNameNew" placeholder="请选择" allow-clear>
            <a-select-option :value="item" v-for="(item, i) in SignNewList" :key="i">{{ item }}</a-select-option>
          </a-select>
        </a-col>
        <a-col :xl="5" :lg="6" :md="7" :sm="24" :xs="24">
          <a-button type="primary" class="ele-btn-icon" @click="signAllIpas()">
            <template #icon>
              <EditOutlined />
            </template>
            <span>立即重签</span>
          </a-button>
        </a-col>
      </a-row>
      <!-- 表格 -->
      <ele-pro-table
        ref="tableRef"
        row-key="appId"
        :columns="columns"
        :datasource="datasource"
        :scroll="{ x: 1000 }"
        :where="defaultWhere"
        v-model:selection="selection"
        cache-key="proSystemUserTable"
      >
        <template #toolbar>
          <a-space :size="10">
            <a-button type="primary" class="ele-btn-icon" :disabled="!(selection.length > 0)" @click="removeBatch">
              <template #icon>
                <delete-outlined />
              </template>
              <span>批量删除</span>
            </a-button>
            <a-button type="primary" class="ele-btn-icon" :disabled="!(selection.length > 0)" @click="signV2V3Batch(0)">
              <template #icon>
                <EditOutlined />
              </template>
              <span>批量重签V2</span>
            </a-button>
            <a-button type="primary" class="ele-btn-icon" :disabled="!(selection.length > 0)" @click="signV2V3Batch(1)">
              <template #icon>
                <EditOutlined />
              </template>
              <span>批量重签V3</span>
            </a-button>
            <a-button type="primary" class="ele-btn-icon" @click="signAllV3">
              <template #icon>
                <EditOutlined />
              </template>
              <span>重签所有V3</span>
            </a-button>
          </a-space>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <div class="name" v-if="record.signType === 1" @click="dlpath(record)">
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
                  <android-Outlined v-if="record.apkDownPath" />
                  <apple-Outlined v-else />
                </span>
              </div>
            </div>
            <div class="name" v-else-if="record.signType === 2" @click="dlpath(record)">
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
                  <android-Outlined v-if="record.apkDownPath" />
                  <apple-Outlined v-else />
                </span>
              </div>
            </div>
            <div class="name" v-else @click="dlpath(record)">
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
                  <android-Outlined v-if="record.apkDownPath" />
                  <apple-Outlined v-else />
                </span>
              </div>
            </div>
          </template>
          <template v-else-if="column.key === 'action'">
            <a-space>
              <template v-if="userRole === '3'">
                <a-popconfirm placement="topRight" title="确认立即V2签名吗？" @confirm="signV2(record)">
                  <a class="ele-text-success">签名V2</a>
                </a-popconfirm>
                <a-divider type="vertical" />
                <a-popconfirm placement="topRight" title="确认立即V3签名吗？" @confirm="signV3(record)">
                  <a class="ele-text-success">签名V3</a>
                </a-popconfirm>
                <a-divider type="vertical" />
                <a class="ele-text-success" @click="setkouliang(record)">扣量比例</a>
                <a-divider type="vertical" />
              </template>
              <a class="ele-text-success" @click="reply(record)">设置</a>
              <a-divider type="vertical" />
              <a-popconfirm placement="topRight" title="确定要删除此应用吗？" @confirm="remove(record)">
                <a class="ele-text-danger">删除</a>
              </a-popconfirm>
            </a-space>
          </template>
          <template v-if="column.key === 'userName'">
            <a @click="openUser(record)">{{ record.userName }}</a>
          </template>
          <template v-else-if="column.key === 'version'">
            <div
              style="
                font-size: 12px;
                float: left;
                line-height: 30px;
                text-align: left;
              "
            >
              <p>v{{ record.version }}</p>
              <p>{{ record.bundleId }}</p>
            </div>
          </template>
          <template v-else-if="column.key === 'isUseOssAndroid'">
            <a-switch
              :checked="record.isUseOssAndroid === 1"
              @change="(checked) => editisUseOssAndroid(checked, record, 1)"
              checked-children="开启"
              un-checked-children="关闭"
            />
          </template>
          <template v-else-if="column.key === 'isUseOss'">
            <a-switch
              :checked="record.isUseOss === 1"
              @change="(checked) => editisUseOssAndroid(checked, record, 0)"
              checked-children="开启"
              un-checked-children="关闭"
            />
          </template>
          <template v-else-if="column.key === 'auditStatusName'">
            <a-tag color="green" v-if="record.signCode === 200">已签名</a-tag>
            <a-tag color="red" v-if="record.signCode === 1001">签名失败</a-tag>
          </template>
          <template v-else-if="column.key === 'isCrash'">
            <a-switch
              :checked="record.isCrash === 1"
              @change="(checked) => editisCrash(checked, record)"
              checked-children="显示"
              un-checked-children="不显示"
            />
          </template>
          <template v-else-if="column.key === 'isShowAndroid'">
            <a-switch
              :checked="record.isShowAndroid === 1"
              @change="(checked) => editisShowAndroid(checked, record)"
              checked-children="闪退"
              un-checked-children="不闪退"
            />
          </template>
          <template v-else-if="column.key === 'auditStatus'">
            <a-switch
              :checked="record.auditStatus === 1"
              @change="(checked) => editauditStatus(checked, record)"
              checked-children="通过"
              un-checked-children="审核中"
            />
          </template>
          <template v-else-if="column.key === 'appStatus'">
            <a-switch
              :checked="record.appStatus === 1"
              @change="(checked) => editappStatus(checked, record)"
              checked-children="上架中"
              un-checked-children="下架"
            />
          </template>
          <template v-else-if="column.key === 'urlType'">
            <a-select v-model:value="record.urlType" placeholder="请选择" allow-clear @change="pick(record, record.urlType)">
              <a-select-option :value="0">小客户链接</a-select-option>
              <a-select-option :value="1">中客户链接</a-select-option>
              <a-select-option :value="2">大客户链接1</a-select-option>
              <a-select-option :value="3">大客户链接2</a-select-option>
              <a-select-option :value="4">IP链接</a-select-option>
            </a-select>
          </template>
          <template v-else-if="column.key === 'dlUrl'">
            <div
              style="
                font-size: 12px;
                float: left;
                line-height: 30px;
                text-align: left;
              "
            >
              <p>
                <span>
                  主用：
                  <a :href="record.iosDownloadUrl" target="_blank" rel="noopener noreferrer">{{ record.iosDownloadUrl }}</a>
                  <copy-outlined @click="copyDetail(record.iosDownloadUrl)" style="font-size: 15px" />
                </span>
              </p>
              <p>
                <span>
                  备用：
                  <a :href="record.backupUrl" target="_blank" rel="noopener noreferrer">{{ record.backupUrl }}</a>
                  <copy-outlined @click="copyDetail(record.backupUrl)" style="font-size: 15px" />
                </span>
              </p>
            </div>
          </template>
        </template>

        <template #downloadDeductCount>
          <span>
            iOS总消耗量
            <a-tooltip>
              <template #title>
                <p>
                  应用的累计消耗设备量：
                  <br />同一苹果手机设备多次下载同一应用只计算一次消耗量
                </p>
              </template>
              <info-circle-outlined />
            </a-tooltip>
          </span>
        </template>

        <template #installType>
          <span>
            安装方式
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
          </span>
        </template>
      </ele-pro-table>
    </a-card>

    <!-- 扣量比例弹窗 -->
    <ele-modal
      :width="400"
      title="请输入扣量比例"
      v-model:visible="visible3"
      :resizable="true"
      :maxable="true"
      @cancel="visible3 = false"
      @ok="setkouliangsave"
    >
      <a-form ref="setkouliangformRef" :model="setkouliangform" :label-col="{ flex: '70px' }" :wrapper-col="{ flex: '1' }">
        <a-form-item>
          <a-input class="ele-fluid" placeholder="请输入" v-model:value="setkouliangform.scale" />
        </a-form-item>
      </a-form>
    </ele-modal>

    <!-- 添加用户弹窗 -->
    <!-- <ele-modal
      :width="400"
      title="添加用户"
      v-model:visible="visible5"
      :resizable="true"
      :maxable="true"
      @cancel="visible5cancel"
      @ok="addusersave"
    >
      <a-form
        ref="setpassformRef"
        :model="adduserform"
        :label-col="{ flex: '120px' }"
        :wrapper-col="{ flex: '1' }"
      >
        <a-form-item label="用户名">
          <a-input
            class="ele-fluid"
            placeholder="请输入用户名"
            v-model:value="adduserform.username"
          />
        </a-form-item>
        <a-form-item label="密码">
          <a-input
            class="ele-fluid"
            placeholder="请输入密码"
            v-model:value="adduserform.password"
          />
        </a-form-item>
      </a-form>
    </ele-modal>-->
  </div>
</template>

<script setup>
import { ref, createVNode, reactive, nextTick, unref } from 'vue';
import { toDateString } from 'ele-admin-pro/es';
import useFormData from '@/utils/use-form-data';
import request from '@/utils/request';
import { message, Modal } from 'ant-design-vue/es';
import { pageUsers } from '@/api/system/user';
import { removePageTab } from '@/utils/page-tab-util';
import { useRouter } from 'vue-router';
import {
  EditOutlined,
  DeleteOutlined,
  AppleOutlined,
  AndroidOutlined,
  CopyOutlined,
  PlusOutlined,
  InfoCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons-vue';

const { currentRoute } = useRouter();

// 表格实例
const tableRef = ref(null);

// 表格列配置
const columns = ref([
  {
    title: '应用名称',
    key: 'name',
    align: 'center',
    width: 200,
    ellipsis: true
  },
  {
    title: 'v2证书',
    dataIndex: 'cerName',
    align: 'center',
    width: 120,
    ellipsis: true
  },
  {
    title: 'v3证书',
    dataIndex: 'cerNameV3',
    align: 'center',
    width: 120,
    ellipsis: true
  },
  {
    // title: 'iOS总消耗量',
    dataIndex: 'downloadDeductCount',
    align: 'center',
    width: 120,
    ellipsis: true,
    default: true
    // slots: { title: 'downloadDeductCount' }
  },
  {
    title: '动态库日消耗量',
    dataIndex: 'dylibUsedToday',
    align: 'center',
    width: 120,
    ellipsis: true,
    hideInTable: localStorage.getItem('userRole') === '3' ? false : true
  },
  {
    title: 'Android下载量',
    dataIndex: 'downloadCountAndroid',
    align: 'center',
    width: 120,
    ellipsis: true
  },
  {
    title: '扣量比例',
    dataIndex: 'scale',
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
    title: '链接类型',
    key: 'urlType',
    align: 'center',
    width: 200,
    ellipsis: true,
    hideInTable: localStorage.getItem('userRole') === '3' ? false : true
  },

  {
    title: '应用状态',
    key: 'appStatus',
    align: 'center',
    width: 120,
    ellipsis: true
  },
  {
    title: '审核状态',
    key: 'auditStatus',
    align: 'center',
    width: 120,
    ellipsis: true,
    hideInTable: localStorage.getItem('userRole') === '3' ? false : true
  },
  {
    title: '显示安卓页面',
    key: 'isShowAndroid',
    align: 'center',
    width: 120,
    ellipsis: true,
    hideInTable: localStorage.getItem('userRole') === '3' ? false : true
  },
  {
    title: '闪退状态',
    key: 'isCrash',
    align: 'center',
    width: 120,
    ellipsis: true,
    hideInTable: localStorage.getItem('userRole') === '3' ? false : true
  },
  {
    title: '签名状态',
    key: 'auditStatusName',
    align: 'center',
    width: 120,
    ellipsis: true,
    hideInTable: localStorage.getItem('userRole') === '3' ? false : true
  },
  {
    title: '最后签名时间',
    dataIndex: 'signDatetime',
    align: 'center',
    width: 120,
    ellipsis: true,
    hideInTable: localStorage.getItem('userRole') === '3' ? false : true
  },
  {
    title: 'oss更新时间',
    dataIndex: 'ossUpdateDatetime',
    align: 'center',
    width: 120,
    ellipsis: true,
    hideInTable: localStorage.getItem('userRole') === '3' ? false : true
  },
  {
    title: 'hk安卓',
    dataIndex: 'hkAndroidDate',
    align: 'center',
    width: 200,
    ellipsis: true,
    hideInTable: localStorage.getItem('userRole') === '3' ? false : true
  },
  {
    title: 'hk苹果',
    dataIndex: 'hkIosDate',
    align: 'center',
    width: 200,
    ellipsis: true,
    hideInTable: localStorage.getItem('userRole') === '3' ? false : true
  },
  {
    title: 'ios是否默认oss',
    key: 'isUseOss',
    align: 'center',
    width: 120,
    ellipsis: true,
    hideInTable: localStorage.getItem('userRole') === '3' ? false : true
  },
  {
    title: '安卓是否默认oss',
    key: 'isUseOssAndroid',
    align: 'center',
    width: 120,
    ellipsis: true,
    hideInTable: localStorage.getItem('userRole') === '3' ? false : true
  },
  {
    title: '版本',
    key: 'version',
    align: 'center',
    width: 250,
    ellipsis: true
  },
  {
    title: '安装方式',
    dataIndex: 'installType',
    align: 'center',
    width: 120,
    ellipsis: true,
    customFilterDropdown: true,
    // slots: { title: 'installType' },
    customRender: ({ text }) => {
      if (text === 1) {
        return '滑块验证';
      } else if (text === 0) {
        return '公开';
      } else if (text === 3) {
        return '下载码';
      }
    }
  },
  {
    title: '所属用户',
    key: 'userName',
    align: 'center',
    width: 200,
    ellipsis: true
  },
  {
    title: '备注',
    dataIndex: 'remark',
    align: 'center',
    width: 120,
    ellipsis: true,
    customRender: ({ text }) => {
      if (text) {
        return text;
      } else {
        return '-';
      }
    }
  },
  {
    title: '更新时间',
    dataIndex: 'updateTimestamp',
    align: 'center',
    width: 200,
    ellipsis: true
  },
  {
    title: '操作',
    key: 'action',
    width: 350,
    fixed: 'right',
    align: 'center'
  }
]);

const userRole = localStorage.getItem('userRole');

const { push } = useRouter();

// 打开用户管理界面
const openUser = (row) => {
  const path = '/home/UserManagemen';
  removePageTab({ key: path });
  nextTick(() => {
    push({
      path,
      query: row ? { username: row.userName } : undefined
    });
  });
};

// const { query } = unref(currentRoute);

// /* 搜索 */
// const search = () => {
//   emit('search', form);
// };

// 表单数据
const { form, resetFields } = useFormData({
  orderParam: '0',
  orderParamro: '0'
});

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
  return pageUsers({ ...form, ...orders, page, size: limit });
};

/* 搜索 */
const reload = (where) => {
  selection.value = [];
  tableRef?.value?.reload({ page: 1, ...form });
};
// ----------------------------------------------
// 删除
const remove = (row) => {
  let body = { appId: row.appId, isSetting };
  request
    .post('/delete_app', body)
    .then((res) => {
      reload();
      message.info(res.data.msg);
    })
    .catch((e) => {
      message.error(e.response.data.msg);
    });
};

// ----------------------------------------------
// V2签名
const signV2 = (row) => {
  console.log(row);
  let ipaName = [`${row.ipaPathOriginal + '&' + row.appId}`];
  let body = {
    ipaNames: JSON.stringify(ipaName),
    signType: 0
  };
  request
    .post('/ipa/enter/sign', body)
    .then((res) => {
      reload();
      message.success(res.data.msg);
    })
    .catch((e) => {
      message.error(e.response.data.msg);
    });
};
// ----------------------------------------------
// 点图片下载app
const dlpath = (row) => {
  let body = {
    ipaPathOriginal: row.ipaPathOriginal
  };
  request
    .post('/ipa/ipaDownloadUrl', body)
    .then((res) => {
      location.href = res.data.data.ipaUrl;
    })
    .catch((e) => {
      message.error(e.response.data.msg);
    });
};
// ----------------------------------------------
// V3签名
const signV3 = (row) => {
  console.log(row);
  let ipaName = [`${row.ipaPathOriginal + '&' + row.appId}`];
  let body = {
    ipaNames: JSON.stringify(ipaName),
    signType: 1
  };
  request
    .post('/ipa/enter/sign', body)
    .then((res) => {
      reload();
      message.success(res.data.msg);
    })
    .catch((e) => {
      message.error(e.response.data.msg);
    });
};

// ----------------------------------------------
// 扣量比例
const setkouliang = (row) => {
  visible3.value = true;
  setkouliangform.appId = row.appId;
};

const setkouliangformRef = ref(null);

// 是否显示扣量比例弹窗
const visible3 = ref(false);

// 扣量比例数据
const setkouliangform = reactive({
  appId: ''
});

// 扣量比例
const setkouliangsave = () => {
  if (!setkouliangform.scale) {
    message.info('请输入扣量比例');
    return;
  }
  let body = {
    appId: setkouliangform.appId,
    scale: setkouliangform.scale
  };
  request
    .post('/ipa/enter/setScale', body)
    .then((res) => {
      visible3.value = false;
      message.success(res.data.msg);
      reload();
    })
    .catch((e) => {
      message.error(e.response.data.msg);
    });
};
// ----------------------------------------------
/* 审核状态 */
const editappStatus = (checked, row) => {
  const isOpen = checked ? 1 : 0;
  var hint = isOpen === 1 ? '上架中' : '下架';
  Modal.confirm({
    title: '提示',
    content: '确定' + hint + '吗？',
    icon: createVNode(ExclamationCircleOutlined),
    maskClosable: true,
    onOk: () => {
      let body = { appId: row.appId, appStatus: isOpen };
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
// ----------------------------------------------
/* 审核状态 */
const editauditStatus = (checked, row) => {
  const isOpen = checked ? 1 : 0;
  var hint = isOpen === 1 ? '通过' : '审核中';
  Modal.confirm({
    title: '提示',
    content: '确定' + hint + '吗？',
    icon: createVNode(ExclamationCircleOutlined),
    maskClosable: true,
    onOk: () => {
      let body = { appId: row.appId, auditStatus: isOpen };
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
// ----------------------------------------------
/* 显示安卓页面 */
const editisShowAndroid = (checked, row) => {
  const isOpen = checked ? 1 : 0;
  var hint = isOpen === 1 ? '显示' : '不显示';
  Modal.confirm({
    title: '提示',
    content: '确定' + hint + '吗？',
    icon: createVNode(ExclamationCircleOutlined),
    maskClosable: true,
    onOk: () => {
      let body = { appId: row.appId, isShowAndroid: isOpen };
      request
        .post('/backstage/showAndroidPage', body)
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
// ----------------------------------------------
/* 闪退状态 */
const editisCrash = (checked, row) => {
  const isOpen = checked ? 1 : 0;
  var hint = isOpen === 1 ? '闪退' : '不闪退';
  Modal.confirm({
    title: '提示',
    content: '确定' + hint + '吗？',
    icon: createVNode(ExclamationCircleOutlined),
    maskClosable: true,
    onOk: () => {
      let body = { appId: row.appId, isCrash: isOpen };
      request
        .post('/ipa/enter/settingCrash', body)
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
// ----------------------------------------------
/* 安卓,ios是否默认oss */
const editisUseOssAndroid = (checked, row, deviceType) => {
  const isOpen = checked ? 1 : 0;
  var hint = isOpen === 1 ? '开启' : '关闭';
  Modal.confirm({
    title: '提示',
    content: '确定' + hint + '吗？',
    icon: createVNode(ExclamationCircleOutlined),
    maskClosable: true,
    onOk: () => {
      let body = {
        appId: row.appId,
        isUseOss: isOpen,
        deviceType: deviceType
      };
      request
        .post('/ipa/enter/settingOssStatus', body)
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
// ----------------------------------------------
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
// ----------------------------------------------
/* 设置链接类型 */
const pick = (row, e) => {
  let body = { appId: row.appId, urlType: e };
  request
    .post('/backstage/settingUrlType', body)
    .then((res) => {
      reload();
      message.success(res.data.msg);
    })
    .catch((e) => {
      message.error(e.response.data.msg);
    });
};

// ----------------------------------------------

// 表格选中数据
const selection = ref([]);

/* 批量删除 */
const removeBatch = () => {
  Modal.confirm({
    title: '提示',
    content: '确定要删除选中的应用吗?',
    icon: createVNode(ExclamationCircleOutlined),
    maskClosable: true,
    onOk: () => {
      let appIds = [];
      selection.value.forEach((element) => {
        appIds.push(element.appId);
      });
      let body = { appIds: appIds };
      request
        .post('/backstage/batchDeleteApp', body)
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

/* 批量重签V2，V3 */
const signV2V3Batch = (e) => {
  Modal.confirm({
    title: '提示',
    content: '确定批量签名吗?',
    icon: createVNode(ExclamationCircleOutlined),
    maskClosable: true,
    onOk: () => {
      let ipaNames = [];
      selection.value.forEach((element) => {
        ipaNames.push(`${element.ipaPathOriginal + '&' + element.appId}`);
      });
      let body = {
        ipaNames: JSON.stringify(ipaNames),
        signType: e
      };
      console.log(body);
      request
        .post('/ipa/enter/sign', body)
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

/* 重签所有V3 */
const signAllV3 = () => {
  Modal.confirm({
    title: '提示',
    content: '确认全部签名V3吗?',
    icon: createVNode(ExclamationCircleOutlined),
    maskClosable: true,
    onOk: () => {
      request
        .post('/ipa/enter/signAllV3', {})
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

// ----------------------------------------------

const SignNewList = ref({});
// 获取下拉
const getSignNewList = () => {
  request
    .post('/backstage/getSignNewList', {})
    .then((res) => {
      SignNewList.value = res.data.data;
    })
    .catch((e) => {
      message.error(e.response.data.msg);
    });
};

const signform = ref({});

/* 重签 */
const signAllIpas = () => {
  Modal.confirm({
    title: '提示',
    content: '确认签名吗?',
    icon: createVNode(ExclamationCircleOutlined),
    maskClosable: true,
    onOk: () => {
      request
        .post('/ipa/enters/signAllIpas', signform.value)
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
// ----------------------------------------------
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
//设置
function reply(record) {
  const path = '/dashboard/workplace/applicationmanagement-edit';
  removePageTab({ key: path });
  push({
    path,
    query: { appId: record.appId, isAdmin: true }
  });
}

// 获取下拉
getSignNewList();
</script>

<script>
export default {
  name: 'Applicationmanagement'
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
