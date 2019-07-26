<template>
  <div>

    <scroller use-pullup :pullup-config="pullupDefaultConfig" @on-pullup-loading="loadMore"
              use-pulldown :pulldown-config="pulldownDefaultConfig" @on-pulldown-loading="refresh"
              lock-x ref="scrollerBottom" height="-1">
      <div class="publish-container">

        <div class="publish-header">
          <img :src="camera" class="publish-header-camera ripple" @click="enterPublish"/>
          <img :src="logo" class="publish-header-bg"/>
          <img :src="userData.user_pic" class="publish-header-head"/>
          <span class="publish-header-name">{{userData.user_name}}</span>
        </div>

        <div style="margin-top: 10px;">
          <div class="publish-item" v-for="(publish,index) in publishNews.data" >
            <div class="publish-img-div">
              <img class="publish-img" :src="publish.user_pic"/>
            </div>
            <div class="publish-content">
              <div class="publish-user">{{publish.user_name}}</div>
              <div class="publish-title">{{publish.publish_text}}</div>
              <img class="publish-pic" v-if="publish.publish_pic!=''" :src="publish.publish_pic"/>
              <div class="publish-footer">
                <span class="publish-date">{{publish.publish_time}}</span>
                <img class="publish-comment ripple"  @click="getFocus(index)" src="../../assets/comment.png"></img>
              </div>
              <div class="publish-comment-details" v-if="publish.publish_comment_details">
                <div class="publish-comment-details-item" v-for="details in publish.publish_comment_details">
                  <span class="publish-comment-details-name">{{details.user_name}}</span>
                  <span class="publish-comment-details-text">:{{details.comment_p_text}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </scroller>

    <div v-if="showInput" class="publish-input">
      <input ref="inputComment" type="text" class="publish-input-input"
             placeholder="请输入评论"  @blur="inputBlur" v-model="inputText"/>
      <button class="publish-input-button ripple" :class="{'publish-input-button-data':hasInputData}"
      @click="sendData" :disabled="!hasInputData">发送</button>
    </div>

  </div>
</template>

<script>
  import {Scroller} from 'vux'
  import {rootUrl, urlObj} from "../common/baseUrl.js"
  import {pulldownDefaultConfig, pullupDefaultConfig} from "../common/pullConfig";
  import {formatDateToStr} from "../../utils/dateUtils"

  export default {
    data() {
      return {
        publishNews: {}, //动态列表
        user_pic: require("../../assets/me_head.jpg"),
        logo:rootUrl+"/static/image/logo.png",
        camera:require("../../../static/img/camera.png"),
        publish_pic: '',
        pullupDefaultConfig: pullupDefaultConfig,
        pulldownDefaultConfig: pulldownDefaultConfig,
        showInput:false,
        inputText:'',
        current_index:-1,
        userData:{}
      }
    },
    components: {
      Scroller
    },
    mounted() {
      this.userData = this.$store.getters.getUserData;
      this.refresh(); //获取动态
      console.log("ccc")
    },
    computed:{
      hasInputData(){
        return this.inputText.length>0
      }
    },
    methods: {
      enterPublish(){
        this.$router.push({
          name:'publish'
        });
      },
      getFocus(index){
        this.current_index = index;
        console.log("获取焦点");
        console.log("current_index="+this.current_index)
        this.showInput = true;
        setTimeout(()=>{
          this.$refs.inputComment.focus();
          this.$store.commit('setShowTabbar',false);
          console.log(this.$store.getters.getTabbarState)
        },100);
      },
      inputBlur(){
        console.log("失去焦点");
        this.$refs.inputComment.blur();
        this.showInput = false;
        this.$store.commit('setShowTabbar',true);
      },
      sendData(){
        this.inputBlur();
        if (this.current_index>=0){

          console.log(this.publishNews.data[this.current_index]);
          let formData =  new FormData();
          formData.append("publish_id",this.publishNews.data[this.current_index].id);
          if (!this.userData.id) {
            formData.append("user_id",1);
          }else{
            formData.append("user_id",this.userData.id);
          }
          formData.append("comment_p_text",this.inputText);
          formData.append("comment_p_time",formatDateToStr(new Date(), "MM-dd hh:mm"));

          console.log(formData);

          //发送数据
          this.$post(urlObj.addPublishCommentUrl,formData)
            .then((res)=>{
              console.log(res);
              if (res.errno==100){
                this.$vux.toast.text(res.errMsg, 'center');
              }
            }).catch((err)=>{
            this.$vux.toast.text(err.msg, 'center');
          });
          this.setData();//刷新评论列表
        } else{
          console.log("current_index="+this.current_index);
          this.$vux.toast.text('评论失败', 'center');
        }

      },
      setData(){
        let appenData;
        if (this.userData.user_name) {
          appenData = {
            user_name:this.userData.user_name,
            comment_p_text:this.inputText
          };
        }else{
          appenData = {
            user_name:"陈辉龙",
            comment_p_text:this.inputText
          };
        }
        if (this.publishNews.data[this.current_index].publish_comment_details) {

          this.publishNews.data[this.current_index].publish_comment_details = this.publishNews.data[this.current_index].publish_comment_details.concat(appenData);
        }else{
          this.publishNews.data[this.current_index].publish_comment_details = appenData;
        }
        this.current_index = -1;
        this.inputText = '';
      },
      refresh() {
        console.log("refresh");
        this.$get(urlObj.communityUrl + "page=1").then((res) => {
          this.$refs.scrollerBottom.enablePullup()
          this.$refs.scrollerBottom.donePulldown()
          console.log(res.data);
          for (let item of res.data.data) {
            if (!item.user_pic) {
              item.user_pic = require("../../assets/me_head.jpg");
            } else {
              if(item.user_pic.indexOf("http") == -1){
                item.user_pic = rootUrl + item.user_pic;
              }
            }
            if (item.publish_pic) {
              item.publish_pic = rootUrl + item.publish_pic;
            }
          }
          this.publishNews = res.data;
        }).catch((response) => {
          this.$refs.scrollerBottom.enablePullup()
          this.$refs.scrollerBottom.donePulldown()
          console.log(response);
        })

      },


      loadMore() {
        console.log("loadMore");

        let page = this.publishNews.currentPage + 1;//请求第几页
        if (typeof (page) == "undefined") {
          page = 1;
        }
        if (page > this.publishNews.totalPages) {
          //没有更多数据
          this.$refs.scrollerBottom.donePullup()
          this.$vux.toast.text('数据都被加载完啦', 'bottom');
        } else {


          this.$get(urlObj.communityUrl + "page=" + page).then((res) => {
            this.$refs.scrollerBottom.donePullup()
            console.log(res.data);

            for (let item of res.data.data) {
              if (!item.user_pic) {
                item.user_pic = require("../../assets/me_head.jpg");
              } else {
                item.user_pic = rootUrl + item.user_pic;
              }
              if (item.publish_pic) {
                item.publish_pic = rootUrl + item.publish_pic;
              }
            }
            if (typeof (this.publishNews.data) == "undefined") {
              this.publishNews = res.data;
            } else {
              this.publishNews.count = res.data.count;
              this.publishNews.currentPage = res.data.currentPage;
              this.publishNews.pageSize = res.data.pageSize;
              this.publishNews.totalPages = res.data.totalPages;
              this.publishNews.data = this.publishNews.data.concat(res.data.data);
            }
          }).catch((response) => {
            this.$refs.scrollerBottom.donePullup()
            console.log(response);
          })
        }
      }
    },
  }
</script>

