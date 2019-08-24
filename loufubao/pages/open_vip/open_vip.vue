<template>
	<view>
		<view class="head_bg"></view>
		<view class="head_wrap">
			<image src="../../static/img/open_vip_bg.png" mode="widthFix" class="bg"></image>
			<image :src="userInfo.userImage?userInfo.userImage:'../../static/img/mtyou_icon.png'" mode="aspectFill" class="head_icon"></image>
			<view class="content">
				<view class="row head_item">
					<span class="name">{{userInfo.userName}}</span>
					<image src="../../static/img/vip_logo_icon.png" mode="aspectFill"></image>
					<span>({{phone}}登录)</span>
				</view>
				
				<span>{{endTime}}到期，购买后有效期将顺延</span>
				
			</view>
		</view>
		
		<view class="info_text">开通vip享四大专属特权</view>
		
		<view class="row_center">
			<view class="type_item">
				<image src="../../static/img/spyh.png" mode="aspectFill"></image>
				<span>商品优惠</span>
			</view>
			<view class="type_item">
				<image src="../../static/img/kdyh.png" mode="aspectFill"></image>
				<span>快递优惠</span>
			</view>
			<view class="type_item">
				<image src="../../static/img/cjhd.png" mode="aspectFill"></image>
				<span>抽奖活动</span>
			</view>
			<view class="type_item">
				<image src="../../static/img/zbhd.png" mode="aspectFill"></image>
				<span>周边优惠</span>
			</view>
		</view>
		
		<scroll-view class="uni-swiper-tab" scroll-x >
			<view v-for="(item,index) in typeList" :key="index" class="swiper-tab-list"
					@click="changeType(index)" :class="{'active': (index == curIndex)}">
				<div class="title">{{item.text}}</div>
				<div class="price_wrap">
					<span class="price_unit">¥</span>
					<span class="price">{{item.price}}</span>
				</div>
				<div class="price_info">{{item.desc}}</div>
				<div class="tag">{{item.discount}}折</div>
			 </view>
		</scroll-view>
		
		<div class="info_title">自动续费服务声明</div>
		<div class="info_pay">付款：用户确认购买并付款后计入iTunes账户；</div>
		<div class="auto_pay_info">取消续订：如需取消续订，请在当前订阅周期到期24小时以前，手动在iTunes/Apple ID设置管理中关闭自动续费功能，到期前24小时内取消，将会收取订阅费用；</div>
		
		<button type="primary" class="btn" @tap="create_member_order">立即续费</button>
		<button type="primary" class="btn" @tap="goToVip">激活码激活</button>
		
		<uni-popup :show="popupParam === 'bottom'" position="bottom" mode="fixed" :payWay="'5'" :orderID="orderID" :money="allMoney" @hidePopup="payPopup('')" />
		
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,create_member_order,member_list } from '@/utils/api'
	import uniPopup from '@/components/popup-pay.vue';
	
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				typeList: [1,2,3,4,5,6,7],
				curIndex: 0,
				userInfo: {},
				phone: 0,
				endTime: '',
				popupParam:'',
				orderID:'',
				allMoney: '0'
			}
		},
		methods: {
			payPopup(popupParam) {
				this.popupParam=popupParam;
				this.$forceUpdate();
			},
			changeType(index){
				this.curIndex = index;
				this.$forceUpdate();
			},
			async member_list(){
				let res = await member_list();
				if(res.status == 1){
					this.typeList = res.data;
				}
			},
			async create_member_order(){
				let params = {
					user_id: this.userInfo.userID,
					type_id: this.typeList[this.curIndex].type_id
				};
				let res = await create_member_order(params);
				if(res.status == 1){
					this.allMoney = res.data.price;
					this.orderID = res.data.orderID;
					this.payPopup('bottom');
				}
			},
			goToVip(){
				uni.navigateTo({
					url:'../jihuo_vip/jihuo_vip'
				})
			},
			callPhone: function(){
				uni.makePhoneCall({
					phoneNumber:"4008888808",
					success: () => {
						console.log("成功拨打电话")
					}
				})
			},
		},
		onLoad() {
			this.member_list();
			this.userInfo = uni.getStorageSync("userInfo");
			this.phone = this.userInfo.phone.substring(0,3)+"****"+this.userInfo.phone.substring(7,11);
			console.log(this.userInfo.member_end_time);
			let d = new Date(parseInt(this.userInfo.member_end_time)*1000);
			console.log(d);
			this.endTime = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
		},
		onNavigationBarButtonTap() {
			this.callPhone();
		}
	}
</script>

<style>

.head_bg{height: 240upx; background: #107EFF;}
.head_wrap{height: 202upx; width: 100%; padding: 0upx 30upx;margin-top: -145upx; display: flex;flex-direction: row; align-items: center;
	position: relative;box-sizing: border-box; color: #FFFFFF; font-size: 22upx; z-index: 1;}
.head_wrap .bg{position: absolute;top: 0upx; left: 5%; height: 100%;width: 90%; z-index: 0;}
.head_wrap .content{position: relative;z-index: 2; display: flex;flex-direction: column;}
.head_wrap .head_icon{ width: 88upx; height: 88upx; margin-right: 20upx;margin-left: 30upx;border-radius: 50%;position: relative;z-index: 10;}
.head_wrap .head_item .name{font-size: 30upx;}
.head_wrap .head_item {color: #FFFFFF;}
.head_wrap .head_item image{width: 32upx; height: 27upx; margin: 0upx 10upx;}
.info_text{color: #2293FF; font-size: 38upx;text-align: center; margin: 50upx auto 20upx;}

.type_item{flex: 1; color: #8C8C8C; font-size: 28upx;display: flex;flex-direction: column;align-items: center;justify-content: center;}
.type_item image{width: 70upx; height: 70upx; margin-bottom: 20upx;}

.uni-swiper-tab{padding-left: 30upx;border-bottom: none!important; height: 240upx;position: relative; margin-top: 50upx;box-sizing: border-box;}
.swiper-tab-list{width: 190upx; height: 220upx; border: 2upx solid #107EFF; background:rgba(255,255,255,0.15);
	border-radius:10upx; margin-right: 20upx; position: relative;margin-top: 10upx;}
.swiper-tab-list div{ text-align: center;width: 190upx; line-height: 1.0;}
.swiper-tab-list .title{color: #242424; font-size: 30upx; margin-top: 36upx;}
.swiper-tab-list .price_wrap{margin: 20upx auto 33upx;}
.swiper-tab-list .price_unit{color: #107EFF; font-size: 26upx;}
.swiper-tab-list .price{color: #107EFF; font-size: 40upx; font-weight: bold;}
.swiper-tab-list .price_info{color: #8C8C8C; font-size: 20upx;}
.swiper-tab-list .tag{color: #FFFFFF; font-size: 20upx;width: 60upx; height: 26upx; line-height: 26upx;text-align: center;
	background: #FF3674; border-radius: 5upx; position: absolute;top: -13upx; right: 0upx;}
.uni-swiper-tab .active{background:rgba(16,126,255,0.15);}

.info_title{color: #424242; font-size: 30upx;margin-top: 50upx; padding-left: 30upx;}
.info_pay{color: #8C8C8C; font-size: 26upx;margin-top: 30upx;padding-left: 30upx;}
.auto_pay_info{color: #8C8C8C; font-size: 26upx;margin-top: 10upx;padding-left: 30upx; margin-bottom: 100upx;}

.btn{margin: 0upx 5% 30upx; box-sizing: border-box;  width: 90%;}

</style>
