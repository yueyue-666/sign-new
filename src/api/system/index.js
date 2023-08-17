import request from '@/utils/request';

/**
 * 分页查询用户
 */
export async function pageUsers(params) {
  const res = await request.post('/backstage/getAllAppByPage', params);
  if (res.data.code === 200) {
    return { list: res.data.data.record, count: res.data.data.total };
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
    return { list: res.data.data.record, count: res.data.data.total };
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
    return { list: res.data.data.record, count: res.data.data.total };
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 分页偷包检测
 */
export async function getBadApp(params) {
  function getTimestamp(time) {
    return new Date(time).getTime() / 1000;
  }
  if (getTimestamp(params.endTime) - getTimestamp(params.startTime) > 1728000) {
    return Promise.reject(new Error('查询范围时间不能超过20天'));
  }
  const res = await request.post('/ipa/getBadApp', params);
  if (res.data.code === 200) {
    return { list: res.data.data.record, count: res.data.data.total };
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
    return { list: res.data.data.record, count: res.data.data.total };
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 分页用户管理
 */
export async function AllUserInfo(params) {
  const res = await request.post('/backstage/getAllUserInfo', params);
  if (res.data.code === 200) {
    return { list: res.data.data.record, count: res.data.data.total };
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
    return { list: res.data.data.record, count: res.data.data.total };
  }
  return Promise.reject(new Error(res.data.message));
}
