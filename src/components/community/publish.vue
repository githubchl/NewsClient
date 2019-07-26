<template>

  <div style="overflow: hidden;">
    <div class="main-header" style="position: relative;">
      <img src="../../assets/back.png" class="main-header-back" @click="back"/>
      <button class="main-header-button ripple" :class="{'publish-input-button-data':hasInputData}"
              @click="uploadPublish" :disabled="!hasInputData">发表
      </button>
    </div>
    <div>
      <group>
        <x-textarea :max="200" name="description" placeholder="这一刻的想法" v-model="inputText"></x-textarea>
      </group>

      <div style="margin: 10px 3vw 0 1vw;">
        <div v-for="imgUrl in imgList"
             style="align-items: center;display: flex;justify-content: center;height: 30vw;width: 30vw;float: left;margin-left: 2vw;margin-top: 5px;background: #f2f2f2;">
          <img style="height: 100%;width: 100%;" :src="imgUrl"/>
        </div>
      </div>

      <div @click="choose"
           style="align-items: center;display: flex;justify-content: center;height: 30vw;width: 30vw;float: left;margin-left: 2vw;margin-top: 5px;background: #f2f2f2;">
        <img style="height: 60px;width: 60px;" src="../../assets/addImg.png"/>
      </div>


    </div>
  </div>

</template>

<script>
  import {urlObj} from "../common/baseUrl.js"
  import {XTextarea, Group} from 'vux'
  import {formatDateToStr} from "../../utils/dateUtils"

  export default {
    name: "publish",
    data() {
      return {
        signData: {},
        imgList: [],
        inputText: '',
        userData:{}
      }
    },
    components: {
      XTextarea,
      Group
    },
    computed: {
      hasInputData() {
        return (this.inputText.length > 0) || (this.imgList.length > 0)
      }
    },
    mounted() {
      this.userData = this.$store.getters.getUserData;
      let that = this;
      console.log("url=" + window.location.href.split('#')[0]);

      let url = window.location.href.split('#')[0];


      this.$get(urlObj.sdkConfigUrl + "url=" + url).then((res) => {
        console.log(res);
        let data = res.data;

        this.signData = res.data;

        //this.$vux.toast.text(JSON.stringify(data), 'center');

        console.log("准备获取微信接口");
        that.$wx.config({
          // 开启调试模式,调用的所有api的返回值会在客户端alert出来，
          //若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: 'wxc6c8a7cc23355668', // 必填，公众号的唯一标识
          timestamp: data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.nonceStr, // 必填，生成签名的随机串
          signature: data.signature, // 必填，签名
          jsApiList: [
            // 所有要调用的 API 都要加到这个列表中
            'chooseImage',
          ]
        });

        that.$wx.ready(function () {
          that.$wx.checkJsApi({
            jsApiList: [
              'chooseImage'
            ],
            success: function (res) {
              this.$vux.toast.text("获取微信接口成功", 'center');
              console.log("获取微信接口成功")
              console.log(res)
            }
          });
          that.$wx.error(function (res) {
            this.$vux.toast.text("接口调取失败", 'center');
            console.log("接口调取失败");
            console.log(res);
          });
        });

      }).catch((response) => {
        this.$vux.toast.text("接口调取异常" + response.msg, 'center');
        console.log(response);
      });
    },
    methods: {
      choose() {
        let that = this;
        this.$wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            //var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            if (that.imgList.length > 0) {
              this.$vux.toast.text("暂时只支持一张图片", 'center');
            } else {
              that.imgList = res.localIds;
            }

          }
        });
      },
      uploadPublish() {

        this.$vux.loading.show({text: '正在上传'});

        let that = this;
        if (this.imgList.length>0){
          this.$wx.getLocalImgData({
            localId: that.imgList[0], // 图片的localID
            success: function (res) {
              let localData = res.localData; // localData是图片的base64数据，可以用img标签显示
              if (localData.indexOf('data:image') != 0) {
                localData = 'data:image/jpg;base64,' + localData
              }
              let fileName = new Date().getTime() + ".jpg";
              let imgFile = that.dataURLtoFile(localData, fileName);
              let formData = new FormData();// 创建form对象
              formData.append('img', imgFile);// 通过append向form对象添加数据,可以通过append继续添加数据
              that.sendData(formData,that)
            }
          });
        } else{
          let formData = new FormData();// 创建form对象
          this.sendData(formData,this);
        }

      },
      sendData(formData,that){
        formData.append("text", that.inputText);
        formData.append("user_id",that.userData.id);
        formData.append("publish_time",formatDateToStr(new Date(), "MM-dd hh:mm"));
        that.$post(urlObj.uploadPublishUrl, formData)
          .then((res) => {
            that.$vux.loading.hide();
            that.$vux.toast.text(res.data, 'center');
            that.back();
          }).catch((err) => {
          that.$vux.loading.hide();
          that.$vux.toast.text("上传失败", 'center');
        })
      },
      dataURLtoFile(dataurl, filename) {//将base64转换为文件
        let arr = dataurl.split(',');
        let mime = arr[0].match(/:(.*?);/)[1];
        let bstr = atob(arr[1]);
        let n = bstr.length;
        let u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type: mime});
      },
      back() {
        this.$router.go(-1);
      }
    },
  }
</script>

<style lang="sass">
  @import "../../style/main"
</style>
