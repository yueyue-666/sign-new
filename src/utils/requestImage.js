/**
 * axios 实例
 */
import axios from 'axios';
import { unref } from 'vue';
import router from '@/router';
import { message, Modal } from 'ant-design-vue/es';

import { getToken, setToken } from './token-util';
import { logout } from './page-tab-util';

const service = axios.create({
  // baseURL: API_IMAGE_URL,
  timeout: 10 * 60 * 1000
});

/**
 * 添加请求拦截器
 */
service.interceptors.request.use(
  (config) => {
    // 添加 token 到 header
    // const token = getToken();
    // if (token && config.headers) {
    //   config.headers[TOKEN_HEADER_NAME] = token;
    // }
    // return config;

    const token = localStorage.getItem('token') || '';
    // const flagId = localStorage.getItem('flagId') || '';
    const refreshToken = localStorage.getItem('refreshToken') || '';
    if (config.data) {
      console.log(config);
      config.data.append('token', token);
      // config.data.append('flagId', flagId);
    }
    if (token) {
      // 登陆后必传字段
      config.headers['token'] = token; //	token
      config.headers['refreshToken'] = refreshToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 添加响应拦截器
 */
service.interceptors.response.use(
  (res) => {
    if (res.data.status !== 200) {
      message.error(res.data.msg);
      return Promise.reject(res.data.msg);
    } else {
      return res;
    }
  },
  (error) => {
    return Promise.reject(error.message);
    // if ([403].includes(error.response.data.code)) {
    //   logout(true);
    //   setTimeout(() => {
    //     window.location.reload();
    //   }, 1500);
    //   return Promise.reject(error);
    // } else {
    //   return Promise.reject(error);
    // }

    // return Promise.reject(new Error(error.response.data.message));
    // return Promise.reject(error.response.data.message);
  }
);

export default service;
