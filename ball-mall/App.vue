<script>
    export default {
        onLaunch: function() {
            console.log('App Launch');
			// let tmpUrlSearch = window.location.search;// 得到：?sceneid=h5&wxcode=xxx&puid=fff
			// console.log(tmpUrlSearch);
			// let tmpParas= this.GetRequestParameters(tmpUrlSearch);
			// let openid = tmpParas["openid"];//提取参数
			// console.log(openid);
			// uni.setStorageSync("openid", openid);
			uni.setStorageSync("openid", "oms5B1cYgVWMCWtDOgiTzH6EUmp4");
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
	
	.row{display: flex;flex-direction: row;}
	
	.row_center{display: flex;flex-direction: row;align-items: center;justify-content: center;}
	
	.row_between{display: flex;flex-direction: row;align-items: center;justify-content: space-between;}
	
	.row_around{display: flex;flex-direction: row;align-items: center;justify-content: space-around;}
	
	.col{display: flex;flex-direction: column;justify-content: center;}
	
	.col_center{display: flex;flex-direction: column;justify-content: center;align-items: center;}
	
	.col_around{display: flex;flex-direction: column;justify-content: space-around;align-items: center;}
	
	.col_between{display: flex;flex-direction: column;justify-content: space-between;align-items: center;}
	.flex_one{flex: 1; display: flex;}
</style>
