<template>
  <view class="footer">

    <view class="f2">
      <view class="item">
        <image class="icon" src="http://www.codeboy.com:9999/img/footer/icon1.png"></image>
        <text class="txt">品质保障</text>
      </view> 
      <view class="item">  
        <image class="icon" src="http://www.codeboy.com:9999/img/footer/icon2.png"></image>
        <text class="txt">私人定制</text>
      </view> 
      <view class="item">  
        <image class="icon" src="http://www.codeboy.com:9999/img/footer/icon3.png"></image>
        <text class="txt">学员特供</text>
      </view> 
      <view class="item">  
        <image class="icon" src="http://www.codeboy.com:9999/img/footer/icon4.png"></image>
        <text class="txt">专属特权</text>
      </view>
    </view>
    <view class="f3"></view>
  </view>
</template>

<script>
  export default {
    name:"xz-footer",
    data() {
      return {
        
      };
    },
  }
</script>

<style lang="scss">

  .footer {
    background-color: #fff;
    box-shadow: 0 0 8rpx $uni-border-color;
    margin:$uni-spacing-col-lg 0;

    .f2 {
      display: flex;
      .item{
        flex:1;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding:$uni-spacing-col-base;
        border-bottom:1px solid $uni-border-color;
        .icon {
          // uni-app中图片的尺寸默认320*240，不论原始尺寸
          width:100rpx;
          height:100rpx;
        }        
      }
    }
  }
</style>
