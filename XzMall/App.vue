<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
  // 选中所有页面元素
  :not(not){
    box-sizing: border-box;
  }
  // 选中每个页面的根元素
  page {
    background-color: $uni-bg-color-grey;
    color:$uni-text-color;
    font-size: $uni-font-size-base;
  }
</style>
