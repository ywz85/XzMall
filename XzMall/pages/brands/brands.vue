<template>
  <view>
    <!-- 四行三列宫格 -->
    <uni-grid :column="3" :square="false"></square>
      <uni-grid-item v-for="(item,index) in brandList" :key="item.bid">
        <view class="brand" @click="showProducts(index)">
          <uni-badge :text="item.popularity" type="error" absolute="rightTop" :offset="[2,-2]" :maxNum="9999">            
            <image mode="widthFix" :src="$url.base + item.logo"></image>
          </uni-badge>
          <text>{{item.name}}</text>
        </view>
      </uni-grid-item>
    </uni-grid>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        brandList: [],
      };
    },
    methods: {
      showProducts(i) {
        let bname = this.brandList[i].bname;
        let kw = this.brandList[i].keywords;
        // 跳转到商品列表页
        uni.navigateTo({
          url: `../product-list/product-list?bname=${bname}&$kw=${kw}`
        })
      }
    },
    onLoad(){
      // 页面加载完成时
      uni.showLoading({
        title:'加载中...'
      });
      let url = this.$url.brandList;
      // console.log(url);
      uni.request({
        url,
        success:res=>{
          this.brandList = res.data;
        },
        fail:err=>{
          console.log('请求失败');
        },
        complete:()=>{
          uni.hideLoading();
        }
      })
    }
  }
</script>

<style lang="scss">
.brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding:$uni-spacing-col-lg 0;
  image {
    width:220rpx;
  }
}
</style>
