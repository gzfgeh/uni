<template>
	<view class="col" style="padding-top:118upx;box-sizing: border-box;"
			:style="{'padding-top': (isAPP?'0upx':'0upx')}">
		<view class="content col" style="width:100%;">
			<div class="head_bg">
				<image src="../../../static/img/home_head_bg.png" mode="widthFix" />
			</div>
			
			<div class="row_between home_head_wrap" :style="[{'background': (scrollValue? 'rgba(106, 183, 240)': 'rgba(106, 183, 240, 0)' )}, {'padding-top': (isAPP?'60upx':'0upx')}, {'height': (isAPP?'140upx':'100upx')}]">
				<div class="row_center home_head_left" @tap="selectBuild()">
					<image src="../../../static/img/home_location.png" mode="widthFix" />
					<span>{{buildingName}}</span>
					<!-- <img src="../../../static/img/lou_select.png" mode="widthFix"> -->
					<span class="arraw_down_white"></span>
				</div>
				
				<div class="row">
					<image src="../../../static/img/home_search.png" @click="goToSearch"
						mode="widthFix" class="search_icon" />
					<image src="../../../static/img/home_scan.png" @click="goToScan" style="margin-left: 0upx;"
						mode="widthFix" class="search_icon" v-if="isAPP" />
					
					<div class="msg_wrap row_center" @tap="goToMsg">
						<image src="../../../static/img/home_msg.png" mode="widthFix" />
						<div class="red_hot" v-if="msgCount == 1"></div>
					</div>
				</div>
			</div>
		</view>
			
		<div  style="position:relative;z-index:10; box-sizing: border-box; width: 100%;"
				:style="[{'padding-top': (isAPP?'40upx':'0upx')}, {'padding-bottom': (isAPP?'20upx':'100upx')}]">
			<!-- item.bannerImageUrl -->
			<div class="swiper_wrap" >
				<swiper :indicator-dots="false" :autoplay="true" @change="slideChange"
						:interval="3000" :duration="500" class="head_img">            
						<swiper-item v-for="(item, index) in itemList" :key="index" class="head_img" @tap="goToH5(index)">  
							<image :src="item.bannerImageUrl" mode="widthFix" class="head_img"  />           
						</swiper-item>        
				</swiper> 
				
				<view class="dots">
					<block v-for="(item, index) in itemList" :key="index">
						<view class="dot_normal" :class="{'active': (index==curIndex)}"></view>
					</block>
				</view>
			</div>
			
			<div style="background: #F5F5F5;padding-top:30upx;">
			
				<div class="gonggao_wrap row">
					<image src="../../../static/img/home_gonggao.png" mode="widthFix" />
					<view class="uni-swiper-msg">
						<swiper vertical="true" autoplay="true" circular="true" interval="3000">
							<swiper-item v-for="(item, index) in msg" :key="index">
								<span @click="goToWebView(index)">{{item.detail}}</span>
							</swiper-item>
						</swiper>
					</view>
				</div>
				
				<div class="content_wrap">
					<navigator class="col_center " style="min-width: 21%;" v-for="(item, index) in contentList" :key="index" @tap="goToContent(index)">
						<image :src="item.configNameImg1" mode="widthFix" />
						<span>{{item.configName}}</span>
					</navigator>
				</div>
				
				<div class="build_wrap row">
					<navigator class="row_center flex_one" @click="goToBuildSuoYin">
						<image src="../../../static/img/home_lou_ceng.png" mode="widthFix" />
						<span>楼层索引</span>
					</navigator>
					
					<div class="line"></div>
					
					<navigator class="row_center flex_one" @click="goToTeam">
						<image src="../../../static/img/home_lou_ceng.png" mode="widthFix" />
						<span>服务团队</span>
					</navigator>
					
					<div class="line"></div>
					
					<navigator class="row_center flex_one" @click="joinUs">
						<image src="../../../static/img/home_lou_ceng.png" mode="widthFix" />
						<span>加入我们</span>
					</navigator>
				</div>
				
				<image src="../../../static/img/home_center_img.png" mode="widthFix" class="center_wrap" @click="goToWebView" />
				
				<div class="recommand_one" v-if="false">
					<div class="item">
						<div class="row_between head">
							<span class="title">品质生活</span>
							<div class="row" style="padding:0upx 20upx;" @click="goToShop">
								<span>更多</span>
								<image src="../../../static/img/right_icon.png" mode="aspectFill" />
							</div>
						</div>
						<div>这里有你想不到的优惠</div>
					</div>
					
					
					<div class="recommand_item" v-if="shopList[0]">
						<image :src="shopList[0].list_img" mode="aspectFill" @click="goToMainShopDetail(shopList[0])" />
						<div class="right_wrap">
							<navigator class="row_center right" @click="goToMainShopDetail(shopList[1])">
								<div class="right_item" >
									<span class="name">{{shopList[1].store_name}}</span>
									<span class="desc">{{shopList[1].desc}}</span>
								</div>
								<image :src="shopList[1].list_img" mode="aspectFill" />
							</navigator>
							
							<navigator class="row_center right" @click="goToMainShopDetail(shopList[2])">
								<div class="right_item" >
									<span class="name">{{shopList[2].store_name}}</span>
									<span class="desc">{{shopList[2].desc}}</span>
								</div>
								<image :src="shopList[2].list_img" mode="aspectFill" />
							</navigator>
							
						</div>
					</div>
					
					
					<div class="nav" v-if="shopList[3]">
						<navigator class="nav-item" @click="goToMainShopDetail(shopList[3])">
							<div class="row_center">
								<image :src="shopList[3].list_img" />
							</div>
							
							<div class="scroll_content_wrap">
								<span>{{shopList[3].store_name}}</span>
								<span class="desc">{{shopList[3].desc}}</span>
							</div>
						</navigator>
						
						<navigator class="nav-item" @click="goToMainShopDetail(shopList[4])">
							<div class="row_center">
								<image :src="shopList[4].list_img" />
							</div>
							
							<div class="scroll_content_wrap">
								<span>{{shopList[4].store_name}}</span>
								<span class="desc">{{shopList[4].desc}}</span>
							</div>
						</navigator>
						
						<navigator class="nav-item" @click="goToMainShopDetail(shopList[5])">
							<div class="row_center">
								<image :src="shopList[5].list_img" />
							</div>
							
							<div class="scroll_content_wrap">
								<span>{{shopList[5].store_name}}</span>
								<span class="desc">{{shopList[5].desc}}</span>
							</div>
						</navigator>
							
					</div>
					
				</div>
			
			
				<div class="recommand_two" v-if="false">
					<div class="item">
						<div class="row_between head">
							<span class="title">健康餐饮</span>
							<div class="row" style="padding:0upx 20upx;" @click="goToShop">
								<span>更多</span>
								<image src="../../../static/img/right_icon.png" mode="aspectFill" />
							</div>
						</div>
						<div>健康生活从这里开始</div>
					</div>
					
					<div class="list_item" v-if="shopList[6]">
						<navigator class="item_wrap" @click="goToMainShopDetail(shopList[6])">
							<div class="item">
								<image  :src="shopList[6].list_img" mode="aspectFill" />
								<div class="content_item">
									<span class="title">{{shopList[6].store_name}}</span>
									<span class="content">{{shopList[6].desc}}</span>
									<!-- <div class="tag_wrap">
										<span v-for="(ite,ind) in shopList" :key="ind">#健康</span>
									</div> -->
								</div>
							</div>
						</navigator>
						
						<navigator class="item_wrap" @click="goToMainShopDetail(shopList[7])">
							<div class="item">
								<image  :src="shopList[7].list_img" mode="aspectFill" />
								<div class="content_item">
									<span class="title">{{shopList[7].store_name}}</span>
									<span class="content">{{shopList[7].desc}}</span>
									<!-- <div class="tag_wrap">
										<span v-for="(ite,ind) in shopList" :key="ind">#健康</span>
									</div> -->
								</div>
							</div>
						</navigator>
						
						<navigator class="item_wrap" @click="goToMainShopDetail(shopList[8])">
							<div class="item" style="border-bottom: none;">
								<image  :src="shopList[8].list_img" mode="aspectFill" />
								<div class="content_item">
									<span class="title">{{shopList[8].store_name}}</span>
									<span class="content">{{shopList[8].desc}}</span>
									<!-- <div class="tag_wrap">
										<span v-for="(ite,ind) in shopList" :key="ind">#健康</span>
									</div> -->
								</div>
							</div>
						</navigator>
					</div>
					
				</div>
			
			
			
			</div>
			
		</div>
			
			
	</view>
	
</template>

<script>
	
	import { BASE_IMAGE_URL,getImgList,getBanners,getServiceLeftMenuList,
			yunshanfu_app,getHomePageConfigNew,getMessageListByType,getTopLine,search } from '@/utils/api'
	// var statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px'
	// #ifdef APP-PLUS
		//const dcRichAlert = uni.requireNativePlugin('GZF-YunPay');
	// #endif
	
	export default {
	data() {
		return {
			buildingName:"请选择楼宇",
			itemList: [],
			contentList:[],
			msg : [],
			t_url: '',
			curIndex: 0,
			contentCurIndex: 0,
			statusBarHeight: 0,
			msgCount: 0,
			showBg: 0,
			isAPP: false,
			paddingValue: '',
			shopList: [],
			scrollValue: false
		};
	},
	onPageScroll(e) {
		console.log(e);
		if(e.scrollTop > 18){
			this.scrollValue = true
		}else{
			this.scrollValue = false
		}
		
	},
	onShow(){
		let buildName =uni.getStorageSync("userInfo").buildingName;
		if(!buildName){
			return;
		}
		if(buildName != this.buildingName){
			this.buildingName = buildName;
			this.getBanners();
			this.getHomePageConfigNew();
		}
		this.getList();
	},
	onLoad() {
		this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px';
		this.paddingValue = parseInt(uni.getSystemInfoSync().statusBarHeight)+32 + 'px'
		console.log(this.statusBarHeight);
		
		this.getBanners();
		this.getHomePageConfigNew();
		this.getTopLine();
		this.search();
		
		// #ifdef APP-PLUS
		this.isAPP = true;
		
		// #endif
	},
	methods: {
		goToMainShopDetail(item){
			if(item.store_show_type == 2){
				// 图文店铺
				uni.navigateTo({
					url: '/pages/mall_shop_text/mall_shop_text?storeID='+item.id
				});
			}else{
				uni.navigateTo({
					url: '../../mall_shop/mall_shop?storeID='+item.id
				})
			}
			
		},
		goToWebView(index){
			// this.yunshanfu_app();
			// return;
			
			if(index>=0){
				uni.navigateTo({
					url: '../../home_webview/home_webview?url='+this.msg[index].topLineUrl
				})
			}else{
				//老虎机
				if(!this.isLogin()){
					return;
				}
				uni.navigateTo({
					url: '../../home_webview/home_webview?url=http://pc.baobaoloufu.com/award/index.html'
				})
			}
			
		},
		goToShop(){
			if(!this.isLogin()){
				return;
			}
			uni.navigateTo({
				url: '/pages/mall_list/mall_list?type=1'
			});
		},
		async getTopLine(){
			let res = await getTopLine();
			if(res.status == 1){
				this.msg = res.data;
			}
		},
		async search(){
			let params = {
				searchType: 2,
				keyword: "",
				page:1,
				limit:10,
				storeTag:1
			};
			let res = await search(params);
			if(res.status == 1){
				this.shopList = res.data;
			}
		},
		async getList(){
			let params = {
				userID: uni.getStorageSync("userInfo").userID,
				page: 1,
				limit: 20
			};
			let res = await getMessageListByType(params);
			uni.stopPullDownRefresh();
			if(res.status == 1){
				this.msgCount = 0;
				res.data.map((item) => {
					if(parseInt(item.weixinMessageStatus) == 0){
						//未读
						this.msgCount = 1;
					}
				})
				
			}
			
		},
		goToSearch: function(){
			if(!this.isLogin()){
				return;
			}
			uni.navigateTo({
				url: '/pages/express_list/express_list'
			});
		},
		goToScan: function(){
			if(!this.isLogin()){
				return;
			}
			uni.scanCode({
				success: function (res) {
					console.log('条码类型：' + res.scanType);
					console.log('条码内容：' + res.result);
					
					if(res.result.indexOf("pages/express_main/express_main?orderSN=")>-1)
					{
						var orderSN=res.result.split("orderSN=")[1];
						uni.navigateTo({
							url: '/pages/express_main/express_main?orderSN='+orderSN
						});
						
					}
					else{
						
						uni.showModal({
							title: res.scanType,
							content: res.result,
							success: function (result) {
								if (result.confirm) {
									console.log('用户点击确定');
								} else if (result.cancel) {
									console.log('用户点击取消');
								}
							}
						});
						
					}
					
					
					
				}
			});
		},
		goToMsg: function(){
			if(!this.isLogin()){
				return;
			}
			uni.navigateTo({
				url: '/pages/message/message'
			});
		},
		goToBuildSuoYin: function(){
			if(!this.isLogin()){
				return;
			}
			uni.navigateTo({
				url: '/pages/build_suoyin/build_suoyin'
			});
		},
		goToTeam: function(){
			if(!this.isLogin()){
				return;
			}
			uni.navigateTo({
				url: '/pages/baobao_team/baobao_team'
			});
		},
		goToH5: function(index){
			// uni.navigateTo({
			// 	url: '/pages/express_main/express_main'
			// });
		},
		goToContent: function(index){
			if(index == 0){
				//快递
				uni.navigateTo({
					url: '/pages/express_main/express_main'
				});
			}else if(index == 1){
				// 外卖
				if(!this.isLogin()){
					return;
				}
				uni.navigateTo({
					url: '/pages/wai_mai_address/wai_mai_address'
				});
			}else if(index == 2){
				uni.switchTab({  
					url: '../service/service'  
				});
			}else if(index == 3){
				uni.switchTab({  
					url: '../fuli/fuli'  
				});
			}
			else{
				uni.showToast({
				  icon: 'none',
				  title: '敬请期待',
				  duration: 1000
				});
			}
		},
		joinUs: function(){
			uni.navigateTo({
				url: '/pages/join_us/join_us'
			});
		},
		selectBuild: function(){
			if(!this.isLogin()){
				return;
			}
			uni.navigateTo({
				url: '/pages/build/build'
			});
		},
		goToRecentUsed:function(){
			uni.navigateTo({
				url: '/pages/recent_used/recent_used'
			});
		},
		goToApp: function(){
			yunPay.show();
		},
		slideChange: function(e){
			this.curIndex = e.mp.detail.current;
		},
		slideContentChange: function(e){
			this.contentCurIndex = e.mp.detail.current;
		},
		async getHomePageConfigNew(){
			let res = await getHomePageConfigNew(uni.getStorageSync("userInfo").buildingID);
			if(res.status == 1){
				this.contentList = res.data;
			}
		},
		async getServiceLeftMenuList(){
			let res = await getServiceLeftMenuList(uni.getStorageSync("userInfo").buildingID);
			if(res.status == 1){
				this.contentList = res.data;
			}
		},
		async getBanners(){
			let res = await getBanners(1, uni.getStorageSync("userInfo").buildingID);
			if(res.status == 1){
				this.itemList = res.data;
			}
		},
		async yunshanfu_app(){
			console.log(dcRichAlert);
			// return;
			let res = await yunshanfu_app();
			if(res.status == 1){
				let rn = res.data;
				dcRichAlert.show({
					title: rn
				}, result => {
					const msg = JSON.stringify(result);
					let type = msg.type;
					if(type == "-1"){
						uni.showToast({
						  icon: 'none',
						  title: '请安装云闪付APP',
						  duration: 1000
						});
					}else{
						uni.showToast({
						  icon: 'none',
						  title: type,
						  duration: 1000
						});
					}
				});
			}
		}
		
	}
};
</script>

<style>
	page{height: 100%; background: #F5F5F5; }
	image{will-change: transform}
.content {position: relative; color: #666666; font-size: 24upx; height: 100upx;}
.head_bg{ width: 100%; height: 360upx;position: absolute;top: -124upx; left: 0upx;z-index: 1;}
.head_bg image{height: 360upx; width: 100%;}

.top_style{padding-top: 120upx!important;}

.swiper_wrap{position: relative;width: 96%; height: 360upx;margin: 20upx auto 0 auto;z-index: 2;box-sizing: border-box;border-radius: 20upx;}
.head_img{width: 100%;height: 360upx!important;border-radius: 10upx;box-shadow: 0 0 10px #999;}
.head_img swiper-item{border-radius: 20upx;}

.dots{display: flex;flex-direction: row;justify-content: center;align-items: center;position: absolute;bottom: 40upx;height: 20upx;width: 100%;z-index: 100;}
.dot_normal{width: 10upx;height: 10upx;border-radius: 50%;background-color: #E0E5ED;margin: 0upx 6upx;position: relative;z-index: 100;}
.active{width: 30upx;height: 10upx;border-radius: 30%;background-color: #107EFF;z-index: 100;}

.home_head_wrap{width: 100%; color: #FFFFFF;font-size: 24upx; padding: 0upx 20upx 0upx 20upx; box-sizing: border-box; position: fixed;z-index: 2000; }
.home_head_left span{font-size: 36upx; overflow: hidden;max-width: 260upx;white-space: nowrap;text-overflow:ellipsis;}
.home_head_left image{width: 30upx; height: 36upx; margin-right: 10upx;}
.msg_wrap{position: relative; height: 100%;}
.msg_wrap image{width: 30upx; height: 34upx;}
.red_hot{width: 10upx; height: 10upx; position: absolute;right: 0upx; top: 0upx;background-color: red; z-index: 2;border-radius: 50%;}

.gonggao_wrap{height: 90upx; background: #fff;box-shadow:  0px 0px 10px #fff;width: 94%; margin:0upx 3%; padding: 0upx 22upx;box-sizing: border-box;border-radius: 8upx; font-size: 28upx; color: #333;}
.gonggao_wrap image{width: 128upx; margin-right: 20upx;}

.scan_img{width: 28upx;height: 100%;}
.search_icon{width: 30upx;margin: 0upx 50upx; height: 100%;}

.content_wrap{width: 94%; margin-left: 3%; height:340upx;box-sizing:border-box;background: #fff;box-shadow:  0px 0px 10px #fff;margin-top: 30upx;border-radius: 8upx; flex-flow: wrap; display: flex;flex-direction: row; justify-content: space-between;}
.content_wrap .flex_one{min-width: 160upx;font-size: 24upx; color: #666; height: 170upx;}
.content_wrap image{width: 80upx; margin-bottom: 10upx;}

.build_wrap{width: 94%; margin-left: 3%;box-sizing:border-box;background: #fff;box-shadow:  0px 0px 10px #fff;margin-top: 30upx;border-radius: 8upx;height: 120upx; font-size: 24upx;color: #666;}
.build_wrap image{width: 56upx; margin-right: 14upx;}
.build_wrap .line{width: 2upx; height: 56upx;background: #E7E7E7;}
.build_wrap .flex_one{height: 100%;}

.center_wrap{width: 100%; margin-left: 0%;box-sizing:border-box;margin-top: 30upx;}

.bottom_wrap{padding: 5%; box-sizing: border-box; }
.bottom_wrap image{width: 100%; margin-bottom: 60upx;}

.recommand_one{background: #fff;box-shadow:  0px 0px 10px #fff;width: 94%; margin-left: 3%;margin-top: 30upx; display: flex; flex-direction: column;}
.recommand_one .item{padding:30upx; color: #999999; font-size: 24upx; border-bottom: 2upx solid #F0F0F0;}
.recommand_one .item image{width: 10upx; height: 18upx; margin-left: 10upx;}
.recommand_one .item .title{color: #FF5E43; font-size: 44upx;}
.recommand_one .recommand_item{display: flex; flex-direction: row;}
.recommand_one .recommand_item image{width: 320upx; height: 360upx;}
.recommand_one .recommand_item .right_wrap{flex: 1; display: flex;flex-direction: column;}
.recommand_one .recommand_item .right{flex: 1; border-bottom: 2upx solid #F0F0F0; padding-right: 20upx; box-sizing: border-box;}
.recommand_one .recommand_item .right image{width: 124upx; height: 124upx;}
.recommand_one .recommand_item .right .right_item{padding: 20upx; display: flex;flex-direction: column;color: #666666; font-size: 24upx;}
.recommand_one .recommand_item .right .right_item .name{color: #333333; font-size: 28upx;}
.recommand_one .recommand_item .right .desc{text-overflow: ellipsis; overflow: hidden;display: -webkit-box;
            -webkit-line-clamp:2;
            -webkit-box-orient: vertical;}

.nav{display: flex; flex-direction: row;width: 100%;border-bottom: rgb(249,249,249) solid 15upx; box-sizing: border-box;}
.nav-item{display: flex; flex-direction: column; padding-top: 30upx; flex: 1; display: inline-block; border-right: 2upx solid #F0F0F0;}
.nav image{width: 160upx; height: 160upx; text-align: center;}
.nav .scroll_content_wrap{display: flex; flex-direction: column; height: 150upx; justify-content: space-between; padding: 10upx 10upx 10upx 20upx; box-sizing: border-box;}
.nav .scroll_content_wrap span{text-overflow: ellipsis; overflow: hidden;width: 210upx;white-space: normal; display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;}
.nav .scroll_content_wrap .desc{color: #666666; font-size: 24upx;}

.recommand_two{background: #fff;box-shadow:  0px 0px 10px #fff;width: 94%; margin-left: 3%;margin-top: 30upx; display: flex; flex-direction: column;}
.recommand_two .item{padding:30upx; color: #999999; font-size: 24upx; border-bottom: 2upx solid #F0F0F0;}
.recommand_two .item image{width: 10upx; height: 18upx; margin-left: 10upx;}
.recommand_two .item .title{color: #32BF3D; font-size: 44upx;}

.list_item .item_wrap{width: 100%;box-sizing: border-box;padding-left: 30upx; background: #FFFFFF; }
.list_item .item{display: flex;flex-direction: row;border-bottom: #E3E3E3 solid 2upx; padding: 35upx 0upx; font-size: 28upx; color: #666666;}
.list_item .item image{width: 185upx; height: 185upx;border-radius: 8upx; margin-right: 32upx;}
.list_item .item .content_item{display: flex; flex-direction: column; justify-content: space-between;flex: 1; padding-right: 30upx;}
.list_item .item .content_item .title{color: #333333; font-size: 28upx;}
.list_item .item .content_item .content{color: #666666; font-size: 24upx;}
.list_item .item .content_item .tag_wrap span{color: #F88415; font-size: 24upx; background: #FFF2E9; border-radius:5upx; margin-right: 10upx; padding: 5upx;}

</style>
