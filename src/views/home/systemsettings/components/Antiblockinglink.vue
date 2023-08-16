<template>
  <div class="antiblockinglink-class">
    <a-spin :spinning="loading">
      <div class="list-class" v-for="(item, index) in list" :key="index">
        <a-input v-model:value="item.url" placeholder="如oss.text.com">
          <template #addonBefore>
            <template v-if="sum(citys,item.name)">{{ getLabel(index, item.name) }}</template>
            <template v-else>
              <a-select v-model:value="item.name" style="width: 100px" :options="citys" :fieldNames="{ label: 'name', value: 'name' }"></a-select>
            </template>
          </template>
          <template #addonAfter>
            <div class="sub-row-class" @click="addCity(index, item.url, item.name)">提交</div>
          </template>
        </a-input>
      </div>
      <div class="sub-class">
        <a-button type="primary" @click="addRowCity()">添加更多域名</a-button>
      </div>
    </a-spin>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { citys } from '@/utils/citys';
import request from '@/utils/request';
const url = ref('');
const cityCode = ref('河北');
const list = ref([]);
// 请求状态
const loading = ref(true);

async function getDataList() {
  loading.value = true;
  const params = {
    flagId: localStorage.getItem('flagId')
  };
  const res = await request.post('/backstage/getCityList', params);
  list.value = res;
  loading.value = false;
}
//添加更多域名
function addRowCity() {
  const params = {
    name: '河北',
    url: ''
  };
  list.value.push(params);
}
//提交
async function addCity(index, url, name) {
  const params = {
    flagId: localStorage.getItem('flagId'),
    name: getLabel(index, name),
    url: url
  };
  const res = await request.post('/backstage/addCity', params);
  if (res) {
    getDataList();
  }
}
const getLabel = (index, name) => {
  console.log(index, name);
  var city = '';
  if (name === '是否泛解析') {
    city = '江苏中间域名';
  } else {
    city = name;
  }
  return city;
};

let sum = computed(() => (num1, num2) => {
  return num1.findIndex((element) => element.name === num2) === -1
    ? true
    : false;
});

onMounted(() => {
  getDataList();
});
</script>

<style lang="less" scoped>
.antiblockinglink-class {
  .list-class {
    max-width: 600px;
    margin-bottom: 20px;

    .sub-row-class {
      cursor: pointer;
      width: 90px;
    }
  }

  .sub-class {
    max-width: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
  }
}
</style>
