import {fetch,post} from './utils/http.js'
import wx from 'weixin-js-sdk'
import Vue from 'vue'
import App from './App'
import router from './router'
import { sync } from 'vuex-router-sync'
import 'babel-polyfill';
import Es6Promise from 'es6-promise'
import store from "./store/index"
import VueVideoPlayer from 'vue-video-player'

import {  CloseDialogsPlugin, ConfigPlugin, ToastPlugin, AlertPlugin, ConfirmPlugin, LoadingPlugin } from 'vux'



Es6Promise.polyfill();//兼容ios10以下机型


Vue.use(VueVideoPlayer)
// global VUX config
Vue.use(ConfigPlugin, {
  $layout: 'VIEW_BOX'
})

Vue.prototype.$get= fetch;
Vue.prototype.$post= post;

Vue.prototype.$wx= wx;


Vue.config.productionTip = false;


// plugins
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(CloseDialogsPlugin, router)

const FastClick = require('fastclick')
FastClick.attach(document.body)


sync(store, router)

// simple history management
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)
let isPush = false
let isTouchStart = false
let endTime = Date.now()
let methods = ['push', 'go', 'replace', 'forward', 'back']

document.addEventListener('touchend', () => {
  isTouchStart = false
  endTime = Date.now()
})
document.addEventListener('touchstart', () => {
  isTouchStart = true
})
methods.forEach(key => {
  let method = router[key].bind(router);
  router[key] = function (...args) {
    isPush = true;
    method.apply(null, args);
  }
})

router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})

  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)
  let direction

  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      direction = 'forward'
    } else {
      direction = 'reverse'
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    direction = 'forward'
  }

  // 判断是否是ios左滑返回 或者 右滑前进
  if (toIndex && toIndex !== '0' && !isPush && (((Date.now() - endTime) < 377) || isTouchStart)) {
    store.commit('updateDirection', {direction: ''})
  } else {
    store.commit('updateDirection', { direction: direction })
  }
  isTouchStart = false

  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})

router.afterEach(function (to) {
  isPush = false
  store.commit('updateLoadingStatus', {isLoading: false})
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

