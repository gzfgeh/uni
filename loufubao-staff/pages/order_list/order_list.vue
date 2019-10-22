<template>
	<view>
		<div class="mui-content has-header person-express-col">
			
			<div class="pd">
				<div class="col person-express-list">
					<navigator @click="goToExpressList">
						<div class="person-express-detail row_center">
							<img src="../../static/img/kuaidi_order_icon.png" mode="widthFix">
							<div>快递订单</div>
							<span style="flex: 1;"></span>
							<span class="arraw"></span>
						</div>
					</navigator>
					 <navigator @click="goToMallList">
						<div class="person-express-detail row_center">
							<img src="../../static/img/mall_order_icon.png" mode="widthFix">
							<div>商城订单</div>
							<span style="flex: 1;"></span>
							<span class="arraw"></span>
						</div>
					</navigator>
					<navigator @click="goToGoodsList">
						<div class="person-express-detail row_center">
							<img src="../../static/img/mall_goods_icon.png" mode="widthFix">
							<div>抢购订单</div>
							<span style="flex: 1;"></span>
							<span class="arraw"></span>
						</div>
					</navigator>
					<navigator  @click="goToWaiMaiList">
						<div class="person-express-detail row_center">
							<img src="../../static/img/waimai_order_icon.png" mode="widthFix">
							<div>外卖订单</div>
							<span style="flex: 1;"></span>
							<span class="arraw"></span>
						</div>
					</navigator>
					
					
					<navigator @click="goToWaterList">
						<div class="person-express-detail row_center" style="border: none;">
							<img src="../../static/img/water_order_icon.png" mode="widthFix">
							<div>饮水订单</div>
							<span style="flex: 1;"></span>
							<span class="arraw"></span>
						</div>
					</navigator>
					
				 
				</div>


			</div>


		</div>
    
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,addQycompany} from '@/utils/api'
	
	export default {
		data() {
			return {
				type:'',
				companyCode:'',
				QrCodeOrderSN:''
			}
		},
		onLoad:function(options)
		{
		},
		methods: {
			goToMallList(){
				let userInfo = uni.getStorageSync("userInfo");
				if(userInfo){
					uni.navigateTo({
						url: '/pages/mall_order/mall_order'
					});
				}else{
					uni.navigateTo({
						url: '/pages/login/login'
					});
				}
			},
			goToWaterList(){
				let userInfo = uni.getStorageSync("userInfo");
				if(userInfo){
					uni.navigateTo({
						url: '/pages/service_order_list/service_order_list'
					});
				}else{
					uni.navigateTo({
						url: '/pages/login/login'
					});
				}
			},
			goToExpressList(){
				let userInfo = uni.getStorageSync("userInfo");
				if(userInfo){
					uni.navigateTo({
						url: '/pages/express_list/express_list'
					});
				}else{
					uni.navigateTo({
						url: '/pages/login/login'
					});
				}
			},
			goToGoodsList(){
				let userInfo = uni.getStorageSync("userInfo");
				if(userInfo){
					uni.navigateTo({
						url: '/pages/mall_goods_list/mall_goods_list'
					});
				}else{
					uni.navigateTo({
						url: '/pages/login/login'
					});
				}
			},
			goToWaiMaiList(){
				let userInfo = uni.getStorageSync("userInfo");
				if(userInfo){
					uni.navigateTo({
						url: '/pages/wai_mai_list/wai_mai_list'
					});
				}else{
					uni.navigateTo({
						url: '/pages/login/login'
					});
				}
			}
		}
	}
</script>

<style>
	
.company-modal{width:500upx;text-align:center;}
.company-code{padding:10upx 0 30upx 0;}
.company-code input{border:1px solid #eee;text-align:left;padding-left:10upx;}
	
.pd{padding:0 30upx;}
.person-express-list{border:2upx solid rgba(243, 243, 243, 1);
    box-shadow:0px 4upx 12upx 0px rgba(126,125,125,0.14);
    border-radius:8upx;margin:32upx 0;}
.person-express-list navigator{height:160upx; width: 90%; padding: 0upx 40upx;}
.person-express-list navigator .person-express-detail{border-bottom:2upx solid #e3e3e3; height: 158upx;}
/* .person-express-list li .person-express-detail:last-child{border-bottom:0;} */
.person-express-list navigator img{width:78upx; margin-right: 34upx;}
.person-express-list navigator .right-col{position: absolute;right:20upx;top:52upx;}
.person-express-list navigator .right-col span{font-size:48upx;color:#999999;}
.person-express-list navigator .text p{color:#999999;font-size:26upx;padding-top:4upx;}

.person-express-bottom{padding:0 16upx;}
.person-express-bottom .person-express-col{width:50%;float:left;box-sizing: border-box;padding:0 16upx;}
.person-express-bottom .person-express-col .person-express-detail{border:2upx solid rgba(243, 243, 243, 1);
    box-shadow:0px 4upx 12upx 0px rgba(126,125,125,0.14);
    border-radius:8upx;}
.person-express-bottom .person-express-col .person-express-detail{text-align: center;height:188upx;box-sizing: border-box;padding-top:32upx;}
.person-express-bottom .person-express-col .person-express-detail div{font-size:26upx;color:#666666;text-align: center;}
.person-express-bottom .person-express-col .person-express-detail img{width:108upx;}
</style>
