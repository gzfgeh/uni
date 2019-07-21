<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
		
		// 一直加loading
		uni.setStorageSync("isShow", true);
		
		// #ifdef H5
		let openid = this.getQueryString("openid");//提取参数
		console.log(openid);
		uni.setStorageSync("openid", openid);
		
		//是否是红星美凯龙
		let hongxing = this.getQueryString("hongxing");//提取参数
		if(hongxing){
			uni.reLaunch({
				url:'pages/express_hongxing/express_hongxing?hongxing=1'
			})
			return;
		}
		// #endif
		
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	methods:{
		getQueryString(name) {
			var reg = new RegExp("[?&]" + name + "=([^&#]*)", "i");
			var res = window.location.href.match(reg);
		 
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
.col_justify_center{display: flex; flex-direction: column; justify-content: center;}
.col_center{display: flex; flex-direction: column; align-items: center; justify-content: center;}
.flex_one{flex: 1;}

.hover_class{opacity: 0.9; background-color: #F7F7F7;}
.no_data_wrap{text-align: center; margin-top: 200upx;}
.no_data_wrap img{width: 400upx; }
.place-holder{font-size: 28upx; color: #999999;}
.arraw{width: 20upx;height: 20upx;border-top: 4upx solid #999999;border-right: 4upx solid #999999;transform: rotate(45deg);margin-left: 4upx;display: inline-block;}
.arraw_down{width: 14upx;height: 14upx;border-top: 2upx solid #999999;border-right: 2upx solid #999999;transform: rotate(135deg);margin-left: 10upx;display: inline-block;margin-bottom: 8upx;}
.arraw_down_white{width: 14upx;height: 14upx;border-top: 2upx solid #FFF;border-right: 2upx solid #FFF;transform: rotate(135deg);margin-left: 10upx;display: inline-block;margin-bottom: 8upx;}


</style>
