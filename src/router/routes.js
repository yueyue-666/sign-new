import { menuToRoutes, eachTreeData } from 'ele-admin-pro/es';
import { HOME_PATH, LAYOUT_PATH, REDIRECT_PATH } from '@/config/setting';
import EleLayout from '@/layout/index.vue';
import RedirectLayout from '@/components/RedirectLayout';
const modules = import.meta.glob('/src/views/**/index.vue');
const adminrouter = JSON.parse(localStorage.getItem('adminrouter'));
/**
 * 静态路由
 */
export const routes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/register',
    component: () => import('@/views/register/index.vue'),
    meta: { title: '注册账号' }
  }
  // 404
  // {
  //   path: '/:path(.*)*',
  //   component: () => import('@/views/exception/404/index.vue')
  // }
  // 404
  // {
  //   path: '/:path(.*)*',
  //   component: () => {
  //     adminrouter
  //       ? import('@/views/dashboard/workplace/index.vue')
  //       : import('@/views/home/frontpage/index.vue');
  //   }
  // }
];

/**
 * 动态路由
 * @param menus 菜单数据
 * @param homePath 主页地址
 */
export function getMenuRoutes(menus, homePath) {
  const routes = [
    // 用于刷新的路由
    {
      path: REDIRECT_PATH + '/:path(.*)',
      component: RedirectLayout,
      meta: { hideFooter: true }
    }
  ];
  // 路由铺平处理
  eachTreeData(menuToRoutes(menus, getComponent), (route) => {
    routes.push({ ...route, children: void 0 });
  });
  console.log({
    path: LAYOUT_PATH,
    component: EleLayout,
    redirect: HOME_PATH ?? homePath,
    children: routes
  });
  return {
    path: LAYOUT_PATH,
    component: EleLayout,
    redirect: HOME_PATH ?? homePath,
    children: routes
  };
}

/**
 * 解析路由组件
 * @param component 组件名称
 */
function getComponent(component) {
  if (component) {
    const module = modules[`/src/views/${component}.vue`];
    if (!module) {
      return modules[`/src/views/${component}/index.vue`];
    }
    return module;
  }
}
