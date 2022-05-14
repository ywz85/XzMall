<template>
  <view>
    <uni-list>
      <uni-list-item clickable title="" v-for="(item,index) in pager.data" :key="item.lid" @click="showDetails(item.lid)">
        <view slot="header" class="product-header">
          <img :src="$url.base+item.pic" alt="">
        </view>
        <view slot="body" class="product-body">
          <text class="title">{{item.title}}</text>
          <text class="price">{{item.price}}</text>
          <view class="bottom">
            <uni-tag class="tag" v-if="item.is_onsale=='1'" text="促销" type="error" size="mini"></uni-tag>
            <text class="comments">{{item.sold_count}}条热销评论</text>
            <text class="rate">好评率100%</text>
          </view>
        </view>
      </uni-list-item>
    </uni-list>
    <!-- 加载更多组件 -->
    <uni-load-more :status="loadStatus"></uni-load-more>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        kw:'', // 上个页面传递过来的商品查询过关键字
        pager:{
          pno:0,// 当前加载到那一页数据了
          data:[], // 当前页中已经加载的商品数据
        }, // 分页器对象
        loadStatus:'more', // 还有更多可加载
      };
    },
    methods:{
      // 项目难点
      // 页面加载时：直接加载第一页
      // 触底加载更多：加载下一页，保留前面的数据
      // 顶部下拉刷新: 清除已加载的数据，重新加载第一页
      loadNextPageData(){
        // 即将加载的页号
        let pno = this.pager.pno + 1;
        let url = this.$url.productList;
        // 发送异步请求
        uni.showLoading({
          title:'数据加载中...'
        });
        this.loadStatus = 'loading';
        uni.request({
          url,
          data:{pno, kw:this.kw},
          success:res=>{
            // console.log("数据",res.data);
            // this.pager = res.data; 这样写之前的数据会覆盖，应该追加在后面
            res.data.data = [...this.pager.data,...res.data.data];
            this.pager = res.data;
            // 判断当前页数是否大于等于总页数,修改最后底部的状态
            if(res.data.pno>=res.data.pageCount){
              this.loadStatus = 'nomore';
            }else {
              this.loadstatus = 'more';
            }
          },
          fail:err=> console.log(err),
          complete:()=>{
            uni.hideLoading();
            uni.stopPullDownRefresh();
          }
        })
      },
      showDetails(pid){
        // 跳转到商品详情页
        uni.navigateTo({
          url:'../product-details/product-details?pid=' + pid
        })
      },
    },
    onLoad(data){
      // 页面加载时可以读取上一个页面传递的跳转参数
      // 跳转参数数据可能有可能没有
      // console.log(data);
      if(data.bname){
        // 上个页面传递了要查询的品牌名称,修改导航条标题
        uni.setNavigationBarTitle({
          title: data.bname + '馆'
        })
      }
      // 如果上一页传递过来商品查询关键字，必须保存为模型变量
      if(data.kw){
        this.kw = data.kw;
      }
      this.loadNextPageData();
    },
    // 下拉刷新
    onPullDownRefresh(){
      // 清楚之前所有数据,重新加载第一页数据
      this.pager = {
        pno:0,
        data:[],
      }
      this.loadNextPageData();
    },
    // 生命周期或者说事件：页面滚动到底部了
    onReachBottom() {
      // console.log('页面到底了');
      if(this.loadStatus == 'more'){
        // 加载下一页
        this.loadNextPageData();
      }
    },
  }
</script>

<style lang="scss">
.product-header {
  img {
    width: 180rpx;
    height:180rpx;
    margin:-10rpx 0 -10rpx -30rpx;
  }
}
.product-body {
  display: flex;
  flex-direction: column;
  .title {
    font-size:$uni-font-size-sm;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient:vertical;
  }
  .price {
    font-size: $uni-font-size-sm + 1;
    font-weight: bold;
    color: $xz-theme;
  }
  .bottom {
    display: flex;
    align-items: center;
    font-size: $uni-font-size-sm;
    color: $uni-text-color-grey;
    transform: scale(.9);
    transform-origin: left center;
  }
}
</style>
