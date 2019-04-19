<template>
    <view class="content">
		<image src="../../static/img/info_one.png" mode="widthFix"></image>
		<image src="../../static/img/info_two.png" mode="widthFix"></image>
		<image src="../../static/img/info_three.png" mode="widthFix" style="margin-bottom: 194rpx;"></image>
		
		
		<button class="button btn-primary abs" hover-class="button-hover" @tap="next">
		  <div>立即报价</div>
		</button>
		
		<div class="my_order" @tap="myOrder">
			我的 <br>订单
			<!-- <span>我的订单</span>
			<span>订单</span> -->
		</div>
		
		<img src="../../static/img/call_img.png" class="call" @tap="callCustom">
		
    </view>
</template>

<script>
	import { BASE_IMAGE_URL,H5login} from "@/utils/api";
	
    export default {
        data() {
            return {
            }
        },
        methods: {
			next(){
				let token = uni.getStorageSync("token");
				if(token){
					uni.navigateTo({
					  url: "../baojia/baojia"
					})
				}else{
					this.H5login(1);
				}
				
			},
			
			async H5login(flag){
				let params = {
					partner_id: uni.getStorageSync("partner_id"),
					imei: uni.getStorageSync("imei")
				};
				
				let res = await H5login(params);
				if(res.code == 200){
					let token = res.data.token;
					console.log(token);
					if(token){
						uni.setStorageSync('token', token);
					}
					
					if(flag == 1){
						this.next()
					}else{
						this.myOrder();
					}
					
				}
			},
			
			callCustom(){
				window.location.href = "tel:4000880329";
			},
			
			myOrder(){
				let token = uni.getStorageSync("token");
				if(token){
					uni.navigateTo({
					  url: "../bill_detail/bill_detail"
					})
				}else{
					this.H5login(2);
				}
			}
        }
    }
</script>

<style>
	
	uni-image{
		width: 100%;
	}
	
img{
	width: 100%;
}

.info_img{
	min-height: 1000rpx;
}

/* color: #ffffff;
	background-color: #427DFF; */

.button{
  margin: 0upx 0%;
  width: 100%;
  height: 174upx;
	line-height: 174upx;
	background-color: #ffffff;
	border-radius: 0upx;
	text-align: center;
	font-size: 32upx;
	position: fixed;
	bottom: 0upx;
}

.button div{
	margin: 40upx 5%;
  width: 90%;
  height: 94upx;
	line-height: 94upx;
	color: #ffffff;
	background-color: #427DFF;
}

.my_order{
	color: #ffffff;
	border-radius: 50%;
	font-size: 24upx;
	background-color: #304095;
	position: fixed;
	right: 10upx;
	top: 500upx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 84upx;
	height: 84upx;
	line-height: 30upx;
}

.call{
	color: #ffffff;
	border-radius: 50%;
	font-size: 24upx;
	background-color: #304095;
	position: fixed;
	right: 10upx;
	top: 640upx;
	width: 84upx!important;
	height: 84upx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

</style>
