// 引入
import axios from 'axios'

var myaxios = {}
myaxios.install = function (Vue) {
  // 给axios加一个基地址，就是每次发送请求的时候url前面加这一段地址
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';

  // 每次发送axios请求的时候就会传一个请求头
  axios.defaults.headers.common['Authorization'] = window.localStorage.getItem('token')

  // 这个拦截器就是
  axios.interceptors.request.use(function (config) {
    //   // Do something before request is sent
    // console.log(config.url);
    if (!config.url.includes("login")) {
      config.headers.common['Authorization'] = window.localStorage.getItem('token')

    }


    return config;
  });

  // 1. 添加全局方法或属性
  Vue.prototype.$http = axios

}

// 暴露
export default myaxios
