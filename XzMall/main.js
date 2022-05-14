import App from './App'
import {url} from './config'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$url = url // 所有页面/组件都多了一个this.$url属性
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  // 为所有页面/组件添加$url公共属性
  app.config.globalProperties.$url = url
  return {
    app
  }
}
// #endif