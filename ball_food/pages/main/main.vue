<template>
    <div class="app">
        
		<!-- <el-amap vid="amap" :plugin="plugin" class="amap-demo"></el-amap> -->
		
		<swiper :indicator-dots="true" :autoplay="true"
					:interval="5000" :duration="1000" class="head_img">            
				<swiper-item v-for="(item, index) in itemList" :key="index" class="head_img">  
					<image :src="item.t_url" mode="widthFix" class="head_img"  />           
				</swiper-item>        
		</swiper>
		
		<!-- <img :src="t_url" mode="widthFix" class="head_img"  > -->
		
		<div class="search_wrap" @click="goToGoodsList">
			<img src="../../static/img/home_search.png" mode="widthFix">
			<span>{{placeHolderText}}</span>
		</div>


        <div class="row_around content_wrap">
			<view class="col_center item_wrap" hover-class="uni-list-cell-hover" @tap="goDetail(0)">
				<img src="../../static/img/shu_cai.png" >
				<span>新鲜蔬菜</span>
			</view>
			
			<view class="col_center item_wrap" hover-class="uni-list-cell-hover" @tap="goDetail(1)">
				<img src="../../static/img/rou.png" >
				<span>肉禽产品</span>
			</view>
			
			<view class="col_center item_wrap" hover-class="uni-list-cell-hover" @tap="goDetail(2)">
				<img src="../../static/img/liang_you.png" >
				<span>米面粮油</span>
			</view>
			
			<view class="col_center item_wrap" hover-class="uni-list-cell-hover" @tap="goDetail(3)">
				<img src="../../static/img/hai_xian.png" >
				<span>海鲜水产</span>
			</view>
			
			<view class="col_center item_wrap" hover-class="uni-list-cell-hover" @tap="goDetail(4)">
				<img src="../../static/img/dan_dou.png" >
				<span>蛋品豆类</span>
			</view>
			
			<view class="col_center item_wrap" hover-class="uni-list-cell-hover" @tap="goDetail(5)">
				<img src="../../static/img/tejia_icon.png" >
				<span>特价秒杀</span>
			</view>

        </div>

    </div>
</template>

<script>
	import { BASE_IMAGE_URL,getImgList,getUserInfo,getConfig } from '@/utils/api'
	import { formatLocation,getPosition } from '@/utils/index'
	// var VueAMap = require('../../static/js/amap-h5.js');
	
	export default {
		
		data() {
			let self = this;
			return {
				home_pic: '../../static/img/home_top.png',
				money_btn: BASE_IMAGE_URL+'money_btn.png',
				hongniang_btn: BASE_IMAGE_URL+'pipaiting.png',
				jiaoyou_btn: BASE_IMAGE_URL+'jiaoyou_btn.png',
				youxi_btn: BASE_IMAGE_URL+'youxi_btn.png',
				shipin_btn: BASE_IMAGE_URL+'zhishixiuqiu.png',
				toutiao_btn: BASE_IMAGE_URL+'toutiao_btn.png',
				itemList: [],
				scrollHeight: 200,
				markersData: {
				          latitude: '',
				          longitude: '',
				          key: '0f8d53697264ae0a58bed025edb73e31'
				      },
				address: '',
				t_url: '',
				placeHolderText: '输入搜索关键词'
			}
		},
		onLoad: function() {
			this.getUserInfo();
			this.getConfig();
		},
		
		onShow: function(){
			
		},
		methods: {
			async getConfig(){
				let res = await getConfig();
				if(res.code == 1000){
					this.placeHolderText = res.data[1].c_detail;
					let length = this.placeHolderText.length;
					this.placeHolderText = this.placeHolderText.substring(3, length);
					let temp = this.placeHolderText.indexOf("<");
					this.placeHolderText = this.placeHolderText.substring(0, temp);
				}
			},
			goToGoodsList: function(){
				uni.navigateTo({
					url: '../goods_list/goods_list'
				})
			},
// 			imageLoad: function(e){
// 				let imgWidth = e.mp.detail.width;
// 				let imgHeight = e.mp.detail.height;
// 				let winWidth = uni.getSystemInfoSync().screenWidth;
// 				let scale = winWidth / imgWidth;
// 				this.scrollHeight = imgHeight * scale;
// 			},
			async getUserInfo(){
				// this.address = "广东深圳市坪山区华鸿大厦"
				// uni.setStorageSync("address", "广东省|深圳市|坪山区");
				
				// this.address = "上海上海市虹口区华鸿大厦"
				// uni.setStorageSync("address", "上海|上海|虹口区");
				// return;
				
				let res = await getUserInfo(uni.getStorageSync("openid"));
				uni.removeStorageSync("m_is_gys");
				uni.removeStorageSync("bindPhone");
				uni.removeStorageSync("location");
				uni.removeStorageSync("address");
				
				if((res.code == 1000)){
					this.getImgList();
					if(res.data){
						uni.setStorageSync("m_is_gys", res.data.m_is_gys);
						uni.setStorageSync("bindPhone", res.data.m_phone);
						
						if(parseInt(res.data.m_is_gys) == 1){
							//供应商
							let province = res.data.m_sheng;
							let city = res.data.m_shi;
							let district = res.data.m_qu;
							this.address = province+city+district;
							uni.setStorageSync("location", this.address);
							uni.setStorageSync("address", province+"|"+city+"|"+district);
							
// 							uni.showModal({
// 								title: '是供应商提示',
// 								content: province+"|"+city+"|"+district,
// 								success: function (res) {
// 									if (res.confirm) {
// 										
// 									} else if (res.cancel) {
// 										console.log('用户点击取消');
// 									}
// 								}
// 							});
						}else{
							this.H5GetLocation();
						}
					}else{
						this.H5GetLocation();
					}
					
					
				}else{
					wx.showToast({
						title: "获取用户信息失败",
						icon: 'none',
						duration: 1000
					});
					this.H5GetLocation();
				}
				
			},
			async getImgList(){
				let res = await getImgList();
				if(res.code == 1000){
					console.log(res.data);
					this.itemList = res.data;
					
					this.itemList.map((item) => {
						if(item.t_url.indexOf("http:") != -1){
							item.t_url = "https" + item.t_url.substring(4, item.t_url.length);
						}
					})
					
					// uni.showModal({
					// 	title: '图片',
					// 	content: res.data[0].t_url,
					// 	success: function (res) {
					// 		if (res.confirm) {
					// 			
					// 		} else if (res.cancel) {
					// 			console.log('用户点击取消');
					// 		}
					// 	}
					// });
					
					// this.t_url = this.itemList[0].t_url;
				}
			},
			goDetail(index) {
				if(!this.address){
					let that = this;
					uni.showModal({
						title: '提示',
						content: '请授权位置信息',
						success: function (res) {
							if (res.confirm) {
								that.H5GetLocation();
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
					
				}else{
					uni.navigateTo({
						url: '../mall_list/mall_list?id='+index
					})
				}
				
			},
			H5GetLocation: function(){
				let that=this;
// 				this.address = "上海|上海|青浦"
// 				uni.setStorageSync("address", "上海|上海|青浦");
// 				return;

// 				this.address = "广东深圳坪山区华鸿大厦"
// 				uni.setStorageSync("address", "广东|深圳|坪山区");
// 				return;
				
				getPosition().then(result => {
					let queryData = {
					  longtitude: String(result.longitude).match(/\d+\.\d{0,6}/)[0],
					  latitude: String(result.latitude).match(/\d+\.\d{0,6}/)[0],
					  channelType: '00'
					}
					console.log(queryData);
					that.markersData.latitude = queryData.latitude;
					that.markersData.longitude = queryData.longtitude;
					that.loadCity();
				}).catch(err => {
					console.log(err);
					wx.showToast({
						title: "页面获取当前位置失败",
						icon: 'none',
						duration: 1000
					});
					that.getLocation();
				})
			},
			getLocation: function(){
// 				this.address = "广东深圳市坪山区华鸿大厦"
// 				uni.setStorageSync("address", "广东省|深圳市|坪山区");
				// return;
				if(this.address){
					return;
				}
				let that=this;
				
			  wx.getLocation({
					type: "gcj02",
			      success: function (res) {
					  console.log(res);
					  
			          that.markersData.latitude = res.latitude//维度
			          that.markersData.longitude = res.longitude//经度
			          console.log(res.longitude+"+++------+++"
			          +res.latitude+"------");
			          that.loadCity();
					  
			      },
			      fail: function(err){
					  wx.showToast({
					  	title: "获取当前位置失败",
					  	icon: 'none',
					  	duration: 1000
					  });
			          console.log(err);
					  // that.H5GetLocation();
			      }
			  });
			},
			loadCity: function(){
				var that = this;
				
				uni.request({
					url: 'https://restapi.amap.com/v3/geocode/regeo?key=18271349f9e1a27539f6610b296b32ec&location='
						+that.markersData.longitude+','+that.markersData.latitude,
					
					success: (res) => {
						console.log(res);
						if(res.data.status == 1){
							//成功
							that.address = res.data.regeocode.formatted_address;
							uni.setStorageSync("location", that.address);
							
							let province = res.data.regeocode.addressComponent.province;
							let city = res.data.regeocode.addressComponent.city;
							let district = res.data.regeocode.addressComponent.district;
							
							if(province.length > 2){
								province = province.substring(0, 2);
							}
							
							if(!city || (city.length <2)){
								city = province;
							}
							
							if(city.length > 2){
								city = city.substring(0, 2);
							}
							
							uni.setStorageSync("address", province+"|"+city+"|"+district);
							that.getImgList();
// 							uni.showModal({
// 								title: '不是供应商提示',
// 								content: province+"|"+city+"|"+district,
// 								success: function (res) {
// 									if (res.confirm) {
// 										
// 									} else if (res.cancel) {
// 										console.log('用户点击取消');
// 									}
// 								}
// 							});
							
						}else{
							wx.showToast({
								title: "获取当前地理位置失败",
								icon: 'none',
								duration: 1000
							});
						}
					},
					fail: (res) => {
						wx.showToast({
							title: "获取当前地理位置失败",
							icon: 'none',
							duration: 1000
						});
					},
				});
				

			},
			
		}
	}
</script>

<style lang="scss" scoped>
.app{
	background-color: #FFFFFF;
}

.content_wrap{
	flex-flow: wrap;
}

.head_img{
	width: 100%;
	height: 400rpx!important;
}

.item_wrap{
	color: #35B583;
	font-size: 40upx;
	margin-top: 20upx;
	img{
		width: 120upx;
		height: 120upx;
		margin-top: 10upx;
		padding: 0upx 40upx;
	}
}

swiper{
	width: 100%;
}
swiper-item{
	width: 100%;
}

.search_wrap{
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 90%;
	height: 80upx;
	margin: 20upx 5%;
	box-sizing: border-box;
	border-radius: 20upx;
	background-color: rgba(0,0,0,0.1);
	color: #000000;
	font-size: 28upx;
	border: solid 2upx #F2F2F2;
	padding-left: 40upx;
}

.search_wrap img{width: 40upx;margin-right: 20upx;}
	
</style>
