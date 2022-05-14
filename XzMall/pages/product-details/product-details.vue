<template>
  <view>
    <!-- 轮播 -->
    <uni-card is-full>
      <swiper circular indicator-dots :style="{height:580+'rpx'}">
        <swiper-item v-for="item in product.picList" >
          <image :src="$url.base + item.md" mode="widthFix"></image>
        </swiper-item>
      </swiper>
    </uni-card>
    <!-- 主标题+副标题 -->
    <uni-card class="title-box" is-full>
      <text class="main-title">{{product.title}}</text>
      <br>
      <text class="minor-title">{{product.subtitle}}</text>
    </uni-card>
    <!-- 售价承诺 -->
    <view class="price">
      <text>学员售价:￥{{product.price}}</text>
      <text>服务承诺:{{product.promise}}</text>
    </view>
    <!-- 规格 -->
    <uni-card class="specification" is-full>
      <view class="option">
          <text>规格:</text>
          <view>
            <view @click="select(index)" :class="selectLi==index?'option-item active':'option-item'" v-for="item,index in family.laptopList" :key="index">{{item.spec}}</view>
          </view>
      </view>
      <!-- 计数器 -->
      <view class="quantity">
        <text>数量:</text>
        <view class="counter">
          <text @click="num>=0?num-=1:num-0">-</text>
          <text>{{num>=0?num:0}}</text>
          <text @click="num+=1">+</text>
        </view>
      </view>
      <!-- 按钮 -->
      <view class="button">
        <button size="mini">立即购买</button>
        <button size="mini" type="primary">加入购物车</button>
      </view>
    </uni-card>
    <!-- 为您推荐 -->
    <uni-card title="为您推荐" is-full>
      <scroll-view scroll-x>
        <view class="suggest-list" :style="{width:250*suggestList.length+'rpx'}">
          <view class="suggest" v-for="(item,index) in suggestList" :key="item.lid">
            <image :src="$url.base + item.pic" mode="widthFix"></image>
            <text>{{item.lname}}</text>
          </view>
        </view>
      </scroll-view>
    </uni-card>
    <!-- 商品详情 -->
    <uni-card title="商品详情" is-full>
      <!-- 内置组件：富文本组件 -->
      <!-- <text>{{product.details}}</text> -->
      <rich-text :nodes="product.details"></rich-text>
    </uni-card>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        num:0,
        selectLi:0,
        family:{}, // 商品型号信息/img/product/md/57b12a31N8f4f75a3.jpg
        product:{}, // 商品详情信息
        suggestList:[
          {lid: 10, lname:'ThinkPadS2 13.3超霸', pic:'img/product_detail/product_detail_1.png'},
					{lid: 12, lname:'戴尔 DELL燃7000', pic:'img/product_detail/product_detail_2.png'},
					{lid: 15, lname:'戴尔魔方R2505TSS', pic:'img/product_detail/product_detail_3.png'},
					{lid: 17, lname:'联想 YOGA900 多彩版', pic:'img/product_detail/product_detail_4.png'},
        ], // 真正项目中此数据来自后端接口
      };
    },
    onLoad(data){
      // console.log(data);
      let pid = data.pid;
      // 开发阶段有时不是从商品列表页跳转过来,而是直接刷新页面
      if(!pid){
        pid = 1; // 强行跳转回商品列表页
      }
      // 根据编号查询过出商品详情
      let url = this.$url.productDetails;
      // console.log(url);
      uni.showLoading({
        title:'详情加载中...'
      });
      uni.request({
        url,
        data:{lid:pid},
        success:res=>{
          console.log(res.data);
          this.family = res.data.family;
          this.product = res.data.product;
          // 处理商品详情数据,把所有src替换
          this.product.details = this.product.details.replace(/src="img/gi,`src="${this.$url.base}img`);
          this.product.details = this.product.details.replace(/<img/gi,`<img style="width:100%"`);
          uni.setNavigationBarTitle({
            title:this.product.lname
          })
        },
        fail:err=>{
          console.log(err);
        },
        complete: () => {
          uni.hideLoading();
        }
      })
    },
    methods: {
      select(index) {
        return this.selectLi = index;
      }
    },
  }
</script>

<style lang="scss">
.active {
  border: 1px solid $xz-theme;
  color:$xz-theme;
}
.title-box {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  ;
  .main-title {
    font-size: 16px;
  }
  .minor-title {
    font-size: 13px;
    color: #ccc;
  }
}
.price {
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  color: rgb(111,111,108);
  text {
    display: block;
    width: 90%;
    margin: 10rpx;
  }
}
.specification {
  .option{
    display: flex;
    text {
      margin-top: 2px;
    }
    view {
      margin-left: 6px;
    }
    .option-item {
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 1px 4px;
      margin: 3px 0;
    }
  }
  .quantity {
    margin-top: 5px;
    display: flex;
    .counter{
      margin: 0 20rpx;
      text {
        display: inline-block;
        width:70rpx;
        height:70rpx;
        text-align: center;
        line-height: 70rpx;
        border:1px solid #ccc;
        border-radius: 15rpx;
        // padding:2px;
        font-size: 40rpx;
        margin: 0 4rpx;
        &:not(:nth-child(2)):active {
          border: 1px solid $xz-theme;
          color: $xz-theme;
        }
      }
    }
  }
  .button {
    // border: 1px solid red;
    width:100%;
    display: flex;
    justify-content: center;
    margin-top: 10px;
    button {
      padding: 3px 8px;
    }
  }
}
.suggest-list {
  display: flex;
  .suggest {
    width: 250rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    image {
      width: 90%;
    }
    text {
      font-size: $uni-font-size-sm;
      white-space: nowrap;
      transform:scale(.9);
    }
  }
}

</style>
