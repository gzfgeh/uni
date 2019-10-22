<template>
	<view>
		<div class="mui-content">
			
			<div class="content_wrap" >
				<navigator class="row_between address_wrap" url="../address_list/address_list?typeIndex=0" v-if="selectAddressID == 0">
					<span class="text">从地址簿选择地址</span>
					<span class="arraw"></span>
				</navigator>
				
				<navigator class="col_between address_wrap" url="../address_list/address_list?typeIndex=0" v-else>
					<div class="row_between">
						<span >收货人</span>
						<span>{{name}}  {{phone}}</span>
					</div>
					<div class="row_between">
						<span>收货地址</span>
						<span class="address">{{address}}</span>
					</div>
					
				</navigator>
			</div>
			
			
			<div class="list_wrap" >
				<div class=" content_wrap" v-for="(ite, ind) in list" :key="ind">
					<div class="row_between store_wrap" >
						<span>{{ite.store_name}}</span>
						<span v-if="ite.yunFee">运费：<span class="money">￥{{ite.yunFee}}</span></span>
					</div>
					<div class="col_between border" v-for="(item, index) in ite.goodsInfo" :key="index">
						<div class="content_up">
							<img :src="item.goods_list_img" mode="widthFix"/>
							<span class="content_center">{{item.name}}  {{item.spec_name}}</span>
							<div class="content_end">
								<span >￥{{item.price}}</span>
								<span class="number">x{{item.count}}</span>
							</div>
						</div>
						<div class="content_down" >
							<span class="coupon" v-if="item.coupon">优惠:￥{{item.coupon.price}}</span>
							<span class="sencod_txt">商品应付金额:
								<span class="money">￥{{item.money}}</span>
								
							</span>
						</div>
					</div>
				</div>
				
			</div>
			
			
			<div class="button row_between"  @tap="postOrder">
				
				<span>总计：</span>
				<span class="price">¥{{allMoney}}</span>
				<button>支付</button>
			</div>
			
		</div>
		
		<uni-popup :show="popupParam === 'bottom'" position="bottom" mode="fixed" :payWay="'3'"  :orderID="orderID" :money="allMoney+''" @hidePopup="payPopup('')" />


	</view>
</template>

<script>
	import { BASE_IMAGE_URL,addressManage,shopcart_list,create_order,freight,order_goods_list,create_order_new} from '@/utils/api'
	import uniPopup from '@/components/popup-pay.vue'
	import {mapState,mapMutations, mapActions, mapGetters} from 'vuex';
	
	import cityData from '../../components/city.data.js';
	
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				name:'',
				phone:'',
				address: '请选择地址',
				list: [],
				allMoney: '',
				selectAddressID: 0,
				popupParam: '',
				orderID: '',
				yunFee: 0
			}
		},
		computed:{
			...mapState({
				addressID: state => state.addressID
			})
		},
		methods: {
			payPopup(popupParam) {
				this.popupParam=popupParam;
			},
			async postOrder(){
				if(this.selectAddressID == 0){
					uni.showToast({
						icon:'none',
						title:"请选择地址",
						duration:1000
					})
					return;
				};
				let userInfo = uni.getStorageSync("userInfo");
				let platform = 3;
				// #ifdef APP-PLUS
					platform = 1;
				// #endif
				let params = uni.getStorageSync("params");
				params.addressID = this.selectAddressID;
				
				let res = await create_order_new(params);
				console.log(res)
				if(res.status == 1){
					this.payPopup('bottom');
					this.orderID = res.data;
				}else{
					uni.showToast({
						icon:'none',
						title:res.message,
						duration:1000
					})
				}
			},
			goToAddress(){
				uni.navigateTo({
					url: "/page/address_list/address_list?typeIndex=0"
				});
				
			},
			async addressManage(){
				let params = {
					userID: uni.getStorageSync("userInfo").userID,
					addressID: this.selectAddressID,
					flag: 4
				};
				let res = await addressManage(params);
				if(res.status == 1){
					this.name = res.data.name;
					this.phone = res.data.phone;
					this.address = res.data.province+res.data.city+res.data.area+res.data.detail;
					this.selectAddressID = res.data.addressID;
					this.freight();
				}
			},
			async freight(){
				let res = await freight({addressID: this.selectAddressID});
				if(res.status == 1){
					if(parseFloat(this.yunFee) > 0){
						this.list.map((item, index) => {
							if(parseInt(item.is_pinkage)==0){
								item.yunFee = res.data;
								this.allMoney = parseFloat(parseFloat(this.allMoney) + parseFloat(item.yunFee) - parseFloat(this.yunFee)).toFixed(2) ;
							}
						})
					}else{
						this.list.map((item, index) => {
							if(parseInt(item.is_pinkage)==0){
								item.yunFee = res.data;
								this.allMoney =  parseFloat(parseFloat(this.allMoney) + parseFloat(item.yunFee)).toFixed(2);
							}
						})
					}
					this.yunFee = res.data;
					console.log(this.list);
				}
			},
			
			async order_goods_list(){
				let params = {
					user_id: uni.getStorageSync("userInfo").userID,
					shopcartID: uni.getStorageSync('params').shopcartID
				};
				
				let res = await order_goods_list(params);
				if(res.status == 1){
					this.list = res.list;
					this.list.map( (ite) => {
						ite.goodsInfo.map((item, index) => {
							if(index == 0){
								if(item.coupon && item.coupon.price){
									item.money =parseFloat(parseFloat(item.price)*parseFloat(item.count) - parseFloat(item.coupon.price)).toFixed(2); 
								}else{
									item.money =parseFloat(parseFloat(item.price)*parseFloat(item.count)).toFixed(2);
									item.coupon = null;
								}
							}else{
								let i=0;
								for(i=0; i<index; i++){
									if(item.goods_id == ite.goodsInfo[i].goods_id){
										item.money =parseFloat(parseFloat(item.price)*parseFloat(item.count)).toFixed(2);
										item.coupon = null;
									}
								};
								if(i == index && item.coupon && item.coupon.price){
									item.money =parseFloat(parseFloat(item.price)*parseFloat(item.count) - parseFloat(item.coupon.price)).toFixed(2); 
								}else{
									item.money =parseFloat(parseFloat(item.price)*parseFloat(item.count)).toFixed(2);
									item.coupon = null;
								}
							}
							this.allMoney = parseFloat(parseFloat(this.allMoney) + parseFloat(item.money)).toFixed(2) ;
						})
					});
					console.log(this.list);
				}
			},
			
			
		},
		onLoad(options) {
			this.$store.commit("changeAddress", 0);
			// this.list = uni.getStorageSync('selectItems');
			this.allMoney = 0;
			this.order_goods_list();
		},
		onShow() {
			if(this.addressID != 0){
				this.selectAddressID = this.addressID;
				this.addressManage();
			}
		}
	}
</script>

<style>
.list_wrap{margin-bottom: 180upx;}
.content_wrap{box-sizing: border-box;box-shadow: 0px 0px 20upx 0px #EAEAEA;margin: 36upx 30upx 30upx;}
.address_wrap{padding: 20upx 30upx;}
.store_wrap{padding: 20upx;}
.coupon_wrap{border-top: 2upx solid #E3E3E2; padding: 20upx 30upx; color: #666666; font-size: 28upx;}
.address_wrap .text{color: #107EFF; font-size: 32upx;}
.coupon_wrap .text{color: #323333; font-size: 28upx;}
.address_wrap .address{white-space: normal; word-wrap: break-word;word-break: break-all;}
.address_wrap div span{min-width: 160upx;}


.content_wrap .border{width: 100%; padding: 20upx 30upx;box-sizing: border-box; border-top: 2upx solid #E3E3E3;}
.content_up{width: 100%;display: flex;flex-direction: row;justify-content: space-between;}
.content_up img{width: 140upx;height: 140upx;border-radius: 8upx;}
.content_center{width:336upx;max-height:114upx;position: relative;line-height: 40upx;overflow: hidden;font-size: 28upx;color: #666666;flex: 1;padding: 0px 32upx;}
.content_end{color: #666666;font-size: 28upx;display: flex;flex-direction: column;}
.content_end .number{text-align: right;}
.content_down{width: 100%;text-align: right;margin-top: 20upx;}
.content_down .coupon{margin-right: 20upx;}
.money{color: #FF5269;}
.first_txt{color: #999999;font-size: 28upx;margin-right: 20upx;}

.button{width: 100%;height: 150upx;line-height: 150upx;background-color: #ffffff;padding:0upx 20upx;text-align: center;font-size: 28upx;position: fixed;
	bottom: 0upx;z-index: 1;box-shadow:0px 6upx 54upx 0px rgba(221,221,221,0.41);box-sizing: border-box;}
.button .text{margin: 0upx 10upx;}
.button .price{margin-right: 10upx; color: #FF5269; font-size: 32upx;}
.button button{margin: 40upx 10upx;flex:1;height: 94upx;line-height: 94upx;border-radius: 10upx;color: #ffffff;background-color: #427DFF;}

</style>
