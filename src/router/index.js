import Vue from 'vue'
import Router from 'vue-router'

//测试
import test from '@/components/test'

const VIP = {template: ''}

Vue.use(Router)
/*

export default new Router({
  routes: [{
    path: '/',
    name: "home",
    component: resolve => {
      require(["@/components/home"], resolve);
    },
    redirect: "/news",
    meta: {
      keepAlive: true, //此组件需要被缓存
      isBack: false, //用于判断上一个页面是哪个
    },
    children: [{
      path: "news",
      name: "news",
      component: resolve => {
        require(['@/components/news/main'], resolve);
      },
      meta: {
        keepAlive: true,
        isBack: false, //用于判断上一个页面是哪个
      },
    }, {
      path: "video",
      name:"video",
      component: resolve => {
        require(['@/components/video/main'], resolve);
      },
    },
      {
        path: "community",
        name:"community",
        component: resolve => {
          require(['@/components/community/main'], resolve);
        },
      },
      {
        path: "me",
        name:'me',
        component: resolve => {
          require(['@/components/me/main'], resolve);
        },
      },
    ]
  },
    {
      path: '/news_details',
      name: "news_details",
      component: resolve => {
        require(['@/components/news/newsDetails'], resolve);
      },
      meta: {
        keepAlive: false, //此组件需要被缓存

      },
    },
    {
      path: '/login',
      name: "login",
      component: resolve => {
        require(['@/components/login/login'], resolve);
      },
    },
    {
      path: '/regist',
      name: "regist",
      component: resolve => {
        require(['@/components/login/regist'], resolve);
      },
    },
    {
      path: '/test',
      name: "test",
      component: resolve => {
        require(['@/components/test'], resolve);
      },
      children: [
        {
          path: 'vip',
          component: VIP,
        },
      ]
    },
    {
      path: '/person',
      name: "person",
      component: resolve => {
        require(['@/components/me/person'], resolve);
      },
    },
    {
      path: '/publish',
      name: "publish",
      component: resolve => {
        require(['@/components/community/publish'], resolve);
      },
    },
  ]
})
*/



import news from '@/components/news/main';
import home from '@/components/home';
import video from '@/components/video/main';
import community from '@/components/community/main';
import me from '@/components/me/main';
import newsDetails from '@/components/news/newsDetails';
import person from '@/components/me/person';
import publish from '@/components/community/publish';


export default new Router({
  routes: [{
    path: '/',
    name: "home",
    component:home,
    redirect: "/news",
    meta: {
      keepAlive: true, //此组件需要被缓存
      isBack: false, //用于判断上一个页面是哪个
    },
    children: [{
      path: "news",
      name: "news",
      component:news,
      meta: {
        keepAlive: true,
        isBack: false, //用于判断上一个页面是哪个
      },
    }, {
      path: "video",
      name: "video",
      component: video,
    },
      {
        path: "community",
        name:"community",
        component:community,
      },
      {
        path: "me",
        name:'me',
        component: me,
      },
    ]
  },
    {
      path: '/news_details',
      name: "news_details",
      component: newsDetails,
      meta: {
        keepAlive: false, //此组件需要被缓存

      },
    },
    {
      path: '/test',
      name: "test",
      component: test,
      children: [
        {
          path: 'vip',
          component: VIP,
        },
      ]
    },
    {
      path: '/person',
      name: "person",
      component: person,
    },
    {
      path: '/publish',
      name: "publish",
      component: publish
    },
  ]
})
