<template>
  <view>
    <!-- f1 搜索条 只在当前页面作用-->
    <view class="search-bar">
      <uni-icons class="icon" type="back" color="#fff" size="26" @click="back"></uni-icons>
      <uni-search-bar class="input" @confirm="search" placeholder="输入商品关键字" cancelButton="none" v-model="kw"/>
    </view>
    <!-- f2 搜索结果 -->
    <uni-list>
      <uni-list-item v-for="(item,index) in pager.data" :key="item.lid" :title="item.title" ellipsis="1" :thumb="$url.base+item.pic" link="navigateTo" :to="`../product-details/product-details?pid=${item.lid}`"></uni-list-item>
    </uni-list>
    <!-- f3 搜索建议 -->
    <uni-card title="热门搜索" is-full>
      <view class="suggest-list">
        <uni-tag @click="tagSearch(item.name)" class="suggest" :text="item.name" :type="item.type" circle size="default" v-for="(item,index) in suggestList" :key="index"></uni-tag>
      </view>
    </uni-card>

    <!-- f4 返回顶部 -->
  </view>
</template>

<script>
  export default {
    data() {
      return {
        kw:'',
        pager:{}, // 分页器对象
        suggestList:[{name:'神州',type:'primary'},{name:'Apple',type:'error'},{name:'轻薄本',type:'warning'},{name:'办公本',type:'success'},{name:'联想',type:'error'},{name:'ThinkPad',type:'waring'},{name:'工作站',type:'error'},{name:'游戏本',type:'success'},],
        // '办公本','联想','ThinkPad','工作站','游戏本','华硕','MacBook','T4100'
      };
    },
    methods: {
      tagSearch(name){
        this.kw = name;
        this.search(name);
      },
      search(){
        let kw = this.kw.trim(); // 裁剪前后的空白字符，并返回新字符串
        if(kw===''){
          uni.showToast({
            title:'关键字不能为空',
            icon:"error"
          })
          return
        }
        let url = this.$url.productList;
        uni.showLoading({
          title:'商品搜索中...'
        })
        uni.request({
          url,
          // data:"kw" + kw,
          data:{kw}, // 请求参数编写成对象形式
          success:res=>{
            // console.log(res.data);
            this.pager = res.data
          },
          fail:err=>{
            console.log(err);
          },
          complete:()=>{
            uni.hideLoading();
          }
        })
        // console.log(kw);
      },
      back() {
        uni.navigateBack({
          
        })
      }
    },
  }
</script>

<style lang="scss">
.search-bar {
  margin-top: 40rpx;
  display: flex;
  align-items: center;
  background-color: $xz-theme;
  .icon {}
  .input{
    flex: 1;
  }
}
.suggest-list {
  display: flex;
  flex-wrap:wrap;
  .suggest {
    margin:$uni-spacing-col-sm $uni-spacing-row-sm;
  }
}
</style>
