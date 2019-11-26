<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
		// 一直加loading
		uni.setStorageSync("isShow", false);
		
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	// globalData: {
	//   Service: Service
	// },
	methods:{
		getQueryString(name) {
			var reg = new RegExp("[?&]" + name + "=([^&#]*)", "i");
			var res = window.location.href.match(reg);
		 
			if( res && res.length>1 ){
				return decodeURIComponent(res[1]);
			}
			return '';
		},
		getUrlQueryString(url, name) {
			var reg = new RegExp("[?&]" + name + "=([^&#]*)", "i");
			var res = url.match(reg);
		 
			if( res && res.length>1 ){
				return decodeURIComponent(res[1]);
			}
			return '';
		}
		
	}
};
</script>

<style>
	
@import './static/style/uni.css';
	
/*每个页面公共css */ 
ul, li{list-style:none;}
.row{display: flex; flex-direction: row; align-items: center;}
.row_center{display: flex; flex-direction: row; align-items: center; justify-content: center;}
.row_between{display: flex; flex-direction: row; align-items: center; justify-content: space-between; }
.row_around{display: flex; flex-direction: row; align-items: center; justify-content: space-around;background: #FFF;}

.col{display: flex; flex-direction: column; align-items: center;}
.col_between{display: flex; flex-direction: column; justify-content: space-between;}
.col_justify_center{display: flex; flex-direction: column; justify-content: center;}
.col_center{display: flex; flex-direction: column; align-items: center; justify-content: center;}
.flex_one{flex: 1;}

.hover_class{opacity: 0.9; background-color: #F7F7F7;}
.no_data_wrap{text-align: center; margin-top: 200upx;}
.no_data_wrap img{width: 400upx; }
.place-holder{font-size: 28upx; color: #999999;}
.arraw{width: 20upx;height: 20upx;border-top: 4upx solid #cccccc;border-right: 4upx solid #cccccc;transform: rotate(45deg);margin-left: 4upx;display: inline-block;}
.arraw_black{width: 20upx;height: 20upx;border-top: 4upx solid #303030;border-right: 4upx solid #303030;transform: rotate(45deg);margin-left: 4upx;display: inline-block;}
.arraw_left{width: 20upx;height: 20upx;border-top: 2upx solid #303030;border-right: 2upx solid #303030;transform: rotate(135deg);margin-left: 10upx;display: inline-block;margin-bottom: 8upx;}
.arraw_down_white{width: 14upx;height: 14upx;border-top: 2upx solid #FFF;border-right: 2upx solid #FFF;transform: rotate(135deg);margin-left: 10upx;display: inline-block;margin-bottom: 8upx;}
.arraw_down_black{width: 14upx;height: 14upx;border-top: 2upx solid #333;border-right: 2upx solid #333;transform: rotate(135deg);margin-left: 10upx;display: inline-block;margin-bottom: 8upx;}
.arraw_up_white{width: 14upx;height: 14upx;border-top: 4upx solid #cccccc;border-right: 4upx solid #cccccc;transform: rotate(-45deg);margin-left: 10upx;display: inline-block;margin-bottom: 8upx;}

.uni-page-head-search-input{padding-top: 6upx!important}
scroll-view [style*="overflow"]::-webkit-scrollbar {  
  display: none;  
} 

.loaded {opacity: 0;}
/* .mescroll-uni{top: 50px!important; bottom: 0px;} */

.modal-mask {width: 100%;height: 100%;position: fixed;top: 0;left: 0;background: rgba(0,0,0,.6);overflow: hidden;z-index: 999;color: #fff;justify-content: center;align-items: center;}
.modal-dialog {width: 70%;max-height: 60%;overflow: auto;background: #ffffff;border-radius: 14upx;position: relative;}
.modal-content {font-size: 12px;position: relative;z-index: 100;color: #333333;background: #ffffff;text-align: left;opacity: 1; border-radius: 10upx;}
.update_content_bg {background: #ffffff;border-radius: 28upx;box-sizing: border-box;justify-content: space-around;align-items: center;text-align: center;color: #000000;font-size: 16px;}

.uni-page-head-ft i{height: 40px; display: inline-block; line-height: 40px;}

.phclass{font-size: 32upx; color: #CCCCCC;}
.rong-icon {width: 64rpx;height: 64rpx;border-radius: 50%;background-size: cover;}

.back_icon{width: 17upx; height: 30upx; margin-right: 17upx; padding: 25upx!important;}
.head_wrap{padding:0upx 10upx!important; color: #FFFFFF}

</style>
