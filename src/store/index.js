import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

let store = new Vuex.Store;


if (/no-background-color=true/.test(location.href)) {
  document.body.style['background-color'] = '#fff'
}


const shouldUseTransition = !/transition=none/.test(location.href)



store.registerModule('vux', {
  state: {
    demoScrollTop: 0,
    isLoading: false,
    direction: shouldUseTransition ? 'forward' : '',
    containerHeight:0,
    isShowTabbar:true,
    userData:{},
    tabbarIndex:0,
  },
  getters:{
    getContainerHeight(state){
      return state.containerHeight;
    },
    getTabbarState(state){
      return state.isShowTabbar;
    },
    getUserData(state){
      return state.userData
    },
    getTabbarIndex(state){
      return state.tabbarIndex;
    }
  },
  mutations: {
    updateDemoPosition (state, payload) {
      state.demoScrollTop = payload.top
    },
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    updateDirection (state, payload) {
      if (!shouldUseTransition) {
        return
      }
      state.direction = payload.direction
    },
    setContainerHeight(state,containerHeight){
      state.containerHeight = containerHeight;
    },
    setShowTabbar(state,isShow){
      state.isShowTabbar = isShow;
    },
    setUserData(state,userData){
      state.userData = userData;
    },
    setTabbarIndex(state,index){
      state.tabbarIndex = index;
    },
  },
  actions: {
    updateDemoPosition ({commit}, top) {
      commit({type: 'updateDemoPosition', top: top})
    }
  }
});

export default store;
