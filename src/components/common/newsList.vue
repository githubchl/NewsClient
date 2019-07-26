<template>
  <div  id="scroll-div" style="width: 100%;height: 100%;overflow-y: scroll;overflow-x: hidden;">


      <div class="ripple news-item" v-for="(news,index) in newsData.data" @click="newsDetails(news)">
        <div class="news-img-div" v-show="news.news_pic!=''">
          <img class="news-img" :src="news.news_pic"/>
        </div>
        <div class="news-content">
          <div class="news-title">{{news.news_title}}</div>
          <div class="news-footer">
            <span class="news-date">{{news.news_time}}</span>
            <span class="news-comment">评论：{{news.news_comment}}</span>
          </div>
        </div>
    </div>


  </div>

</template>

<script>
  import {rootUrl,urlObj} from "../common/baseUrl.js"
  import {LoadMore} from 'vux'


  export default {
    data() {
      return {
        newsData: {},
        allLoaded: false,
        showLoading: true,
        noMore:false,

      }
    },
    mounted() {

      //window.addEventListener('scroll', this.handleScroll, true);  // 监听（绑定）滚轮滚动事
    },

   /* destroyed() {
      console.log("destroyed----------newsList")
      window.removeEventListener('scroll', this.handleScroll);   //  离开页面清除（移除）滚轮滚动事件
    },*/

    components: {
      LoadMore,
    },
    methods: {
      refresh(){
        console.log("refresh");
      },
      newsDetails(news) {
        this.$router.push({
          name: "news_details",
          params: {
            news: news
          }
        });
      },
    },
    props: {
      intent: {
        type: Object, //数组类型
        default: {}, //如何父组件没有传递该数据就使用默认数据
      },
      newsType: {
        type: Number,
        default: -1,
      }
    },
    watch: {
      // 如果 `intent` 发生改变，这个函数就会运行
      intent() {
        this.showLoading = false;
        console.log("watch");
        this.newsData = this.intent;
      },
    },
  }
</script>

<style>
  .news-item {
    background: white;
    width: 100%;
    height: 100px;
    border-bottom: 1px solid #f2f2f2;
  }

  .news-img-div {
    float: left;
    width: 100px;
    line-height: 100px;
  }

  .news-img {
    height: 80px;
    width: 90px;
    vertical-align: middle;
  }

  .news-content {
    height: 100px;
  }

  .news-title {
    height: 40px;
    line-height: 25px;
    text-align: left;
    padding: 10px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .news-footer {
    text-align: left;
    margin-top: 5px;
  }

  .news-date {
    margin-left: 10px;
  }

  .news-comment {
    float: right;
    margin-right: 10px;
  }
</style>
