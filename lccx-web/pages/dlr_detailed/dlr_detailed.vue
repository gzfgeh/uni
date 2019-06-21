<template>
	<view class="content">
		<view class="top-tab">
			<view class="income-detail" :class="{active: currentTab == 1}" @tap="changeTab(1)">收入明细</view>
			<view class="withdraw-detail" :class="{active: currentTab == 2}" @tap="changeTab(2)">提现明细</view>
		</view>
		<view class="income-wrapper" v-if="currentTab == 1">
			<view class="total">
				<span>全部合计</span>
				<span class="red-text">{{incomeTotal}}元</span>
			</view>
			<view class="income-card" v-for="n in income">
				<view class="top-warp">
					<view class="date">{{n.created_at && n.created_at.split(' ')[0]}}</view>
					<view class="card-num">{{n.license_no}}</view>
					<view class="premium">
						<span v-if="n.type == 1">{{`保费：￥${n.monthly_expense}/月+￥${n.mileage_expense}/公里`}}</span>
						<span v-else>{{`保费：￥${n.price}元`}}</span>
						<span>推广费</span>
					</view>
					<view class="amount">￥{{n.commission}}</view>
				</view>
				<view class="bottom-warp">
					<span>订单编号：{{n.sn}}</span>
					<span class="type">{{n.type == 1 ? '里程车险' : '交强险'}}</span>
				</view>
			</view>
		</view>
		<view class="withdraw-wrapper" v-else>
			<view class="total">
				<span>全部合计</span>
				<span class="red-text">{{withdrawTotal}}元</span>
			</view>
			<view class="withdraw-card" v-for="m in withdraw">
				<view class="amount">提现金额：{{m.amount}}</view>
				<view class="card-num">收款账号：{{commafy(m.bank_account)}}</view>
				<view class="date">
					<span>提现日期：{{m.created_at && m.created_at.split(' ')[0]}}</span>
					<span class="tag">成功</span>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getWithdrawRecord, getIncomeRecord } from "@/utils/api";
	
	export default {
		data() {
			return {
				currentTab: 1,
				incomeTotal: 0,
				withdrawTotal: 0,
				income: [],
				withdraw: []
			};
		},
		methods:{
			changeTab(id){
				this.currentTab = id
			},
			commafy(num) {
				return num.toString().replace(/(\d{4})/g, "$1 ")
			},
			async getWithdrawRecord(){
				let res = await getWithdrawRecord()
				
				if(res.code == 200) {
					this.withdrawTotal = res.totalAmount || 0
					this.withdraw = res.commissions || []
				}
			},
			async getIncomeRecord() {
				let res = await getIncomeRecord()
				
				if(res.code == 200) {
					this.incomeTotal = res.totalAmount || 0
					this.income = res.incomes || []
				}
			}
		},
		async onLoad(){
			this.getWithdrawRecord()
			this.getIncomeRecord()
		}
	}
</script>

<style lang="less" scoped>
	.content{
		padding-left: 40upx;
		padding-right: 40upx;
		display: flex;
		align-items: center;
	}
	.top-tab{
		width: 384upx;
		margin-top: 50upx;
		display: flex;
		height: 60upx;
		box-shadow:0px 0px 14upx 0px rgba(199,199,199,0.5);
		border-radius:12upx;
		overflow: hidden;
		.income-detail, .withdraw-detail{
			display: flex;
			flex: 1;
			align-items: center;
			justify-content: center;
			color: rgba(0,0,0,0.4);
			font-size: 28upx;
			&.active{
				background: #427DFF;
				color: #fff;
			}
		}
	}
	.income-wrapper{
		width: 670upx;
		.income-card{
			height:270upx;
			background:rgba(255,255,255,1);
			box-shadow:0px 0px 14upx 0px rgba(199,199,199,0.5);
			border-radius:12upx;
			padding: 40upx 40upx 0;
			margin-bottom: 40upx;
			.top-warp{
				height: 186upx;
				border-bottom: 2upx solid rgba(0,0,0, 0.09);
				position: relative;
				.date{
					height:40upx;
					font-size:28upx;
					font-weight:400;
					color:rgba(0,0,0,1);
					line-height:40upx;
				}
				.card-num{
					margin-top: 10upx;
					height:48upx;
					font-size:34upx;
					font-weight:400;
					color:rgba(0,0,0,1);
					line-height:48upx;
				}
				.premium{
					margin-top: 10upx;
					height:40upx;
					font-size:28upx;
					font-weight:400;
					color:rgba(0,0,0,1);
					line-height:40upx;
					display: flex;
					justify-content: space-between;
				}
				.amount{
					position: absolute;
					top: 0upx;
					right: 0upx;
					height:56upx;
					font-size:40upx;
					font-weight:400;
					color:rgba(205,67,47,1);
					line-height:56upx;
				}
			}
			.bottom-warp{
				margin-top: 20upx;
				height:40upx;
				font-size:28upx;
				font-weight:400;
				color:rgba(0,0,0,1);
				line-height:40upx;
				display: flex;
				justify-content: space-between;
				.type{
					color:rgba(0,0,0,0.3);
				}
			}
		}
	}
	.withdraw-wrapper{
		width: 670upx;
		.withdraw-card{
			height:188upx;
			background:rgba(255,255,255,1);
			box-shadow:0px 0px 14upx 0px rgba(199,199,199,0.5);
			border-radius:12upx;
			padding: 40upx 40upx 0;
			margin-bottom: 40upx;
			.amount{
				height:40upx;
				font-size:28upx;
				font-weight:400;
				color:rgba(0,0,0,1);
				line-height:40upx;
			}
			.card-num{
				margin-top: 10upx;
				height:48upx;
				font-size:34upx;
				font-weight:400;
				color:rgba(0,0,0,1);
				line-height:48upx;
			}
			.date{
				margin-top: 10upx;
				height:40upx;
				font-size:28upx;
				font-weight:400;
				color:rgba(0,0,0,1);
				line-height:40upx;
				display: flex;
				justify-content: space-between;
				.tag{
					color:rgba(0,0,0,0.3);
				}
			}
		}
	}
	.total{
		display: flex;
		justify-content: space-between;
		width: 590upx;
		padding: 0 40upx;
		margin-top: 30upx;
		margin-bottom: 20upx;
		span{
			height:40upx;
			font-size:28upx;
			font-weight:400;
			color:rgba(0,0,0,1);
			line-height:40upx;
			&.red-text{
				color: #CD432F;
			}
		}
	}
</style>
