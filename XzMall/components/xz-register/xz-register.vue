<template>
  <view class="register">
    <!-- 用户名输入f1 -->
    <view class="input-group">
      <uni-easyinput type="text" v-model="uname" placeholder="用户名 3到8位(字母/数字/下划线/减号)" :inputBorder="false"/>
    </view>
    <!-- 密码输入框f2 -->
    <view class="input-group">
      <uni-easyinput  v-model="upwd" placeholder="密码最少6位,至少1个大写字母/小写字母/数字/特殊字符" type="password" :inputBorder="false"/>
    </view>
    <view class="input-group">
      <uni-easyinput  v-model="rpwd" placeholder="验证密码" type="password" :inputBorder="false"/>
    </view>
    <view class="input-group">
      <uni-easyinput  v-model="email" placeholder="请输入邮箱" type="text" :inputBorder="false"/>
    </view>
    <view class="input-group">
      <uni-easyinput  v-model="phone" placeholder="请输入手机号" type="number" :inputBorder="false"/>
    </view>
    <!-- 提示弹窗 -->
    <uni-popup ref="popup" type="center"></uni-popup>
    <!-- 登录按钮f3 -->
    <view class="button" @click="doLogin">
      <text>注册</text>
    </view>
    <!-- 打开登录组件文字f4 -->
    <text class="go" @click="goLogin">已有账号?现在去登录</text>
    <!-- 其他登录方式f5 -->
  </view>
</template>

<script>
  export default {
    name:"xz-register",
    data() {
      return {
        uname:'',
        upwd:'',
        rpwd:'',
        email:'',
        phone:'',
        loginState:true,
      };
    },
    methods: {
      goLogin(){
        this.$emit('showLogin',this.loginState);
      },
      doLogin() {
        const nameReg = /^[a-zA-Z0-9_-]{3,8}$/; // 3到8位（字母，数字，下划线，减号）
        const pwdReg = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/; // 最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
        const emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; 
        const phoneReg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
        let uname= this.uname;
        let upwd = this.upwd;
        let rpwd = this.rpwd;
        let email = this.email;
        let phone = this.phone;
        const url = this.$url.register;
        if(!nameReg.test(uname)){
          uni.showToast({
            title:'用户名错误',
            icon:'error'
          })
          return
        }
        else if (!pwdReg.test(upwd)){
          uni.showToast({
            title:'用户密码格式错误',
            icon:'error'
          })
          return
        }
        else if(!rpwd==upwd){
          uni.showToast({
            title:'验证错误',
            icon:'error'
          })
          return
        }
        else if(!emailReg.test(email)){
          uni.showToast({
            title:'邮箱错误',
            icon:'error'
          })
          return
        }
        else if(!phoneReg.test(phone)){
          uni.showToast({
            title:'手机号码错误',
            icon:'error'
          })
          return
        }
        uni.showLoading({
          title:'注册中',
        })
        uni.request({
          url,
          method:'POST',
          header:{'content-Type':'application/x-www-form-urlencoded'},
          data:{uname,upwd,email,phone},
          success:res=>{
            // 登录成功,显示成功对话框,跳转到登录界面
            console.log(res);
            if(res.data.code ===200){
              uni.showToast({
                title:'注册成功',
                icon:"success"
              }),
              this.$emit('showLogin',this.loginState);
            }else{
              uni.showToast({
                title:'请填写每一项',
                icon:"error"
              })
            }
          },
          fail:err=>{
            uni.showToast({
              title: '请求失败',
              icon:"error"
            });
          },
          complete:()=>{
            uni.hideLoading();
          }
        });
        // 使用正则表达式检测输入的注册内容是否合格
        // this.$emit('showLogin',this.loginState);
      }
    },
    // 组件挂载完成
    mounted() {
      uni.setNavigationBarTitle({
        title:'用户注册'
      })
    }
  }
</script>

<style lang="scss">
.register {
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
  }
  .go {
    margin-left: 20rpx;
    color: $uni-text-color-grey;
  }
}
</style>
