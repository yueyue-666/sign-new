<template>
  <div class="ele-body">
    <a-card :bordered="false">
      <!-- 搜索 -->
      <a-form :label-col="{ xl: 7, lg: 5, md: 7, sm: 4 }" :wrapper-col="{ xl: 17, lg: 19, md: 17, sm: 20 }">
        <a-row :gutter="8">
          <a-col :xl="5" :lg="6" :md="7" :sm="24" :xs="24">
            <a-form-item label="角色">
              <a-select v-model:value="form.userRole" placeholder="请选择" allow-clear>
                <a-select-option value="1">普通用户（会员）</a-select-option>
                <a-select-option value="2">代理用户</a-select-option>
                <a-select-option value="3">后台管理员</a-select-option>
                <a-select-option value="4">小客户链接</a-select-option>
                <a-select-option value="5">中客户链接</a-select-option>
                <a-select-option value="6">大客户链接1</a-select-option>
                <a-select-option value="7">大客户链接2</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="5" :lg="6" :md="7" :sm="24" :xs="24">
            <a-form-item label="账号">
              <a-input allow-clear :maxlength="20" placeholder="请输入" v-model:value="form.username" />
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
          <template v-if="column.key === 'appCounts'">
            <a @click="openyonghu(record)">{{ record.appCounts }}</a>
          </template>
          <template v-else-if="column.key === 'SignUsedV2'">
            <!-- <a-tag color="green">处理成功</a-tag> -->
            <p>
              今日：
              <a @click="openqianfa(record)">{{ record.todaySuperSignUsed }}</a>
            </p>
            <p>
              剩余：
              {{ record.superSignLeft }}
            </p>
            <p>
              累计：
              {{ record.totalSuperSignUsed }}
            </p>
          </template>
          <template v-else-if="column.key === 'SignUsedV3'">
            <p>
              今日：
              <a @click="openqianfa(record)">{{ record.todaySuperSignUsedV3 }}</a>
            </p>
            <p>
              剩余：
              {{ record.superSignLeftV3 }}
            </p>
            <p>
              累计：
              {{ record.totalSuperSignUsedV3 }}
            </p>
          </template>
          <template v-else-if="column.key === 'action'">
            <a-space>
              <a class="ele-text-success" @click="mark(record)">备注</a>
              <a-divider type="vertical" />
              <a class="ele-text-success" @click="recharge(record)">充值</a>
              <a-divider type="vertical" />
              <a class="ele-text-success" @click="setpass(record)">密码</a>
              <a-divider type="vertical" />
              <a class="ele-text-success" @click="BalanceNotice(record)">余量报警</a>
              <a-divider type="vertical" />
              <a-popconfirm placement="topRight" title="确定要删除此应用吗？" @confirm="remove(record)">
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

    <!-- 充值弹窗 -->
    <ele-modal
      :width="400"
      title="充值"
      v-model:visible="visible2"
      :resizable="true"
      :maxable="true"
      @cancel="visible2=false"
      @ok="rechargesave"
    >
      <a-form ref="rechargeformRef" :model="rechargeform" :label-col="{ flex: '70px' }" :wrapper-col="{ flex: '1' }">
        <a-form-item label="类型">
          <a-select v-model:value="rechargeform.signType" placeholder="请选择" allow-clear>
            <a-select-option value="0">超级签名V2</a-select-option>
            <a-select-option value="1">超级签名V3</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="总金额">
          <a-input-number :min="0" class="ele-fluid" placeholder="请输入" v-model:value="rechargeform.amount" />
        </a-form-item>
      </a-form>
    </ele-modal>

    <!-- 密码弹窗 -->
    <ele-modal
      :width="400"
      title="重置密码"
      v-model:visible="visible3"
      :resizable="true"
      :maxable="true"
      @cancel="visible3=false"
      @ok="setpasssave"
    >
      <a-form ref="setpassformRef" :model="setpassform" :label-col="{ flex: '70px' }" :wrapper-col="{ flex: '1' }">
        <a-form-item label="密码">
          <a-input class="ele-fluid" placeholder="请输入" v-model:value="setpassform.newPassword" />
        </a-form-item>
      </a-form>
    </ele-modal>

    <!-- 余量报警弹窗 -->
    <ele-modal
      :width="400"
      title="余量报警"
      v-model:visible="visible4"
      :resizable="true"
      :maxable="true"
      @cancel="visible4=false"
      @ok="BalanceNoticesave"
    >
      <a-form ref="setpassformRef" :model="BalanceNoticeform" :label-col="{ flex: '120px' }" :wrapper-col="{ flex: '1' }">
        <a-form-item>
          <template #label>
            V2报警余量 &nbsp;
            <a-tooltip title="设置为0则不报警">
              <info-circle-outlined />
            </a-tooltip>
          </template>
          <a-input class="ele-fluid" placeholder="可用账户余量低于该值报警" v-model:value="BalanceNoticeform.publicAlarmNum" />
        </a-form-item>
        <a-form-item>
          <template #label>
            V3报警余量 &nbsp;
            <a-tooltip title="设置为0则不报警">
              <info-circle-outlined />
            </a-tooltip>
          </template>
          <a-input class="ele-fluid" placeholder="可用账户余量低于该值报警" v-model:value="BalanceNoticeform.publicAlarmNumV3" />
        </a-form-item>
        <a-form-item label="Telegram账号ID">
          <a-input class="ele-fluid" placeholder="多个用逗号(英文)分隔" v-model:value="BalanceNoticeform.publicAlarmTelegrams" />
        </a-form-item>
        <div class="layui-inline layui-col-md12">
          <p style="margin-left: 35px; margin-bottom: 5px;color: #9ea6bc; font-size: 10px">
            如何获取Telegram账号ID?
            <br />1. 打开Telegram，在搜索栏搜索 @userinfobot.
            <br />2. 选择点击灰色头像.
            <br />3. 点击Start.
            <br />4. 第二行Id即为您的UserID.
            <br />
          </p>
          <a
            style="color: #1E9FFF; margin-left: 35px;"
            target="_blank"
            href="https://bigone.zendesk.com/hc/zh-cn/articles/360008014894-%E5%8D%81-%E5%A6%82%E4%BD%95%E8%8E%B7%E5%8F%96%E8%87%AA%E5%B7%B1%E7%9A%84-Telegram-userid"
          >查看详情</a>
        </div>
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
import { AllUserInfo } from '@/api/system/user';
import { removePageTab } from '@/utils/page-tab-util';
import { useRouter } from 'vue-router';
import { InfoCircleOutlined } from '@ant-design/icons-vue';
// 表格实例
const tableRef = ref(null);

// 表格列配置
const columns = ref([
  {
    title: '账号',
    dataIndex: 'username',
    align: 'center',
    sorter: false,
    width: 120,
    showSorterTooltip: false
  },
  {
    title: '角色',
    dataIndex: 'userRoleDesc',
    align: 'center',
    width: 120,
    ellipsis: true
  },
  {
    title: '应用数',
    key: 'appCounts',
    align: 'center',
    width: 120,
    ellipsis: true
  },
  {
    title: '超级签名V2',
    key: 'SignUsedV2',
    align: 'center',
    width: 120,
    ellipsis: true
  },
  {
    title: '超级签名V3',
    key: 'SignUsedV3',
    align: 'center',
    width: 120,
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
    title: '注册时间',
    dataIndex: 'registerTime',
    align: 'center',
    width: 200,
    ellipsis: true
  },
  {
    title: '操作',
    key: 'action',
    width: 500,
    fixed: 'right',
    align: 'center'
  }
]);

const { push } = useRouter();
// 打开应用管理界面
const openyonghu = (row) => {
  const path = '/home/applicationmanagement';
  removePageTab({ key: path });
  nextTick(() => {
    push({
      path,
      query: row ? { appCounts: row.appCounts } : undefined
    });
  });
};

// 打开应用管理界面
const openqianfa = (row) => {
  const path = '/home/Statistics/V2/trend';
  removePageTab({ key: path });
  nextTick(() => {
    push({
      path,
      query: row ? { username: row.username } : undefined
    });
  });
};

// 表单数据
const { form, resetFields } = useFormData({
  back: false
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
  return AllUserInfo({ ...form, ...orders, page, size: limit });
};

/* 搜索 */
const reload = (where) => {
  tableRef?.value?.reload({ page: 1, ...form });
};

// 删除
const remove = (row) => {
  let body = { userId: row.userId };
  request
    .post('/backstage/deleteUser', body)
    .then((res) => {
      reload();
      message.info(res.data.msg);
    })
    .catch((e) => {
      message.error(e.response.data.msg);
    });
};

// 点击备注
const mark = (row) => {
  visible1.value = true;
  remarkform.userId = row.userId;
  remarkform.remark = row.remark;
};

const remarkformRef = ref(null);

// 是否显示备注弹窗
const visible1 = ref(false);

// 备注数据
const remarkform = reactive({
  remark: '',
  userId: ''
});

// 更改备注
const remarksave = () => {
  if (!remarkform.remark) {
    message.info('请输入备注');
    return;
  }
  let body = { userId: remarkform.userId, commitInfo: remarkform.remark };
  request
    .post('/backstage/commit', body)
    .then((res) => {
      visible1.value = false;
      message.success(res.data.msg);
      reload();
    })
    .catch((e) => {
      message.error(e.response.data.msg);
    });
};

// 点击充值
const recharge = (row) => {
  visible2.value = true;
  rechargeform.userId = row.userId;
  rechargeform.signType = '0';
};

const rechargeformRef = ref(null);

// 是否显示充值弹窗
const visible2 = ref(false);

// 充值数据
const rechargeform = reactive({
  userId: ''
});

// 充值
const rechargesave = () => {
  if (!rechargeform.amount) {
    message.info('请输入金额');
    return;
  }
  let body = {
    amount: rechargeform.amount,
    userId: rechargeform.userId,
    signType: rechargeform.signType
  };
  request
    .post('/backstage/recharge', body)
    .then((res) => {
      rechargeform.amount = '';
      visible2.value = false;
      message.success(res.data.msg);
      reload();
    })
    .catch((e) => {
      message.error(e.response.data.msg);
    });
};

// 点击密码
const setpass = (row) => {
  visible3.value = true;
  setpassform.userId = row.userId;
};

const setpassformRef = ref(null);

// 是否显示充值弹窗
const visible3 = ref(false);

// 充值数据
const setpassform = reactive({
  userId: ''
});

// 充值
const setpasssave = () => {
  if (!setpassform.newPassword) {
    message.info('请输入密码');
    return;
  }
  let body = {
    userId: setpassform.userId,
    newPassword: setpassform.newPassword
  };
  request
    .post('/backstage/resertPassword', body)
    .then((res) => {
      setpassform.newPassword = '';
      visible3.value = false;
      message.success(res.data.msg);
      reload();
    })
    .catch((e) => {
      message.error(e.response.data.msg);
    });
};

// 余量报警
const BalanceNotice = (row) => {
  visible4.value = true;
  BalanceNoticeform.userId = row.userId;
  BalanceNoticeform.publicAlarmNum = row.balanceNoticeCount;
  BalanceNoticeform.publicAlarmNumV3 = row.balanceNoticeCountV3;
  BalanceNoticeform.publicAlarmTelegrams = JSON.parse(row.telegramIds);
};

const BalanceNoticeformRef = ref(null);

// 是否显示充值弹窗
const visible4 = ref(false);

// 充值数据
const BalanceNoticeform = reactive({
  userId: ''
});

// 充值
const BalanceNoticesave = () => {
  var alarms = BalanceNoticeform.publicAlarmTelegrams;
  if (alarms) {
    console.log(alarms);
    var reg = /^([\-\+\d]+(,)?)+$/;
    if (!reg.test(alarms) || alarms.endsWith(',')) {
      message.error('账号格式错误');
      return false;
    }
    BalanceNoticeform.publicAlarmTelegrams = JSON.stringify(alarms.split(','));
  }
  let body = {
    userId: BalanceNoticeform.userId,
    balance: BalanceNoticeform.publicAlarmNum,
    balanceV3: BalanceNoticeform.publicAlarmNumV3,
    telegramIds: BalanceNoticeform.publicAlarmTelegrams
  };
  request
    .post('/backstage/settingBalanceNotice', body)
    .then((res) => {
      visible4.value = false;
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
  name: 'UserManagemen'
};
</script>
