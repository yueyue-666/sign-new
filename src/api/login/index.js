import request from '@/utils/request';
import { setToken } from '@/utils/token-util';

/**
 * 登录
 */
// export async function login(data) {
//   data.tenantId = 2; // 租户id
//   const res = await request.post('/login', data);
//   if (res.data.code === 0) {
//     setToken(res.data.data?.access_token, data.remember);
//     return res.data.message;
//   }
//   return Promise.reject(new Error(res.data.message));
// }

export async function login(data) {
  const res = await request.post('/backstage/login', data);
  if (res.data.code === 200) {
    console.log(res);
    setToken(res.data.data?.token);

    localStorage.setItem('token', res.data.data.token);
    localStorage.setItem('refreshToken', res.data.data.refreshToken);
    localStorage.setItem('userRole', res.data.data.userRole);
    localStorage.setItem('userId', res.data.data.userId);
    localStorage.setItem('username', res.data.data.username);
    localStorage.setItem('isUseV3', res.data.data.isUseV3);
    localStorage.setItem('isUseMix', res.data.data.isUseMix);
    localStorage.setItem('flagId', res.data.data.flagId);
    localStorage.setItem('isShowSubData', res.data.data.isShowSubData);
    localStorage.setItem('isDownloadData', res.data.data.isDownloadData);
    localStorage.setItem('flagId', res.data.data.flagId);
    //打开商户后台
    // localStorage.setItem('adminrouter', JSON.stringify(true));

    return res.data.msg;
  }
  return Promise.reject(new Error(res.data.msg));
  // return Promise.reject(res);
}

/**
 * 获取验证码
 */
// export async function getCaptcha() {
//   const res = await request.get('/captcha');
//   if (res.data.code === 0 && res.data.data) {
//     return res.data.data;
//   }
//   return Promise.reject(new Error(res.data.message));
// }

export async function getCaptcha() {
  const res = await request.get('/noauth/verifyCode');
  if (res.data.code === 200 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.msg));
}
