import Vue from 'vue'
const Fly = require('./fly.js')
console.log(Fly);

var request = new Fly()
var tokenFly = new Fly()

// 网络超时时间
request.config.timeout = 10 * 1000
request.config.baseURL = 'https://apitest.baobaoloufu.com/'

tokenFly.config = request.config

request.interceptors.request.use((request) => {
	// console.log(request)
    if (uni.getStorageSync("isShow")) {
        uni.showLoading({ title: '加载中...' })
    }
	request.headers["Content-Type"] = 'application/x-www-form-urlencoded';
	
	let token = uni.getStorageSync('userInfo').token;
	console.log(token);
    if (token) {
        request.headers["userToken"] = token;
    }
	
    return request
})

request.interceptors.response.use(
    function(response, promise) { // 不要使用箭头函数，否则调用this.lock()时，this指向不对
        console.log('interceptors.response', response)
        uni.hideLoading()
		uni.setStorageSync("isShow", true);
		if(response.data.status == 999){
			//token过期
			console.log(response.data.status)
			uni.navigateTo({
				url: '/pages/login/login'
			});
			return;
		}
        return promise.resolve(response.data)
    },
    function(err, promise) {
        console.log('error-interceptor'+err)
		uni.setStorageSync("isShow", true);
		uni.stopPullDownRefresh();
        uni.hideLoading()
        let errorMsg = '';
        if (errorMsg) {
            uni.showToast({
                title: errorMsg,
                icon: 'none',
                duration: 2000
            })
        }
        return promise.reject()
    }
)

export default request