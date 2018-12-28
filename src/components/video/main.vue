<template>
	<div>
		<mt-header class="header" title="视频"></mt-header>
		<div class="video-container">
			<div class="ripple video-item" v-for="(video,index) in videoNews" @click="videoDetails(video)">
				<span class="video-title">{{ video.video_title }}</span>

				<video width="100%" height="200" :src="video.video_url" autostart=0 controls="controls"></video>
				<div class="video-pan">
					<span class="video-time">{{ video.video_time }}</span>
					<span class="video-comment">评论：{{ video.video_comment }}</span>
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
				videoNews: [], //热点新闻
			}
		},
		mounted() {
			this.getVideoNews(); //获取热点资讯
			console.log("bbb")
		},
		methods: {
			getVideoNews() {
				this.$get(BaseUrl.videoUrl).then((res) => {
					console.log(JSON.stringify(res));
					if (res.errno==0){
            this.videoNews = res.data;
          }else{
					  //获取数据失败
					  this.$toast(res.errmsg);
          }

				}).catch((response) => {
					console.log(response);
				})
			}
		},
	}
</script>

<style>
	.video-container {
		position: relative;
		margin-top: 8vh;
		float: left;
		margin-bottom: 8vh;
	}

	.video-item {
		width: 100%;
		height: auto;
	}

	.video-title {
		float: left;
		margin: 10px 10px 10px 20px;
	}

	.video-pan {
		float: left;
		width: 100%;
		margin: 10px 0 10px 0;
		height: 30px;
		border-bottom: 1px solid #f2f2f2;
	}

	.video-time {
		float: left;
		margin-left: 20px;
	}

	.video-comment {
		float: right;
		margin-right: 20px;
	}
</style>
