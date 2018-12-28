<template>
	<div>
		<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
		  <ul style="margin-top: 8vh;margin-bottom: 8vh;">
		    <li v-for="item in list">{{ item }}</li>
		  </ul>
      <div>
        URL传入的参数id：{{$route.params.id}}
      </div>
		</mt-loadmore>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				list:[1,2,3,5,6,7,8,12,1234,1],
				allLoaded:false,
			}
		},
		mounted() {
		  console.log("获取到的参数id："+this.$route.params.id);
		},
		methods: {
			loadTop() {
			  //this.$refs.loadmore.onTopLoaded();
			},
			loadBottom(){
				this.allLoaded = true;// 若数据已全部获取完毕
  				this.$refs.loadmore.onBottomLoaded();
  				this.allLoaded = false;// 若数据已全部获取完毕
			},
		},
	}
</script>

<style>

</style>
