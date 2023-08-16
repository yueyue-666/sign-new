
<template>
  <div>
    <a-table :columns="columns" :data-source="data" :row-selection="rowSelection" rowKey="cerName">
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'index'">
          V2证书{{ index + 1 }}
        </template>
        <template v-if="column.key === 'cerStatus'">
          <a-switch v-model:checked="record.cerStatus" checkedValue="1" unCheckedValue="0" checked-children="有效"
            un-checked-children="无效" @change="onChangeCerStatus(record)"/>
        </template>
      </template>

    </a-table>

  </div>
</template>

<script setup lang='ts'>
import { ref } from "vue";


const columns = [{
  title: '类型',
  dataIndex: 'index',
  key: 'index'
}, {
  title: '证书名称',
  dataIndex: 'cerName',
  key: 'cerName'
}, {
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

//单选事件
const rowSelection = ref({
  checkStrictly: false,
  type: 'radio',
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
  //默认选择
  selectedRowKeys:['新移动-v2']
})

function onChangeCerStatus(record){
  console.log(record);
  // 提交更新 ——》 刷新表格
}

const data = [
  {
    "type": 1,
    "isUpload": 1,
    "cerName": "苏州移动-v2",
    "cerStatus": "0",
    "isCurrentCer": 0,
    "updateTimestamp": "2023-08-14 20:43:07"
  },
  {
    "type": 2,
    "isUpload": 1,
    "cerName": "新移动-v2",
    "cerStatus": "0",
    "isCurrentCer": 0,
    "updateTimestamp": "2022-07-19 14:14:03"
  },
  {
    "type": 3,
    "isUpload": 0,
    "cerName": "北京0-v2",
    "cerStatus": "1",
    "isCurrentCer": 1,
    "updateTimestamp": "2022-07-19 14:14:08"
  },
  {
    "type": 4,
    "isUpload": 0,
    "cerName": "咪咕",
    "cerStatus": "1",
    "isCurrentCer": 0,
    "updateTimestamp": "2022-07-19 14:14:08"
  },
  {
    "type": 5,
    "isUpload": 0,
    "cerName": "北京1-v3",
    "cerStatus": "1",
    "isCurrentCer": 0,
    "updateTimestamp": "2022-11-27 16:58:58"
  },
  {
    "type": 6,
    "isUpload": 0,
    "cerName": "MIGU11",
    "cerStatus": "1",
    "isCurrentCer": 0,
    "updateTimestamp": "2023-07-22 19:42:04"
  }
]

</script>
 
<style lang='less' scoped></style>
