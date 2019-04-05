<template>
    <div class="app">
        
		
		<swiper :indicator-dots="true" :autoplay="true"
					:interval="5000" :duration="1000" :style="{'height': scrollHeight+'px'}">            
				<swiper-item v-for="(item, index) in itemList" :key="index" :style="{'height': scrollHeight+'px'}">  
					<image :src="item.t_url" mode="widthFix" class="head_img" @load="imageLoad" />           
				</swiper-item>        
		</swiper>


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
				<img src="../../static/img/tiao_liao.png" >
				<span>调料干货</span>
			</view>

        </div>

    </div>
</template>

<script>
	import { BASE_IMAGE_URL,getImgList,getUserInfo } from '@/utils/api'
	import { formatLocation } from '@/utils/index'
	var amapFile = require('../../static/js/amap-wx.js');
	
	export default {
		
		data() {
			return {
				home_pic: '../../static/img/home_top.png',
				money_btn: BASE_IMAGE_URL+'money_btn.png',
				hongniang_btn: BASE_IMAGE_URL+'pipaiting.png',
				jiaoyou_btn: BASE_IMAGE_URL+'jiaoyou_btn.png',
				youxi_btn: BASE_IMAGE_URL+'youxi_btn.png',
				shipin_btn: BASE_IMAGE_URL+'zhishixiuqiu.png',
				toutiao_btn: BASE_IMAGE_URL+'toutiao_btn.png',
				itemList: [],
				scrollHeight: 0,
				markersData: {
				          latitude: '',
				          longitude: '',
				          key: '18271349f9e1a27539f6610b296b32ec'
				      },
				address: ''
			}
		},
		onLoad: function() {
			
			this.getImgList();
			this.getUserInfo();
		},
		onShow: function(){
			
		},
		methods: {
			imageLoad: function(e){
				let imgWidth = e.mp.detail.width;
				let imgHeight = e.mp.detail.height;
				let winWidth = uni.getSystemInfoSync().screenWidth;
				let scale = winWidth / imgWidth;
				this.scrollHeight = imgHeight * scale;
				console.log(this.scrollHeight)
			},
			async getUserInfo(){
// 				this.address = "广东深圳市坪山区华鸿大厦"
// 				uni.setStorageSync("address", "广东省|深圳市|坪山区");
				
// 				this.address = "上海上海市虹口区华鸿大厦"
// 				uni.setStorageSync("address", "上海|上海市|虹口区");
				// return;
				
				let res = await getUserInfo(uni.getStorageSync("openid"));
				
// 				uni.showModal({
// 					title: '提示',
// 					content: JSON.stringify(res),
// 					success: function (res) {
// 						if (res.confirm) {
// 							
// 						} else if (res.cancel) {
// 							console.log('用户点击取消');
// 						}
// 					}
// 				});
// 				return;
				
				uni.removeStorageSync("m_is_gys");
				uni.removeStorageSync("bindPhone");
				uni.removeStorageSync("location");
				uni.removeStorageSync("address");
				
				if((res.code == 1000)){
					if(res.data){
						uni.setStorageSync("m_is_gys", res.data.m_is_gys);
						uni.setStorageSync("bindPhone", res.data.m_phone);
						
						let province = res.data.m_sheng;
						let city = res.data.m_shi;
						let district = res.data.m_qu;
						this.address = province+city+district;
						uni.setStorageSync("location", this.address);
						uni.setStorageSync("address", province+"|"+city+"|"+district);
						
						if(res.data.m_is_gys == 1){
							return;
						}
					}
					
					this.getLocation();
				}else{
					
				}
				
			},
			async getImgList(){
				let res = await getImgList();
				if(res.code == 1000){
					console.log(res.data);
					this.itemList = res.data;
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
								that.getLocation();
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
			getLocation: function(){
// 				this.address = "广东深圳市坪山区华鸿大厦"
// 				uni.setStorageSync("address", "广东省|深圳市|坪山区");
// 				return;
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
			          console.log(err)
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
							if(!city){
								city = province;
							}
							
							if(province.length > 2){
								province = province.substring(0, 2);
							}
							uni.setStorageSync("address", province+"|"+city+"|"+district);
							
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


	
</style>
