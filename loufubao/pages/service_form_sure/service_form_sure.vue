<template>
	<view>
		<div class="mui-content">
			<div class="head_wrap">
				<div style="margin-bottom: 0.17rem; font-weight: bold;">成交内容</div>
				<span class="service_content">由楼服宝提供100桶桶装水，并且送水上门</span>
			</div>
			
			<div class="row_around img_wrap">
				<img src="../../static/img/hetongchakan.png" mode="widthFix">
				<span style="flex: 1;">合同查看</span>
				<span class="arraw"></span>
			</div>
			
			<div class="row_between time_wrap">
				<span>服务期限</span>
				<span class="service_time"></span>
			</div>
			
			<div class="content_wrap">
				<div class="info">联系人信息</div>
				<div class="row_between item_wrap">
					<span>姓名</span>
					<span class="content name"></span>
				</div>
				
				<div class="row_between item_wrap">
					<span>手机</span>
					<span class="content mobile"></span>
				</div>
				
				<div class="row_between item_wrap">
					<span>公司名称</span>
					<span class="content company_name"></span>
				</div>
			</div>
			
			<div class="content_wrap" style="height: 236upx;">
				<div class="info">需求明细</div>
				
				<div class="area requirements">
					我司本季度需要100桶桶装水我司本季度需要100桶 桶装水。
				</div>
			</div>
			
			<div class="row_between bottom_wrap">
				<div class="money_info">
					<span>总价:</span>
					<span class="money_num" style="font-size: 0.16rem;">¥</span>
					<span class="money_num pay_money">1033.0</span>
				</div>
				
				<span class="btn" @click="payNow">立即付款</span>
			</div>
			
		</div>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			payNow(){
				uni.navigateTo({
					url: '/pages/service_pay/service_pay'
				});
			}
		}
	}
</script>

<style>
.mui-content{
				background-color: #FFFFFF;
			}
			.head_wrap{
				padding: 36upx 0rem 36upx 32upx;
				width: 100%;
				text-align: left;
				color: #333333;
				font-size: 32upx;
				box-sizing: border-box;
			}
			
			.item_wrap{
				width: 100%;
				background-color: #FFFFFF;
				height: 96upx;
				border-bottom: 2upx solid #E3E3E3;
				color: #333333;
				font-size: 28upx;
			}
			
			.item_wrap .content{
				color: #666666;
				font-size: 28upx;
			}
			
			.button{
				border-radius: 6upx;
				width: 90%;
				margin: 28upx 5%;
				box-sizing: border-box;
				background-color: #107EFF;
				color: #FEFEFE;
				font-size: 32upx;
				height: 88upx;
			}
			  
			.img_wrap{
				width: 92%;
				text-align: center;
				height: 140upx;
				margin-left: 4%;
				box-shadow: 0px 0px 20upx 0px #EAEAEA;
				padding: 0upx 36upx;
				box-sizing: border-box;
			}
			
			.img_wrap img{
				width: 40upx;
				height: 46upx;
				margin-right: 36upx;
			}  
			
			.img_wrap span{
				font-size: 28upx;
				color: #333333;
				font-weight: bold;
				text-align: left;
			}
			
			.time_wrap{
				padding: 0upx 32upx;
				color: #999999;
				font-size: 28upx;
				margin: 26upx 0upx 46upx;
			}
			
			.content_wrap{
				box-shadow: 0px 0px 20upx 0px #EAEAEA;
				height: 392upx;
				padding: 0upx 26upx;
				width: 92%;
				margin-left: 4%;
				margin-bottom: 26upx;
				box-sizing: border-box;
			}
			
			.content_wrap .info{
				color: #333333;
				font-size: 32upx;
				height: 104upx;
				line-height: 104upx;
				font-weight: bold;
				border-bottom: 2upx solid #E3E3E3;
			}
			
			.content_wrap .area{
				text-align: left; color:#666666; font-size:28upx;
				height: 134upx;
				padding: 32upx 2upx 0upx;
			}
			
			.bottom_wrap{
				height: 144upx;
				padding: 0upx 30upx;
				position: fixed;
				bottom: 0upx;
				left: 0upx;
				width: 100%;
				box-sizing: border-box;
				background-color: #FFFFFF;
				box-shadow: 0px 0px 20upx 0px #EAEAEA;
			}
			
			.bottom_wrap .btn{
				width: 364upx;
				height: 88upx;
				line-height: 88upx;
				color: #FFFFFF;
				background-color: #107EFF;
				border-radius: 6upx;
				text-align: center;
			}
			
			.money_info{
				color: #333333;
				font-size: 32upx;
			}
			
			.money_num{
				color: #FF5269; font-size: 48upx;
			}
</style>
