<template>
    <view class="content">
		
		<image src="../../static/img/coupon_detail_bg.png" mode="aspectFill" :style="{'top': (isApp?'100upx':'200upx')}"
				class="detail_bg"></image>
				
		<view class="col item" :style="{'margin-top': (isApp?'20upx':'112upx')}" >
			<image :src="logo" mode="aspectFill" class="detail_logo"></image>	
			
			<span class="name">{{title}}</span>
			<span class="info">{{sku}}</span>
			<span class="name">{{place}}</span>
			<img :src="src" mode="widthFix" class="img">
			<span class="text">展示此二维码给楼宇负责人，即可兑换相应礼品</span>
			
			<span class="time" >使用有效期：{{start_time}} 至 {{end_time}}</span>
			
			<div class="order_status_wrap">
				<img src="../../static/img/order_status_icon.png" mode="aspectFill">
				<span>{{type}}</span>
			</div>
		</view>		
		
		<view class="row_around" style="margin-top: 100upx; background: #398FEE;">
			<button @tap="goToBack">取消核销</button>
			<button @tap="writeOff">确认核销</button>
		</view>
		
		<!-- <view @longpress="saveQrcode" style="visibility: hidden; margin-top: -440upx;">
			<tki-qrcode
			ref="qrcode"
			:val="src"
			:size="size"
			:unit="unit"
			:background="background"
			:foreground="foreground"
			:pdground="pdground"
			:icon="icon"
			:iconSize="iconsize"
			:lv="lv" 
			:onval="onval"
			:loadMake="loadMake"
			@result="qrR" />
		</view> -->
		
	
    </view>
</template>

<script>
	
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	import { BASE_IMAGE_URL,couponView,writeOff } from "@/utils/api";

    export default {
		data(){
			return {
				logo: '',
				title: '',
				src: '', // 二维码生成后的图片地址或base64
				isApp: false,
				goodsID: 0,
				start_time: '',
				end_time: '',
				sku:'',
				type:'',
				place:'',
				
				val: '二维码', // 要生成的二维码值
				size: 440, // 二维码大小
				unit: 'upx', // 单位
				background: '#FFFFFF', // 背景色
				foreground: '#000000', // 前景色
				pdground: '#000000', // 角标色
				icon: '', // 二维码图标
				iconsize: 40, // 二维码图标大小
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: true, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
			}
		},
		components: {tkiQrcode},
		onLoad (opt) {
			// #ifdef APP-PLUS
				this.isApp = true;
			// #endif
			
			let goodsID = this.$root.$mp.query.goodsID;
			
			this.goodsID = opt.goodsID?opt.goodsID:603;
			this.couponView();
		 },
        methods: {
			goToBack: function(){
				uni.navigateBack();
			},
			async writeOff(){
				let userInfo = uni.getStorageSync("userInfo");
				let params = {
					id: this.goodsID,
					courier_id: userInfo.courierID
				};
				let res = await writeOff(params);
				if(res.status == 1){
					uni.showToast({
						icon:'none',
						duration:1000,
						title:"核销成功"
					});
					
					setTimeout(()=>{
						uni.navigateBack()
					}, 1000);
				}else{
					uni.showToast({
						icon:'none',
						duration:1000,
						title:res.message
					});
				}
			},
			async couponView(){
				let res = await couponView({id: this.goodsID});
				if(res.status == 1){
					this.src = res.data.qyCodeUrl;
					this.logo = res.data.img;
					this.start_time = res.data.start_time;
					this.end_time = res.data.end_time;
					this.title = res.data.title;
					this.sku = res.data.sku;
					this.type = res.data.type;
					this.place = res.data.place;
					
					// setTimeout(() => {
					// 	this.$refs.qrcode._makeCode();
					// }, 1000);
				}
			},
			qrR(res) {
				this.src = res;
				// this.src = this.base64ToBlob(this.src);
			},
	
        }
    }
</script>

<style>
	page{background-color: #398FEE;height: 100%;}
	.content{
		background-color: #398FEE;
		color: rgba(0,0,0,0.6);
		font-size: 36upx;
		display: flex;
		flex-direction: column;
		height: 100%;
		overflow: hidden;
		box-sizing: border-box;
	}
	
	.uni-btn-icon{color: #FFFFFF!important;}
	
	.detail_bg{position: fixed;top: 200upx; width: 96%; left: 2%; height: 790upx;}
	.item{position: relative;z-index: 2;}
	.detail_logo{width: 132upx; height: 132upx; border-radius: 50%; margin-top: -66upx;}
	.name{color:rgba(0,0,0,0.8); font-size: 28upx; margin-top: 18upx; margin-bottom: 20upx; line-height: 1.0;}
	.info{color: #FF5269; font-size: 40upx; line-height: 1.0;}
	.text{color:rgba(0,0,0,0.8); font-size: 24upx;line-height: 1.0;}
	.time{color:rgba(0,0,0,0.8); font-size: 24upx; margin-top: 50upx;}
	.img{ visibility: hidden;
		width: 364upx;
		height: 364upx;
		margin-bottom: 26upx;
		margin-top: 24upx;
	}
	.order_status_wrap{position: absolute;right: 2%; top: 0upx;}
	.order_status_wrap img{width: 120upx; height: 120upx; }
	.order_status_wrap span{position: absolute;top: 16upx; right: 10upx; color: #ffffff; display: inline-block;transform:rotate(45deg);}
	
	
</style>
