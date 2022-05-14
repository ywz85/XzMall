<template>
  <view class="go-top" @click="goTop">
    <uni-icons type="arrow-up" color="#888" size="30"></uni-icons>
  </view>
</template>

<script>
  export default {
    name:"xz-go-top",
    data() {
      return {
        
      };
    },
    methods: {
      goTop() {
        uni.pageScrollTo({
          scrollTop:0,
          duration:100
        })
      }
    },
  }
</script>

<style lang="scss">
.go-top{
  position: fixed;
  right: 25rpx;
  bottom: 140rpx;
  // border: 1px solid #808080;
  background-color: #ccc;
  border-radius: 50%;
  opacity: .5;
  &:active {
    opacity:1;
  }
}
</style>
