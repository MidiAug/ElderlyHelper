import { createSSRApp } from 'vue'
import App from './App.vue'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif

const config = {
	resourceBase: '/static', // 本地资源
	// resourceBase: 'https://yourcdn.com/', // 线上资源（预览时可切换）
  };
export default config;