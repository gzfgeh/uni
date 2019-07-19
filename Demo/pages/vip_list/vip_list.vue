<template>
	<view>
		<img :src="imgSrc" mode="widthFix" class="vip_img" @click="expandImg">
		<div class="no_style">卡号:{{member_no}}</div>
		
		
		<block v-for="(item,index) in list" :key="index">
			<navigator class="item_wrap" >
				<img :src="item.img" mode="aspectFill" class="pic">
				<div class="content_wrap">
					<span style="color: #000000; font-size: 30upx;">{{item.desc}}</span>
					<span>{{item.store_name}}</span>
					<span>{{item.address}}</span>
				</div>
			</navigator>
		</block>
		
		<uni-popup :show="popupParam === 'bottom'" position="bottom" mode="fixed" :payWay="'5'"  :orderID="orderID" :money="allMoney+''" @hidePopup="payPopup('')" />

		
	</view>
</template>

<script>
		import { BASE_IMAGE_URL,create_member_order,member_store,getuserInfobyuserID } from '@/utils/api'
	import uniPopup from '@/components/popup-pay.vue'
	import { formatLocation,getPosition } from '@/utils/index'
	
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				list: [1,2,3,4],
				isExpand: false,
				imgList: ['../../static/img/my_bg.png', '../../static/img/vip_big.png'],
				imgSrc: '../../static/img/my_bg.png',
				popupParam: '',
				orderID: '',
				allMoney:'',
				member_no: ''
			}
		},
		methods: {
			payPopup(popupParam) {
				this.popupParam=popupParam;
			},
			async create_member_order(){
				let res = await create_member_order({user_id: uni.getStorageSync("userInfo").userID});
				if(res.status == 1){
					this.allMoney = res.data.price;
					this.orderID = res.data.orderID;
					this.payPopup('bottom');
				}
			},
			async member_store(longitude, latitude){
				let params = {
					user_id: uni.getStorageSync("userInfo").userID,
					dem_lng: longitude,
					dem_lat: latitude
				};
				let res = await member_store(params);
				if(res.status == 1){
					this.list = res.data;
				}
			},
			async getuserInfobyuserID(){
				let res = await getuserInfobyuserID();
				if(res.status == 1){
					uni.setStorageSync("userInfo", res.data.userInfo);
					this.member_no = res.data.userInfo.member_no;
					this.member_no = this.member_no?this.member_no:'123456';
				}
			},
			expandImg(){
				let userInfo = uni.getStorageSync("userInfo");
				if(userInfo.is_member == '1'){
					this.isExpand = !this.isExpand;
					this.imgSrc = this.isExpand?this.imgList[0]:this.imgList[1]
				}else{
					//不是vip 点击购买
					this.create_member_order();
				}
				
			}
		},
		
		onLoad() {
			let that = this;
			//that.member_store("121.297199", "31.172494");
			
			uni.getLocation({
				type: 'wgs84',
				success: function (res) {
					console.log('当前位置的经度：' + res.longitude);
					console.log('当前位置的纬度：' + res.latitude);
					that.member_store(res.longitude, res.latitude);
				},
				fail(res) {
					console.log(res);
					that.member_store("121.297199", "31.172494");
				}
			});

		},
		onShow() {
			this.getuserInfobyuserID();
		}
		
	}
</script>

<style>
.vip_img{width: 92%; margin: 60upx 4%; border-radius: 24upx; z-index: 1;}
.no_style{ position: absolute; top: 70upx; right: 10%; border-radius: 24upx; z-index: 2; font-size: 40upx; color: #FFF;}
.type_wrap{color: #333333; font-size: 32upx; border-bottom: 1upx solid #E3E3E3; padding-bottom: 20upx;}

.item_wrap{display: flex; flex-direction: row; align-items: center; padding: 30upx; border-bottom: 1upx solid #E3E3E3;}
.item_wrap .pic{width: 140upx; height: 140upx; margin-right: 30upx;}
.item_wrap .content_wrap{font-size: 28upx; color: #666666;display: flex;flex-direction: column;}
.content_wrap .price{font-size: 32upx; color: #FF5269; margin-right: 20upx;}
</style>
