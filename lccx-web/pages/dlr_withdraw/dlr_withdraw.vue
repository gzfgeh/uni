<template>
	<view class="content">
		<view class="title">
			提现
			<span class="title-sub" @tap="goDetailed">明细>></span>
		</view>
		<view class="withdrawable">
			<view class="amount">{{withdrawable}}</view>
			<view class="amount-text">提现金额</view>
		</view>
		<view class="card-warp" v-if="bank_name" @tap="goCardList">
			<view class="card-bank">
				<image src="/static/img/bank_card.png" mode="" class="card"></image>
				<span class="bank-name">{{bank_name}}</span>
			</view>
			<view class="card-right">
				<span class="tail">尾号{{String(bank_account).substring(String(bank_account).length - 4)}}</span>
				<span class="arrow"></span>
			</view>
		</view>
		<view class="card-warp" v-else @tap="goCardInfo">
			<view class="card-bank">
				<span class="bank-name">绑定银行卡</span>
			</view>
			<view class="card-right">
				<image src="/static/img/add_card.png" mode="" class="add-card"></image>
			</view>
		</view>
		<view>
            <button type="primary" class="primary" :class="{notActive: !canWithdraw}" hover-class="button-hover" @tap="withdraw">确认提现</button>
        </view>
		<view class="tips">
			<p>温馨提示：</p>
			<p>1、每月10-12日为可提现日，请各位代理人集中在每月这三天操作体现。其他日期不可提现。</p>
			<p>2、提现操作后，提现金额会在3-5个工作日内到账。</p>
			<p class="red-text">3、以上所有收入均为税后收入</p>
		</view>
	</view>
</template>

<script>
	import { withdraw } from "@/utils/api";
	
	export default {
		data() {
			return {
				canWithdraw: false,
				bank_name: '',
				bank_account: '',
				withdrawable: 0
			};
		},
		methods: {
			goDetailed(e){
				uni.navigateTo({
					url: '/pages/dlr_detailed/dlr_detailed'
				})
			},
			goWithdraw(){
				uni.navigateTo({
					url: '/pages/dlr_withdraw/dlr_withdraw'
				})
			},
			goCardList(){
				uni.navigateTo({
					url: '/pages/dlr_card_list/dlr_card_list'
				})
			},
			goCardInfo(){
				uni.navigateTo({
					url: '/pages/dlr_card_info/dlr_card_info'
				})
			},
			async withdraw() {
				if( !this.canWithdraw ) return
				let params = {
					amount: this.withdrawable,
					bank_account: this.bank_account
				}
				
				let res = await withdraw(params)
				
				if(res.code == 200){
					wx.showToast({
						icon: 'none',
						title: '提现申请成功',
						duration: 1000
					})
					
					uni.navigateTo({
						url: '/pages/dlr_withdraw_success/dlr_withdraw_success'
					})
				}
				
			}
		},
		onLoad(){
			let day = new Date().getDate()
			if(day >= 10 && day <= 12){
				this.canWithdraw = true
			}
			
			let global = uni.getStorageSync('global')
			if(global) {
				this.withdrawable = global.withdrawable || 0
				this.bank_account = global.bank_account || ''
				this.bank_name = global.bank_name || ''
			}
		},
		onShow(){
			let global = uni.getStorageSync('global')
			if(global) {
				this.withdrawable = global.withdrawable || 0
				this.bank_account = global.bank_account || ''
				this.bank_name = global.bank_name || ''
			}
		}
	}
</script>

<style lang="less" scoped>
	.content {
		padding-left: 40upx;
		padding-right: 40upx;
	}
	.title {
		height:48upx;
		font-size:34upx;
		font-weight:400;
		color:rgba(0,0,0,1);
		line-height:48upx;
		text-align: center;
		margin-top: 40upx;
		position: relative;
		.title-sub {
			position: absolute;
			height:40upx;
			font-size:28upx;
			font-weight:400;
			color:rgba(66,125,255,1);
			line-height:40upx;
			right: 0;
			top: 6upx;
		}
	}
	.withdrawable{
		margin-top: 30upx;
		height:200upx;
		background:rgba(255,255,255,1);
		box-shadow:0px 0px 14upx 0px rgba(199,199,199,0.5);
		border-radius:12upx;
		display: flex;
		align-items: center;
		padding: 0 50upx;
		justify-content: space-between;
		.amount {
			height:100upx;
			font-size:72upx;
			font-weight:500;
			color:rgba(0,0,0,1);
			line-height:100upx;
		}
		.amount-text{
			height:40upx;
			font-size:28upx;
			font-weight:400;
			color:rgba(0,0,0,0.4);
			line-height:40upx;
		}
	}
	.card-warp {
		margin-top: 40upx;
		height:100upx;
		background:rgba(255,255,255,1);
		box-shadow:0px 0px 14upx 0px rgba(199,199,199,0.5);
		border-radius:12upx;
		display: flex;
		align-items: center;
		padding: 0 50upx;
		justify-content: space-between;
		.card{
			width: 32upx;
			height: 32upx;
			position: relative;
			top: 3.5upx;
		}
		.bank-name{
			height:48upx;
			font-size:34upx;
			font-weight:400;
			color:rgba(0,0,0,1);
			line-height:48upx;
			margin-left: 16upx;
		}
		.card-right{
			position: relative;
			padding-right: 40upx;
			.tail{
				height:48upx;
				font-size:34upx;
				font-weight:400;
				color:rgba(0,0,0,0.6);
				line-height:48upx;
			}
		}
		.arrow{
			display: inline-block;
			width: 18upx;
			height: 18upx;
			border-top: 4upx solid #b7b7b7;
			border-right: 4upx solid #b7b7b7;
			transform: rotate(45deg);
			margin-left: 10upx;
			position: absolute;
			right: 0;
			top: 12upx;
		}
		.add-card{
			width: 32upx;
			height: 32upx;
			position: relative;
			top: 3.5upx;
			left: 40upx;
		}
	}
	.primary{
		background-color: #427DFF;
		border-radius: 12upx;
		color: #ffffff;
		font-size: 34upx;
		height: 94upx;
		line-height: 94upx;
		margin-top: 60upx;
		&.notActive{
			background:rgba(0,0,0,0.1);
			color: #fff;
		}
	}
	.tips{
		margin-top: 30upx;
		font-size: 28upx;
		font-weight:400;
		color:rgba(0,0,0,0.39);
		line-height:40upx;
		.red-text{
			color: #FF2121;
		}
	}
</style>
