<template>
  <view>
    <!-- 组件1用户登录 -->
    <uni-transition mode-class="slide-left" :show="isLoginShow" >
      <xz-login @showRegister="register" @showArchive="archive"></xz-login>
    </uni-transition>
    
    <!-- 组件2用户注册 -->
    <uni-transition mode-class="slide-right" :show="isRegisterShow" >
      <xz-register @showLogin="login"></xz-register>
    </uni-transition>
    <!-- 如果当前已经获得用户的登录信息，则显示“用户档案” -->
    <!-- 用户档案 -->
    <uni-transition mode-class="slide-right" :show="isArchiveShow">
      <xz-archive @showLogin="login"></xz-archive>
    </uni-transition>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        isLoginShow:true, // 登录组件显示状态
        isArchiveShow:false,
        isRegisterShow:false,
      };
    },
    onLoad() {
    },
    methods: {
      archive(state) {
        this.isArchiveShow = state;
        this.isLoginShow = !state;
        this.isRegisterShow = !state;
      },
      login(state){
        this.isLoginShow = state;
        this.isArchiveShow = !state;
        this.isRegisterShow = !state;
      },
      register(state) {
        this.isRegisterShow = state;
        this.isLoginShow = !state;
        this.isArchiveShow = !state;
      }
    },
  }
</script>

<style lang="scss">

</style>
