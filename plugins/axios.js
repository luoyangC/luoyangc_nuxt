import qs from 'qs'

export default ({ app }) => {

  let axios = app.$axios

  axios.defaults.timeout = 5000
  axios.defaults.baseURL = 'http://127.0.0.1:8000/api'
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

  axios.onRequest(config => {
    let token = app.$cookies.get('token')
    if (token) config.headers.Authorization = 'JWT' + ' ' + app.$cookies.get('token')
    config.data = qs.stringify(config.data, { allowDots: true })
    return config
  })
  
  axios.onResponse(response => {
    return Promise.resolve(response)
  })
  
  axios.onError(error => {
    switch (error.response.status) {
      case 400:
        console.log('请求错误，请检查请求参数')
        break
      case 401:
        console.log('未登录或者token过期')
        break
      case 403:
        console.log('您没有该操作权限')
        break
      case 500:
        console.log('服务器错误')
        break
    }
    return Promise.reject(error.response)
  })

}
