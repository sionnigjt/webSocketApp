import axios from 'axios'

const service = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 5000,
  withCredentials: true // 跨域携带cookie
})

// 添加请求拦截器
service.interceptors.request.use(config => {
  // 添加token到请求头部
  config.headers['X-CSRF-TOKEN'] = null
  return config
}, error => {
  console.log(error)
  return Promise.reject(error)
})

// 添加响应拦截器
service.interceptors.response.use(response => {
  return response.data
}, error => {
  console.log(error)
  return Promise.reject(error)
})
export default service
