<template>
  <div class="ele-body ele-body-card">
    <profile-card />
    <statistics-card />
    <a-row :gutter="16" ref="wrapRef">
      <a-col v-for="(item, index) in data" :key="item.name" :lg="item.lg" :md="item.md" :sm="item.sm" :xs="item.xs">
        <component :is="item.name" :title="item.title" @remove="onRemove(index)" @edit="onEdit(index)" />
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import SortableJs from 'sortablejs';
import { message } from 'ant-design-vue/es';
import ProfileCard from './components/profile-card.vue';

import StatisticsCard from './components/statistics-card.vue';

const CACHE_KEY = 'workplace-layout';

// 默认布局
const DEFAULT = [
  // {
  //   name: 'activities-card',
  //   title: '最新动态',
  //   lg: 8,
  //   md: 24,
  //   sm: 24,
  //   xs: 24
  // },
  // {
  //   name: 'task-card',
  //   title: '我的任务',
  //   lg: 8,
  //   md: 24,
  //   sm: 24,
  //   xs: 24
  // },
  // {
  //   name: 'goal-card',
  //   title: '本月目标',
  //   lg: 8,
  //   md: 24,
  //   sm: 24,
  //   xs: 24
  // },
  {
    name: 'project-card',
    title: '常用应用',
    lg: 24,
    md: 24,
    sm: 24,
    xs: 24
  }
  // {
  //   name: 'user-list',
  //   title: '小组成员',
  //   lg: 8,
  //   md: 24,
  //   sm: 24,
  //   xs: 24
  // }
];

// 获取缓存的顺序
const cache = (() => {
  const str = localStorage.getItem(CACHE_KEY);
  try {
    return str ? JSON.parse(str) : null;
  } catch (e) {
    return null;
  }
})();

const data = ref([...(cache ?? DEFAULT)]);

const visible = ref(false);

const linkCardRef = ref(null);

const wrapRef = ref(null);

let sortableIns = null;

// 未添加的数据
const notAddedData = computed(() => {
  return DEFAULT.filter((d) => !data.value.some((t) => t.name === d.name));
});

/* 添加 */
const add = () => {
  visible.value = true;
};

/* 重置布局 */
const reset = () => {
  data.value = [...DEFAULT];
  cacheData();
  linkCardRef.value?.reset();
  message.success('已重置');
};

/* 缓存布局 */
const cacheData = () => {
  localStorage.setItem(CACHE_KEY, JSON.stringify(data.value));
};

/* 删除视图 */
const onRemove = (index) => {
  data.value = data.value.filter((_d, i) => i !== index);
  cacheData();
};

/* 编辑视图 */
const onEdit = (index) => {
  console.log('index:', index);
  message.info('点击了编辑');
};

/* 添加视图 */
const addView = (item) => {
  data.value.push(item);
  cacheData();
  message.success('已添加');
};

onMounted(() => {
  const isTouchDevice = 'ontouchstart' in document.documentElement;
  if (isTouchDevice) {
    return;
  }
  sortableIns = new SortableJs(wrapRef.value?.$el, {
    handle: '.ant-card-head',
    animation: 300,
    onUpdate: ({ oldIndex, newIndex }) => {
      if (typeof oldIndex === 'number' && typeof newIndex === 'number') {
        const temp = [...data.value];
        temp.splice(newIndex, 0, temp.splice(oldIndex, 1)[0]);
        data.value = temp;
        cacheData();
      }
    },
    setData: () => {}
  });
});

onBeforeUnmount(() => {
  if (sortableIns) {
    sortableIns.destroy();
  }
});
</script>

<script>
import ActivitiesCard from './components/activities-card.vue';
import TaskCard from './components/task-card.vue';
import GoalCard from './components/goal-card.vue';
import ProjectCard from './components/project-card.vue';
import UserList from './components/user-list.vue';

export default {
  name: 'workplace',
  components: {
    ActivitiesCard,
    TaskCard,
    GoalCard,
    ProjectCard,
    UserList
  }
};
</script>

<style lang="less" scoped>
.ele-body :deep(.ant-card-head) {
  cursor: move;
  position: relative;
}

.ele-body :deep(.ant-row > .ant-col.sortable-chosen > .ant-card) {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
}

.workplace-bottom-btn {
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s;
}

.workplace-bottom-btn:hover {
  background: hsla(0, 0%, 60%, 0.05);
}

/* 添加弹窗 */
.workplace-card-item {
  margin-bottom: 15px;
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  transition: box-shadow 0.2s, background-color 0.2s;
}

.workplace-card-item:hover {
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
  background: hsla(0, 0%, 60%, 0.05);
}

.workplace-card-item .workplace-card-header {
  border-bottom-width: 1px;
  border-bottom-style: solid;
  padding: 8px;
}

.workplace-card-body {
  font-size: 26px;
  padding: 24px 10px;
  text-align: center;
}
</style>
