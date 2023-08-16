
<template>
  <div>
    <a-spin :spinning="loading">
      <a-table :columns="columns" :data-source="data" :row-selection="rowSelection" rowKey="cerName">
        <template #bodyCell="{ column, record, index }">
          <template v-if="column.key === 'index'">{{ cer + (index + 1) }}</template>
          <template v-if="column.key === 'cerStatus'">
            <a-switch
              :checked="record.cerStatus === '1'"
              @change="(checked) => onChangeCerStatus(checked, record)"
              checked-children="有效"
              un-checked-children="无效"
            />
          </template>
        </template>
      </a-table>
    </a-spin>
  </div>
</template>

<script setup lang='ts'>
import { onMounted, createVNode, ref } from 'vue';
import request from '@/utils/request';
import { message, Modal } from 'ant-design-vue/es';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
// 请求状态
const loading = ref(false);

const props = defineProps({
  tab: Number
});

const cer = props.tab === 1 ? 'v2证书' : 'v3证书';

const columns = [
  {
    title: '类型',
    dataIndex: 'index',
    key: 'index'
  },
  {
    title: '证书名称',
    dataIndex: 'cerName',
    key: 'cerName'
  },
  {
    title: '上传时间',
    dataIndex: 'updateTimestamp',
    key: 'updateTimestamp'
  },
  {
    title: '证书状态',
    dataIndex: 'cerStatus',
    key: 'cerStatus'
  }
];

const data = ref([]);

//单选事件
const rowSelection = ref({
  checkStrictly: false,
  type: 'radio',
  onChange: (selectedRowKeys, selectedRows) => {
    // console.log(
    //   `selectedRowKeys: ${selectedRowKeys}`,
    //   'selectedRows: ',
    //   selectedRows
    // );
  },
  onSelect: (record, selected, selectedRows) => {
    if (record.cerStatus === '0') {
      message.error('该证书已无效');
    } else {
      selectCer(record);
    }
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    // console.log(selected, selectedRows, changeRows);
  },
  //默认选择
  selectedRowKeys: []
});

function onChangeCerStatus(checked, row) {
  const isOpen = checked ? '1' : '0';
  var hint = isOpen === '1' ? '有效' : '无效';
  Modal.confirm({
    title: '提示',
    content: '确定' + hint + '吗？',
    icon: createVNode(ExclamationCircleOutlined),
    maskClosable: true,
    onOk: () => {
      let body = { type: JSON.stringify(row.type), status: isOpen };
      request
        .post('/cer/updateStatus', body)
        .then((res) => {
          getlist();
          message.success(res.data.msg);
        })
        .catch((e) => {
          message.error(e.response.data.msg);
        });
    }
  });
}

function selectCer(record) {
  let url = props.tab === 1 ? '/cer/selectCer' : '/cer/selectCerV3';
  let body = { type: record.type };
  request
    .post(url, body)
    .then((res) => {
      getlist();
      message.success(res.data.msg);
    })
    .catch((e) => {
      message.error(e.response.data.msg);
    });
}

async function getlist() {
  loading.value = true;
  let url = props.tab === 1 ? '/cer/list' : '/cer/list_v3';
  const result = await request.post(url, {});
  result.data.data.forEach((element) => {
    if (element.isCurrentCer === 1) {
      rowSelection.value.selectedRowKeys = [element.cerName];
    }
  });
  data.value = result.data.data;
  loading.value = false;
}
onMounted(() => {
  getlist();
});
</script>

<style lang='less' scoped></style>
