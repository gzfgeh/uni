<template>
	<view class="content">
		<view class="card-box">
			<image src="/static/img/card_icon.png" mode="" class="card-icon"></image>
			<view class="card-info">
				<view class="bank-name">{{bank_name}}</view>
				<view class="card-num">{{cNumber}}</view>
			</view>
		</view>
		<view class="change-card" @tap="goCardInfo">修改银行卡信息</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bank_account: '',
				bank_name: ''
			};
		},
		computed:{
			cNumber(){
				return !this.bank_account ? '' : '**** **** **** ' + String(this.bank_account).substring(String(this.bank_account).length - 4)
			}
		},
		methods: {
			goCardInfo(){
				uni.navigateTo({
					url: '/pages/dlr_card_info/dlr_card_info?delta=2'
				})
			},
		},
		onLoad(){
			let global = uni.getStorageSync('global')
			if(global) {
				this.bank_name = global.bank_name || ''
				this.bank_account = global.bank_account || ''
			}
		}
	}
</script>

<style lang="less" scoped>
	.content {
		padding-left: 40upx;
		padding-right: 40upx;
	}
	.card-box{
		margin-top: 60upx;
		height:240upx;
		background:linear-gradient(270deg,rgba(115,159,255,1) 0%,rgba(66,125,255,1) 100%);
		box-shadow:0px 0px 14upx 0px rgba(199,199,199,0.5);
		border-radius:12upx;
		position: relative;
		.card-icon{
			width: 94upx;
			height: 94upx;
			position: absolute;
			top: 68upx;
			left: 54upx;
		}
		.card-info{
			position: absolute;
			top: 58upx;
			left: 176upx;
			.bank-name, .card-num{
				height:56upx;
				font-size:40upx;
				font-weight:500;
				color:rgba(255,255,255,1);
				line-height:56upx;
			}
			.card-num{
				margin-top: 14upx;
			}
		}
	}
	.change-card{
		margin-top: 30upx;
		height:40upx;
		font-size:28upx;
		font-weight:400;
		color:rgba(66,125,255,1);
		line-height:40upx;
		text-align: right;
	}
</style>
