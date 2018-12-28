<template>
  <div style="width: 100%;height: 84vh;overflow: scroll;">
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
      <div class="ripple news-item" v-for="(news,index) in newsData" @click="newsDetails(news)">
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
    </mt-loadmore>
  </div>

</template>

<script>
  import BaseUrl from "../common/baseUrl.js"

  export default {
    data() {
      return {
        newsData: [],
        allLoaded: false,
      }
    },
    methods: {
      newsDetails(news) {
        this.$router.push({
          name: "news_details",
          params: {
            news: news
          }
        });
      },
      loadTop() {
        //加载完成时调用
        console.log("下拉刷新");
        this.$refs.loadmore.onTopLoaded();
      },
      loadBottom() {

        /*this.allLoaded = true;
                  this.$refs.loadmore.onBottomLoaded();*/
        console.log("this.newsData.length=" + this.newsData.length);
        let that = this;


        if (this.newsData.length > 6) {
          console.log("上拉刷新");
          let urlData;
          //拿到url
          if (this.newsType == 0) {//热点新闻
            let newsId = this.newsData[this.newsData.length - 1].news_id;
            console.log("newsId=" + newsId);
            urlData = BaseUrl.hotpotUrl + "newsId=" + newsId;
          } else if (this.newsType == 1) {//推荐新闻
            let userId = localStorage.getItem("uid") == null ? 0 : localStorage.getItem("uid");
            console.log("userId=" + userId);
            urlData = BaseUrl.recomUrl + "userId=" + userId;
          }


          //获取更多数据
          this.$get(urlData).then((res) => {
            console.log(JSON.stringify(res));
            if (res.data.length>0) {
              this.newsData = this.newsData.concat(res.data);
              this.$refs.loadmore.onBottomLoaded();
            } else {
              this.$toast("没有更多数据");
              this.$refs.loadmore.onBottomLoaded();
            }
          }).catch((response) => {
            console.log(response);
            this.$refs.loadmore.onBottomLoaded();
          })


        } else {
          console.log("无效的上拉刷新");
          setTimeout(function () {
            that.$refs.loadmore.onBottomLoaded();
          }, 10);
        }

      },
    },
    props: {
      intent: {
        type: Array, //数组类型
        default: ['新闻1', '新闻2'], //如何父组件没有传递该数据就使用默认数据
      },
      newsType: {
        type: Number,
        default: -1,
      }
    },
    watch: {
      // 如果 `intent` 发生改变，这个函数就会运行
      intent: function () {
        console.log("watch");
        this.newsData = this.intent;
      },
    },
  }
</script>

<style>
  .news-item {
    width: 100%;
    height: 100px;
    border-bottom: 1px solid #f2f2f2
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
