<template>
	<view>
		
		<div class="head_wrap">
			<div v-for="(item, index) in typeList" :key="index" @click="changeType(index)"
				class="head_item row_center" >
				<span :class="{'active_type': (curType == index)}">{{item}}</span>
			</div>
		</div>
		
		<ul class="express-list" style="background: #fff;margin-top: 120upx;">

			<block  v-for="(item,index) in list" :key="index" >
				<li  class="item_wrap" @click="goToDetail(index)">
					<div>订单号:{{item.order_no}}</div>
					<!-- <div class="row_between top_wrap">
						<span>下单时间:{{item.order_time}}</span>
						<span >订单状态：<span class="status">{{orderStatusList[parseInt(item.order_status)]}}</span> </span>
					</div> -->
					<div class="row_between title_wrap">
						<span>下单时间: {{item.order_time}}</span>
						<div class="row_center item_status"> 
							<span class="dian">·</span>  
							<span>&nbsp;{{orderStatusList[parseInt(item.order_status)]}}</span>
						</div>
					</div>
					
					<div class=" content_wrap" v-for="(ite,ind) in item.order_goods" :key="ind">
						<div class="col_between border" >
							<div class="content_up">
								<img :src="ite.img" mode="widthFix"/>
								<span class="content_center">{{ite.title}}</span>
								<div class="content_end">
									<!-- <span class="number">x{{ite.count}}</span> -->
									<span >￥{{ite.pay_price}}</span>
								</div>
							</div>
							
						</div>
					</div>
					
					
					<div class="bottom_wrap" >
						<div >
							<span v-if="parseFloat(item.freight) > 0" class="freight_wrap">运费：￥{{item.freight}}</span>
							<span>
								总计：￥ <span class="money_number">{{item.price}}</span>
							</span>
							
						</div>
						
						<div class="btn_wrap" v-if="item.order_status>0">
							<span class="cancle" v-if="item.orderStatus == 4" @click.stop="goToDetail(index, 1)">物流查询</span>
							<span class="cancle" v-if="item.order_status== 1" @click.stop="actionOrder(1, index)">取消订单</span>
							<span class="pay" v-if="item.order_status == 1" @click.stop="moneyPay(item.id,item.price)">支付</span>
							<span class="pay" v-if="item.order_status==2" @click.stop="tuikuan(index)">退款</span>
						</div>
					
					</div>
				</li>
			</block>
		</ul>
			
		<div v-if="list.length == 0&loadingType==2" class="uni-center-item no_data_wrap">
			<span>暂无信息</span>
		</div>
		
		<view class="uni-tab-bar-loading" v-if="list.length != 0">
			<uni-load-more :loadingType="loadingType" :contentText="loadingText"  ></uni-load-more>
		</view>
		
		<uni-popup :show="popupParam === 'bottom'" position="bottom" mode="fixed" :payWay="'3'" :orderID="orderID" :money="allMoney" @hidePopup="payPopup('')" />
		
		
	</view>
	
	
	
</template>

<script>
	import { BASE_IMAGE_URL,coupon_order_list,cancel_order,Refund_mallOrder } from '@/utils/api'
	import uniLoadMore from '@/components/uni-load-more.vue';
	import uniPopup from '@/components/popup-pay.vue';
	import {mapState,mapMutations, mapActions, mapGetters} from 'vuex';
	
	// 0已取消 1 待付款， 2已付款-待发货 3 发货-待收货 4 已收货 默认全部订单
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
				orderID:'',
				allMoney:'0',
				selectIndex: 0,
				keywords: '',
				orderStatus: '',
				orderStatusList: ['已取消','待付款','已付款','待收货','已收货','已完成'],
				typeList: ['全部','待付款', '待发货', '待收货', '已完成'],
				curType: 0,
			}
		},
		methods: {
			changeType(index){
				this.curType = index;
				console.log(index);
				if(index == 0){
					this.orderStatus = '';
				}else{
					this.orderStatus=index;
				}
				
				this.page = 1;
				this.getList();
			},
			payPopup(popupParam) {
				this.popupParam=popupParam;
			},
			moneyPay(orderID,allMoney){
				this.orderID=orderID;
				this.allMoney=allMoney;
				this.popupParam="bottom";
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
					orderID: this.list[index].id
				};
				let res = await Refund_mallOrder(params);
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
							that.cancel_order(type, index);
						} else if (result.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			async cancel_order(type, index){
				let params = {
					order_id: this.list[index].id
				};
				let res = await cancel_order(params);
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
				this.selectIndex = index;
				uni.navigateTo({
					url: '/pages/mall_goods_list_detail/mall_goods_list_detail?orderID='+this.list[index].orderID+"&orderStatus=1"
				});
			},
			async getList(){
				let userInfo = uni.getStorageSync("userInfo");
				
				let params = {
					user_id: userInfo.userID,
					page: this.page,
					keyword: this.keywords,
					order_status: this.orderStatus>=0?this.orderStatus:''
				};
				
				let res = await coupon_order_list(params);
				uni.stopPullDownRefresh();
				if(res.status == 1){
					
					if(this.page==1)
					{
						this.list=res.data;
					}
					else{
						this.list=this.list.concat(res.data);
					}
					
					if(this.list.length < 10){
						this.loadingType = 2;
					}else{
						this.loadingType = 0;
					}
				}
			},
			goToDetail(index, type){
				if(type == 1){
					uni.navigateTo({
						url: '/pages/mall_goods_list_detail/mall_goods_list_detail?type=1&orderID='+this.list[index].id
					});
				}else{
					uni.navigateTo({
						url: '/pages/mall_goods_list_detail/mall_goods_list_detail?orderID='+this.list[index].id
					});
				}
				
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
	@import url("../../static/style/yun_fei.css");

.item_wrap{display: flex;flex-direction: column; position: relative; padding-top: 20upx!important;padding-bottom: 20upx!important;font-size: 28upx!important;color: #666666!important;}
.item_wrap .top_wrap{padding-bottom: 20upx;border-bottom:1px solid #E3E3E3;}
.item_wrap .top_wrap .status{color: #107EFF;}
.title_wrap {padding:0upx 0upx 10upx;height: 70upx; font-size: 28upx;color: #666666;border-bottom: 2upx solid #E3E3E3;width: 100%;box-sizing: border-box;}
.title_wrap .item_status {color: #FF5269;font-size: 28upx;}
.title_wrap .item_status .dian {font-weight: bold;font-size: 50upx;position: relative;top: -4upx;}

.btn_wrap{padding: 20upx 0upx; text-align: right;}
.btn_wrap .pay{color: #fff; font-size: 24upx; padding: 6upx 26upx; border:1px solid #107EFF;border-radius: 8upx;text-align: center;margin: 0upx 10upx;background: #107EFF;}
.btn_wrap .cancle{color: #666; font-size: 24upx; padding: 6upx 10upx; background-color: #fff;border-radius: 8upx;text-align: center;border: 1upx solid #999;margin: 0upx 10upx;}

.content_wrap .border{width: 100%; padding: 20upx 30upx;box-sizing: border-box; border-bottom: 2upx solid #E3E3E3;}
.content_up{width: 100%;display: flex;flex-direction: row;justify-content: space-between;}
.content_up img{width: 140upx;height: 140upx;border-radius: 8upx;}
.content_center{width:336upx;max-height:114upx;position: relative;line-height: 40upx;overflow: hidden;font-size: 28upx;color: #666666;flex: 1;padding: 0px 32upx;}
.content_end{color: #666666;font-size: 28upx;display: flex;flex-direction: column;}
.content_end .number{text-align: right;}
.content_down{width: 100%;text-align: right;}
.money_number{font-size: 32upx; color: #FF4544;}
.freight_wrap{margin-right: 10upx;}

.head_wrap{width: 100%; display: flex; flex-direction: row;position: fixed;margin-top:-120upx;left: 0upx;background-color: #FFF;border-bottom: 2upx solid #E3E3E3; height: 100upx;z-index: 101;}
.head_item{flex: 1; padding: 0upx 24upx;}
.head_item span{height: 100upx; line-height: 100upx;}
.active_type{color: #107EFF;border-bottom: 2upx solid #107EFF;}

.price{display: inline-block; text-align: right;box-sizing: border-box;}

.order_status_wrap{position: absolute;right: 0upx; top: 0upx;}
.order_status_wrap img{width: 120upx; height: 120upx; }
.order_status_wrap span{position: absolute;top: 16upx; right: 10upx; color: #ffffff; display: inline-block;transform:rotate(45deg);}

.bottom_wrap{margin-top: 20upx; text-align: right; display: flex;flex-direction: column;}

</style>
