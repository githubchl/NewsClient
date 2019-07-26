<template>
  <!--使用keep-alive会将页面缓存-->
  <div>

    <tab id="tab">
      <tab-item selected @on-item-click="onItemClick">热点</tab-item>
      <tab-item @on-item-click="onItemClick">推荐</tab-item>
      <tab-item @on-item-click="onItemClick">订阅</tab-item>
    </tab>

    <scroller use-pullup :pullup-config="pullupDefaultConfig" @on-pullup-loading="loadMore"
              use-pulldown :pulldown-config="pulldownDefaultConfig" @on-pulldown-loading="refresh"
              lock-x ref="scrollerBottom" height="-48">


      <div class="page-tab-container" style="position:relative;">

        <NewsList :intent="hotpotNews" :newsType="hotpotType"/>

        <!--<mt-tab-container-item :id="1">
          <NewsList :intent="recommendNews" :newsType="recommendType"/>
        </mt-tab-container-item>
        <mt-tab-container-item :id="2">
          <div>订阅</div>

        </mt-tab-container-item>-->
      </div>
    </scroller>
  </div>
</template>

<script>
  import NewsList from "../common/newsList"
  import {rootUrl, urlObj} from "../common/baseUrl.js"
  import {Tab, TabItem, Scroller} from 'vux'
  import { pulldownDefaultConfig,pullupDefaultConfig } from "../common/pullConfig";


  export default {
    name: 'page-tab-container',
    data() {
      return {
        barIndex: 0,
        active: 0,
        isClick: true,
        isClick: [true, false, false],
        hotpotNews: {}, //热点新闻
        recommendNews: {},
        hotpotType: 0,
        recommendType: 1,
        pullupDefaultConfig: pullupDefaultConfig,
        pulldownDefaultConfig: pulldownDefaultConfig,
      }
    },
    components: {
      NewsList,
      Tab,
      TabItem,
      Scroller
    },

    mounted() {
      this.$nextTick(() => {
        this.$refs.scrollerBottom.reset({top: 0})
      });
      this.refresh(); //获取热点资讯
      console.log("mounted--------mounted");
    },


    methods: {

      refresh() { //获取热点资讯
        console.log("refresh");
        this.$get(urlObj.hotpotUrl + "page=1").then((res) => {
          this.$refs.scrollerBottom.enablePullup()
          this.$refs.scrollerBottom.donePulldown()
          for (let news of res.data.data) {
            if (news.upload_type == 2) {
              news.news_pic = rootUrl + news.news_pic;
            }
          }
          this.hotpotNews = res.data;
        }).catch((response) => {
          this.$refs.scrollerBottom.enablePullup()
          this.$refs.scrollerBottom.donePulldown()
          console.log(response);
        })
      },

      loadMore() {
        console.log("loadMore");
        let page = this.hotpotNews.currentPage + 1;//请求第几页
        if (typeof (page) == "undefined") {
          page = 1;
        }
        if (page > this.hotpotNews.totalPages) {
          //没有更多数据
          this.$refs.scrollerBottom.donePullup()
          this.$vux.toast.text('数据都被加载完啦', 'bottom');
        } else {

          this.$get(urlObj.hotpotUrl + "page=" + page).then((res) => {
            this.$refs.scrollerBottom.donePullup();

            for (let news of res.data.data) {
              if (news.upload_type == 2) {
                news.news_pic = rootUrl + news.news_pic;
              }
            }
            if (typeof (this.hotpotNews.data) == "undefined") {
              this.hotpotNews = res.data;
            } else {
              this.hotpotNews.count = res.data.count;
              this.hotpotNews.currentPage = res.data.currentPage;
              this.hotpotNews.pageSize = res.data.pageSize;
              this.hotpotNews.totalPages = res.data.totalPages;
              this.hotpotNews.data = this.hotpotNews.data.concat(res.data.data);
            }
          }).catch((response) => {
            this.$refs.scrollerBottom.donePullup();
            this.$vux.toast.text('请求失败', 'bottom');

          })
        }
      },

      onItemClick(index) {
        this.active = index;
      },

      getRecommendNews() { //获取推荐资讯
        let userId = localStorage.getItem("uid") == null ? 0 : localStorage.getItem("uid");
        console.log("userId=" + userId);
        this.$get(rootUrl.recomUrl + "userId=" + userId).then((res) => {
          console.log(JSON.stringify(res));
          //console.log(JSON.stringify(res.news));
          this.recommendNews = res.news;
        }).catch((response) => {
          console.log(response);
        })
      },
    },
    watch: {
      // 如果 `active` 发生改变，这个函数就会运行
      active: function () {
        for (let i = 0; i < this.isClick.length; i++) {
          if (this.active === this.ids[i]) {
            this.isClick[i] = true;
          } else {
            this.isClick[i] = false;
          }
        }
        if (this.active == 0) {
          if (this.hotpotNews.length <= 0) { //热点
            this.getHotpotNews();
          }
        } else if (this.active == 1) { //推荐
          if (this.recommendNews.length <= 0) { //热点
            this.getRecommendNews();
          }
        } else if (this.active == 2) { //订阅

        }
      }
    },
  };
</script>

<style lang="css" scoped>
  .nav {
    background: #FA4848;
    height: 8vh;
    width: 100%;
    position: fixed;
    z-index: 5;
  }

  .nav-button {
    color: white;
    font-size: 16px;
    background-color: transparent;
    height: 100%;
    border: none;
    box-shadow: none;
    z-index: 1;
  }

  .nav-button-click {
    color: #FFCBA9;
  }
</style>
