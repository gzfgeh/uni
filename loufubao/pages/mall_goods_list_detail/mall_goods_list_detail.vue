<template>
	<view>
		
		<ul class="express-list">

			<li  class="item_wrap">
				<div class=" content_wrap">
					<div class="col_between border" >
						<div class="content_up">
							<img :src="item.img" mode="widthFix"/>
							<span class="content_center">{{item.title}}</span>
							<div class="content_end">
								<!-- <span class="number">x{{ite.count}}</span> -->
								<span class="money_number">￥{{item.cost_price}}</span>
							</div>
						</div>
						
					</div>
				</div>
				<div class="tatol_wrap">
					<span class="status"><span class="money_number">{{orderStatusList[parseInt(item.order_status)]}}</span></span>
					<div>
						<span class="freight_wrap" v-if="item.freight">运费:￥{{item.freight}}</span>
						<span>共计金额:<span class="money_number">￥{{item.price}}</span> </span>
					</div>
					
				</div>
			</li>
		</ul>
		
		<div class="main-tab-col">
			<span class="middle-tab-col">
				<span :class="{'active': isShowDetail}" @click="changeType">详情</span>
				<span :class="{'active': !isShowDetail}" @click="changeType">物流跟踪</span>
			</span>
		</div>
		
		<div class="main-tab-detail">

			<div class="tab-detail-col" v-if="isShowDetail">

				<ul class="express-detail-list">
					<li class="clearfix">
						<span class="left">订单号</span>
						<span class="right" id="package">{{item.order_no}}</span>
					</li>
					<li class="clearfix">
						<span class="left">下单时间</span>
						<span class="right">{{item.order_time}}</span>
					</li>
					
					<li class="clearfix" v-if="parseInt(item.addressID)==0">
						<span class="left">收件地址</span>
						<span class="right">{{item.building_info.buildingAddress}}</span>
					</li>

					<li class="clearfix" v-if="parseInt(item.addressID)>0">
						<span class="left">收件人</span>
						<span class="right">{{name}}</span>
					</li>
					<li class="clearfix" v-if="parseInt(item.addressID)>0">
						<span class="left">收件人电话</span>
						<span class="right">{{phone}}</span>
					</li>
					<li class="clearfix" v-if="parseInt(item.addressID)>0">
						<span class="left">收件地址</span>
						<span class="right">{{address}}</span>
					</li>
					<li class="clearfix" v-if="item.express_no">
						<span class="left">快递单号</span>
						<span class="right">￥{{item.express_no}}</span>
					</li>
					<li class="clearfix" v-if="item.expressCompanyName">
						<span class="left">快递公司</span>
						<span class="right">￥{{item.expressCompanyName}}</span>
					</li>
					<li class="clearfix" v-if="item.price && parseInt(item.addressID)>0">
						<span class="left">快递费用</span>
						<span class="right">￥{{item.freight}}</span>
					</li>
				</ul>

				<div class="bottom-btn bottom-btn-list clearfix">
					
					<button type="button" class="blue-bg xiadan " v-if="item.order_status == 2" @click="tuikuan()">退款</button>
					<button type="button" class="yellow-bg xiadan " v-if="(item.order_status == 1) " @click="quxiao()">取消订单</button>
					<button type="button" class="blue-bg xiadan" v-if="item.order_status == 1&&parseFloat(item.price) != 0" @click="moneyPay(item.price)"> 立即支付</button>
					
					<uni-popup :show="popupParam === 'bottom'" position="bottom" mode="fixed" :payWay="'3'" :orderID="orderID" :money="allMoney+''" @hidePopup="payPopup('')" />
					
						
				</div>
			</div>

			<div class="tab-detail-col " v-else>
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
			
		
		
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,coupon_order_detail,cancel_order,Refund_mallOrder,addressManage,getMallExpressInfoByorder } from '@/utils/api'
	import uniPopup from '@/components/popup-pay.vue';
	
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				typeList: ['订单详情','物流详情'],
				curType: 0,
				isEmptyOrder: true,
				orderID: '',
				list: [],
				tatol: 0,
				isShowDetail: true,
				item:{},
				orderStatusList: ['已取消','待付款','已付款','待收货','已收货','已退款','已完成'],
				popupParam:'',
				allMoney: 0,
				name: '',
				phone: '',
				address: '',
				detailList: []
			}
		},
		methods: {
			changeType(){
				this.isShowDetail = !this.isShowDetail;
			},
			payPopup(popupParam) {
				this.popupParam=popupParam;
			},
			moneyPay(allMoney){
				this.allMoney=allMoney.toString();
				this.popupParam="bottom";
				
				console.log("支付");
				
			},
			tuikuan(index)
			{
				let that = this;
				uni.showModal({
					title:"提醒",
					content: "是否退款",
					success(result) {
						if (result.confirm) {
							that.moneyBack(index);
						} else if (result.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			
			async moneyBack(index){

				let params = {
					orderID: this.orderID
				};
				let res = await Refund_mallOrder(params);
				if(res.status == 1){
					this.page = 1;
					this.coupon_order_detail();
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
					order_id: this.orderID
				};
				let res = await cancel_order(params);
				if(res.status == 1){
					this.coupon_order_detail();
				}else{
					uni.showToast({
					  icon: 'none',
					  title: res.message,
					  duration: 1000
					});
				}
			},
			async coupon_order_detail(){
				let res = await coupon_order_detail({order_id: this.orderID});
				if(res.status == 1){
					// this.list = res.data[0];
					this.item = res.data;
					// this.tatol = res.tatol;
					// this.allMoney = this.tatol;
					console.log(this.list);
					this.addressManage();
					this.getMallExpressInfoByorder();
				}
			},
			async addressManage(){
				let params = {
					userID: uni.getStorageSync("userInfo").userID,
					addressID: this.item.addressID,
					flag: 4
				};
				let res = await addressManage(params);
				if(res.status == 1){
					this.name = res.data.name;
					this.phone = res.data.phone;
					this.address = res.data.province+res.data.city+res.data.area+res.data.detail;
				}
			},
			
			async getMallExpressInfoByorder(){
				// this.item.order_no
				let res = await getMallExpressInfoByorder({orderSN: '1907091236506381'})
				if(res.status == 1){
					this.isEmptyOrder = false;
					this.detailList = res.data.data;
				}else{
					this.isEmptyOrder = true;
				}
			}
		},
		onLoad(opt) {
			this.orderID = opt.orderID;
			this.coupon_order_detail();
			if(opt.type == 1){
				this.isShowDetail = false;
			}
		}
	}
</script>

<style>
@import url("../../static/style/yun_fei.css");

.item_wrap{display: flex;flex-direction: column; position: relative; padding-top: 20upx!important;padding-bottom: 20upx!important;}
.item_wrap .top_wrap{padding-bottom: 20upx;border-bottom:1px solid #E3E3E3;}
.item_wrap .top_wrap .status{color: #107EFF;}
.btn_wrap{padding: 20upx 0upx; text-align: right;}
.btn_wrap .pay{color: #fff; font-size: 24upx; padding: 6upx 26upx; border:1px solid #107EFF;border-radius: 8upx;text-align: center;margin: 0upx 10upx;background: #107EFF;}
.btn_wrap .cancle{color: #666; font-size: 24upx; padding: 6upx 10upx; background-color: #fff;border-radius: 8upx;text-align: center;border: 1upx solid #999;margin: 0upx 10upx;}

.content_wrap .border{width: 100%; padding: 20upx 30upx;box-sizing: border-box; border-bottom: 2upx solid #E3E3E3;}
/* .content_wrap .border:last-of-type{border-bottom: 0upx;} */
.content_up{width: 100%;display: flex;flex-direction: row;justify-content: space-between;}
.content_up img{width: 140upx;height: 140upx;border-radius: 8upx;}
.content_center{width:336upx;max-height:114upx;position: relative;line-height: 40upx;overflow: hidden;font-size: 28upx;color: #666666;flex: 1;padding: 0px 32upx;}
.content_end{color: #666666;font-size: 28upx;display: flex;flex-direction: column;}
.content_end .number{text-align: right;}
.content_down{width: 100%;text-align: right; color: #999999;}
.money_number{font-size: 28upx; color: #FF6262;}
.freight_wrap{margin-right: 10upx;}
	
.head_wrap{width: 100%; display: flex; flex-direction: row;position: fixed;left: 0upx;background-color: #FFF;border-bottom: 2upx solid #E3E3E3; height: 100upx;z-index: 101;}
.head_item{flex: 1; padding: 0upx 24upx;}
.head_item span{height: 100upx; line-height: 100upx;}
.active_type{color: #107EFF;border-bottom: 2upx solid #107EFF;}

.main-tab-col{text-align: center;font-size:36upx;padding:20upx 40upx;color:#999999;}
.main-tab-col span{padding:20upx 12upx;position: relative;}
.main-tab-col span.active{color:#000;}
.main-tab-col span.active:after{content: " ";width:60upx;margin-left:-30upx;height:8upx;background: #107EFF;bottom:-12upx;border-radius:6upx;position:absolute;left:50%;display: block;}

.tatol_wrap{margin-top: 30upx; display: flex;flex-direction: row;justify-content: space-between;}
.tatol_wrap .status{margin-right: 10upx;}

.bottom-btn{margin-bottom: 100upx; display: flex; flex-direction: row;}
.detail_empty{margin-top: 40upx; width: 100%; display: block;text-align: center;}


.uni-timeline-item-keynode span{width: 100%;line-height: normal!important;}
.genzong-list li{padding: 0upx 20upx;}

</style>
