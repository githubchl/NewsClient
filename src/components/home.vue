<template>
  <div>
    <!--<router-view v-if="$route.meta.keepAlive"></router-view>-->

    <keep-alive>
      <router-view/>
    </keep-alive>

    <tabbar id="tabbar" style="position: absolute" v-show="$store.getters.getTabbarState"
            @on-index-change="tabbarChange">
      <tabbar-item :selected="selectItem(0)" :link="{name:'news',replace:true}">
        <img slot="icon" src="../assets/news1.png">
        <span slot="label">资讯</span>
      </tabbar-item>
      <tabbar-item :selected="selectItem(1)" show-dot :link="{name:'video',replace:true}">
        <img slot="icon" src="../assets/video1.png">
        <span slot="label">视频</span>
      </tabbar-item>
      <tabbar-item :selected="selectItem(2)" :link="{name:'community',replace:true}">
        <img slot="icon" src="../assets/community1.png">
        <span slot="label">互动</span>
      </tabbar-item>
      <tabbar-item :selected="selectItem(3)" :link="{name:'me',replace:true}">
        <img slot="icon" src="../assets/me1.png">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>


  </div>

</template>

<script>
  import {urlObj} from "./common/baseUrl.js";
  import {Tabbar, TabbarItem} from 'vux';

  export default {
    data() {
      return {}
    },
    components: {
      Tabbar,
      TabbarItem
    },
    created() {
    },
    mounted() {
      const code = this.getUrlParam('code');
      if (code != '') {
        this.getWxUserInfo(code);
      }
    },
    computed: {},
    methods: {
      selectItem(index) {
        return this.$store.getters.getTabbarIndex == index
      },
      getWxUserInfo(code) {
        this.$get(urlObj.getWxUserInfoUrl + "code=" + code).then((res) => {
          console.log('获取回来的数据');
          /* that.$toast(JSON.stringify(res));*/
          if (res.errno === 0) {
            this.$store.commit('setUserData', res.data);
          } else {
            //this.$vux.toast.text('获取用户信息失败', 'center');
          }
        }).catch((response) => {
          //this.$vux.toast.text('获取用户信息失败', 'center');
        })

      },
      getUrlParam(name) {
        let result = window.location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
        if (result == null || result.length < 1) {
          return "";
        }
        return result[1];
      },
      tabbarChange(index) {
        console.log("index=" + index);
        this.$store.commit("setTabbarIndex", index);
      }
    },
  }
</script>

<style lang="sass">
  @import "../style/main"

</style>
