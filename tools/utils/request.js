import Vue from 'vue'
const Fly = require('./fly.js')
console.log(Fly);

var request = new Fly()
var tokenFly = new Fly()

// 网络超时时间
request.config.timeout = 5 * 1000
// request.config.baseURL = 'http://192.168.1.166:8085/mobile_api/'
request.config.baseURL = 'https://gzf.liangyicloud.xyz/'

tokenFly.config = request.config

request.interceptors.request.use((request) => {
	console.log('request',request)
    if (uni.getStorageSync("isShow")) {
        uni.showLoading({ title: '加载中...' })
    }
	request.headers["Content-Type"] = 'application/x-www-form-urlencoded';
	
	let token = uni.getStorageSync('auth_token');
	console.log(token);
    if (token) {
        request.headers["x-token"] = token;
    }
	
    return request
})

request.interceptors.response.use(
    function(response, promise) { // 不要使用箭头函数，否则调用this.lock()时，this指向不对
        console.log('interceptors.response', response.data);
		uni.stopPullDownRefresh();
        // uni.hideLoading()
		uni.setStorageSync("isShow", false);
		if(response.data.status == -99){
			//token过期
			console.log(response.data.status)
			uni.removeStorageSync("auth_token");
			// uni.navigateTo({
			// 	url: '/pages/get_code/get_code'
			// });
			return;
		}
        return promise.resolve(response.data)
    },
    function(err, promise) {
        console.log('error-interceptor', err)
		// if(err.status == 0){
		// 	let error = uni.getStorageSync("error");
		// 	console.log(error);
		// 	if(!uni.getStorageSync("error")){
		// 		uni.setStorageSync("error", 1);
		// 		uni.navigateTo({
		// 			url: '/pages/error_page/error_page'
		// 		});
		// 	}
		// 	return;
		// }
		uni.setStorageSync("isShow", false);
		uni.stopPullDownRefresh();
        // uni.hideLoading()
        // let errorMsg = '';
        // if (errorMsg) {
        //     uni.showToast({
        //         title: errorMsg,
        //         icon: 'none',
        //         duration: 2000
        //     })
        // }
        return promise.resolve()
    }
)

export default request