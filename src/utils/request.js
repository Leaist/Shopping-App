import axios from 'axios';
import { Notify } from 'vant';
import NProgress from 'nprogress';
import { getToken, serverUrl } from './tools';

const instance = axios.create({
  timeout: 5000, //请求超时时间
  baseURL: serverUrl, //请求基础地址
});
// 继续封装一个请求和响应拦截
// 比如说 有些服务器接口在请求之前需要添加全局统一的配置信息
// 我们需要对网络请求的异常做统一捕获

// Add a request interceptor
// 全局请求拦截，在发起请求之前触发
//  1,添加全局loading
//  2,在请求头添加token
instance.interceptors.request.use(
  function(config) {
    NProgress.start();
    // Do something before request is sent
    //在请求头中添加token
    config.headers.authorization = 'Bearer ' + getToken();
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
// 全局响应拦截，在网络请求返回之后触发，可以做错误处理
//  1,清除loading
//  2,错误异常处理
instance.interceptors.response.use(
  function(response) {
    NProgress.done();
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function(error) {
    NProgress.done();
    if (error.message && error.message.indexOf('timeout') > -1) {
      // alert("网络中断，请求重试")
      Notify({
        type: 'danger',
        message: '网络中断，请求重试 ',
      });
    }
    if (error.response && error.response.status === 401) {
      Notify({
        type: 'danger',
        message: '用户信息异常',
      });
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

/**
 * 发起get请求
 * @param {*} url
 * @param {*} parmas
 */
export const get = (url, params) => instance.get(url, { params });

// export function get(url,{parmas}){
//   return instance.get(url,{parmas})
// }

/**
 * 发起post请求
 * @param {*} url
 * @param {*} data
 */
export const post = (url, data) => instance.post(url, data);

/**
 * 发起put请求
 * @param {*} url
 * @param {*} data
 */
export const put = (url, data) => instance.put(url, data);

/**
 * delete请求
 * @param {*} url
 * @param {*} data
 */
export const del = (url) => instance.delete(url);
