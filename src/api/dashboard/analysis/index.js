import request from '@/utils/request';
import { toDateString } from 'ele-admin-pro/es';

/**
 * 获取支付笔数数据
 */
// export async function getPayNumList() {
//   const res = await request.get(
//     'https://cdn.eleadmin.com/20200610/analysis-pay-num.json'
//   );
//   if (res.data.code === 0 && res.data.data) {
//     return res.data.data;
//   }
//   return Promise.reject(new Error(res.data.message));
// }

/**
 * 获取销售量数据
 */
// export async function getSaleroomList() {
//   const res = await request.get(
//     'https://cdn.eleadmin.com/20200610/analysis-saleroom.json'
//   );
//   if (res.data.code === 0 && res.data.data) {
//     return res.data.data;
//   }
//   return Promise.reject(new Error(res.data.message));
// }

/**
 * 获取一周数据统计
 * @returns {Promise<Object>}
 */
export async function getVisitHourList() {
  var date = new Date();
  // 当前时间
  var s1 =
    date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  // 一周前的时间
  date.setTime(date.getTime() - 144 * 60 * 60 * 1000);
  var s2 =
    date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

  let body = {
    appId: '',
    endTime: s1 + ' 23:59:59',
    isCheckSub: false,
    startTime: s2 + ' 00:00:00'
  };

  const res = await request.post('/backstage/querySevenDaysDownload', body);
  if (res.data.code === 200 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.msg));
}

/**
 * 数据统计
 * @returns {Promise<Object>}
 */
export async function getSevenDaysDownload(form) {
  function getTimestamp(time) {
    return new Date(time).getTime() / 1000;
  }
  if (getTimestamp(form.endTime) - getTimestamp(form.startTime) > 1728000) {
    return Promise.reject(new Error('查询范围时间不能超过20天'));
  }
  const res = await request.post('/backstage/querySevenDaysDownload', form);
  if (res.data.code === 200 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.msg));
}

/**
 * 获取词云数据
 */
// export async function getWordCloudList() {
//   const res = await request.get(
//     'https://cdn.eleadmin.com/20200610/analysis-hot-search.json'
//   );
//   if (res.data.code === 0 && res.data.data) {
//     return res.data.data;
//   }
//   return Promise.reject(new Error(res.data.message));
// }
