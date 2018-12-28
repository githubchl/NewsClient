<template>
  <div>
    <mt-header class="header" title="我的"></mt-header>
    <div class="me-container">
      <div class="me-bar ripple" @click="loginAndMe()">
        <div class="me-img-div">
          <img class="me-img" :src="headUrl"/>
        </div>
        <div class="me-content" v-text="title">
        </div>

      </div>

      <div class="exit ripple" v-if="isShow" @click="exit()">
        退出登录
      </div>
    </div>
  </div>
</template>

<script>
  import BaseUrl from "../common/baseUrl.js"

  export default {
    data() {
      return {
        title: "登录体验更多功能",
        isShow: false,
        headUrl: require("../../assets/me_head.png"),
        userInfo: {},
      }
    },
    mounted() {
      let userId = localStorage.getItem("uid") == null ? 0 : localStorage.getItem("uid");
      if (userId != 0) {
        this.isShow = true;
        this.title = localStorage.getItem("userName");
        //获取头像
        this.$get(BaseUrl.meUrl + "userId=" + userId).then((res) => {
          console.log("用户信息：" + JSON.stringify(res));
          if (res.errno == 0) {
            this.userInfo = res.data[0];
            this.headUrl = BaseUrl.projectUrl + this.userInfo.userPic;
          } else {
            this.$toast(res.errmsg);
          }
        }).catch((response) => {
          console.log(response);
        })
      }
    },
    methods: {
      loginAndMe() {
        if (this.isShow) {
          this.$router.push({
            name: "person",
            params: {
              userInfo: this.userInfo,
            }
          });
        } else {
          this.$router.push({
            name: "login",
          });
        }

      },
      exit() {//退出登录
        console.log("退出登录");
        this.isShow = false;
        this.title = "登录体验更多功能";
        this.headUrl = require("../../assets/me_head.png")
        localStorage.setItem("uid", 0);
        localStorage.setItem("userName", null);
      }
    },
  }
</script>

<style>
  .me-container {
    position: relative;
    margin-top: 8vh;
    float: left;
    margin-bottom: 8vh;
    background-color: #555;
    width: 100%;
    height: 84vh;
    overflow: hidden;
  }

  .me-bar {
    width: 100%;
    height: 120px;
    background: white;
  }

  .me-img-div {
    float: left;
    width: 120px;
    line-height: 120px;
  }

  .me-img {
    height: 100px;
    width: 100px;
    vertical-align: middle;
  }

  .me-content {
    height: 100%;
    width: calc(100% - 120px);
    margin-left: 130px;
    line-height: 120px;
    text-align: left;
    vertical-align: middle;
    font-size: 18px;
  }

  .exit {
    width: 100%;
    line-height: 40px;
    margin-top: 10px;
    background: white;
    font-size: 18px;
    vertical-align: middle;
  }
</style>
