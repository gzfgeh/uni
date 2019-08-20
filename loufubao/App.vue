<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
		
		// 一直加loading
		uni.setStorageSync("isShow", true);
		
		// #ifdef H5
		let openid = this.getQueryString("openid");//提取参数
		console.log(openid);
		if(openid){
			uni.setStorageSync("openid", openid);
		}
		
		//是否是红星美凯龙
		let hongxing = this.getQueryString("hongxing");//提取参数
		if(hongxing){
			uni.reLaunch({
				url:'pages/express_hongxing/express_hongxing?hongxing=1'
			})
			return;
		}
		// #endif
		
		// #ifdef APP-PLUS
		
		//版本更新
		plus.runtime.getProperty(plus.runtime.appid, function(wgtinfo){  
			console.log(wgtinfo.version);  
			
			let url = "http://apitest.baobaoloufu.com/Crontab/Nobase/getAppVersion";
			let params = {
				versionName: wgtinfo.version.split(".").join(""),
				platform: uni.getSystemInfoSync().platform
			};
			console.log(params);
			uni.request({
				url: url,
				data: params,
				success(res) {
					console.log(res.data);
					if (res.data.status === 1) {  
						let versionName = res.data.data.versionName.split(".").join("");
						
						if(parseInt(versionName) > parseInt(params.versionName)){
							uni.showModal({ //提醒用户更新  
								title: "更新提示",  
								content: res.data.data.versionContent,  
								success: (result) => {  
									if (result.confirm) {  
										if(uni.getSystemInfoSync().platform == 'android'){
											
											var dtask = plus.downloader.createDownload( res.data.data.locations, { filename: "_doc/update/" }, function ( d, status ) {  
												// 下载完成  
												if ( status == 200 ) {   
													plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename),{},{},function(error){  
														uni.showToast({  
															title: '安装失败',  
															mask: false,  
															duration: 1500  
														});  
													})  
												} else {  
													 uni.showToast({  
														title: '更新失败',  
														mask: false,  
														duration: 1500  
													 });  
												}    
											});  
											dtask.start();
											if(res.data.data.isForceUpdate > 1){
												// 强制安装
												var w = plus.nativeUI.showWaiting("下载升级文件...");
												dtask.addEventListener("statechanged", function(task, status) {
													switch (task.state) {
														case 1: // 开始
															w.setTitle("　　 开始下载...　　 ");
															break;
														case 2: // 已连接到服务器
															w.setTitle("　　 开始下载...　　 ");
															break;
														case 3:
															var a = task.downloadedSize / task.totalSize * 100;
															w.setTitle("　　 已下载" + parseInt(a) + "%　　 ");
															break;
														case 4: // 下载完成
															w.close();
															break;
													}
												})
											}else{
												// 静默安装
											}
											
											
										}else{
											// ios
											plus.runtime.openURL(res.data.data.locations); 
										};
										
										 
									}  
								}  
							}) 
						}
						 
					}
				}
			})
		
		}); 

		
		
		//推送检测
		setTimeout( () => {
			
			/* 5+  push 消息推送 ps:使用:H5+的方式监听，实现推送*/  
			plus.push.addEventListener("click", function(msg) {  
					// plus.ui.alert("click:"+JSON.stringify(msg)); 
					 
					 setTimeout(function(res){
						uni.showModal({
							title: '温馨提示',
							content: '您有新的消息',
							success: function (res) {
								if (res.confirm) {
									console.log('用户点击确定');
									uni.navigateTo({
										url:'/pages/message/message'
									})
								}
							}
						});
					},1000)
					return;
								
					console.log(msg);
					console.log(JSON.stringify(msg));
					// plus.ui.alert(msg.payload);  
					// plus.ui.alert(JSON.stringify(msg));  
					//根据payload传递过来的数据，打开一个详情
					var payload = msg.payload;
					if (payload) {
						if (typeof payload === 'string') {
							payload = JSON.parse(payload);
						}else if (typeof payload === 'object') {
							if(payload.url){
								setTimeout(function(res){
									uni.navigateTo({
										url:'pages/message/message'
									})
								},1000)
							}
						}
					}

				}, false); 
				
		}, 5000);

			
					// 监听在线消息事件    
				plus.push.addEventListener("receive", function(msg) { 
					 console.log(msg);
					 uni.showModal({
						title: '温馨提示',
						content: '您有新的消息',
						success: function (res) {
							if (res.confirm) {
								console.log('用户点击确定');
								uni.navigateTo({
									url:'/pages/message/message'
								})
							}
						}
					});
					 
									
					//  if (plus.os.name == "iOS") {
					// 	if(msg.payload){
					// 		let jsonData = msg.payload; 
					// 	}
					// 	let content = '消息提醒';//你要展示的提示
					// 	plus.push.createMessage(content, jsonData, ""); 
					// }else{
					// 	let content = '消息提醒';//你要展示的提示
					// 	let jsonData = eval("(" + msg.payload + ")");
					// 	plus.push.createMessage(content, jsonData, ""); 
					// }
				}, false);  

	   //#endif 
   
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

.uni-page-head-search-input{padding-top: 6upx!important}
scroll-view [style*="overflow"]::-webkit-scrollbar {  
  display: none;  
} 

</style>
