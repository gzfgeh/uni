<script>
    export default {
        onLaunch: function() {
            console.log('App Launch');
			
			
            let tmpUrlSearch = window.location.search;// 得到：?sceneid=h5&wxcode=xxx&puid=fff
            console.log(tmpUrlSearch);
            let tmpParas= this.GetRequestParameters(tmpUrlSearch);
			
			// let openid = tmpParas["openid"];
			let openid = this.getQueryString("openid");//提取参数
			console.log(openid);
			uni.setStorageSync("openid", openid);
			
			let partner_id = this.getQueryString("partner_id")
            // let partner_id = tmpParas["partner_id"];//提取参数
            uni.setStorageSync("partner_id", partner_id);
			console.log('partner_id:'+partner_id);
			
			// let imei = tmpParas["imei"];//提取参数
			let imei = this.getQueryString("imei")
			uni.setStorageSync("imei", imei);
			console.log('imei'+imei);
			
			// let recommend_user_id = tmpParas["recommend_user_id"];//提取参数
			let recommend_user_id = this.getQueryString("recommend_user_id");//提取参数
			console.log(recommend_user_id);
			uni.setStorageSync("recommend_user_id", recommend_user_id);
			
			// let recommend_channel = tmpParas["recommend_channel"];//提取参数
			let recommend_channel = this.getQueryString("recommend_channel");//提取参数
			console.log(recommend_channel);
			uni.setStorageSync("recommend_channel", recommend_channel);
			
			// let isagent = tmpParas["isagent"];//提取参数
			let isagent = this.getQueryString("isagent");//提取参数
			console.log(isagent);
			uni.setStorageSync("isagent", isagent);
			
			// uni.setStorageSync("partner_id", 100);
			// uni.setStorageSync("imei", 123);
			// uni.setStorageSync("isagent", true);
			
        },
        onShow: function() {
            console.log('App Show');
        },
        onHide: function() {
            console.log('App Hide');
        },
		methods: {
			GetRequestParameters(locationsearch){
				let url = locationsearch;  
				let theRequest = new Object();  
				if (url.indexOf("?") != -1) {  
					let str = url.substr(1);  
					let strs = str.split("&");  
					for (let i = 0; i < strs.length; i++) {  
						theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);  
					}  
				}  
				return theRequest;  
			},
			getQueryString(name) {
				var reg = new RegExp("[?&]" + name + "=([^&#]*)", "i");
				var res = window.location.href.match(reg);
			 
				if( res && res.length>1 ){
					return decodeURIComponent(res[1]);
				}
				return '';
			}

		}
    }
</script>

<style>
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import './common/uni.css';
	
    /*每个页面公共css */
    /* uni-app默认全局使用flex布局。因为flex布局有利于跨更多平台，尤其是采用原生渲染的平台。如不了解flex布局，请参考http://www.w3.org/TR/css3-flexbox/。如不使用flex布局，请删除或注释掉本行。*/
    body,
    page {
        min-height: 100%;
        display: flex;
    }

    /* #ifdef MP-BAIDU */
    page {
        width: 100%;
        height: 100%;
        display: block;
    }

    swan-template {
        width: 100%;
        min-height: 100%;
        display: flex;
    }

    /* #endif */

    .content {
        display: flex;
        flex: 1;
        flex-direction: column;
        background-color: #ffffff;
    }

    .input-group {
        background-color: #ffffff;
        margin-top: 40upx;
        position: relative;
    }

    .input-group::before {
        position: absolute;
        right: 0;
        top: 0;
        left: 0;
        height: 1upx;
        content: '';
        -webkit-transform: scaleY(.5);
        transform: scaleY(.5);
        background-color: #c8c7cc;
    }

    .input-group::after {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 1upx;
        content: '';
        -webkit-transform: scaleY(.5);
        transform: scaleY(.5);
        background-color: #c8c7cc;
    }

    .input-row {
        display: flex;
        flex-direction: row;
        position: relative;
    }

    .input-row .title {
        width: 20%;
        height: 50upx;
        min-height: 50upx;
        padding: 15upx 0;
        padding-left: 30upx;
        line-height: 50upx;
    }

    .input-row.border::after {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 15upx;
        height: 1upx;
        content: '';
        -webkit-transform: scaleY(.5);
        transform: scaleY(.5);
        background-color: #c8c7cc;
    }

    .btn-row {
        margin-top: 50upx;
        padding: 20upx;
    }

    button.primary {
        background-color: #0faeff;
    }
	
	.input_place_holder{
		font-size: 28upx;
		color: rgba(0,0,0,0.1);
	}
	
	.button-hover{background-color: rgba(0, 0, 0, 0.1)!important; opacity: 0.7!important;}
	.no_data_wrap{height: 100%; width: 100%; position: absolute; z-index: 1; 
		display: flex; flex-direction: column; align-items: center; justify-content: center;}
	.no_data_wrap img{width: 288upx; height: 270upx;}
	.no_data_wrap span{color: #9F9F9F; font-size: 28upx; margin-top: 40upx;}
	.place-holder{
	  font-size: 28upx;
	  color: rgba(0,0,0,0.3);
	}
	.uni-center-item{display: flex;flex-direction: row;align-items: center;justify-content: center;}
	
	.close {
		color: #333333;
		border-radius: 24rpx;
		line-height: 40rpx;
		text-align: center;
		height: 40rpx;
		width: 40rpx;
		font-size: 36rpx;
		padding: 2rpx;
		top: 30rpx;
		right: 20rpx;
		position: absolute;
		z-index: 1000;
	}
</style>
