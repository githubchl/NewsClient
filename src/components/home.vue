<template>
	<div>
		<!--<router-view v-if="$route.meta.keepAlive"></router-view>-->
		<keep-alive>
		<router-view/>
		</keep-alive>

		<mt-tabbar v-model="selected" fixed>

			<mt-tab-item :id="ids[0]">
				<img slot="icon" :src="newsIcon">资讯
			</mt-tab-item>
			<mt-tab-item :id="ids[1]">
				<img slot="icon" :src="videoIcon">视频
			</mt-tab-item>
			<mt-tab-item :id="ids[2]">
				<img slot="icon" :src="communityIcon">互动
			</mt-tab-item>
			<mt-tab-item :id="ids[3]">
				<img slot="icon" :src="meIcon">我的
			</mt-tab-item>
		</mt-tabbar>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				selected: 0,
				newsIcon: '../../static/image/news2.png',
				videoIcon: '../../static/image/video1.png',
				communityIcon: '../../static/image/community1.png',
				meIcon: '../../static/image/me1.png',
				flag: [true, false, false, false],
				ids: [0, 1, 2, 3],
			}
		},
		methods: {
			changeIconText() {
				let tabUrl;
				if(this.flag[0]) {
					this.newsIcon = '../../static/image/news2.png';
					this.videoIcon = '../../static/image/video1.png';
					this.communityIcon = '../../static/image/community1.png';
					this.meIcon = '../../static/image/me1.png';
					tabUrl = '/news';
				}
				if(this.flag[1]) {
					this.newsIcon = '../../static/image/news1.png';
					this.videoIcon = '../../static/image/video2.png';
					this.communityIcon = '../../static/image/community1.png';
					this.meIcon = '../../static/image/me1.png';
					tabUrl = '/video';
				}
				if(this.flag[2]) {
					this.newsIcon = '../../static/image/news1.png';
					this.videoIcon = '../../static/image/video1.png';
					this.communityIcon = '../../static/image/community2.png';
					this.meIcon = '../../static/image/me1.png';
					tabUrl = '/community';
				}
				if(this.flag[3]) {
					this.newsIcon = '../../static/image/news1.png';
					this.videoIcon = '../../static/image/video1.png';
					this.communityIcon = '../../static/image/community1.png';
					this.meIcon = '../../static/image/me2.png';
					tabUrl = '/me';
				}
				//history.go(-1); 
				this.$router.replace({
					path: tabUrl
				});
			},
		},
		watch: {
			// 如果 `selected` 发生改变，这个函数就会运行
			selected: function() {
				for(let i = 0; i < this.flag.length; i++) {
					if(this.selected === this.ids[i]) {
						this.flag[i] = true;
					} else {
						this.flag[i] = false;
					}
				}
				this.changeIconText();
			}
		},
		components: {}
	}
</script>

<style>

</style>