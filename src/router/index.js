import Vue from 'vue'
import Router from 'vue-router'

//测试
import test from '@/components/test'

import home from '@/components/home'
//社区模块
import com_main from '@/components/community/main'
//登录注册
import login from '@/components/login/login'
import regist from '@/components/login/regist'
//我的模块
import me_main from '@/components/me/main'
import person from '@/components/me/person'
//视频模块
import video_main from '@/components/video/main'
//资讯模块
import news_main from '@/components/news/main'
import news_details from '@/components/news/newsDetails'

const VIP = {template:''}

Vue.use(Router)

export default new Router({
	routes: [{
		path: '/',
		name:"home",
		component: home,
		redirect: "/news",
		 meta: {
            keepAlive: true, //此组件需要被缓存
             isBack:false, //用于判断上一个页面是哪个
       },
		children: [{
				path: "news",
				component: news_main,
				meta: {
		            keepAlive: true,
		            isBack:false, //用于判断上一个页面是哪个
		      },
			}, {
				path: "video",
				component: video_main,
			},
			{
				path: "community",
				component: com_main,
			},
			{
				path: "me",
				component: me_main,
			},
		]
	},
	{
		path: '/news_details',
		name: "news_details",
		component: news_details,
		 meta: {
            keepAlive: false, //此组件需要被缓存

       },
	},
	{
		path: '/login',
		name: "login",
		component: login,
	},
	{
		path: '/regist',
		name: "regist",
		component: regist,
	},
	{
		path: '/test/:id',
		name: "test",
		component: test,
    children: [
      {
        path:'vip',
        component:VIP,
      },
    ]
	},
	{
		path: '/person',
		name: "person",
		component: person,
	},
	]
})
