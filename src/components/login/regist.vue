<template>
	<div>
		<img class="regist-img" src="../../assets/login_img.png" />
		<div class="regist-name-div">
			<input class="regist-input" v-model="userName" placeholder="请输入用户名" type="text"  />
		</div>
		<div class="regist-div">
			<input class="regist-input" v-model="userPass" placeholder="请输入密码" type="password" />
		</div>
		<div class="regist-div">
			<input class="regist-phone" v-model="phone" placeholder="请输入手机号码" type="number" />
			<button class="regist-get-val" @click="getValCode()" :disabled="isClick">{{ tips }}</button>
		</div>
		<div class="regist-div">
			<input class="regist-input" v-model="val" placeholder="请输入验证码" type="number" />
		</div>
		<div class="regist-div">
			<button class="regist-input" @click="inputRegist()">注册</button>
		</div>
	</div>
</template>

<script>
	import {urlObj} from "../common/baseUrl.js"
	export default {
		data() {
			return {
				userName:'',//用户名
				userPass:'',//密码
				phone:'',//手机号码
				val:'',//验证码
				tips:'发送验证码',
				isClick:false,
			}
		},
		mounted() {

		},
		methods: {
			//注册
			inputRegist(){
				if(this.userName.toString().trim()==''){
					return;
				}
				if(this.userPass.toString().trim()==''){
					return;
				}
				if(this.phone.toString().trim()==''){
					return;
				}
				//执行注册请求
				this.$post(urlObj.registUrl,{
          username:this.userName,
          userpass:this.userPass,
          phonenum:this.phone
        }).then((res) => {
					console.log(res);
					if(res.errno==100){//注册失败的情况
            this.$vux.toast.text(res.errmsg, 'center');
					}else{//其他的时候注册成功，记录uid和用户名
            this.$vux.toast.text("注册成功", 'center');
						localStorage.setItem("uid", res);
						localStorage.setItem("userName", this.userName);
						this.$router.replace({
							name: "home",
						});
					}
				},(response) => {
          console.log(response);
        })
			},
			//获取验证码
			getValCode(){
				if(this.phone.toString().trim()==''){
					this.$toast("手机号码不能为空");
					return;
				}
				this.$toast("暂未开放短信验证功能");
				this.isClick = true;
				let time = 60;
				let that = this;
				that.tips = time+"秒后重试";
				let timer = setInterval(function() {
					time -= 1;
					that.tips = time+"秒后重试";
					if(time<=0){
						that.tips = "发送验证码";
						that.isClick = false;
						clearInterval(timer);
					}
				},1000);

			}
		},
	}
</script>

<style>
	.regist-img {
		width: 100%;
		height: 30vh;
	}

	.regist-name-div {
		margin-top: 5vh;
		height: 10vh;
		width: 100%;
		text-align: center;
	}

	.regist-input {
		height: 80%;
		width: 80%;
		font-size: 18px;
	}

	.regist-phone {
		height: 80%;
		width: 50%;
		font-size: 18px;
	}

	.regist-get-val{
		height: 80%;
		width: 29%;
		font-size: 18px;
	}

	.regist-div {
		margin-top: 3vh;
		height: 10vh;
		width: 100%;
		text-align: center;
	}

</style>
