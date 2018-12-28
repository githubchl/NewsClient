<template>
	<div style="height: 100vh;width: 100%;">

		<object type="text/html" :data="newsDate.news_details" width="100%" height="100%"></object>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				newsDate:{},
				newsContent:'',
			}
		},
		mounted(){
			this.newsDate = this.$route.params.news;

		}
	}
</script>

<style>
</style>
