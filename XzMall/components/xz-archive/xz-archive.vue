<template>
  <view class="userArchive">
    <uni-card class="card" is-shadow padding="25rpx">
      <!-- 用户头像 -->
      <view class="image">
        <image class="avatar" :src="`http://www.codeboy.com:9999/${avatar}`" mode="widthFix" style="width: 200rpx;"></image>
      </view>
      <view class="input-group">
        <text>用户名:</text>
        <uni-easyinput  v-model="uname" placeholder="" :inputBorder="false" :clearable="false"/>
        <button class="fixme" type="default" @click="fixData()">修改</button>
      </view>
      <view class="input-group">
        <text>性别:</text>
        <uni-easyinput  v-model="usex" placeholder="" :inputBorder="false" :clearable="false"/>
        <button class="fixme" type="default" @click="toggle(usex)">修改</button>
      </view>
      <view class="input-group">
        <text>邮箱:</text>
        <uni-easyinput  v-model="uemail" placeholder="" :inputBorder="false" :clearable="false"/>
        <button class="fixme" type="default" @click="fixData()">修改</button>
      </view>
      <view class="input-group">
        <text>电话:</text>
        <uni-easyinput  v-model="uphone" placeholder="" :inputBorder="false" :clearable="false"/>
        <button class="fixme" type="default" @click="fixData()">修改</button>
      </view>
      <button class="sign-out" @click="signOut">退出登录</button>
    </uni-card>
  </view>
</template>

<script>
  export default {
    name:"xz-archive",
    data() {
      return {
        avatar:'',
        uname:'',
        usex:'',
        uemail:'',
        uphone:'',
        loginState:true,
        // uid:0,
        gender:0
      };
    },
    methods: {
      toggle(sex){
        let email = this.uemail;
        let phone = this.uphone;
        let user_name = this.uname;
        console.log(this.uid);
        if(sex=='男'){
          this.gender=1;
        }else if(sex=='女'){
          this.gender=0;
        }else{
          uni.showToast({
            title:'性别格式错误',
            icon:'error'
          });
        }
        uni.request({
          url:'http://www.codeboy.com:9999/data/user/update',
          method:"POST",
          data:{email,phone,gender:this.gender,user_name},
          success:(res)=>{
            console.log('发送成功');
            console.log(res);
            if(res.code==200){
              uni.showToast({
                title:'更改成功',
                icon:'success'
              });
            }else if(res.code==501){
              uni.showToast({
                title:'更改失败',
                icon:'error'
              });
            }else if(res.code==404){
              uni.showToast({
                title:'性别为空',
                icon:'error'
              });
            }
          },
          fail:(err)=>{
            console.log(err);
          }
        })
      },
      signOut() {
        this.$emit('showLogin',this.loginState);
      },
      fixData(){
        let email = this.uemail;
        let phone = this.uphone;
        let user_name = this.uname;
        uni.request({
          url:'http://www.codeboy.com:9999/data/user/update',
          method:'POST',
          header:{'content-Type':'application/x-www-form-urlencoded'},
          data:{email,phone,gender:this.gender,user_name},
          success:(res)=>{
            console.log(res);
            if(res.code==200){
              uni.showToast({
                title:'修改成功',
                icon:'success'
              });
            }
            else if(res.code==402){
              uni.showToast({
                title:'邮箱为空',
                icon:'error'
              })
            }
            else if(res.code==403){
              uni.showToast({
                title:'电话为空',
                icon:'error'
              })
            }
            else if(res.code==405){
              uni.showToast({
                title:'姓名为空',
                icon:'error'
              })
            }
            else if(res.code==501){
              uni.showToast({
                title:"更改失败",
                icon:'error'
              })
            }
          },
          fail:(err)=>{
            console.log(err)
          }
        })
      },
    },
    mounted() {
      uni.setNavigationBarTitle({
        title:'用户档案'
      });
      
      uni.showLoading({
        title:'加载中'
      })
      // TODO 获取用户信息并显示在页面中
      const url = this.$url.profile;
      const uid = this.uid;
      uni.request({
        url,
        method:'GET',
        data:{uid},
        success:res=>{
          // console.log('用户信息：',res);
          // console.log('---------',this.uname);
          this.uname = res.data.user_name;
          this.usex = res.data.gender==0?'女':'男';
          this.uemail = res.data.email;
          this.uphone = res.data.phone;
          this.avatar = res.data.avatar;
        },
        fail:err=>{
          uni.showToast({
            title:'请求失败',
            icon:"error"
          })
        },
        complete:()=>{
          uni.hideLoading();
        }
      })
    }
  }
</script>

<style lang="scss">
.userArchive {
  position: absolute;
  top:0;
  width: 750rpx;

  .image {
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: none;
    widows: 100%;
    height: 250rpx;
  }
  .input-group {
    border-bottom: 1px solid $uni-bg-color-grey;
    display: flex;
    align-items: center;
    margin: $uni-spacing-col-lg;
    padding:$uni-spacing-col-sm;
    text {
      color:$uni-text-color;
    }
    .fixme {
      height: 50rpx;
      font-size: $uni-font-size-sm;
    }
    
  }  
  .sign-out {
    margin-top: 260rpx;
    color:$xz-theme;
    border: 1px solid $xz-theme;
    background-color: #fff;
    font-size: $uni-font-size-base;
    width: 33%;
  }
}
</style>