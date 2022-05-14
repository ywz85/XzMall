<template>
  <view class="search-bar">
    <!-- 左侧汉堡包按钮 -->
    <uni-icons @click="showDrawer" type="bars" color="#fff" size="28px"></uni-icons>
    <!-- 隐藏固定定位元素 -->
    <uni-drawer ref="leftDrawer">
      <view style="padding:30rpx;">
        <uni-list>
          <uni-list-item title="首页" link="switchTab" to="../../pages/index/index"></uni-list-item>
          <uni-list-item title="品牌馆" link="switchTab" to="../../pages/brands/brands"></uni-list-item>
          <uni-list-item title="商品分类" link="switchTab" to="../../pages/product-category/product-category"></uni-list-item>
          <uni-list-item title="登录" link="switchTab" to="../../pages/user-center/user-center"></uni-list-item>
          <uni-list-item title="注册" link="switchTab" to="../../pages/user-center/user-center"></uni-list-item>
        </uni-list>
        <button type="default" size="mini" style="margin: 15px 55px;" @click="closeDrawer">关闭</button>
      </view>
    </uni-drawer>
    <!-- 中间搜索框 -->
    <view class="input-group" @click="jumpToSearch">
      <input placeholder="请输入商品关键字" disabled="true" />
      <image src="../../static/img/logo-s.png"></image>
      <uni-icons
        class="search"
        type="search"
        color="#888"
        size="26px"
      ></uni-icons>
    </view>
    <!-- 右侧点击文字 -->
    <navigator
      class="link"
      open-type="switchTab"
      url="../../pages/user-center/user-center"
      >登录</navigator
    >
  </view>
</template>

<script>
export default {
  name: "xz-search-bar",
  data() {
    return {};
  },
  methods: {
    jumpToSearch() {
      // 导航跳转(保留跳转);
      uni.navigateTo({ url: "../../pages/product-search/product-search" });
    },
    showDrawer(){
      this.$refs.leftDrawer.open();
    },
    closeDrawer(){
      this.$refs.leftDrawer.close();
    }
  },
};
</script>

<style lang="scss">
.search-bar {
  display: flex;
  align-items: center;
  background-color: $xz-theme;
  padding: 25px 6px 6px;

  .bars {
  }
  .input-group {
    flex: 1;
    position: relative;
    margin: 0 8px;
    input {
      background-color: #fff;
      text-align: center;
      height: 30px;
      border-radius: 15px;
      font-size: $uni-font-size-base;
    }
    image {
      width: 18px;
      height: 18px;
      position: absolute;
      left: 12px;
      top: 7px;
    }
    .search {
      position: absolute;
      right: 5px;
      top: 2px;
    }
  }
  .link {
    color: #fff;
  }
}
</style>
