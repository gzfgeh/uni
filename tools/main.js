import Vue from 'vue'
import App from './App'
import store from './store'
Vue.prototype.$store = store;

Vue.config.productionTip = false;

// 传递事件
Vue.prototype.$eventHub = new Vue();

// 公用的函数  微信小程序 标题
Vue.prototype.initStatus = function(){
	let screenWidth =  uni.getSystemInfoSync().screenWidth;
	let screenHeight =  uni.getSystemInfoSync().screenHeight;
	let statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
	let titleHeight = 0;
	if(uni.getSystemInfoSync().platform == "android"){
		titleHeight = 48;
	}else{
		titleHeight = 44;
	}
	let tempHeight = parseInt(statusBarHeight)+parseInt(titleHeight);
	return screenHeight - tempHeight;
}

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
