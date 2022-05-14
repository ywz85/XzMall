<template>
  <view>
    <!-- f1搜索栏 -->
    <xz-search-bar></xz-search-bar>
    <!-- f2轮播广告 -->
    <view class="carousel">
      <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" indicator-active-color="#0aa1ed">
        <swiper-item v-for="(c,i) in carouselItems" :key="i">
          <view class="swiper-item">
            <image :src="$url.base + c.img"/>
          </view>
        </swiper-item>
      </swiper>
    </view>

    <!-- f3首页推荐 -->
    <uni-card :isFull="true" padding="0">
      <view slot="title" class="card-title">
        <image src="../../static/img/computer_icon.png"></image>
        <text>首页推荐</text>
        <navigator open-type="navigate" url="../product-list/product-list">更多</navigator>
      </view>
      <uni-grid :column="2" :square="false" :showBorder="false">
        <uni-grid-item v-for="(item,index) in recommendedItems" :key="item.pid">
          <uni-card class="grid-card" margin="8rpx" padding="0">
            <image class="pic" :src="$url.base+item.pic"></image>
            <view class="title">
              <text>{{item.title}}</text>
            </view>
            <view class="bottom">
              <text>{{item.price}}</text>
              <button type="primary" size="mini" style="transform: scale(0.9);" @click="showDetails(item.href)">查看详情</button>
            </view>
          </uni-card>
        </uni-grid-item>
      </uni-grid>
    </uni-card>
    <!-- f4最新上架 -->
    <uni-card :isFull="true" padding="0">
      <view slot="title" class="card-title">
        <image src="../../static/img/computer_icon.png"></image>
        <text>最新上架</text>
        <navigator open-type="navigate" url="../product-list/product-list">更多</navigator>
      </view>
      <uni-grid :column="2" :square="false" :showBorder="false">
        <uni-grid-item v-for="(item,index) in newArrivalItems" :key="item.pid">
          <uni-card class="grid-card" margin="8rpx" padding="0">
            <image class="pic" :src="$url.base+item.pic"></image>
            <view class="title">
              <text>{{item.title}}</text>
            </view>
            <view class="bottom">
              <text>{{item.price}}</text>
              <button type="primary" size="mini" style="transform: scale(0.9);" @click="showDetails(item.pid)">查看详情</button>
            </view>
          </uni-card>
        </uni-grid-item>
      </uni-grid>
    </uni-card>
    <!-- f5热销单品 -->
    <uni-card :isFull="true" padding="0">
      <view slot="title" class="card-title">
        <image src="../../static/img/computer_icon.png"></image>
        <text>热销单品</text>
        <navigator open-type="navigate" url="../product-list/product-list">更多</navigator>
      </view>
      <uni-grid :column="2" :square="false" :showBorder="false">
        <uni-grid-item v-for="(item,index) in topSaleItems" :key="item.pid">
          <uni-card class="grid-card" margin="8rpx" padding="0">
            <image class="pic" :src="$url.base+item.pic"></image>
            <view class="title">
              <text>{{item.title}}</text>
            </view>
            <view class="bottom">
              <text>{{item.price}}</text>
              <button type="primary" size="mini" style="transform: scale(0.9);" @click="showDetails(item.pid)">查看详情</button>
            </view>
          </uni-card>
        </uni-grid-item>
      </uni-grid>
    </uni-card>
    <!-- f6底部菜单/版权声明 -->
    <xz-footer></xz-footer>
    <!-- f7页签栏 -->
    <!-- （固定定位）返回顶部 -->
    <xz-go-top></xz-go-top>
  </view>
</template>

<script>
  export default {
    data(){
      return{
        carouselItems:[],
        newArrivalItems:[],
        recommendedItems:[],
        topSaleItems:[],
      }
    },
    methods: {
      showDetails(href) {
        console.log('商品href',href);
        let pid = href.split("?").pop().split("=").pop();
        uni.navigateTo({
          url:'../product-details/product-details?pid=' + pid
        })
      },
      // matchPid(str){
      //   let firstArr = str.split("?");
      //   let result = firstArr[-1].split("=");
      //   return result[-1];
      // }
    },
    onLoad(){
      // 页面加载时，异步请求服务端首页数据
      uni.showLoading({
        title:'数据加载中...'
      })
      let url = this.$url.indexData;
      // console.log(url);
      uni.request({
        url,
        success:res=>{
          this.carouselItems = res.data.carouselItems;
          this.newArrivalItems = res.data.newArrivalItems;
          console.log('首页推荐',res.data.newArrivalItems);
          this.recommendedItems = res.data.recommendedItems;
          console.log('热销单品',res.data.recommendedItems);
          this.topSaleItems = res.data.topSaleItems;
          console.log('热销单品', res.data.topSaleItems);
        },
        fail:err=>{console.log(err);},
        complete:()=>{
          uni.hideLoading()
        }
      })
    }
  }
</script>

<style lang="scss">
page {
  background-image: linear-gradient(180deg, $xz-theme 65px, $uni-bg-color-grey 200px);
}
.carousel {
  margin: 10rpx;
  border-radius: $uni-border-radius-lg;
  overflow: hidden;
  swiper {
    width:730rpx;
    height:292rpx;
    .swiper-item {
      image {
        width:730rpx;
        height:292rpx;
      }
    }
  }
}
.card-title {
  display: flex;
  align-items:center;
  image {
    width: 40rpx;
    height:30rpx;
    margin: 10rpx 10rpx 10rpx 0;
  }
  text {
    flex:1;
  }
  navigator {
    color:$uni-text-color-grey;
    font-size:$uni-font-size-sm;
  }
}
  .grid-card {
    .pic {
      width: 280rpx;
      height: 220rpx;
    }
    .title {
      font-size: $uni-font-size-sm;
      // 让文字最多显示一行，溢出内容省略号代替
      // 1.文字空白处:不允许折行
      white-space:nowrap;
      // 2，溢出文本隐藏
      overflow: hidden;
      // 3.文本溢出,省略号代替
      text-overflow: ellipsis;
    }
    .bottom {
      display: flex;
      align-items: center;
      text {
        font-size:$uni-font-size-sm;
        color: $xz-theme;
      }
      button {
        padding:0 10rpx;
        font-size: $uni-font-size-sm;
      }
    }
  }
</style>