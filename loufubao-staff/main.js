import Vue from 'vue'
import App from './App'
import store from './store'
Vue.prototype.$store = store;

Vue.config.productionTip = false;

// 传递事件
Vue.prototype.$eventHub = new Vue();

// 公用的函数  判断是否登录
Vue.prototype.isLogin = function(){
	let userInfo = uni.getStorageSync("userInfo");
	if(!userInfo){
		uni.navigateTo({
			url: '/pages/login/login'
		});
		return false;
	}
	
	if(!userInfo.buildingName){
		uni.navigateTo({
			url: '/pages/build/build'
		});
		return false;
	}
	return true;
}

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
