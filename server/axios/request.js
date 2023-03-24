import service from './axios.js'

// get请求
export function get(url, params) {
  return service({
    url: url,
    method: 'get',
    params: params
  })
}

// post请求
export function post(url, data = {}) {
  return service({
    url: url,
    method: 'post',
    data: data
  })
}

// put请求
export function put(url, data = {}) {
  return service({
    url: url,
    method: 'put',
    data: data
  })
}

// delete请求
export function del(url) {
  return service({
    url: url,
    method: 'delete'
  })
}
