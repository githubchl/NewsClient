<template>
	<div>
		<mt-header class="header" title="互动"></mt-header>
		<div class="publish-container">
			<div class="ripple publish-item" v-for="(publish,index) in publishNews" @click="videoDetails(video)">

				
				<div class="publish-img-div">
					<img class="publish-img" :src="projectUrl+publish.userPic" />
				</div>
				<div class="publish-content">
					<div class="publish-user">{{publish.userName}}</div>
					<div class="publish-title">{{publish.text}}</div>
					<img class="publish-pic" v-show="publish.cPic!=''" :src="projectUrl+publish.cPic" />
					<div class="publish-footer">
						<span class="publish-date">{{publish. cTime}}</span>
						<span class="publish-comment">评论：{{publish.cComment}}</span>
					</div>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	import BaseUrl from "../common/baseUrl.js"
	export default {
		data() {
			return {
				publishNews: [], //动态列表
				projectUrl:BaseUrl.projectUrl,
			}
		},
		mounted() {
			this.getPublishNews(); //获取动态
			console.log("ccc")
		},
		methods: {
			getPublishNews() {

				this.$get(BaseUrl.communityUrl + "publishId=10000").then((res) => {
					//console.log(JSON.stringify(res));
					console.log(JSON.stringify(res.community));
					this.publishNews = res.community;
				}).catch((response) => {
					console.log(response);
				})

			},
		},
	}
</script>

<style>
	.publish-container {
		position: relative;
		margin-top: 8vh;
		float: left;
		width: 100%;
		margin-bottom: 8vh;
	}
	
	.publish-item {
		width: 100%;
		height: auto;
		border-bottom: 1px solid #f2f2f2;
	}
	
	.publish-img-div {
		float: left;
		width: 60px;
		line-height: 60px;
	}
	
	.publish-img {
		height: 50px;
		width: 50px;
		vertical-align: middle;
	}
	
	
	.publish-content {
		height: auto;
		width: calc(100%-60px);
		margin-left: 60px;
	}
	.publish-user{
		padding: 10px 0 0 10px;
		text-align: left;
		color: #11AEE5;
	}
	
	.publish-title {
		height: auto;
		text-align: left;
		padding: 5px 10px 5px 10px;
		overflow: hidden;
	}
	
	.publish-pic{
		width: 95%;height: auto;
	}
	
	.publish-footer {
		text-align: left;
		margin-top: 5px;
		margin-bottom: 5px;
	}
	
	.publish-date {
		margin-left: 10px;
	}
	
	.publish-comment {
		float: right;
		margin-right: 10px;
	}
	

</style>