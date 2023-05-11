import request from '@/utils/request';

/**
 * 获取当前登录的用户信息、菜单、权限、角色
 */
export async function getUserInfo() {
  // const res = await request.get('/auth/user');
  const res = {
    code: 0,
    message: '操作成功',
    data: {
      userId: 14,
      username: 'admin',
      password: '$2a$10$sWH.qQmf/dHMURzE4kN0puBOdB7VWwcDFB2NvwpMaHYz6OFZwQGBy',
      nickname: '管理员',
      avatar: 'https://cdn.eleadmin.com/20200610/avatar.jpg',
      // avatar: require('@/assets/portrait.jpeg'),
      sex: '1',
      phone: '12345678901',
      email: null,
      emailVerified: 0,
      realName: null,
      idCard: null,
      birthday: '2021-05-21',
      introduction: '遗其欲，则心静！',
      organizationId: 11,
      status: 0,
      deleted: 0,
      tenantId: 2,
      organizationName: 'XXX公司',
      sexName: '男',
      roles: [
        {
          roleId: 4,
          roleCode: 'admin',
          roleName: '管理员',
          comments: '管理员',
          deleted: 0,
          tenantId: 2,
          userId: null
        }
      ],
      authorities: [
        // {
        //   menuId: 136,
        //   parentId: 0,
        //   title: 'Dashboard',
        //   path: '/dashboard',
        //   component: null,
        //   menuType: 0,
        //   sortNumber: 0,
        //   authority: null,
        //   icon: 'home-outlined',
        //   hide: 0,
        //   meta: null,
        //   deleted: 0,
        //   tenantId: 2,
        //   children: null,
        //   checked: null
        // },
        {
          menuId: 137,
          parentId: 136,
          title: '账户首页',
          path: '/dashboard/workplace',
          component: '/dashboard/workplace',
          menuType: 0,
          sortNumber: 1,
          authority: null,
          icon: 'desktop-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 138,
          parentId: 136,
          title: '超级签名V2',
          path: '/dashboard/V2',
          component: '/dashboard/V2',
          menuType: 0,
          sortNumber: 1,
          authority: null,
          icon: 'control-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 139,
          parentId: 136,
          title: '超级签名V3',
          path: '/dashboard/V3',
          component: '/dashboard/V3',
          menuType: 0,
          sortNumber: 1,
          authority: null,
          icon: 'control-outlined',
          hide: 0,
          meta: '{"badge": "New", "badgeColor": "#faad14"}',
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 141,
          parentId: 136,
          title: '混合签名',
          path: '/dashboard/listPageAll',
          component: '/dashboard/listPageAll',
          menuType: 0,
          sortNumber: 1,
          authority: null,
          icon: 'control-outlined',
          hide: 0,
          meta: '{"badge": "New", "badgeColor": "#faad14"}',
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 142,
          parentId: 136,
          title: '签发记录',
          path: '/dashboard/listPage',
          component: '/dashboard/listPage',
          menuType: 0,
          sortNumber: 1,
          authority: null,
          icon: 'control-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 143,
          parentId: 136,
          title: '数据统计',
          path: '/dashboard/statistics',
          component: '/dashboard/statistics',
          menuType: 0,
          sortNumber: 1,
          authority: null,
          icon: 'bar-chart-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 155,
          parentId: 154,
          title: '成功页',
          path: '/result/success',
          component: '/result/success',
          menuType: 0,
          sortNumber: 1,
          authority: null,
          icon: 'check-circle-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 141,
          parentId: 140,
          title: '基础表单',
          path: '/form/basic',
          component: '/form/basic',
          menuType: 0,
          sortNumber: 1,
          authority: null,
          icon: 'file-text-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 123,
          parentId: 122,
          title: '查询字典',
          path: null,
          component: null,
          menuType: 1,
          sortNumber: 1,
          authority: 'sys:dict:list',
          icon: null,
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 162,
          parentId: 161,
          title: '我的资料',
          path: '/user/profile',
          component: '/user/profile',
          menuType: 0,
          sortNumber: 1,
          authority: null,
          icon: 'user-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 102,
          parentId: 101,
          title: '用户管理',
          path: '/system/user',
          component: '/system/user',
          menuType: 0,
          sortNumber: 1,
          authority: null,
          icon: 'team-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 165,
          parentId: 164,
          title: '标签组件',
          path: '/extension/tag',
          component: '/extension/tag',
          menuType: 0,
          sortNumber: 1,
          authority: null,
          icon: 'tag-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 113,
          parentId: 112,
          title: '查询菜单',
          path: null,
          component: null,
          menuType: 1,
          sortNumber: 1,
          authority: 'sys:menu:list',
          icon: null,
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 103,
          parentId: 102,
          title: '查询用户',
          path: null,
          component: null,
          menuType: 1,
          sortNumber: 1,
          authority: 'sys:user:list',
          icon: null,
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 145,
          parentId: 144,
          title: '基础列表',
          path: '/list/basic',
          component: '/list/basic',
          menuType: 0,
          sortNumber: 1,
          authority: null,
          icon: 'table-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 189,
          parentId: 188,
          title: '表格实例',
          path: '/example/table',
          component: '/example/table',
          menuType: 0,
          sortNumber: 1,
          authority: null,
          icon: 'table-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 148,
          parentId: 147,
          title: '项目列表',
          path: '/list/card/project',
          component: '/list/card/project',
          menuType: 0,
          sortNumber: 1,
          authority: null,
          icon: 'appstore-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 158,
          parentId: 157,
          title: '403',
          path: '/exception/403',
          component: '/exception/403',
          menuType: 0,
          sortNumber: 1,
          authority: null,
          icon: 'exclamation-circle-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 101,
          parentId: 0,
          title: '系统管理',
          path: '/system',
          component: null,
          menuType: 0,
          sortNumber: 1,
          authority: null,
          icon: 'setting-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 118,
          parentId: 117,
          title: '查询机构',
          path: null,
          component: null,
          menuType: 1,
          sortNumber: 1,
          authority: 'sys:org:list',
          icon: null,
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 108,
          parentId: 107,
          title: '查询角色',
          path: null,
          component: null,
          menuType: 1,
          sortNumber: 1,
          authority: 'sys:role:list',
          icon: null,
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 146,
          parentId: 144,
          title: '复杂列表',
          path: '/list/advanced',
          component: '/list/advanced',
          menuType: 0,
          sortNumber: 2,
          authority: null,
          icon: 'profile-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 149,
          parentId: 147,
          title: '应用列表',
          path: '/list/card/application',
          component: '/list/card/application',
          menuType: 0,
          sortNumber: 2,
          authority: null,
          icon: 'appstore-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 107,
          parentId: 101,
          title: '角色管理',
          path: '/system/role',
          component: '/system/role',
          menuType: 0,
          sortNumber: 2,
          authority: null,
          icon: 'idcard-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 156,
          parentId: 154,
          title: '失败页',
          path: '/result/fail',
          component: '/result/fail',
          menuType: 0,
          sortNumber: 2,
          authority: null,
          icon: 'close-circle-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 159,
          parentId: 157,
          title: '404',
          path: '/exception/404',
          component: '/exception/404',
          menuType: 0,
          sortNumber: 2,
          authority: null,
          icon: 'question-circle-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 142,
          parentId: 140,
          title: '复杂表单',
          path: '/form/advanced',
          component: '/form/advanced',
          menuType: 0,
          sortNumber: 2,
          authority: null,
          icon: 'audit-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 163,
          parentId: 161,
          title: '我的消息',
          path: '/user/message',
          component: '/user/message',
          menuType: 0,
          sortNumber: 2,
          authority: null,
          icon: 'sound-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 166,
          parentId: 164,
          title: '弹窗扩展',
          path: '/extension/dialog',
          component: '/extension/dialog',
          menuType: 0,
          sortNumber: 2,
          authority: null,
          icon: 'block-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 140,
          parentId: 0,
          title: '表单页面',
          path: '/form',
          component: null,
          menuType: 0,
          sortNumber: 2,
          authority: null,
          icon: 'file-text-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 141,
          parentId: 136,
          title: '分析页',
          path: '/dashboard/analysis',
          component: '/dashboard/analysis',
          menuType: 0,
          sortNumber: 2,
          authority: null,
          icon: 'bar-chart-outlined',
          hide: 0,
          // meta: '{"badge": 1}',
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 191,
          parentId: 188,
          title: '内嵌页面',
          path: '/example/eleadmin',
          component: 'https://www.eleadmin.com',
          menuType: 0,
          sortNumber: 2,
          authority: null,
          icon: 'link-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 167,
          parentId: 164,
          title: '文件列表',
          path: '/extension/file',
          component: '/extension/file',
          menuType: 0,
          sortNumber: 3,
          authority: null,
          icon: 'folder-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 150,
          parentId: 136,
          title: '监控页',
          path: '/dashboard/monitor',
          component: '/dashboard/monitor',
          menuType: 0,
          sortNumber: 3,
          authority: null,
          icon: 'dashboard-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 144,
          parentId: 0,
          title: '列表页面',
          path: '/list',
          component: null,
          menuType: 0,
          sortNumber: 3,
          authority: null,
          icon: 'table-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 192,
          parentId: 188,
          title: '内嵌文档',
          path: '/example/eleadmin-doc',
          component: 'https://www.eleadmin.com/doc/eleadminpro/',
          menuType: 0,
          sortNumber: 3,
          authority: null,
          icon: 'link-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 147,
          parentId: 144,
          title: '卡片列表',
          path: '/list/card',
          component: '/list/card',
          menuType: 0,
          sortNumber: 3,
          authority: null,
          icon: 'appstore-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 150,
          parentId: 147,
          title: '文章列表',
          path: '/list/card/article',
          component: '/list/card/article',
          menuType: 0,
          sortNumber: 3,
          authority: null,
          icon: 'appstore-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 160,
          parentId: 157,
          title: '500',
          path: '/exception/500',
          component: '/exception/500',
          menuType: 0,
          sortNumber: 3,
          authority: null,
          icon: 'close-circle-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 112,
          parentId: 101,
          title: '菜单管理',
          path: '/system/menu',
          component: '/system/menu',
          menuType: 0,
          sortNumber: 3,
          authority: null,
          icon: 'appstore-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 143,
          parentId: 140,
          title: '分步表单',
          path: '/form/step',
          component: '/form/step',
          menuType: 0,
          sortNumber: 3,
          authority: null,
          icon: 'one-to-one-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 132,
          parentId: 129,
          title: '查看记录',
          path: null,
          component: null,
          menuType: 1,
          sortNumber: 3,
          authority: 'sys:file:list',
          icon: null,
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 152,
          parentId: 145,
          title: '修改用户',
          path: '/list/basic/edit',
          component: '/list/basic/edit',
          menuType: 0,
          sortNumber: 4,
          authority: null,
          icon: 'team-outlined',
          hide: 1,
          meta: '{"active": "/list/basic"}',
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 168,
          parentId: 164,
          title: '图片上传',
          path: '/extension/upload',
          component: '/extension/upload',
          menuType: 0,
          sortNumber: 4,
          authority: null,
          icon: 'picture-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 122,
          parentId: 101,
          title: '字典管理',
          path: '/system/dictionary',
          component: '/system/dictionary',
          menuType: 0,
          sortNumber: 4,
          authority: null,
          icon: 'profile-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 193,
          parentId: 188,
          title: '批量选择',
          path: '/example/choose',
          component: '/example/choose',
          menuType: 0,
          sortNumber: 4,
          authority: null,
          icon: 'check-square-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 153,
          parentId: 145,
          title: '用户详情',
          path: '/list/basic/details/:id',
          component: '/list/basic/details',
          menuType: 0,
          sortNumber: 4,
          authority: null,
          icon: 'team-outlined',
          hide: 1,
          meta: '{"active": "/list/basic"}',
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 154,
          parentId: 0,
          title: '结果页面',
          path: '/result',
          component: null,
          menuType: 0,
          sortNumber: 4,
          authority: null,
          icon: 'check-circle-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 151,
          parentId: 145,
          title: '添加用户',
          path: '/list/basic/add',
          component: '/list/basic/add',
          menuType: 0,
          sortNumber: 4,
          authority: null,
          icon: 'team-outlined',
          hide: 1,
          meta: '{"active": "/list/basic"}',
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 190,
          parentId: 188,
          title: '菜单徽章',
          path: '/example/menu-badge',
          component: '/example/menu-badge',
          menuType: 0,
          sortNumber: 5,
          authority: null,
          icon: 'appstore-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 117,
          parentId: 101,
          title: '机构管理',
          path: '/system/organization',
          component: '/system/organization',
          menuType: 0,
          sortNumber: 5,
          authority: null,
          icon: 'bank-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 157,
          parentId: 0,
          title: '异常页面',
          path: '/exception',
          component: null,
          menuType: 0,
          sortNumber: 5,
          authority: null,
          icon: 'warning-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 133,
          parentId: 102,
          title: '用户详情',
          path: '/system/user/details',
          component: '/system/user/details',
          menuType: 0,
          sortNumber: 5,
          authority: null,
          icon: 'team-outlined',
          hide: 1,
          meta: '{"active": "/system/user"}',
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 169,
          parentId: 164,
          title: '拖拽排序',
          path: '/extension/dragsort',
          component: '/extension/dragsort',
          menuType: 0,
          sortNumber: 5,
          authority: null,
          icon: 'drag-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 170,
          parentId: 164,
          title: '颜色选择',
          path: '/extension/color-picker',
          component: '/extension/color-picker',
          menuType: 0,
          sortNumber: 6,
          authority: null,
          icon: 'bg-colors-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 194,
          parentId: 188,
          title: '案卷调整',
          path: '/example/document',
          component: '/example/document',
          menuType: 0,
          sortNumber: 6,
          authority: null,
          icon: 'interaction-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 129,
          parentId: 101,
          title: '文件管理',
          path: '/system/file',
          component: '/system/file',
          menuType: 0,
          sortNumber: 6,
          authority: null,
          icon: 'folder-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 161,
          parentId: 0,
          title: '个人中心',
          path: '/user',
          component: null,
          menuType: 0,
          sortNumber: 6,
          authority: null,
          icon: 'control-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 127,
          parentId: 101,
          title: '登录日志',
          path: '/system/login-record',
          component: '/system/login-record',
          menuType: 0,
          sortNumber: 7,
          authority: 'sys:login-record:list',
          icon: 'calendar-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 171,
          parentId: 164,
          title: '城市选择',
          path: '/extension/regions',
          component: '/extension/regions',
          menuType: 0,
          sortNumber: 7,
          authority: null,
          icon: 'apartment-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 164,
          parentId: 0,
          title: '扩展组件',
          path: '/extension',
          component: null,
          menuType: 0,
          sortNumber: 7,
          authority: null,
          icon: 'appstore-add-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 188,
          parentId: 0,
          title: '常用实例',
          path: '/example',
          component: null,
          menuType: 0,
          sortNumber: 8,
          authority: null,
          icon: 'compass-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 128,
          parentId: 101,
          title: '操作日志',
          path: '/system/operation-record',
          component: '/system/operation-record',
          menuType: 0,
          sortNumber: 8,
          authority: 'sys:operation-record:list',
          icon: 'file-search-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 172,
          parentId: 164,
          title: '打印插件',
          path: '/extension/printer',
          component: '/extension/printer',
          menuType: 0,
          sortNumber: 8,
          authority: null,
          icon: 'printer-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 173,
          parentId: 164,
          title: 'excel插件',
          path: '/extension/excel',
          component: '/extension/excel',
          menuType: 0,
          sortNumber: 9,
          authority: null,
          icon: 'table-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        // {
        //   menuId: 199,
        //   parentId: 0,
        //   title: '获取授权',
        //   path: 'https://eleadmin.com/goods/9',
        //   component: null,
        //   menuType: 0,
        //   sortNumber: 9,
        //   authority: null,
        //   icon: 'sketch-outlined',
        //   hide: 0,
        //   meta: null,
        //   deleted: 0,
        //   tenantId: 2,
        //   children: null,
        //   checked: null
        // },
        {
          menuId: 174,
          parentId: 164,
          title: '滚动数字',
          path: '/extension/count-up',
          component: '/extension/count-up',
          menuType: 0,
          sortNumber: 10,
          authority: null,
          icon: 'ellipsis-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 176,
          parentId: 164,
          title: '表格下拉',
          path: '/extension/table-select',
          component: '/extension/table-select',
          menuType: 0,
          sortNumber: 12,
          authority: null,
          icon: 'table-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 178,
          parentId: 164,
          title: '视频播放',
          path: '/extension/player',
          component: '/extension/player',
          menuType: 0,
          sortNumber: 14,
          authority: null,
          icon: 'youtube-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 179,
          parentId: 164,
          title: '地图组件',
          path: '/extension/map',
          component: '/extension/map',
          menuType: 0,
          sortNumber: 15,
          authority: null,
          icon: 'environment-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 180,
          parentId: 164,
          title: '二维码',
          path: '/extension/qr-code',
          component: '/extension/qr-code',
          menuType: 0,
          sortNumber: 16,
          authority: null,
          icon: 'qrcode-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 181,
          parentId: 164,
          title: '条形码',
          path: '/extension/bar-code',
          component: '/extension/bar-code',
          menuType: 0,
          sortNumber: 17,
          authority: null,
          icon: 'barcode-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 182,
          parentId: 164,
          title: '富文本框',
          path: '/extension/editor',
          component: '/extension/editor',
          menuType: 0,
          sortNumber: 18,
          authority: null,
          icon: 'font-size-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 183,
          parentId: 164,
          title: 'markdown',
          path: '/extension/markdown',
          component: '/extension/markdown',
          menuType: 0,
          sortNumber: 19,
          authority: null,
          icon: 'picLeft-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 184,
          parentId: 164,
          title: '仪表盘',
          path: '/extension/dashboard',
          component: '/extension/dashboard',
          menuType: 0,
          sortNumber: 20,
          authority: null,
          icon: 'appstore-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 185,
          parentId: 164,
          title: '引导组件',
          path: '/extension/tour',
          component: '/extension/tour',
          menuType: 0,
          sortNumber: 21,
          authority: null,
          icon: 'appstore-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 186,
          parentId: 164,
          title: '水印组件',
          path: '/extension/watermark',
          component: '/extension/watermark',
          menuType: 0,
          sortNumber: 22,
          authority: null,
          icon: 'appstore-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        },
        {
          menuId: 187,
          parentId: 164,
          title: '分割面板',
          path: '/extension/split',
          component: '/extension/split',
          menuType: 0,
          sortNumber: 23,
          authority: null,
          icon: 'appstore-outlined',
          hide: 0,
          meta: null,
          deleted: 0,
          tenantId: 2,
          children: null,
          checked: null
        }
      ],
      enabled: true,
      credentialsNonExpired: true,
      accountNonLocked: true,
      accountNonExpired: true
    }
  };
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 修改当前登录的用户密码
 */
export async function updatePassword(data) {
  const res = await request.put('/backstage/modifyPassword', data);
  if (res.data.code === 200) {
    return res.data.msg ?? '修改成功';
  }
  return Promise.reject(new Error(res.data.msg));
}

/**
 * 查询未读通知
 */
export async function getUnreadNotice() {
  return {
    notice: [
      {
        color: '#60B2FC',
        icon: 'NotificationFilled',
        title:
          '后台会不定期更换app下载域名，请使用当前最新域名进行下载！！！【平台不接受金融类、网赚、刷单、区块链、配资、股票、海淘，优惠、公益、获取通讯录等类的应用上传，如果涉及以上类型，请自行下架并删除应用！否则平台直接删除并封停账号！】',
        time: '2023-05-1 18:30:18'
      }
      // {
      //   color: '#F5686F',
      //   icon: 'PushpinFilled',
      //   title: '许经理同意了你的请假申请',
      //   time: '2020-07-27 09:08:36'
      // },
    ],
    letter: [
      // {
      //   avatar:
      //     'https://cdn.eleadmin.com/20200609/f6bc05af944a4f738b54128717952107.jpg',
      //   title: 'Jasmine 点赞了你的周报',
      //   content: '写的不错, 以后多多向你学习~',
      //   time: '2020-07-25 11:03:31'
      // }
    ],
    todo: [
      // {
      //   status: 2,
      //   title: 'EleAdmin发布新版本',
      //   description: '需要在 2020-07-25 11:03 前完成'
      // }
    ]
  };
}
