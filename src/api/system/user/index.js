import request from '@/utils/request';

/**
 * 分页查询用户
 */
export async function pageUsers(params) {
  const res = await request.post('/backstage/getAllAppByPage', params);
  if (res.data.code === 200) {
    return res.data.data.record;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 分页签发记录
 */
export async function IssuingRecords(params) {
  function getTimestamp(time) {
    return new Date(time).getTime() / 1000;
  }
  if (getTimestamp(params.endTime) - getTimestamp(params.startTime) > 2678400) {
    return Promise.reject(new Error('查询范围时间不能超过31天'));
  }
  const res = await request.post('/backstage/getIssuingRecords', params);
  if (res.data.code === 200) {
    return res.data.data.record;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 分页财务信息
 */
export async function AllUserOrderByPage(params) {
  function getTimestamp(time) {
    return new Date(time).getTime() / 1000;
  }
  if (getTimestamp(params.endTime) - getTimestamp(params.startTime) > 1728000) {
    return Promise.reject(new Error('查询范围时间不能超过20天'));
  }
  const res = await request.post('/backstage/getAllUserOrderByPage', params);
  if (res.data.code === 200) {
    return res.data.data.record;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 分页用户统计
 */
export async function UserStatistics(params) {
  function getTimestamp(time) {
    return new Date(time).getTime() / 1000;
  }
  if (getTimestamp(params.endTime) - getTimestamp(params.startTime) > 1728000) {
    return Promise.reject(new Error('查询范围时间不能超过20天'));
  }
  const res = await request.post('/backstage/getUserStatistics', params);
  if (res.data.code === 200) {
    return res.data.data.record;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 分页用户管理
 */
export async function AllUserInfo(params) {
  const res = await request.post('/backstage/getAllUserInfo', params);
  if (res.data.code === 200) {
    return res.data.data.record;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 签发走势
 */
export async function trendStat(params) {
  function getTimestamp(time) {
    return new Date(time).getTime() / 1000;
  }
  if (getTimestamp(params.endTime) - getTimestamp(params.startTime) > 1728000) {
    return Promise.reject(new Error('查询范围时间不能超过20天'));
  }
  const res = await request.post('/backstage/sign_trend_stat', params);
  if (res.data.code === 200) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 分页闪退助手
 */
export async function WebClipList(params) {
  const res = await request.post('/webclip/getWebClipList', params);
  if (res.data.code === 200) {
    return res.data.data.record;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 查询用户列表
 */
export async function listUsers(params) {
  const res = await request.get('/system/user', {
    params
  });
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 根据id查询用户
 */
export async function getUser(id) {
  const res = await request.get('/system/user/' + id);
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 添加用户
 */
export async function addUser(data) {
  const res = await request.post('/system/user', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 修改用户
 */
export async function updateUser(data) {
  const res = await request.put('/system/user', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 删除用户
 */
export async function removeUser(id) {
  const res = await request.delete('/system/user/' + id);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 批量删除用户
 */
export async function removeUsers(data) {
  const res = await request.delete('/system/user/batch', {
    data
  });
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 修改用户状态
 */
export async function updateUserStatus(userId, status) {
  const res = await request.put('/system/user/status', {
    userId,
    status
  });
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 重置用户密码
 */
export async function updateUserPassword(userId, password = '123456') {
  const res = await request.put('/system/user/password', {
    userId,
    password
  });
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 导入用户
 */
export async function importUsers(file) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await request.post('/system/user/import', formData);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 检查用户是否存在
 */
export async function checkExistence(field, value, id) {
  const res = await request.get('/system/user/existence', {
    params: { field, value, id }
  });
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}
