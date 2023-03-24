import { get, post, put, del } from '../axios/request.js'


export  const login=(data)=>{
	// 使用post方法提交数据
	return post('/login', data);
	
}


