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
	// console.log('request',request)
	// request.url = encodeURI(request.url);
    if (uni.getStorageSync("isShow")) {
        uni.showLoading({ title: '加载中...' })
    };
	request.headers["Content-Type"] = 'application/x-www-form-urlencoded';
	
	let token = uni.getStorageSync('auth_token');
	
    if (token) {
        request.headers["x-token"] = token;
    }
	// console.log('request',request)
    return request
})

request.interceptors.response.use(
    function(response, promise) { // 不要使用箭头函数，否则调用this.lock()时，this指向不对
        // console.log('interceptors.response', response.data);
		uni.stopPullDownRefresh();
        // uni.hideLoading()
		uni.setStorageSync("isShow", false);							//token过期				//无效的身份
		// if(response.data.status == -99 || response.data.status == 401){
		// 	uni.reLaunch({
		// 		url: '/pages/login/login?isRelanuch=1'
		// 	});
		// 	return;
		// }else 
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