<template>
	<view>
		<div class="yunfei-col">
			<div class="yunfei-top-col">
				<div class="yunfei-top-detail">
					<div class="middle">
						<img class="expressLogo" :src="item.waterImageUrl" mode="aspectFill">
						<div class="clearfix row_between">
							<span class="left expressName">{{item.waterShowName}}</span>
							<span class="order_status">&nbsp;{{orderStatusList[parseInt(item.orderStatus)+1]}}</span>
						</div>
						<div class="danhao row_between" v-if="item.isCompany == '0'">
							<span>x {{item.quantity}}</span>
							<span class="price">单价: ￥{{item.unitPrice}}</span>
						</div>
					</div>
				</div>
			</div>


			<div class="main-tab-detail">
				<ul class="express-detail-list">
					<li class="clearfix">
						<span class="left">订单号</span>
						<span class="right">{{item.orderSN}}</span>
					</li>
					<li class="clearfix">
						<span class="left">姓名</span>
						<span class="right">{{item.name}}</span>
					</li>
					<li class="clearfix">
						<span class="left">手机号</span>
						<span class="right">{{item.phone}}</span>
					</li>
					<li class="clearfix">
						<span class="left">地址</span>
						<span class="right">{{item.province}}{{item.city}}{{item.area}}{{item.detail}}</span>
					</li>
					
					<li class="clearfix" v-if="item.isCompany == '1'">
						<span class="left">公司名称</span>
						<span class="right">{{item.companyName}}</span>
					</li>
					
					<li class="clearfix">
						<span class="left">类型</span>
						<span class="right">{{item.waterShowName}}</span>
					</li>
					
					<li class="clearfix">
						<span class="left">服务时间</span>
						<span class="right">{{item.serviceTime}}</span>
					</li>
					
					<li class="clearfix">
						<span class="left">数量</span>
						<span class="right">{{item.quantity}}</span>
					</li>
					
					<li class="clearfix">
						<span class="left">订单类型</span>
						<span class="right">{{item.isCompany == '0'?"个人饮水":"企业饮水"}}</span>
					</li>
					
					<li class="clearfix" v-if="item.isCompany == '0'">
						<span class="left">费用</span>
						<span class="right">￥{{item.price}}</span>
					</li>
				</ul>
				
				<div class="row detail_wrap" v-if="item.demandDetail">
					<div class="left">需求明细</div>
				</div>
				
				<div class="row detail_wrap" v-if="item.demandDetail">
					{{item.demandDetail}}
					
				</div>

				<div class="bottom-btn bottom-btn-list clearfix">
					
					<button type="button" class="yellow-bg xiadan " v-if="(item.orderStatus == 1) " @click="quxiao()">取消订单</button>
					<button type="button" class="blue-bg xiadan" v-if="item.orderStatus == 1 && (parseInt(item.isCompany) == 0)" @click="moneyPay(item.orderSN,item.orderID,item.price)"> 立即支付</button>
					<button type="button" class="blue-bg xiadan" v-if="item.orderStatus == 2 && (parseInt(item.isCompany) == 0)" @click="tuikuan()"> 退款</button>
					
					<uni-popup :show="popupParam === 'bottom'" position="bottom" mode="fixed" :payWay="'2'" :orderSN="orderSN" :orderID="orderID" :money="allMoney" @hidePopup="payPopup('')" />
				</div>
			

			</div>

		</div>

	</view>
</template>

<script>
	import { BASE_IMAGE_URL,water_order_detail,cancel_water_order,waterRefund,RefundOrder } from '@/utils/api'
	
	import uniPopup from '@/components/popup-pay.vue';
	
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				orderID: 0,
				item: {},
				popupParam:'',
				orderSN:'',
				allMoney:'0',
				isShowDetail: true,
				isEmptyOrder: false,
				detailList: [],
				orderStatusList: ['删除','已取消','待支付','待确认','已确认','已收货','','','','','已退款'],
			}
		},
		methods: {
			payPopup(popupParam) {
				this.popupParam=popupParam;
			},
			moneyPay(orderSN,orderID,allMoney){
				
				this.orderSN=orderSN;
				this.orderID=orderID;
				this.allMoney=allMoney.toString();
				this.popupParam="bottom";
				
				console.log("支付");
				
			},
			async water_order_detail(){
				let params = {
					orderID: this.orderID
				};
				let res = await water_order_detail(params);
				if(res.status == 1){
					this.item = res.data;
				}
			},
			changeType(){
				this.isShowDetail = !this.isShowDetail;
			},
			tuikuan(){
				let that = this;
				uni.showModal({
					title:"提醒",
					content: "是否退款",
					success(result) {
						if (result.confirm) {
							that.waterRefund();
						} else if (result.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			async waterRefund(){

				let params = {
					orderID: this.orderID
				};
				let res = await waterRefund(params);
				if(res.status == 1){
					this.water_order_detail();
				}else{
					uni.showToast({
					  icon: 'none',
					  title: res.message,
					  duration: 1000
					});
				}
			},
			quxiao()
			{
				let that = this;
				uni.showModal({
					title:"提醒",
					content: "是否取消订单",
					success(result) {
						if (result.confirm) {
							that.cancel_water_order();
						} else if (result.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			
			async cancel_water_order(){
				var type=1;
				let params = {
					orderID: this.orderID
				};
				let res = await cancel_water_order(params);
				if(res.status == 1){
					
					console.log(JSON.stringify(this.item));
					
					this.water_order_detail();
					
				}else{
					uni.showToast({
					  icon: 'none',
					  title: res.message,
					  duration: 1000
					});
				}
			},
		},
		onShow()
		{
			this.popupParam='';
			this.water_order_detail();
		},
		onLoad(options) {
			this.orderID = options.orderID;
		}
	}
</script>

<style>
@import url("../../static/style/yun_fei.css");


.yunfei-top-col{padding:0 30upx;margin-top:30upx; box-sizing: border-box;}
.yunfei-top-col .yunfei-top-detail{border:2upx solid rgba(243, 243, 243, 1);
    box-shadow:0px 4upx 12upx 0px rgba(126,125,125,0.14);
    border-radius:8upx;}
.yunfei-top-col img{width:140upx; height: 140upx;left:30upx;top:30upx;position: absolute;}
.yunfei-top-col .middle{padding-top:26upx;position: relative;padding-left:200upx;padding-bottom:26upx;padding-right: 20upx; height: 160upx;}
.yunfei-top-col .middle .left{color:#666666;font-size:26upx;}
.yunfei-top-col .middle .right{color:#107EFF;font-size:28upx;float: right;margin-right:30upx;}
.yunfei-top-col .middle .right .yuandian{width:12upx;height:12upx;background: #107EFF;border-radius: 50%;display: inline-block;vertical-align: middle;}
.yunfei-top-col .middle .danhao{font-size:24upx;color: #666666;margin-top: 40upx;}
.yunfei-top-col .middle .danhao .price{font-size:28upx;color: #FF6262;}

.main-tab-detail{margin-top: 20upx;}

.bottom-btn{margin-bottom: 100upx; display: flex; flex-direction: row;}
.detail_empty{margin-top: 40upx; width: 100%; display: block;text-align: center;}


.uni-timeline-item-keynode span{width: 100%;line-height: normal!important;}
.genzong-list li{padding: 0upx 20upx;}

.price{display: inline-block; width: 80%; text-align: right;box-sizing: border-box;}
.order_status{color: #FF5269;font-size: 28upx;}
.order_detail{padding: 0upx 20upx; box-sizing: border-box;}
.detail_wrap{width: 92%; box-sizing: border-box; margin:0upx 4%;}
.detail_wrap .left{width: 150upx;}
.detail_wrap .right{flex: 1!important;}
</style>
