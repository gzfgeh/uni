import Vue from 'vue'
const Fly = require('./fly.js')
// console.log(Fly);

var request = new Fly()
var tokenFly = new Fly()
var toLoginTimer = null
// 网络超时时间
request.config.timeout = 5 * 1000
//  测试
request.config.baseURL = 'http://www.fbbmall.com.tw/API/'

tokenFly.config = request.config

request.interceptors.request.use((request) => {
	
    // if (uni.getStorageSync("isShow")) {
    //     uni.showLoading({ title: '加载中...' })
    // };
	uni.showLoading({ title: '加载中...' })
	
	request.headers["Content-Type"] = 'application/json';
	
	let token = uni.getStorageSync('access_token');
	
    if (token) {
        request.headers["access_token"] = token;
    }
	// console.log('request',request)
    return request
})

request.interceptors.response.use(
    function(response, promise) { // 不要使用箭头函数，否则调用this.lock()时，this指向不对
        // console.log('interceptors.response', response.data);
		uni.stopPullDownRefresh();
        uni.hideLoading()
		// uni.setStorageSync("isShow", false);
		if( (response.data.status == -99 || response.data.status == 401)){
			
			if((response.request.url.indexOf('sapi/home') == -1) && 
				(response.request.url.indexOf('sapi/ad/list') == -1)){
					uni.reLaunch({
						url: '/pages/login/login?isRelanuch=1'
					});
					return;
			}
			
		}
        return promise.resolve(response.data)
    }, 
    function(err, promise) {
        console.log('error-interceptor', err)
		// uni.setStorageSync("isShow", false);
		uni.stopPullDownRefresh();
        uni.hideLoading()
        return promise.resolve()
    }
)

export default request