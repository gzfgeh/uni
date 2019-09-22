<template>
	<view>
		<div class="mui-content has-header yunfei-col">
			<div class="yunfei-top-col">
				<div class="yunfei-top-detail">
					<div class="middle">
						<img class="expressLogo" :src="item.logoURL" mode="widthFix">
						<div class="clearfix">
							<span class="left expressName">{{item.enName}}</span>
							<span class="right">
								<!-- <span class="yuandian"></span> -->
								<span class="status_text">{{orderStatusList[parseInt(item.orderStatus)+1]}}</span> 
							</span>
						</div>
						<div class="danhao">运单编号:<span class="sn">{{item.expressSN}}</span></div>
					</div>
				</div>
			</div>

			<div class="main-tab-col">
				<span class="middle-tab-col">
					<span :class="{'active': isShowDetail}" @click="changeType">详情</span>
					<span :class="{'active': !isShowDetail}" @click="changeType">物流跟踪</span>
				</span>
			</div>

			<div class="main-tab-detail">

				<div class="tab-detail-col" v-if="isShowDetail">

					<ul class="express-list">
						<li>
							<div class="clearfix top">
								
								<div class="detail-col">
									<img src="../../static/img/express_ji_icon.png" class="icon-col">
									<div class="name" id="to_name">{{item.sendName}}</div>
									<p id="to_address">{{item.sendProvince}}{{item.sendCity}}{{item.sendArea}}{{item.sendDetail}}</p>
								</div>
								
								<div class="detail-col" v-if="item.qcOrderType==3">
									<img src="../../static/img/express_shou_icon.png" class="icon-col">
									<div class="name" id="from_name">{{item.sendorder_address_data[0].receiveName}}</div>
									<p id="from_address">
									{{item.sendorder_address_data[0].receiveProvince}}
									{{item.sendorder_address_data[0].receiveCity}}
									{{item.sendorder_address_data[0].receiveArea}}
									{{item.sendorder_address_data[0].receiveDetail}}
									</p>
								</div>
								
								
								<div class="detail-col">
									<img src="../../static/img/express_shou_icon.png" class="icon-col">
									<div class="name" id="from_name">{{item.receiveName}}</div>
									<p id="from_address">{{item.receiveProvince}}{{item.receiveCity}}{{item.receiveArea}}{{item.receiveDetail}}</p>
								</div>
								
								
								
							</div>
							<div class="middle">
								<span class="first">
									<span class="yuandian"></span>
									<span class="status_text">{{orderStatusList[parseInt(item.orderStatus)+1]}}</span>
									<span class="price" v-if="parseInt(item.price)&&item.isDaoFu==0 && !item.buchajiaflag">价格: {{item.price}}</span>
									<span class="price" v-if="parseInt(item.price)&&item.isDaoFu==0 && item.buchajiaflag">补差价价格: {{item.buchajiaflag}}</span>
									
									<span class="price" v-if="item.isDaoFu==1">到付件无需支付</span>
									
									
								</span>
							</div>
							<div class="bottom">
								<img class="expressLogo" :src="item.logoURL" mode="widthFix" style="top: 30upx;"/>
								<span class="first expressName">{{item.enName}}</span>
								<div class="sn">订单号:{{item.orderSN}}</div>
							</div>
						</li>
					</ul>

					<ul class="express-detail-list">
						<li class="clearfix">
							<span class="left">物品类型</span>
							<span class="right" id="package">{{item.thing}}</span>
						</li>
						<li class="clearfix">
							<span class="left">重量</span>
							<span class="right"><span id="weight">{{item.weight}}</span>KG</span>
						</li>
						<li class="clearfix">
							<span class="left">付款方式</span>
							<span class="right" id="is_freight_collect">{{item.isDaoFu==0?'寄付':'到付'}}</span>
						</li>

						<li class="clearfix more-row" v-if="item.comment">
							<span class="left">备注</span>
							<span class="right" id="comment">
								{{item.comment}}
							</span>
						</li>


						<li class="clearfix">
							<span class="left">下单时间</span>
							<span class="right" id="created_at">{{item.createTime}}</span>
						</li>
						<li class="clearfix">
							<span class="left">快递类型</span>
							<span class="right" id="create_type">{{item.orderType == 1? '个人件': '企业件'}}</span>
						</li>
						<li class="clearfix" v-if="item.price">
							<span class="left">快递费用</span>
							<span class="right">￥<span id="price">{{item.price}}</span></span>
						</li>
						<li class="clearfix">
							<span class="left">保价费用</span>
							<span class="right" id="insured_price">￥{{item.insuredPrice}}</span>
						</li>
					</ul>

					<div class="bottom-btn bottom-btn-list clearfix">
						
						<button type="button" class="blue-bg xiadan " v-if="item.orderStatus == 8" @click="tuikuan()">退款</button>
						<button type="button" class="yellow-bg xiadan " v-if="(item.orderStatus == 1) " @click="quxiao()">取消订单</button>
						<button type="button" class="blue-bg xiadan" v-if="item.orderStatus == 1&&item.orderType==1&&item.isDaoFu==0&&parseFloat(item.price) != 0" @click="moneyPay(item.orderSN,item.orderID,item.buchajiaflag?item.buchajiaflag:item.price)"> 立即支付</button>
						
						<uni-popup :show="popupParam === 'bottom'" position="bottom" mode="fixed" :payWay="'-1'" :orderSN="orderSN" :orderID="orderID" :money="allMoney" @hidePopup="payPopup('')" />
						
						
						<!-- <button type="button" class="one delete-order " @click="cancelOrder(2)" v-if="(item.orderStatus == 9) || (item.orderStatus == 10) || (item.orderStatus == 0)"> 
						删除订单
						</button> -->
							
							
						
							
					</div>
				</div>

				<div class="tab-detail-col " v-if="!isShowDetail">
					<span class="detail_empty" v-if="isEmptyOrder">暂无运单信息</span>
					<div class="genzong-list" v-if="!isEmptyOrder">
						<li class="active" v-for="(item, index) in detailList" :key="index">
							<view class="uni-timeline" style="background-color: #fff;">
								<view class="uni-timeline-item uni-timeline-first-item" v-if="index == 0">
									<view class="uni-timeline-item-keynode col" style="font-size: 24upx;">
									    <span>{{item.time.split(" ")[0]}}</span> 
									    <span>{{item.time.split(" ")[1]}}</span>
									</view>
									<view class="uni-timeline-item-divider"></view>
									<view class="uni-timeline-item-content">{{item.context}}</view>
								</view>
								
								<view class="uni-timeline-item" v-if="index != 0"
								:class="{'uni-timeline-last-item':(index==(detailList.length-1))}">
									<view class="uni-timeline-item-keynode col" style="font-size: 24upx;">
									    <span>{{item.time.split(" ")[0]}}</span> 
									    <span>{{item.time.split(" ")[1]}}</span>
									</view>
									<view class="uni-timeline-item-divider"></view>
									<view class="uni-timeline-item-content">{{item.context}}</view>
								</view>
								
							</view>
						</li>
					</div>
				</div>

			</div>

		</div>

	</view>
</template>

<script>
	import { BASE_IMAGE_URL,getOrderDetail,cancelOrder,getExpressInfoByorderSN,RefundOrder } from '@/utils/api'
	
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
				orderStatusList: ['删除','已取消','已下单','已揽收','已寄出','已签收','已打印','打印中','已评价','已支付','已退款','已推送给快递公司','待确认','退款中']
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
			
			tuikuan()
			{
				let that = this;
				uni.showModal({
					title:"提醒",
					content: "是否退款",
					success(result) {
						if (result.confirm) {
							that.RefundOrder();
						} else if (result.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			
			async RefundOrder(){
				let params = {
					orderID: this.orderID
				};
				let res = await RefundOrder(params);
				if(res.status == 1){
					this.getOrderDetail();
				}else{
					uni.showToast({
					  icon: 'none',
					  title: res.message,
					  duration: 1000
					});
				}
			},
			async getOrderDetail(){
				let params = {
					orderID: this.orderID
				};
				let res = await getOrderDetail(params);
				if(res.status == 1){
					this.item = res.data;
					this.getExpressInfoByorderSN();
				}
			},
			changeType(){
				this.isShowDetail = !this.isShowDetail;
			},
			quxiao()
			{
				let that = this;
				uni.showModal({
					title:"提醒",
					content: "是否取消订单",
					success(result) {
						if (result.confirm) {
							that.cancelOrder();
						} else if (result.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			
			async cancelOrder(){
				var type=1;
				let params = {
					orderID: this.orderID,
					type: type
				};
				let res = await cancelOrder(params);
				if(res.status == 1){
					
					console.log(JSON.stringify(this.item));
					
					this.getOrderDetail();
					
				}else{
					uni.showToast({
					  icon: 'none',
					  title: res.message,
					  duration: 1000
					});
				}
			},
			async getExpressInfoByorderSN(){
				let params = {
					orderSN: this.item.orderSN
				};
				let res = await getExpressInfoByorderSN(params);
				if(res.status == 1){
					this.isEmptyOrder = false;
					this.detailList = res.data.data;
				}else{
					this.isEmptyOrder = true;
				}
			}
		},
		onShow()
		{
			this.popupParam='';
			this.getOrderDetail();
		},
		onLoad(options) {
			this.orderID = options.orderID;
			if(options.orderStatus == 1){
				this.isShowDetail = false;
			}
		}
	}
</script>

<style>
@import url("../../static/style/yun_fei.css");

.yunfei-top-col{padding:0 30upx;margin-top:30upx; box-sizing: border-box;}
.yunfei-top-col .yunfei-top-detail{border:2upx solid rgba(243, 243, 243, 1);
    box-shadow:0px 4upx 12upx 0px rgba(126,125,125,0.14);
    border-radius:8upx;}
.yunfei-top-col img{width:102upx;left:30upx;top:30upx;position: absolute;}
.yunfei-top-col .middle{padding-top:26upx;position: relative;padding-left:150upx;padding-bottom:26upx;}
.yunfei-top-col .middle .left{color:#666666;font-size:26upx;}
.yunfei-top-col .middle .right{color:#107EFF;font-size:28upx;float: right;margin-right:30upx;}
.yunfei-top-col .middle .right .yuandian{width:12upx;height:12upx;background: #107EFF;border-radius: 50%;display: inline-block;vertical-align: middle;}
.yunfei-top-col .middle .danhao{font-size:32upx;padding:10upx 0;width:90%;box-sizing: border-box;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}

.yunfei-top-detail .bottom .step-list{padding:0 76upx;position: relative;margin-top:84upx;}
.yunfei-top-detail .bottom .step-list .active{background: #B0D1F8!important;}
.yunfei-top-detail .bottom .step-list .step-left{width:16upx;height:16upx;border-radius: 50%;background: #CCCCCC;left:50upx;display: inline-block;position: absolute;top:20upx;}
.yunfei-top-detail .bottom .step-list .step-right{width:16upx;height:16upx;border-radius: 50%;background: #CCCCCC;right:50upx;display: inline-block;position: absolute;top:20upx;}
.yunfei-top-detail .bottom .step-list .line{height:2upx;width:100%;background:#ccc;display: inline-block;position: relative;top:-6upx;}
.yunfei-top-detail .bottom .step-list .line.active-line:after{width:50%;height:2upx;background: #B0D1F8;content: " ";display:block;top:0;left:0;}
.yunfei-top-detail .bottom .step-list .step-middle{width:40upx;height:40upx;background: #fff;position: absolute;top:0upx;left:50%;margin-left:-20upx;text-align: center;border-radius: 50%;}
.yunfei-top-detail .bottom .step-list .step-middle .dian{width:16upx;height:16upx;border-radius: 50%;background: #107EFF;display: inline-block;position: relative;z-index:100;position: absolute;left:50%;top:50%;margin:0upx -8upx;}
.yunfei-top-detail .bottom{position: relative;}
.yunfei-top-detail .bottom .step-tag{background: #107EFF;color:#fff;font-size:24upx;padding:6upx 20upx;border-radius: 20upx;white-space: nowrap;position: absolute;top:-70upx;left:-50%;margin-left:-56upx;}
.yunfei-top-detail .bottom .step-tag img{width:24upx;position: absolute;left:50%;top:56upx;margin-left:-12upx;}
.yunfei-top-detail .bottom .left-text{color:#B0D1F8;font-size:22upx;position: absolute;left:30upx;top:-40upx;}
.yunfei-top-detail .bottom .right-text{color:#CCCCCC;font-size:22upx;position: absolute;right:30upx;top:-40upx;}

.main-tab-col{text-align: center;font-size:36upx;padding:60upx 40upx;color:#999999;}
.main-tab-col span{padding:20upx 12upx;position: relative;}
.main-tab-col span.active{color:#000;}
.main-tab-col span.active:after{content: " ";width:60upx;margin-left:-30upx;height:8upx;background: #107EFF;bottom:-12upx;border-radius:6upx;position:absolute;left:50%;display: block;}

.bottom-btn{margin-bottom: 100upx; display: flex; flex-direction: row;}
.detail_empty{margin-top: 40upx; width: 100%; display: block;text-align: center;}


.uni-timeline-item-keynode span{width: 100%;line-height: normal!important;}
.genzong-list li{padding: 0upx 20upx;}

.price{display: inline-block; width: 80%; text-align: right;box-sizing: border-box;}

</style>
