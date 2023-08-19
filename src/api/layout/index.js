import request from '@/utils/request';

/**
 * 获取当前登录的用户信息、菜单、权限、角色
 */
export async function getUserInfo() {
  // const res = await request.get('/auth/user');
  const userRole = localStorage.getItem('userRole');
  const isUseV3 = localStorage.getItem('isUseV3');
  const isUseMix = localStorage.getItem('isUseMix');
  const adminrouter = JSON.parse(localStorage.getItem('adminrouter'));
  let res = {};
  if (adminrouter) {
    res = {
      code: 0,
      message: '操作成功',
      data: {
        // userId: 14,
        // username: 'admin',
        // password: '$2a$10$sWH.qQmf/dHMURzE4kN0puBOdB7VWwcDFB2NvwpMaHYz6OFZwQGBy',
        // nickname: '管理员',
        // avatar: 'https://cdn.eleadmin.com/20200610/avatar.jpg',
        // sex: '1',
        // phone: '12345678901',
        // email: null,
        // emailVerified: 0,
        // realName: null,
        // idCard: null,
        // birthday: '2021-05-21',
        // introduction: '遗其欲，则心静！',
        // organizationId: 11,
        // status: 0,
        // deleted: 0,
        // tenantId: 2,
        // organizationName: 'XXX公司',
        // sexName: '男',
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
          {
            menuId: 1,
            parentId: 0,
            title: '仪表盘',
            path: '/home/frontpage',
            component: '/home/frontpage',
            menuType: 0,
            sortNumber: 1,
            authority: null,
            icon: 'home-outlined',
            hide: 0,
            meta: null,
            deleted: 0,
            tenantId: 2,
            children: null,
            checked: null
          },
          {
            menuId: 2,
            parentId: 0,
            title: '用户管理',
            path: '/home/UserManagemen',
            component: '/home/UserManagemen',
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
            menuId: 3,
            parentId: 0,
            title: '应用管理',
            path: '/home2',
            component: '/home2',
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
            menuId: 4,
            parentId: 3,
            title: '应用管理',
            path: '/home/applicationmanagement',
            component: '/home/applicationmanagement',
            menuType: 0,
            sortNumber: 2,
            authority: null,
            icon: null,
            hide: 0,
            meta: null,
            deleted: 0,
            tenantId: 2,
            children: null,
            checked: null
          },
          {
            menuId: 13,
            parentId: 4,
            title: '应用详情',
            path: '/dashboard/workplace/applicationmanagement-edit',
            component: '/dashboard/workplace/edit',
            menuType: 0,
            sortNumber: 4,
            authority: null,
            icon: 'team-outlined',
            hide: 1,
            meta: '{"active": "/home/applicationmanagement"}',
            deleted: 0,
            tenantId: 2,
            children: null,
            checked: null
          },

          {
            menuId: 5,
            parentId: 0,
            title: '交易管理',
            path: '/home/transactionmanagement',
            component: '/home/transactionmanagement',
            menuType: 0,
            sortNumber: 2,
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
            menuId: 6,
            parentId: 5,
            title: '下级充值记录',
            path: '/home/transactionmanagement/Subordinaterecharge',
            component: '/home/transactionmanagement/Subordinaterecharge',
            menuType: 0,
            sortNumber: 2,
            authority: null,
            icon: null,
            hide: 0,
            meta: null,
            deleted: 0,
            tenantId: 2,
            children: null,
            checked: null
          },
          {
            menuId: 7,
            parentId: 5,
            title: '我的交易记录',
            path: '/home/transactionmanagement/mydeal',
            component: '/home/transactionmanagement/mydeal',
            menuType: 0,
            sortNumber: 2,
            authority: null,
            icon: null,
            hide: 0,
            meta: null,
            deleted: 0,
            tenantId: 2,
            children: null,
            checked: null
          },
          {
            menuId: 8,
            parentId: 0,
            title: '数据统计',
            path: '/home/Statistics',
            component: '/home/Statistics',
            menuType: 0,
            sortNumber: 2,
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
            menuId: 9,
            parentId: 8,
            title: '超级签名V2',
            path: '/home/Statistics/V2',
            component: '/home/Statistics/V2',
            menuType: 0,
            sortNumber: 2,
            authority: null,
            icon: null,
            hide: 0,
            meta: null,
            deleted: 0,
            tenantId: 2,
            children: null,
            checked: null
          },
          {
            menuId: 10,
            parentId: 9,
            title: '签发走势',
            path: '/home/Statistics/V2/trend',
            component: '/home/Statistics/V2/trend',
            menuType: 0,
            sortNumber: 2,
            authority: null,
            icon: null,
            hide: 0,
            meta: null,
            deleted: 0,
            tenantId: 2,
            children: null,
            checked: null
          },
          {
            menuId: 11,
            parentId: 9,
            title: '用户统计',
            path: '/home/Statistics/V2/Userstatistics',
            component: '/home/Statistics/V2/Userstatistics',
            menuType: 0,
            sortNumber: 2,
            authority: null,
            icon: null,
            hide: 0,
            meta: null,
            deleted: 0,
            tenantId: 2,
            children: null,
            checked: null
          },
          {
            menuId: 12,
            parentId: 0,
            title: '系统设置',
            path: '/home/systemsettings',
            component: '/home/systemsettings',
            menuType: 0,
            sortNumber: 2,
            authority: null,
            icon: 'setting-outlined',
            hide: userRole === '3' ? 0 : 1,
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
  } else {
    res = {
      code: 0,
      message: '操作成功',
      data: {
        // userId: 14,
        // username: 'admin',
        // password: '$2a$10$sWH.qQmf/dHMURzE4kN0puBOdB7VWwcDFB2NvwpMaHYz6OFZwQGBy',
        // nickname: '管理员',
        // avatar: 'https://cdn.eleadmin.com/20200610/avatar.jpg',
        // sex: '1',
        // phone: '12345678901',
        // email: null,
        // emailVerified: 0,
        // realName: null,
        // idCard: null,
        // birthday: '2021-05-21',
        // introduction: '遗其欲，则心静！',
        // organizationId: 11,
        // status: 0,
        // deleted: 0,
        // tenantId: 2,
        // organizationName: 'XXX公司',
        // sexName: '男',
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
            menuId: 1,
            parentId: 0,
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
            menuId: 14,
            parentId: 1,
            title: '应用详情',
            path: '/dashboard/workplace/edit',
            component: '/dashboard/workplace/edit',
            menuType: 0,
            sortNumber: 4,
            authority: null,
            icon: 'team-outlined',
            hide: 1,
            meta: '{"active": "/dashboard/workplace"}',
            deleted: 0,
            tenantId: 2,
            children: null,
            checked: null
          },

          {
            menuId: 3,
            parentId: 1,
            title: '应用详情',
            path: '/dashboard/workplace/v2-edit',
            component: '/dashboard/workplace/edit',
            menuType: 0,
            sortNumber: 4,
            authority: null,
            icon: 'team-outlined',
            hide: 1,
            meta: '{"active": "/dashboard/V2"}',
            deleted: 0,
            tenantId: 2,
            children: null,
            checked: null
          },
          {
            menuId: 3,
            parentId: 0,
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
            menuId: 12,
            parentId: 4,
            title: '应用详情',
            path: '/dashboard/workplace/v3-edit',
            component: '/dashboard/workplace/edit',
            menuType: 0,
            sortNumber: 4,
            authority: null,
            icon: 'team-outlined',
            hide: 1,
            meta: '{"active": "/dashboard/V3"}',
            deleted: 0,
            tenantId: 2,
            children: null,
            checked: null
          },
          {
            menuId: 4,
            parentId: 0,
            title: '超级签名V3',
            path: '/dashboard/V3',
            component: '/dashboard/V3',
            menuType: 0,
            sortNumber: 1,
            authority: null,
            icon: 'control-outlined',
            hide: isUseV3 === '1' ? 0 : 1,
            meta: '{"badge": "New", "badgeColor": "#faad14"}',
            deleted: 0,
            tenantId: 2,
            children: null,
            checked: null
          },
          {
            menuId: 13,
            parentId: 5,
            title: '应用详情',
            path: '/dashboard/workplace/listPageAll-edit',
            component: '/dashboard/workplace/edit',
            menuType: 0,
            sortNumber: 4,
            authority: null,
            icon: 'team-outlined',
            hide: 1,
            meta: '{"active": "/dashboard/listPageAll"}',
            deleted: 0,
            tenantId: 2,
            children: null,
            checked: null
          },
          {
            menuId: 5,
            parentId: 0,
            title: '混合签名',
            path: '/dashboard/listPageAll',
            component: '/dashboard/listPageAll',
            menuType: 0,
            sortNumber: 1,
            authority: null,
            icon: 'control-outlined',
            hide: isUseMix === '1' ? 0 : 1,
            meta: '{"badge": "New", "badgeColor": "#faad14"}',
            deleted: 0,
            tenantId: 2,
            children: null,
            checked: null
          },
          {
            menuId: 7,
            parentId: 0,
            title: '签发记录',
            path: '/dashboard/listPage',
            component: '/dashboard/listPage',
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
            menuId: 8,
            parentId: 0,
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
            menuId: 9,
            parentId: 0,
            title: '财务信息',
            path: '/dashboard/finance',
            component: '/dashboard/finance',
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
            menuId: 11,
            parentId: 0,
            title: '闪退助手',
            path: '/dashboard/crash',
            component: '/dashboard/crash',
            menuType: 0,
            sortNumber: 1,
            authority: null,
            icon: 'compass-outlined',
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
  }
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
