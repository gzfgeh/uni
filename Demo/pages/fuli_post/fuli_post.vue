<template>
	<view>
		<div class="mui-content">
			
			<radio-group class="radio-group"  >
			  <label class="radio" @click="goToChange(1)">
				<radio :checked="addressType == 1" />选择楼宇
			  </label>
						
			  <label class="radio" @click="goToChange(0)">
				<radio :checked="addressType == 0"/>选择地址
			  </label>
						
			</radio-group>
			
			<div class="content_wrap" style="margin-bottom: 30upx;">
				
				
				<navigator class="row_between address_wrap" @click="selectAddress" v-if="addressType==1">
					<span class="text">{{buildItem.buildingName?buildItem.buildingName:'选择楼宇'}}</span>
					<span class="arraw"></span>
				</navigator>
				
				<navigator class="row_between address_wrap" @click="selectAddress" v-else-if="addressType == 0 && selectAddressID == 0">
					<span class="text">从地址簿选择地址</span>
					<span class="arraw"></span>
				</navigator>
				
				<navigator class="col_between address_wrap" url="../address_list/address_list?typeIndex=0" v-else>
					<div class="row_between">
						<span >收货人</span>
						<span>{{name}}  {{phone}}</span>
					</div>
					<div class="row_between">
						<span>收货地址</span>
						<span class="address">{{address}}</span>
					</div>
					
				</navigator>
				
			</div>
			
			
			<div class=" content_wrap" >
				<div class="col_between border" >
					<div class="content_up">
						<img :src="couponItem.img" mode="widthFix"/>
						<span class="content_center">{{couponItem.title}}</span>
						<div class="content_end">
							<span >￥{{couponItem.pay_price}}</span>
						</div>
					</div>
					<div class="content_down" >
						<span v-if="addressType ==0 && yunFee != 0" style="margin-right: 20upx;">运费：￥{{yunFee}}</span>
						<span class="sencod_txt">应付金额:
							<span class="money">￥</span><span class="money_number">{{money}}</span>
							
						</span>
					</div>
				</div>
			</div>
			
			
			<div class="button row_between"  @tap="create_coupon_order">
				<span>总计：</span>
				<span class="price">¥{{money}}</span>
				<button>支付</button>
			</div>
			
		</div>
		
		<uni-popup :show="popupParam === 'bottom'" position="bottom" mode="fixed" :payWay="'4'"  :orderID="orderID" :money="money+''" @hidePopup="payPopup('')" />

		
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,addressManage,calculateExpressPrice,create_coupon_order} from '@/utils/api'
	import uniPopup from '@/components/popup-pay.vue'
	import {mapState,mapMutations, mapActions, mapGetters} from 'vuex';
	
	import cityData from '../../components/city.data.js';
	
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				type: 0,
				name: '请选择姓名',
				phone: '请选择手机号',
				address: '请选择地址',
				companyID: 0,
				quantity: '',
				demandDetail: '',
				money: 0,
				selectAddressID: 0,
				addressType: 1,
				buildItem: {},
				couponItem: {},
				yunFee: 0,
				toWhere: '',
				popupParam: '',
				orderID: ''
			}
		},
		computed:{
			...mapState({
				addressID: state => state.addressID
			})
		},
		methods: {
			payPopup(popupParam) {
				this.popupParam=popupParam;
			},
			
			selectAddress(){
				if(this.addressType == 1){
					//选择楼宇
					uni.navigateTo({
						url: '/pages/build/build?addressType=1'
					});
				}else{
					//选择地址
					uni.navigateTo({
						url:'../address_list/address_list?typeIndex=0'
					})
				}
			},
			goToChange(index){
				this.addressType = index;
				if(index == 1){
					this.money = this.couponItem.pay_price;
				}else{
					this.calculate();
				}
			},
			async create_coupon_order(){
				if(this.addressType == 1){
					// 楼宇
					if(!this.buildItem || !this.buildItem.buildingName){
						uni.showToast({
							icon:'none',
							title:"请选择楼宇",
							duration:1000
						})
						return;
					}
				}else{
					if(this.selectAddressID == 0){
						uni.showToast({
							icon:'none',
							title:"请选择地址",
							duration:1000
						})
						return;
					};
				}
				let userInfo = uni.getStorageSync("userInfo");
				let platform = 3;
				// #ifdef APP-PLUS
					platform = 1;
				// #endif
				let params = {
					user_id: userInfo.userID,
					addressID: this.selectAddressID,
					platform: platform,
					c_id: this.couponItem.c_id
				};
				
				if(this.addressType == 1){
					params.buildingID = this.buildItem.buildingID;
				}
				
				let res = await create_coupon_order(params);
				if(res.status == 1){
					this.allMoney = res.data.price;
					this.orderID = res.data.orderID;
					this.payPopup('bottom');
				}
			},
			goToAddress(){
				uni.navigateTo({
					url: "/page/address_list/address_list?typeIndex=0"
				});
				
			},
			async addressManage(){
				let params = {
					userID: uni.getStorageSync("userInfo").userID,
					addressID: this.selectAddressID,
					flag: 4
				};
				let res = await addressManage(params);
				if(res.status == 1){
					this.name = res.data.name;
					this.phone = res.data.phone;
					this.address = res.data.province+res.data.city+res.data.area+res.data.detail;
					this.selectAddressID = res.data.addressID;
					this.toWhere = res.data.province;
					this.calculateExpressPrice();
				}
			},
			
			async calculateExpressPrice(){
				let userInfo = uni.getStorageSync("userInfo");
				let params = {
					fromWhere: '上海',
					toWhere: this.toWhere,
					yzID: userInfo.yzID,
					userID: userInfo.userID,
					weight: 1
				};
				let res = await calculateExpressPrice(params);
				if(res.status == 1){
					let mixPrice = 10000;
					let priceIndex = 0;
					res.data.defaultExpressInfo.map((item, index) => {
						if(parseInt(item.price)  < mixPrice){
							mixPrice = parseInt(item.price);
							priceIndex = index;
						}
					});
					this.yunFee = mixPrice;
					this.calculate();
				}
			},
			calculate(){
				this.money = parseFloat(this.couponItem.pay_price)+parseFloat(this.yunFee);
			}
			
			
		},
		onLoad(options) {
			this.$store.commit("changeAddress", 0);
			uni.removeStorageSync("couponAddress");
			this.couponItem = uni.getStorageSync("couponItem");
			this.money = this.couponItem.pay_price;
		},
		onShow() {
			if(this.addressType == 1){
				//楼宇
				this.buildItem = uni.getStorageSync("couponAddress");
			}else{
				if(this.addressID != 0){
					this.selectAddressID = this.addressID;
					this.addressManage();
				}
			}
			
		}
	}
</script>

<style>

.content_wrap{box-sizing: border-box;box-shadow: 0px 0px 20upx 0px #EAEAEA;margin: 36upx 30upx 160upx;}
.address_wrap{padding: 20upx 30upx;}
.coupon_wrap{border-top: 2upx solid #E3E3E2; padding: 20upx 30upx; color: #666666; font-size: 28upx;}
.address_wrap .text{color: #107EFF; font-size: 32upx;}
.coupon_wrap .text{color: #323333; font-size: 28upx;}
.address_wrap .address{white-space: normal; word-wrap: break-word;word-break: break-all;}
.address_wrap div span{min-width: 160upx;}


.content_wrap .border{width: 100%; padding: 20upx 30upx;box-sizing: border-box; border-bottom: 2upx solid #E3E3E3;}
.content_up{width: 100%;display: flex;flex-direction: row;justify-content: space-between;}
.content_up img{width: 140upx;height: 140upx;border-radius: 8upx;}
.content_center{width:336upx;max-height:114upx;position: relative;line-height: 40upx;overflow: hidden;font-size: 28upx;color: #666666;flex: 1;padding: 0px 32upx;}
.content_end{color: #666666;font-size: 28upx;display: flex;flex-direction: column;}
.content_end .number{text-align: right;}
.content_down{width: 100%;text-align: right;}
.first_txt{color: #999999;font-size: 28upx;margin-right: 20upx;}

.button{width: 100%;height: 150upx;line-height: 150upx;background-color: #ffffff;padding:0upx 20upx;text-align: center;font-size: 28upx;position: fixed;
	bottom: 0upx;z-index: 1;box-shadow:0px 6upx 54upx 0px rgba(221,221,221,0.41);box-sizing: border-box;}
.button .text{margin: 0upx 10upx;}
.button .price{margin-right: 10upx; color: #FF5269; font-size: 32upx;}
.button button{margin: 40upx 10upx;flex:1;height: 94upx;line-height: 94upx;border-radius: 10upx;color: #ffffff;background-color: #427DFF;}

.radio-group{text-align: center; margin-top: 20upx;}


</style>
