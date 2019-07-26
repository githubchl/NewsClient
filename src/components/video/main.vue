<template>
  <div>
    <div class="main-header">视频</div>

    <scroller use-pullup :pullup-config="pullupDefaultConfig" @on-pullup-loading="loadMore"
              use-pulldown :pulldown-config="pulldownDefaultConfig" @on-pulldown-loading="refresh"
              lock-x ref="scrollerBottom" height="-48">

      <div ref="videoContainer" class="video-container">
        <div class="ripple video-item" v-for="(video,index) in videoNews.data" @click="videoDetails(video)">
          <span class="video-title">{{ video.video_title }}</span>

          <video :src="video.video_url" autostart=0 controls="controls" width="100%" height="260px">
            <!--  src="../../../static/video/aa.mp4"-->
          </video>

          <div class="video-pan">
            <span class="video-time">{{ video.video_time }}</span>
            <span class="video-comment">评论：{{ video.video_comment }}</span>
          </div>
        </div>

      </div>

    </scroller>

  </div>
</template>

<script>
  import { Scroller} from 'vux'
  import {rootUrl, urlObj} from "../common/baseUrl.js"
  import { pulldownDefaultConfig,pullupDefaultConfig } from "../common/pullConfig";


  export default {
    data() {
      return {
        videoNews: {}, //热点新闻
        containerHeight: 0,
        pullupDefaultConfig: pullupDefaultConfig,
        pulldownDefaultConfig: pulldownDefaultConfig,
      }
    },
    components: {
      Scroller
    },
    mounted() {
      this.$nextTick(() => {
        this.$refs.scrollerBottom.reset({top: 0})
      });
      this.refresh();
      //this.containerHeight = this.$store.getters.getContainerHeight;
      console.log("containerHeight=" + this.containerHeight);
    },

    methods: {

      refresh() {
        console.log("refresh")
        this.$get(urlObj.videoUrl).then((res) => {
          this.$refs.scrollerBottom.enablePullup()
          this.$refs.scrollerBottom.donePulldown()
          console.log(res);
          if (res.errno == 0) {
            for (let video of res.data.data) {
              if (video.video_type == 2) {
                video.video_url = rootUrl + video.video_url;
              }
            }
            this.videoNews = res.data;
          } else {
            //获取数据失败
            this.$vux.toast.text('获取数据失败', 'center');
          }

        }).catch((err) => {
          this.$refs.scrollerBottom.enablePullup()
          this.$refs.scrollerBottom.donePulldown()
          this.$vux.toast.text(err.msg, 'center');
        });
      },
      loadMore() {
        console.log("loadMore");
        let page = this.videoNews.currentPage+1;//请求第几页
        if (typeof (page)=="undefined"){
          page = 1;
        }
        if (page>this.videoNews.totalPages){
          //没有更多数据
          this.$refs.scrollerBottom.donePullup()
          this.$vux.toast.text('数据都被加载完啦', 'bottom');
        } else {

          this.$get(urlObj.videoUrl + "page=" + page).then((res) => {
            this.$refs.scrollerBottom.donePullup()
            console.log(res);
            if (res.errno == 0) {
              for (let video of res.data.data) {
                if (video.video_type == 2) {
                  video.video_url = rootUrl + video.video_url;
                }
              }

              if (typeof (this.videoNews.data) == "undefined") {
                this.videoNews = res.data;
              } else {
                this.videoNews.count = res.data.count;
                this.videoNews.currentPage = res.data.currentPage;
                this.videoNews.pageSize = res.data.pageSize;
                this.videoNews.totalPages = res.data.totalPages;
                this.videoNews.data = this.videoNews.data.concat(res.data.data);
              }
            } else {
              //获取数据失败
              this.$vux.toast.text('获取数据失败', 'center');
            }
          }).catch((err) => {
            this.$refs.scrollerBottom.donePullup()
            this.$vux.toast.text(err.msg, 'center');
          })
        }
      },

    },
  }
</script>

<style >

</style>

