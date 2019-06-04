<template>
	<view>
		
		<swiper :indicator-dots="true" :autoplay="true"
				:style="{'height': swipeHeight}" :interval="5000" :duration="1000" class="head_img">            
				<swiper-item v-for="(item, index) in itemList" :key="index" class="head_img" >  
					<image src="https://bay.2donghua.com/web/uploads/image/store_1/39db83b2af38b3b427aff184ef1d7dd422bf6a10.png" mode="widthFix" class="head_img" @load="imageLoad" />           
				</swiper-item>        
		</swiper> 
		
		<div class="goods_info">
			<div class="name">意大利比安易INOVIA COND 英诺华</div>
			<div class="row">
				<span class="price_unit">￥</span>
				<span class="price">300</span>
			</div>
			
			<div class="row">
				<span class="old_price">￥3</span>
				<span class="sell_num">销量:3件</span>
			</div>
		</div>
		
		<rich-text :nodes="htmlString"></rich-text> 
		
		<div class="cart_wrap" @click="goToShoppingCard">
			<img src="https://bay.2donghua.com/web/statics/wxapp/images/nav-icon-cart.png" mode="aspectFill">
		</div>
		
		<div class="bottom_wrap">
			<div class="bottom_left col_center" @click="goToHome">
				<img src="https://bay.2donghua.com/web/statics/wxapp/images/icon-store.png" mode="widthFix">
				<span>首页</span>
			</div>
			
			<div class="bottom_right row flex_one">
				<span class="flex_one add_card row_center">加入购物车</span>
				<span class="flex_one buy_btn row_center">立即购买</span>
			</div>
		</div>
			
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemList: [1,2,1,3,4,5],
				scrollWidth: 0,
				swipeHeight: 0,
				htmlString: ''
			}
		},
		methods: {
			imageLoad: function(e){
			  let imgWidth = e.mp.detail.width;
			  let imgHeight = e.mp.detail.height;
			  this.swipeHeight = parseFloat(imgHeight*this.scrollWidth/imgWidth)+"px";
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
			}
		},
		onLoad() {
			let that = this;
			uni.getSystemInfo({
			  success: function(res) {
				that.scrollWidth = res.windowWidth;
			  },
			});
		}
	}
</script>

<style>
.head_img{width: 100%;}
.goods_info{padding: 17upx 13upx; background: #fff; border-bottom: 20upx solid #EFEFF4;}
.goods_info .name{margin-bottom: 26upx; font-weight: bold; line-height: 1.7;}

.price{font-size: 30upx; color: #ff4544;;}
.price_unit{padding-top: 8upx; font-size: 24upx; color: #FF4544;}
.old_price{font-size: 24upx; color: #888; margin-right: 34upx;}
.sell_num{font-size: 24upx; color: #888;}

.cart_wrap{position: fixed;top:32upx; right: 24upx; border-radius: 50%;z-index: 100; width:100upx;height:100upx; box-shadow: 0 1rpx 3rpx rgba(0,0,0,.2);
	background: rgba(255,255,255,0.5); display: flex;flex-direction: row;align-items: center;justify-content: center;}
.cart_wrap img{width: 42upx; height: 42upx;}

.bottom_wrap{position: fixed;bottom: 0upx;left: 0upx; z-index: 100;height: 110upx;width: 100%;box-sizing: border-box; display: flex;flex-direction: row;border-top: 1upx solid #F3F3F3;}
.bottom_left{width: 110upx; height: 110upx; color: #888; font-size: 22upx;}
.bottom_left img{width: 38upx;}

.bottom_right{color: #fff; font-size: 34upx; height: 110upx;}
.add_card{background: #F39800; height: 100%;}
.buy_btn{background: #FF4544; height: 100%;}
</style>
