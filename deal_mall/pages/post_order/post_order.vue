<template>
	<view class="content">
		<navigator class="row_between address_wrap" @click="goToAddress" >
			
			<block v-if="!isShowAddress">
				<span>收货地址</span>
				<span class="arraw"></span>
			</block>
			
			<block v-if="isShowAddress">
				<div class="address_content">
					<div class="row_between">
						<span>收货人：{{addressItem.a_name}}</span>
						<span>{{addressItem.a_phone}}</span>
					</div>
					
					<span class="address">收货地址：{{addressItem.a_sheng}}{{addressItem.a_shi}}{{addressItem.a_qu}}{{addressItem.a_address}}</span>
				</div>
				<img src="../../static/img/right.png" mode="aspectFill">
			</block>
		</navigator>
		
		
		<block v-for="(item, index) in itemList" :key="index">
			<div class="item_wrap row">
				<img :src="item.g_img" mode="aspectFill">
				<div class="content_wrap">
					<span class="title flex_one">{{item.g_name}}</span>
					<div class="row price_wrap">
						<span class="flex_one count">X{{item.ct_count}}</span>
						<span class="price">￥：{{item.g_price}}</span>
					</div>
				</div>
			</div>
		</block>
		
		<!-- <div class="liu_yan_wrap">
			<span>买家留言</span>
			<textarea v-model="liuyan" placeholder="请填写备注" />
		</div> -->
		
		<div class="bottom_wrap">
			<span class="bottom_left">总计：￥{{money}}</span>
			<span class="flex_one buy_btn row_center" @click="postOrder">提交</span>
		</div>
		
		
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,addOrder } from '@/utils/api'
	
	export default {
		data() {
			return {
				itemList:[],
				isShowAddress: false,
				liuyan: '',
				money: 0,
				addressItem: {}
			}
		},
		methods: {
			goToAddress(){
				uni.navigateTo({
					url: '/pages/address_list/address_list'
				});
			},
			async postOrder(){
				if(!this.addressItem){
					uni.showToast({
						icon: 'none',
						duration: 1000,
						title: "请选择地址"
					});
					return;
				}
				
				let goodsDetail = [];
				this.itemList.map((item) => {
				  let p = {
						go_g_id: item.g_id,
						go_count: item.ct_count,
						go_g_price: item.g_price,
						go_g_name: item.g_name,
						go_g_img: item.g_img
					}
					goodsDetail.push(p);
				});
				
				let userInfo = uni.getStorageSync("userInfo");
				let params = {
					o_openid: uni.getStorageSync("openid"),
					o_money: this.money,
					o_address: this.addressItem.a_address,
					o_sheng: this.addressItem.a_sheng,
					o_shi: this.addressItem.a_shi,
					o_qu: this.addressItem.a_qu,
					goods: JSON.stringify(goodsDetail),
					k_m_role: userInfo.m_role,
					k_m_id: userInfo.m_id,
					k_p_m_id: userInfo.m_p_m_id
				};
				let res = await addOrder(params);
				if(res.code == 1000){
					uni.showModal({
						title:"提示",
						content:"下单成功",
						showCancel:false,
						success(res) {
							if(res.confirm){
								uni.switchTab({
									url:'../tabbar/home/home'
								})
							}
						}
					})
					
				}else{
					uni.showToast({
						icon: 'none',
						duration: 1000,
						title: res.msg
					});
				}
			}
		},
		onLoad() {
			this.itemList = uni.getStorageSync("itemList");
			this.itemList.map((item) => {
				this.money += parseInt(item.ct_count)*parseInt(item.g_price);
			});
			uni.removeStorageSync("addressItem");
		},
		onShow(){
			this.addressItem = uni.getStorageSync("addressItem");
			console.log(this.addressItem);
			if(this.addressItem){
				this.isShowAddress = true;
			}else{
				this.isShowAddress = false;
			}
			console.log(this.isShowAddress);
			this.$forceUpdate();
		}
	}
</script>

<style>
	page,
.content{background: #E3E3E3; height: 100%;}	

.address_wrap{padding:20upx; background: #FFFFFF; margin-bottom: 20upx;}
.address_content{display: flex; flex-direction: column;}
.address{margin-top: 20upx;}
.address_wrap img{width: 40upx; height: 60upx;}
	
.item_wrap{padding: 20upx; background: #FFFFFF;border-bottom: 1upx solid #E3E3E3; }
.item_wrap .content_wrap{display: flex; flex-direction: column; flex: 1; height: 160upx;}
.item_wrap img{width: 160upx; height: 160upx; margin-right: 20upx;}
.item_wrap .title{color: #353535; font-size: 32upx;}
.item_wrap .count{color: #999999; font-size: 28upx;}
.item_wrap .price{color: #ff334b; font-size: 30upx;}

.liu_yan_wrap{display: flex;flex-direction: column;margin-top: 20upx;color: #353535;background: #FFF;padding: 20upx;height: 200upx!important;}


.bottom_wrap{position: fixed;bottom: 0upx;left: 0upx; z-index: 100;height: 110upx;width: 100%;box-sizing: border-box; display: flex;flex-direction: row;border-top: 1upx solid #F3F3F3; background: #FFF;}
.bottom_left{height: 110upx; color: #FF4544; padding-left: 20upx; line-height: 110upx; display: flex;flex: 1; font-size: 34upx;}

.buy_btn{background: #FF4544; height: 100%; color: #fff; width: 200upx;}

</style>
