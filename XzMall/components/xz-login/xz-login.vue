<template>
  <view class="login">
    <!-- 用户名输入f1 -->
    <view class="input-group">
      <uni-easyinput type="text" v-model="uname" placeholder="用户名/邮箱/手机号" :inputBorder="false"/>
    </view>
    <!-- 密码输入框f2 -->
    <view class="input-group">
      <uni-easyinput  v-model="upwd" placeholder="请输入密码" type="password" :inputBorder="false"/>
      <text> | </text>
      <navigator url="../../pages/index/index"> 忘记密码 </navigator>
    </view>
    <!-- 登录按钮f3 -->
    <view :class="{button:true, disabled:!agree}" @click="goLogin">
      <text>登录</text>
    </view>
    <!-- 打开注册组件文字f4 -->
    <text class="go" @click="goRegister">还没账号?现在去注册</text>
    <!-- 其他登录方式f5 -->
    <!-- 使用条款 -->
    <view class="agreement">
      <checkbox-group @change="doCheckBoxChange">
        <label>
          <checkbox color="#0aa1ed"/><text>登录代表您已同意用户隐私条款</text>
        </label>
      </checkbox-group>
    </view>
  </view>
</template>

<script>
  export default {
    name:"xz-login",
    data() {
      return {
        uname:'ywz',
        upwd:'Ywz@85',
        registerState:true,
        archiveState:true,
        agree:false, // 用户是否同意条款
      };
    },
    methods:{
      doCheckBoxChange(e){
        // console.log(e.detail.value);
        this.agree = e.detail.value.length === 1;
      },
      goRegister(){
        // 从登录组件跳转到注册组件，需要向父组件传递自定义事件
        this.$emit('showRegister',this.registerState);
      },
      goLogin(){
        if(!this.agree){
          uni.showToast({
            title:'请同意使用条款',
            icon:'error'
          });
          return
        }
        uni.showLoading({
          title:'登陆中'
        });
        let uname = this.uname.trim();
        let upwd = this.upwd.trim();
        let url = this.$url.login;
        uni.request({
          url,
          method:'POST',
          header:{'content-Type':'application/x-www-form-urlencoded'},
          data:{uname,upwd},
          success:res=>{
            // console.log('登录信息：------------------',res);
            if(res.data.code === 200){
              uni.showToast({
                title:'登录成功'
              });
              this.$emit('showArchive',this.archiveState);
            }else{
              uni.showToast({
                title:'用户名或密码错误',
                icon:'error'
              })
            }
          },
          fail:err=>{
            console.log(err);
          },
          complete:()=>{
            uni.hideLoading();
          }
        })
      },
    },
    // 组件挂载完成
    mounted() {
      uni.setNavigationBarTitle({
        title:'用户登录'
      })
    }
  }
</script>

<style lang="scss">
.login {
  position: absolute;
  top:0;
  width: 750rpx;
  padding:50rpx;
  .input-group {
    border-bottom: 1px solid $uni-text-color-grey;
    margin-bottom: $uni-spacing-col-lg;
    display: flex;
    align-items: center;
    text {
      color: $uni-text-color-grey;
      margin: 0 $uni-spacing-row-base;
    }
    navigator {
      color: $uni-text-color-grey;
    }
  }
  .button {
    background-color: $xz-theme;
    // border-radius: $uni-border-radius-lg;
    border-radius: 40rpx;
    text-align: center;
    color: #FFFFFF;
    line-height: 80rpx;
    margin-top: 100rpx;
    margin-bottom: 20rpx;
    &:active {
      background-color: darken($xz-theme, 5%);
    }
    &.disabled {
      background-color: $uni-text-color-disable;
    }
  }
  .go {
    margin-left: 20rpx;
    color: $uni-text-color-grey;
  }
  .agreement {
    // border: 1px solid red;
    text-align: center;
    margin-top: 80rpx;
    font-size: $uni-font-size-sm;
  }
}
</style>
