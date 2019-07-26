<!--
<template>
	<div>
		&lt;!&ndash;<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
		  <ul style="margin-top: 8vh;margin-bottom: 8vh;">
		    <li v-for="item in list">{{ item }}</li>
		  </ul>
      <div>
        URL传入的参数id：{{$route.params.id}}
      </div>
      <input type="file" name="file" class="upload__input" @change="uploadChange" accept="image/jpg,image/png">
      <img :src="headUrl">
		</mt-loadmore>&ndash;&gt;

    <button @click="heihei">
      vux
    </button>
    <br/>
    <button @click="goHome">
      去主页
    </button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				list:[1,2,3,5,6,7,8,12,1234,1],
				allLoaded:false,
        headUrl:require("../../../newsImgDir//imageCom/20180514144459.jpg"),
			}
		},
		mounted() {
		  console.log("获取到的参数id："+this.$route.params.id);
		 /* let aa = "/imageHead/20180513111535";
      this.headUrl = require(`../../../newsImgDir/${aa}.jpg`);*/
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
      heihei(){
        this.$vux.alert.show({
          title: 'Vux is Cool',
          content: 'Do you agree?',
          onShow () {
            console.log('Plugin: I\'m showing')
          },
          onHide () {
            console.log('Plugin: I\'m hiding')
          }
        })
      },
      goHome(){
			  this.$router.push({
          name:"news",
        })
      }
		},
	}
</script>

<style>

</style>
-->



<template>
  <div>
    <div  class="main-header">视频</div>
    <scroller use-pullup :pullup-config="pullupDefaultConfig" @on-pullup-loading="loadMore"
              use-pulldown :pulldown-config="pulldownDefaultConfig" @on-pulldown-loading="refresh"
              lock-x ref="scrollerBottom" height="-48">
      <div style="padding: 10px 0">
        <div class="box" v-for="(item, index) in list" :key="index">
          <p class="list">item</p>
        </div>
      </div>
    </scroller>
  </div>
</template>
<script>
  import {Scroller, XHeader} from 'vux'
  import axios from 'axios'

  const pulldownDefaultConfig = {
    content: '下拉刷新',
    height: 40,
    autoRefresh: false,
    downContent: '下拉刷新',
    upContent: '释放后刷新',
    loadingContent: '正在刷新...',
    clsPrefix: 'xs-plugin-pulldown-'
  }
  const pullupDefaultConfig = {
    content: '上拉加载更多',
    pullUpHeight: 60,
    height: 40,
    autoRefresh: false,
    downContent: '释放后加载',
    upContent: '上拉加载更多',
    loadingContent: '加载中...',
    clsPrefix: 'xs-plugin-pullup-'
  }
  export default {
    components: {
      XHeader,
      Scroller
    },
    mounted() {
      this.$nextTick(() => {
        this.$refs.scrollerBottom.reset({top: 0})
      })
      this.loadMore()
    },
    data() {
      return {
        list: [1,2,3,5,6,7,8,12,1234,1],
        pullupDefaultConfig: pullupDefaultConfig,
        pulldownDefaultConfig: pulldownDefaultConfig
      }
    },
    methods: {
      fetchData(cb) {
        axios.get('http://localhost:3000/').then(response => {
          this.$nextTick(() => {
            this.$refs.scrollerBottom.reset()
          })
          cb(response.data)
        })
      },
      refresh() {
        console.log("refresh")
        setTimeout(()=>{
          this.$refs.scrollerBottom.enablePullup()
          this.$refs.scrollerBottom.donePulldown()
        },2000);
      },
      loadMore() {
        console.log("loadMore")
        setTimeout(()=>{
          //还有数据
          this.$refs.scrollerBottom.donePullup()
          // 没有数据了
          // this.$refs.scrollerBottom.disablePullup()
        },2000);
      }
    }
  }
</script>

