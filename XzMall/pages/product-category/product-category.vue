<template>
  <view class="page">
    <!-- 左侧滚动视图：商品类目 -->
    <scroll-view scroll-y="true" class="left" :style="{height:windowHeight+'px'}">
      <view>
        <uni-list>
          <uni-list-item @click="switchCategory(index)" clickable :title="item.cname" :class="{category:true,active:index===curCategory}" v-for="(item,index) in categoryList" :key="index"></uni-list-item>
        </uni-list>
      </view>
    </scroll-view>
    <!-- 右侧滚动视图：该类目下对应的商品 -->
    <scroll-view scroll-y="true" class="right" :style="{height:windowHeight+'px'}">
      <view>
        <uni-list>
          <uni-list-item v-for="(item, index) in productList" :key="item.lid" :title="item.title" ellipsis="2" :thumb="$url.base + item.pic" thumbSize="lg" link="navigateTo" :to="`../product-details/product-details?pid=${item.lid}`"></uni-list-item>
        </uni-list>
      </view>
    </scroll-view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        windowHeight:0,
        categoryList:[],
        curCategory:-1, // 当前展示的类别
        productList:'',
      };
    },
    watch:{
      curCategory(){
        // 监视this.curCategory值的改变
        // console.log('当前商品类别编号改变了');
        let url = this.$url.productList;
        let kw = this.categoryList[this.curCategory].keywords
        // console.log(url);
        // console.log(kw);
        uni.showLoading({
          title:'商品加载中...'
        });
        uni.request({
          url,
          data:{kw} ,// 查询对象中的数据，对象形式可以自动转换成键值对
          success:res=>{
            // console.log(res.data); 响应消息主体时一个分页器对象
            // res.data.data 是分页器对象中的数据属性，保存当前页所有商品
            this.productList = res.data.data;
          },
          fail:err=>{
            console.log(err);
          },
          complete:()=>{
            uni.hideLoading();
          }
        });
      },
    },
    methods: {
      switchCategory(i) {
        console.log(i);
        this.curCategory = i;
      }
    },
    onLoad(){
      // 页面加载时获取系统信息
      uni.getSystemInfo({
        success:result=>{
          // console.log(result);
          this.windowHeight = result.windowHeight;
        }
      });
      // 页面加载时,异步请求商品分类信息
      uni.showLoading({
        title:'分类加载中...'
      });
      let url = this.$url.productCategory;
      uni.request({
        url,
        success:res=>{
          // console.log('res.data',res.data);
          // this.categoryList = res.data;
          // 因为服务器端返回数据太少了,所以伪造数据体现滚动效果
          this.categoryList = [...res.data,...res.data]
          // 将当前显示分类的下标改为0
          this.curCategory = 0;
        },
        fail:err=>{
          console.log(err);
        },
        complete:()=>{
          console.log('请求完成');
          uni.hideLoading();
        }
      })
    }
  }
</script>

<style lang="scss">
.page {
  display:flex;
  .left {
    width:215rpx;
    flex-shrink: 0; // 收缩权重为0,不进行收缩
    .category {
      font-size:$uni-font-size-sm;
      background-color: $uni-bg-color-grey;
      &.active {
        background-color: #fff;
      }
    }
  }
  .right {
    flex:1;
    width:535rpx;
  }
}
</style>
