<template>
	<div>
		<img class="login-img" src="../../assets/login_img.png" />
		<div class="login-name-div">
			<input class="login-input" v-model="userName" placeholder="请输入用户名" type="text" />
		</div>
		<div class="login-div">
			<input class="login-input" v-model="userPass" placeholder="请输入密码" type="password" />
		</div>
		<div class="login-div">
			<button class="login-input" @click="login()">登录</button>
		</div>
		<div class="login-regist" @click="inputRegist()">新用户注册</div>
	</div>
</template>

<script>
	import BaseUrl from "../common/baseUrl.js"
	export default {
		data() {
			return {
				userName:'',//用户名
				userPass:'',//密码
			}
		},
		mounted() {

		},
		methods: {
			inputRegist(){
				this.$router.push({
					name: "regist",
				});
			},
			login(){
				if(this.userName.toString().trim()==''){
					this.$toast("用户名不能为空");
					return;
				}
				if(this.userPass.toString().trim()==''){
					this.$toast("密码不能为空");
					return;
				}

				this.$post(BaseUrl.loginUrl,{
          username: this.userName,
          userpass: this.userPass
        }).then((res)=>{
          console.log("res="+res);
          if(res.errno==100){//用户名不存在
            this.$toast(res.errmsg);
          }else{//其他的时候登录成功，记录uid和用户名
            this.$toast("登录成功");
            localStorage.setItem("uid", res.data);
            localStorage.setItem("userName", this.userName);
            this.$router.replace({
              name: "home",
            });
          }
        },(response) => {
          console.log(response);
        })
			},
		},
	}
</script>

<style>
	.login-img {
		width: 100%;
		height: 35vh;
	}

	.login-name-div {
		margin-top: 5vh;
		height: 10vh;
		width: 100%;
		text-align: center;
	}

	.login-div {
		margin-top: 3vh;
		height: 10vh;
		width: 100%;
		text-align: center;
	}

	.login-div {
		margin-top: 3vh;
		height: 10vh;
		width: 100%;
		text-align: center;
	}

	.login-input {
		height: 80%;
		width: 80%;
		font-size: 18px;
	}

	.login-regist {
		color: #FA4848;
		bottom: 3vh;
		position: absolute;
		text-align: center;
		width: 100%;
	}
</style>
