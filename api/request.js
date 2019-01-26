import axios from 'axios'

//全局状态控制引入
// import cookie from '@/assets/js/cookie'
// const token = cookie.getCookie('token')

// http request 拦截器
// axios.interceptors.request.use(
//   config => {
//     if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
//       config.headers.Authorization = `JWT ${token}`
//     } else {
//       console.log('未登录或Token失效')
//     }
//     return config;
//   },
//   err => {
//     return Promise.reject(err);
//   });


// http response 拦截器
// axios.interceptors.response.use(
//   undefined,
//   error => {
//     let res = error.response;
//     switch (res.status) {
//       case 401:
//         console.log('未登录 或者token过期');
//       case 403:
//         console.log('您没有该操作权限');
//       case 500:
//         console.log('服务器错误');
//     }
//     return Promise.reject(error.response.data)
//   });

  export default axios