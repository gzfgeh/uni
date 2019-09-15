<template>
	<view>
		
		<div class="head_wrap">
			<div v-for="(item, index) in typeList" :key="index" @click="changeType(index)"
				class="head_item row_center" >
				<span :class="{'active_type': (curType == index)}">{{item}}</span>
			</div>
		</div>
		
		<div style="background: #fff;margin-top: 120upx;padding:0 30upx 20upx;">

			<block  v-for="(item,index) in list" :key="index" >
				<navigator class=" item_wrap col_between" 
					:url="'../service_order_detail/service_order_detail?orderID='+item.orderID">
						<div class="title_order">订单编号: {{item.orderSN}}</div>
						<div class="row_between title_wrap">
							<span>下单时间: {{item.createTime.split(" ")[0]}}</span>
							<div class="row_center item_status"> 
								<span class="dian">·</span>  
								<span>&nbsp;{{orderStatusList[parseInt(item.orderStatus)+1]}}</span>
							</div>
						</div>
						
						
						<div class=" content_wrap">
							<div class="col_between border">
								<div class="content_up">
									<img :src="item.waterImageUrl" mode="aspectFill"/>
									<span class="content_center">{{item.waterShowName}}</span>
									<div class="content_end" v-if="parseInt(item.isCompany) == 0">
										<span>￥{{item.unitPrice}}</span>
										<span class="number">x{{item.quantity}}</span>
									</div>
								</div>
								<div class="content_down" v-if="parseInt(item.isCompany) == 0">
									<span class="first_txt">共 <span class="num">{{item.quantity}}</span> 件</span>
									<span class="sencod_txt">应付金额:
										<span class="money">￥</span><span class="money_num">{{item.price}}</span>
										
									</span>
								</div>
							</div>
							
							
						</div>
						
						<div class="row item_down" v-if="(item.orderStatus <= 2) && (parseInt(item.isCompany) == 0)">
							<span class="cancle" v-if="item.orderStatus == 1" @click.stop="actionOrder(1, index)">取消订单</span>
							<span class="pay" v-if="item.orderStatus == 1 &&orderStatus<=1 && (parseInt(item.isCompany) == 0)" @tap.stop="moneyPay(item.orderSN,item.orderID,item.price)">&nbsp;&nbsp;支付&nbsp;&nbsp;</span>
							<span class="pay" v-if="item.orderStatus == 2 && (parseInt(item.isCompany) == 0)" @click.stop="tuikuan(index)">退款</span>
							
						</div>
					</navigator>
			</block>
		</div>
			
		<div v-if="list.length == 0&loadingType==2" class="uni-center-item no_data_wrap">
			<span>暂无订单信息</span>
		</div>
		
		<view class="uni-tab-bar-loading" v-if="list.length != 0">
			<uni-load-more :loadingType="loadingType" :contentText="loadingText"  ></uni-load-more>
		</view>
		
		<uni-popup :show="popupParam === 'bottom'" position="bottom" mode="fixed" :payWay="'-1'" :orderSN="orderSN" :orderID="orderID" :money="allMoney" @hidePopup="payPopup('')" />
		
		
	</view>
	
	
	
</template>

<script>
	import { BASE_IMAGE_URL,water_order_list,cancel_water_order,waterRefund } from '@/utils/api'
	import uniLoadMore from '@/components/uni-load-more.vue';
	import uniPopup from '@/components/popup-pay.vue';
	// 订单状态(-1删除0已取消1待支付2待确认(已支付)3已确认4已收货（已送货）9已退款）
	
	export default {
		components: {
			uniLoadMore,
			uniPopup
		},
		data() {
			return {
				loadingText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				list: [],
				companyCode:"",
				loadingType: 0,
				page: 1,
				popupParam:'',
				orderSN:'',
				orderID:'',
				allMoney:'0',
				selectIndex: 0,
				keywords: '',
				orderStatus: 0,
				orderStatusList: ['删除','已取消','待支付','待确认','已确认','已收货','','','','','已退款'],
				typeList: ['全部','待付款', '待确认','待发货', '已完成'],
				curType: 0,
			}
		},
		methods: {
			changeType(index){
				this.curType = index;
				console.log(index);
				this.orderStatus=index;
				this.page = 1;
				this.getList();
			},
			payPopup(popupParam) {
				this.popupParam=popupParam;
			},
			moneyPay(orderSN,orderID,allMoney){
				this.orderSN=orderSN;
				this.orderID=orderID;
				this.allMoney=allMoney;
				this.popupParam="bottom";
			},
			tuikuan(index){
				let that = this;
				uni.showModal({
					title:"提醒",
					content: "是否退款",
					success(result) {
						if (result.confirm) {
							that.waterRefund(index);
						} else if (result.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			async waterRefund(index){

				let params = {
					orderID: this.list[index].orderID
				};
				let res = await waterRefund(params);
				if(res.status == 1){
					this.page = 1;
					this.getList();
				}else{
					uni.showToast({
					  icon: 'none',
					  title: res.message,
					  duration: 1000
					});
				}
			},
			actionOrder(type, index){
				let that = this;
				uni.showModal({
					title:"提醒",
					content: type== 1?"是否取消":"是否删除",
					success(result) {
						if (result.confirm) {
							that.cancel_water_order(type, index);
						} else if (result.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			async cancel_water_order(type, index){
				let params = {
					orderID: this.list[index].orderID
				};
				let res = await cancel_water_order(params);
				if(res.status == 1){
					this.page = 1;
					this.getList();
					
				}else{
					uni.showToast({
					  icon: 'none',
					  title: res.message,
					  duration: 1000
					});
				}
			},
			async lookDetail(index){
				let params = {
					orderSN: this.list[index].orderSN
				};
				let res = await getExpressInfoByorderSN(params);
				if(res.status == 1){
					
				}
			},
			async getList(){
				let res = await water_order_list(this.orderStatus, this.page);
				uni.stopPullDownRefresh();
				if(res.status == 1){
					
					if(this.page==1)
					{
						this.list=res.data;
					}
					else{
						this.list=this.list.concat(res.data);
					}
					
					if(res.data.length < 10){
						this.loadingType = 2;
					}else{
						this.loadingType = 0;
					}
				}
			},
			goToDetail(index){
				this.selectIndex = index;
				uni.navigateTo({
					url: '/pages/service_order_detail/service_order_detail?orderID='+this.list[index].orderID
				});
			}
		},
		onReachBottom() {
			this.loadingType = 1;
			this.page++;
			this.getList();
		},
		
		onPullDownRefresh() {
			console.log("dddddd");
			this.page = 1;
			this.getList();
		},
		onLoad() {
			
			//this.$store.commit('changeOrderItem', "");
		},
		onShow(){
			
			this.popupParam='';
			
			this.page = 1;
			this.getList();
			
			this.companyCode=uni.getStorageSync("userInfo").companyCode;
			
			let orderItem = this.$store.getters.getOrderItem;
			console.log(orderItem);
			if(orderItem){
				this.list[this.selectIndex] = JSON.parse(orderItem);
				this.$forceUpdate();
			}
			
		},
		onNavigationBarSearchInputChanged (e) {
            console.log(e.text)
			this.page = 1;
			this.keywords = e.text.trim();
			this.getList();
        },
		onNavigationBarButtonTap() {  
			console.log("点击了自定义按钮");
			var $that=this;
			uni.scanCode({
				success: function (res) {
					console.log('条码类型：' + res.scanType);
					console.log('条码内容：' + res.result);
					$that.keywords=res.result;
					$that.page = 1;
					$that.getList();
				}
			});

		}
		
	}
</script>

<style>

.item_wrap{display: flex;flex-direction: column;}
/* .bottom{border-bottom: 1upx solid #E3E3E3;} */
.btn_wrap{position: absolute;right:0upx;top:28upx;}
.pay{color: #fff; font-size: 24upx; padding: 6upx 26upx; color: #107EFF;border:1px solid #107EFF;border-radius: 8upx;text-align: center;margin: 0upx 10upx;}
.cancle{color: #666; font-size: 24upx; padding: 6upx 10upx; background-color: #fff;border-radius: 8upx;text-align: center;border: 1px solid #999;margin: 0upx 10upx;}


.head_wrap{width: 100%; display: flex; flex-direction: row;position: fixed;margin-top:-120upx;left: 0upx;background-color: #FFF;border-bottom: 2upx solid #E3E3E3; height: 100upx;z-index: 101;}
.head_item{flex: 1; padding: 0upx 24upx;}
.head_item span{height: 100upx; line-height: 100upx;}
.active_type{color: #107EFF;border-bottom: 2upx solid #107EFF;}

.title_order{padding:20upx 30upx 0upx;font-size: 28upx;color: #666666;}
.item_wrap {width: 100%;background-color: #FFFFFF;border-radius: 8upx;box-shadow: 0px 0px 20upx 0px #EAEAEA;margin-bottom: 20upx;}
.title_wrap {padding:0upx 30upx 10upx;height: 70upx; font-size: 28upx;color: #666666;border-bottom: 2upx solid #E3E3E3;width: 100%;box-sizing: border-box;}
.title_wrap .item_status {color: #FF5269;font-size: 28upx;}
.title_wrap .item_status .dian {font-weight: bold;font-size: 50upx;position: relative;top: -4upx;}
.content_wrap {width: 100%;box-sizing: border-box;padding: 30upx 30upx 0px;}
.content_wrap .border {width: 100%;padding-bottom: 30upx;}
.content_up {height: 140upx;width: 100%;display: flex;flex-direction: row;justify-content: space-between;}
.content_up img {width: 140upx;height: 140upx;border-radius: 8upx;}
.content_center {width: 336px;max-height: 114upx;position: relative;line-height: 40upx;overflow: hidden;font-size: 28upx;color: #666666;flex: 1;padding: 0px 32upx;}
.content_end {color: #666666;font-size: 28upx;display: flex;flex-direction: column;}
.content_end .number {text-align: right;}
.content_down {width: 100%;text-align: right;margin-bottom: 20upx;}
.first_txt {color: #999999;font-size: 28upx;margin-right: 20upx;}
.first_txt .num {color: #333333;}
.sencod_txt {font-size: 28upx;color: #333333;}
.sencod_txt .money {font-size: 24upx;}
.sencod_txt .money_num {font-size: 36upx;}
.sencod_txt .num_float {font-size: 24upx;}
.item_down {height: 100upx;font-size: 24upx;justify-content: flex-end;width: 100%;padding-right: 30upx;box-sizing: border-box; border-top: 2upx solid #E3E3E3;}
.item_down span {border-radius: 12upx;padding: 4upx 22upx 4px;margin-left: 20upx;width: 120upx; text-align: center;}
.warn_tag {color: #FFFFFF;background-color: #107EFF;}
.normal_tag {color: #666666;background-color: #FFFFFF;border: 2upx solid #999999;}

</style>
