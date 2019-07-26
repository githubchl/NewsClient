<template>
	<div>

		<div class="header back-header">
			<div class="back-div" @click="back()">
				<img class="back-img" src="../../assets/back.png" />
			</div>
			<label class="header-title">个人主页</label>
		</div>

		<div class="person-container">
			<div class="panel">
				<div class="top-panel"></div>
				<div class="bottom-panel"></div>
				<img class="person-header" :src="headUrl" />
			</div>
			<div class="username-div">
				<div class="username">
					{{ userName }}
				</div>
			</div>
			<div class="item">
				<label class="item-title">生日</label>
				<label class="item-content">1995/01/12</label>
			</div>
			<div class="item">
				<label class="item-title">所在地</label>
				<label class="item-content">广州</label>
			</div>
			<div class="item">
				<label class="item-title">绑定号码</label>
				<label class="item-content">{{ userInfo.phoneNum }}</label>
			</div>
			<div class="sign">
				<div class="sign-title">
					个性签名
				</div>
				<div class="sign-content">
					{{ userInfo.userText }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {urlObj} from "../common/baseUrl.js"
	export default {
		data() {
			return {
				userInfo:{},
				headUrl:require("../../assets/me_head.jpg"),
				userName:'',
				userId:0,
			}
		},
		mounted() {
			this.userInfo = this.$route.params.userInfo;
			this.userName = localStorage.getItem("userName");
			this.userId = localStorage.getItem("uid") == null ? 0 : localStorage.getItem("uid");
		},
		methods: {
			back() {
				this.$router.go(-1);
			},
		},
	}
</script>

<style>
	.person-container {
		position: relative;
		margin-top: 8vh;
		float: left;
		height: 92vh;
		overflow: hidden;
		width: 100%;
		background: #DDDDDD;
	}

	.panel {
		width: 100%;
		height: 120px;
	}

	.top-panel {
		width: 100%;
		height: 75%;
		background: #FA4848;
	}

	.bottom-panel {
		width: 100%;
		height: 25%;
		background: #fff;
	}

	.person-header {
		position: absolute;
		width: 100px;
		height: 100px;
		left: 50%;
		margin-left: -50px;
		top: 10px;
	}

	.username-div {
		height: 30px;
		width: 100%;
		background: #FFFFFF;
	}

	.username {
		width: 50%;
		line-height: 30px;
		margin-left: 25%;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		-moz-background-size: 100% 100%;
	}

	.back-header {
		vertical-align: middle;
		line-height: 8vh;
	}

	.back-div {
		width: 50px;
		height: 8vh;
		float: left;
	}

	.back-img {
		width: 45px;
		height: 45px;
		vertical-align: middle;
	}

	.header-title {
		margin-left: -50px;
	}

	.item {
		width: 100%;
		height: 40px;
		line-height: 40px;
		vertical-align: middle;
		background: #FFFFFF;
	}

	.item-title {
		float: left;
		margin-left: 30px;
	}

	.item-content {
		float: right;
		margin-right: 30px;
	}

	.sign {
		margin-top: 5px;
		width: 100%;
		height: 85px;
		background: #FFFFFF;
		margin-top: 3px;
	}

	.sign-title {
		width: 100%;
		text-align: left;
		margin-left: 30px;
		height: 20px;
	}

	.sign-content {
		width: auto;
		text-align: left;
		height: 45px;
		margin: 10px 20px 0 60px;
	}
</style>
