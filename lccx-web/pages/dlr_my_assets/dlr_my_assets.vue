<template>
	<view class="content">
		<view class="title">
			我的资产
			<span class="title-sub" @tap="goDetailed">明细>></span>
		</view>
		<view class="withdrawable">
			<view class="amount">{{withdrawable}}</view>
			<view class="amount-text">可提现(元)</view>
		</view>
		<view class="add-up">
			<view class="add-up-withdraw">
				<span class="top">{{withdrew}}</span>
				<span>累计提现(元)</span>
			</view>
			<view class="add-up-total">
				<span class="top">{{incomes}}</span>
				<span>累计收入(元)</span>
			</view>
		</view>
		<view>
            <button type="primary" class="primary" :class="{notActive: !canWithdraw}" hover-class="button-hover" @tap="goWithdraw">立即提现</button>
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
	import {isWeiXin} from "@/utils/index.js"
	import { getMyAssets, dlrLogin} from "@/utils/api";
	
	export default {
		data() {
			return {
				canWithdraw: false,
				withdrawable: 0,
				withdrew: 0,
				incomes: 0,
				needShow: false
			};
		},
		methods: {
			goDetailed(e){
				uni.navigateTo({
					url: '/pages/dlr_detailed/dlr_detailed'
				})
			},
			goWithdraw(){
				if( !this.canWithdraw ) return
				uni.navigateTo({
					url: '/pages/dlr_withdraw/dlr_withdraw'
				})
			},
			async dlrLogin(){
				let openid = uni.getStorageSync("openid"); 
				let res = await dlrLogin(openid);
				
				if(res.code == 200){
					let token = res.token;
					if(token){
						uni.setStorageSync('token', token);
						this.getMyAssets();
					} else {
						uni.setStorageSync('registerBack', '/pages/dlr_my_assets/dlr_my_assets');
						uni.redirectTo({
							url: '/pages/dlr_register/dlr_register'
						})
					}
				}
			},
			async getMyAssets() {
				let res = await getMyAssets()
				
				if(res.code == 200){
					this.withdrawable = res.withdrawable
					this.withdrew = res.withdrew
					this.incomes = res.incomes
					if(this.withdrawable == 0){
						this.canWithdraw = false
					}
					uni.setStorageSync("global", {
						withdrawable: res.withdrawable,
						withdrew: res.withdrew,
						incomes: res.incomes,
						realname: res.realname,
						id_card: res.id_card,
						bank_name: res.bank_name,
						bank_account: res.bank_account
					});
				}
			}
		},
		onReady(){
			let day = new Date().getDate()
			if(day >= 10 && day <= 12){
				this.canWithdraw = true
			}
			let openid = uni.getStorageSync("openid");
			if(!openid && isWeiXin()){
				openid = this.$root.$mp.query.open_id;
				if(!openid){
					let curUrl = window.location.href;
					openid = curUrl.split("open_id=")[1].split("#")[0];
				}
				uni.setStorageSync("openid", openid);
			}
			this.needShow = true
			this.dlrLogin()
		},
		onShow(){
			let token = uni.getStorageSync("token");
			if(token && this.needShow){
				this.getMyAssets()
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
		height:280upx;
		background:rgba(255,255,255,1);
		box-shadow:0px 0px 14upx 0px rgba(199,199,199,0.5);
		border-radius:12upx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
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
	.add-up {
		margin-top: 40upx;
		height:160upx;
		background:rgba(255,255,255,1);
		box-shadow:0px 0px 14upx 0px rgba(199,199,199,0.5);
		border-radius:12upx;
		display: flex;
		.add-up-withdraw, .add-up-total {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			flex: 1;
			position: relative;
			span{
				height:40upx;
				font-size:28upx;
				font-weight:400;
				color:rgba(0,0,0,0.4);
				line-height:40upx;
				&.top{
					height:48upx;
					line-height:48upx;
					margin-bottom: 18upx;
					font-size: 34upx;
				}
			}
		}
		.add-up-withdraw{
			&::after{
				content: '';
				height: 80upx;
				border-right: 2upx solid rgba(0,0,0,0.1);
				position: absolute;
				right: 0;
			}
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
