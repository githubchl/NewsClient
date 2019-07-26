<template>
  <div style="height:100%;">
    <!-- 页面切换时显示loading -->
    <div v-transfer-dom>
      <loading v-model="isLoading"></loading>
    </div>

    <drawer
      width="200px;"
      :show.sync="drawerVisibility"
      :show-mode="showModeValue"
      :placement="showPlacementValue"
      :drawer-style="{'background-color':'#35495e', width: '200px'}">

      <!-- main content -->
      <view-box ref="viewBox" ><!-- :body-padding-top="isShowNav ? '46px' : '0'" body-padding-bottom="55px" -->

        <transition
          @after-enter="$vux.bus && $vux.bus.$emit('vux:after-view-enter')"
          :name="viewTransition" :css="!!direction">
          <router-view class="router-view"></router-view>
        </transition>

      </view-box>
    </drawer>
  </div>
</template>

<script>
  import {  Drawer, ViewBox, Loading, TransferDom } from 'vux'
  import { mapState, mapActions } from 'vuex'

  export default {
    directives: {
      TransferDom
    },
    components: {
      Drawer,
      ViewBox,
      Loading,
    },
    methods: {
      ...mapActions([
        'updateDemoPosition'
      ])
    },
    mounted () {
      this.handler = () => {
        if (this.path === '/demo') {
          this.box = document.querySelector('#demo_list_box')
          this.updateDemoPosition(this.box.scrollTop)
        }
      }
    },
    beforeDestroy () {
      this.box && this.box.removeEventListener('scroll', this.handler, false)
    },
    watch: {
      path (path) {
        if (path === '/component/demo') {
          this.$router.replace('/demo')
          return
        }
        if (path === '/demo') {
          setTimeout(() => {
            this.box = document.querySelector('#demo_list_box')
            if (this.box) {
              this.box.removeEventListener('scroll', this.handler, false)
              this.box.addEventListener('scroll', this.handler, false)
            }
          }, 1000)
        } else {
          this.box && this.box.removeEventListener('scroll', this.handler, false)
        }
      }
    },
    computed: {
      ...mapState({
        route: state => state.route,
        path: state => state.route.path,
        deviceready: state => state.app.deviceready,
        demoTop: state => state.vux.demoScrollTop,
        isLoading: state => state.vux.isLoading,
        direction: state => state.vux.direction
      }),
      viewTransition () {
        if (!this.direction) return ''
        return 'vux-pop-' + (this.direction === 'forward' ? 'in' : 'out')
      }
    },
    data () {
      return {

        drawerVisibility: false,
        showMode: 'push',
        showModeValue: 'push',
        showPlacement: 'left',
        showPlacementValue: 'left'
      }
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/tap.less';

  body {
    background-color: #fbf9fe;
  }

  html,body{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }


  .header {
    background: #FA4848;
    height: 8vh;
    color: #FFCBA9;
    width: 100%;
    position: fixed;
    z-index: 5;
  }


  .ripple {
    position: relative;
  }

  .ripple:focus {
    outline: none;
  }

  .ripple:after {
    content: "";
    display: block;
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    pointer-events: none;
    background-color: #333;
    background-repeat: no-repeat;
    background-position: 50%;
    opacity: 0;
    transition: all .3s;
  }

  .ripple:active:after {
    opacity: .3;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: 0s;
  }

  .router-view {
    width: 100%;
  }

  /*动画*/
  .vux-pop-out-enter-active,
  .vux-pop-out-leave-active,
  .vux-pop-in-enter-active,
  .vux-pop-in-leave-active {
    will-change: transform;
    transition: all 500ms;
    height: 100%;
    position: absolute;
    backface-visibility: hidden;
    perspective: 1000;
  }
  .vux-pop-out-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  .vux-pop-out-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .vux-pop-in-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .vux-pop-in-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
</style>

