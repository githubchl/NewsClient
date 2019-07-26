<template>
  <div>
    <div class="main-header">个人中心</div>
    <div class="me-container">
      <div class="me-bar ripple" @click="loginAndMe()">
        <div class="me-img-div">
          <img class="me-img" :src="userData.user_pic"/>
        </div>
        <div class="me-content" v-text="userData.user_name">
        </div>

        <div class="me-address" v-if="userData.city">
          地区:{{userData.province}}&nbsp{{userData.city}}
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
        headUrl: require("../../assets/me_head.jpg"),
        userData: {},
      }
    },
    mounted() {
      this.userData = this.$store.getters.getUserData;

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
        this.headUrl = require("../../assets/me_head.jpg")
        localStorage.setItem("uid", 0);
        localStorage.setItem("userName", null);
      }
    },
  }
</script>

<style scoped>

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
    height: 60%;
    width: calc(100% - 120px);
    margin-left: 130px;
    line-height: 80px;
    text-align: left;
    vertical-align: middle;
    font-size: 18px;
  }

  .me-address {
    width: calc(100% - 120px);
    margin-left: 130px;
    text-align: left;
    vertical-align: middle;
    font-size: 16px;
    color: #606060;
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
