<template>
	<!--使用keep-alive会将页面缓存-->
	<div>
		<div class="nav">
			<mt-button class="nav-button" :class="{ 'nav-button-click':isClick[0] }" size="small" @click.native.prevent="active = 0">热点</mt-button>
			<mt-button class="nav-button" :class="{ 'nav-button-click':isClick[1] }" size="small" @click.native.prevent="active = 1">推荐</mt-button>
			<mt-button class="nav-button" :class="{ 'nav-button-click':isClick[2] }" size="small" @click.native.prevent="active = 2">订阅</mt-button>
		</div>



		<div class="page-tab-container" style="position:relative;margin-top: 8vh;float: left;margin-bottom: 9vh;">
			<mt-tab-container class="page-tabbar-tab-container" v-model="active">

				<mt-tab-container-item :id="ids[0]">
						<NewsList :intent="hotpotNews" :newsType="hotpotType"/>
				</mt-tab-container-item>

				<mt-tab-container-item :id="ids[1]">
					<NewsList :intent="recommendNews" :newsType="recommendType"/>
				</mt-tab-container-item>
				<mt-tab-container-item :id="ids[2]">
					<div>订阅</div>
					<!-- cell组件 -->
					<!-- <mt-cell v-for="n in 7" title="tab-container 3"></mt-cell>-->
				</mt-tab-container-item>
			</mt-tab-container>
		</div>
	</div>
</template>

<script>
	import NewsList from "../common/newsList"
	import BaseUrl from "../common/baseUrl.js"
  //const thinkGetNewsUrl = "http://192.168.1.194:8360/news/getNews?&type=1";
	export default {
		name: 'page-tab-container',
		data() {
			return {
				active: 0,
				isClick: true,
				ids: [0, 1, 2],
				isClick: [true, false, false],
				hotpotNews: [], //热点新闻
				recommendNews: [],
				hotpotType:0,
				recommendType:1,
			};
		},
		mounted() {
			this.getHotpotNews(); //获取热点资讯
			console.log("AAa")
		},
		watch: {
			// 如果 `active` 发生改变，这个函数就会运行
			active: function() {
				for(let i = 0; i < this.isClick.length; i++) {
					if(this.active === this.ids[i]) {
						this.isClick[i] = true;
					} else {
						this.isClick[i] = false;
					}
				}
				if(this.active == 0) {
					if(this.hotpotNews.length <= 0) { //热点
						this.getHotpotNews();
					}
				} else if(this.active == 1) { //推荐
					if(this.recommendNews.length <= 0) { //热点
						this.getRecommendNews();
					}
				} else if(this.active == 2) { //订阅

				}
			}
		},
		methods: {
			getHotpotNews() { //获取热点资讯
				this.$get(BaseUrl.hotpotUrl).then((res) => {
					console.log("getHotpotNews"+JSON.stringify(res));
					//console.log(JSON.stringify(res.news));
					this.hotpotNews = res.data;
				}).catch((response) => {
					console.log(response);
				})
			},
			getRecommendNews() { //获取推荐资讯
				let userId = localStorage.getItem("uid")==null?0:localStorage.getItem("uid");
				console.log("userId="+userId);
				this.$get(BaseUrl.recomUrl+"userId="+userId).then((res) => {
					console.log(JSON.stringify(res));
					//console.log(JSON.stringify(res.news));
					this.recommendNews = res.news;
				}).catch((response) => {
					console.log(response);
				})
			},
		},
		components: {
			NewsList,
		},
	};
</script>

<style lang="css" scoped>
	.nav {
		background: #FA4848;
		height: 8vh;
		width: 100%;
		position: fixed;
		z-index: 1;
	}

	.nav-button {
		color: white;
		font-size: 16px;
		background: #00000000;
		height: 100%;
		border: none;
		box-shadow: none;
	}

	.nav-button-click {
		color: #FFCBA9;
	}
</style>
