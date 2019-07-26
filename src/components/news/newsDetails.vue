<template>
  <div style="height: 100vh;width: 100vw;overflow-x: hidden">
    <div class="main-header">
      <img src="../../assets/back.png" class="main-header-back" @click="back"/>
    </div>
    <div style="margin-top: 45px;">
      <object v-if="newsDate.news_details" type="text/html" :data="newsDate.news_details" width="100%"
              height="100%"></object>
      <div v-else v-html="newsDate.rich_text"></div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        newsDate: {},
        newsContent: '',
      }
    },
    mounted() {
      this.newsDate = this.$route.params.news;
    },
    methods: {
      back() {
        this.$router.go(-1);
      }
    },
  }
</script>

<style>
</style>
