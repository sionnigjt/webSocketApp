import {request} from './request/request.js'

export function login (data) {  //登录
	return request({
		url:'login',
		method:'post',
		data:data
	})


}
export function register (data) {  //登录
	return request({
		url:'register',
		method:'post',
		data:data
	})


}