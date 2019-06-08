<template>
	<view>
		
		<swiper :indicator-dots="true" :autoplay="true"
				:style="{'height': swipeHeight}" :interval="5000" :duration="1000" class="head_img">            
				<swiper-item v-for="(ite, index) in item.g_img_list" :key="index" class="head_img" >  
					<image :src="ite.img" mode="widthFix" class="head_img" @load="imageLoad" />           
				</swiper-item>        
		</swiper> 
		
		<div class="goods_info">
			<div class="name">{{item.g_name}}</div>
			<div class="row">
				<span class="price_unit">￥</span>
				<span class="price">{{item.g_price}}</span>
				<span class="sell_num">库存:{{item.g_kucun}}件</span>
			</div>
		</div>
		
		<rich-text :nodes="item.g_detail"></rich-text> 
		
		<div class="modal-mask" v-if="showModal"></div>
		<div class="modal-dialog" v-if="showModal">
			<img :src="goodsImg" mode="aspectFill" class="goods_img"/>
			<div class="row_between item_wrap">
				<div class="price_wrap">
					<span class="price">￥{{item.g_price}}</span>
					<span>库存{{item.g_kucun}}件</span>
				</div>
				
				<img src="../../static/img/kuaidi_close.png" mode="aspectFill" class="close" @click="closeModal"/>
			</div>
			
			<div class="row_between">
				<span>数量</span>
				<div class="row item_bottom">
					<div class="actionWrap" >
					  <span class="actionClass" :class="{'un_active': (ct_count == 1)}" @click="reduceAction">-</span>
					  <input type="number" class="item_num" v-model="ct_count" 
							maxlength="4" @blur="inputChange">
					  <span class="actionClass" :class="{'un_active': (ct_count >= parseInt(item.g_kucun))}" @click="addAction">+</span>
					</div>
				</div> 
			</div>
			
		</div>
		
		
		
		<div class="cart_wrap" @click="goToShoppingCard">
			<img src="https://bay.2donghua.com/web/statics/wxapp/images/nav-icon-cart.png" mode="aspectFill">
		</div>
		
		<div class="bottom_wrap">
			<div class="bottom_left col_center" @click="goToHome">
				<img src="https://bay.2donghua.com/web/statics/wxapp/images/icon-store.png" mode="widthFix">
				<span>首页</span>
			</div>
			
			<div class="bottom_right row flex_one">
				<span class="flex_one add_card row_center" @click="showDialog(1)">加入购物车</span>
				<span class="flex_one buy_btn row_center" @click="showDialog(2)">立即购买</span>
			</div>
		</div>
			
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,goodsDetail,jiaruCart } from '@/utils/api'
	
	export default {
		data() {
			return {
				itemList: [],
				scrollWidth: 0,
				swipeHeight: 0,
				htmlString: '',
				item: {},
				showModal: false,
				goodsImg: '',
				ct_count: 1,
				type: 1
			}
		},
		methods: {
			imageLoad: function(e){
			  let imgWidth = e.mp.detail.width;
			  let imgHeight = e.mp.detail.height;
			  this.swipeHeight = parseFloat(imgHeight*this.scrollWidth/imgWidth)+"px";
			},
			inputChange(e){
				if(this.ct_count >= parseInt(this.item.g_kucun)){
					this.ct_count = this.item.g_kucun;
				}
			},
			async jiaruCart(){
				let params = {
					ct_openid: uni.getStorageSync("openid"),
					ct_g_id: this.item.g_id,
					ct_count: this.ct_count
				};
				let res = await jiaruCart(params);
				if(res.code == 1000){
					uni.showToast({
					  icon: 'none',
					  title: '添加成功',
					  duration: 1000
					});
					this.showModal = false;
				}else{
					uni.showToast({
					  icon: 'none',
					  title: '加入购物车失败',
					  duration: 1000
					});
				}
			},
			showDialog(index){
				if(this.showModal){
					if(index == 1){
						//加入购物车
						this.jiaruCart();
					}else{
						//立即购买
						this.item.ct_count = this.ct_count;
						uni.setStorageSync("itemList", [this.item]);
						uni.navigateTo({
							url: '/pages/post_order/post_order'
						});
					}
					
				}else{
					this.showModal = true;
				}
				
			},
			closeModal(){
				this.showModal = false;
			},
			reduceAction(){
				if(this.ct_count == 1){
					return;
				}
				this.ct_count--;
			},
			addAction(){
				if(this.ct_count >= parseInt(this.item.g_kucun)){
					return;
				}
				this.ct_count++;
			},
			
			goToShoppingCard(){
				uni.switchTab({
					url: '/pages/tabbar/card/card'
				});
			},
			goToHome(){
				uni.switchTab({
					url: '/pages/tabbar/home/home'
				});
			},
			async goodsDetail(g_id){
				let res = await goodsDetail(g_id);
				if(res.code == 1000){
					this.item = res.data;
					this.item.g_img_list.map((item) => {
						if(item.img){
							this.goodsImg = item.img;
						}
					})
				}
			}
		},
		onLoad(options) {
			let that = this;
			uni.getSystemInfo({
			  success: function(res) {
				that.scrollWidth = res.windowWidth;
			  },
			});
			this.goodsDetail(options.g_id);
		}
	}
</script>

<style>
.head_img{width: 100%;}
.goods_info{padding: 17upx 13upx; background: #fff; border-bottom: 20upx solid #EFEFF4;}
.goods_info .name{margin-bottom: 26upx; font-weight: bold; line-height: 1.7;}

.price{font-size: 30upx; color: #ff4544; margin-right: 20upx;}
.price_unit{padding-top: 8upx; font-size: 24upx; color: #FF4544;}
.old_price{font-size: 24upx; color: #888; margin-right: 34upx;}
.sell_num{font-size: 24upx; color: #888;}

.cart_wrap{position: fixed;top:32upx; right: 24upx; border-radius: 50%;z-index: 100; width:100upx;height:100upx; box-shadow: 0 1rpx 3rpx rgba(0,0,0,.2);
	background: rgba(255,255,255,0.5); display: flex;flex-direction: row;align-items: center;justify-content: center;}
.cart_wrap img{width: 42upx; height: 42upx;}

.bottom_wrap{position: fixed;bottom: 0upx;left: 0upx; z-index: 100;height: 110upx;width: 100%;box-sizing: border-box; display: flex;flex-direction: row;border-top: 1upx solid #F3F3F3; background: #FFF;}
.bottom_left{width: 110upx; height: 110upx; color: #888; font-size: 22upx;}
.bottom_left img{width: 38upx;}

.bottom_right{color: #fff; font-size: 34upx; height: 110upx;}
.add_card{background: #F39800; height: 100%;}
.buy_btn{background: #FF4544; height: 100%;}

.actionWrap{display: flex;flex-direction: row;justify-content: space-around;align-items: center;padding: 10upx 0upx;min-width: 200upx;}
.actionClass{background: #ffffff;display: inline-block;height: 40upx;line-height: 40upx;text-align: center;width: 60upx;color: #000000;border: 1upx solid #dddddd;}
.item_num{display: inline-block;color: #000;width: 60upx;text-align: center;font-size: 24upx;}
.un_active{background: #f3f3f3;}

.modal-dialog {
  width: 100%;
  height: 300upx;
  overflow: hidden;
  position: fixed;
  bottom: 110upx;
  left: 0;
  z-index: 100;
  background: #ffffff;
  padding: 20upx;
  box-sizing: border-box;
}

.modal-dialog .goods_img{width: 160upx; height: 160upx; position: fixed; bottom: 280upx; z-index: 101000;border: 1upx solid #E3E3E3; padding: 5upx;background: #FFF;box-shadow:0px 6upx 54upx 0px rgba(221,221,221,0.41);}
.modal-dialog .close{width: 30upx; height: 30upx; padding: 10upx;}
.modal-dialog .item_wrap{margin-bottom: 60upx; border-bottom: 1upx solid #E3E3E3;min-height: 120upx;}
.price_wrap{display: flex;flex-direction: column;padding-left: 200upx; font-size: 28upx; color:#666666; }
.price_wrap .price{color: #FF4544; font-size: 32upx;}
</style>
