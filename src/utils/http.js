import axios from 'axios';

import qs from "qs";

let _service = axios.create({
  // 已经是一个promise 了
  //baseURL: 'http://testsmpwxsys.wangytech.com',
  //nodejs
  baseURL:'http://127.0.0.1:8360/',
  //java
  //baseURL:'http://192.168.1.194:8080/',
  timeout: 30000,
  responseType: "json",
});
// (添加请求拦截器)
_service.interceptors.request.use(
  config => {
    // 在发送请求之前做某件事
   /* if (config.method === 'get') {
      // 序列化,对象转json字符串
      config.data = JSON.stringify(config.data);
    }*/
    if(config.method === 'get'||'post'){
      //序列化，将请求对象参数转化为url的格式，比如{name:"陈辉龙",age:21}转化为：&name=陈辉龙&age=21
      config.data = qs.stringify(config.data)
    }
    return config;
  },
  error => {
    return Promise.reject(error.data.error.message);
  }
);

_service.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  return Promise.reject(error);
});

export function fetch(url,params={}){
	return new Promise((resolve,reject)=>{
		_service.get(url,{
			params:params
		})
		.then(response=>{
			resolve(response);
		})
		.catch(err=>{
			reject(err);
		})
	})
}

export function post(url,data={}){
	return new Promise((resolve,reject)=>{
		_service.post(url,data)
		.then(response=>{
			resolve(response);
		},
		err=>{
			reject(err);
		})
	})
}
