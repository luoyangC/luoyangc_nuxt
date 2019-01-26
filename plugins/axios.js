import qs from "qs"
 
export default function ({ $axios, app }) {
  $axios.onRequest(config => {
    //获取cookie放在头部传到后端
    // config.headers.Authorization = app.$cookies.get('token')
    config.data = qs.stringify(config.data, {
      allowDots: true
    })
    return config
  })
 
  $axios.onResponse(response => {
    return Promise.resolve(response.data)
  })
 
  $axios.onError(error => {
    return Promise.reject(error)
  })
}
