<template>
	
	<view class="contain">
		
		<img :src="detail.bg_img" mode="widthFix" class="center_img">
		
		<div class="content_wrap">
			<div class="title row">
				<img :src="detail.logo" alt="">
				<span>名称:{{detail.store_name}}</span>
			</div>
			<div class="info">介绍:{{detail.desc}}</div>
			<div class="row_between item">
				<div class="row address_wrap">
					<img src="../../static/img/shop_location.png" mode="aspectFill">
					<span>地址:{{detail.store_address}}</span>
				</div>
				
				<img src="../../static/img/call_phone_icon.png" mode="widthFix" @click="callPhone">
			</div>
		</div>
		
		<view class="index">  
			<view class="left">  
				<block v-for="(item, index) in detail.goodsInfo" :key="index" class="itemlist" >  
					<view class="card" v-if="index%2==0" @click="goToDetail(index)">  
						<image class="card-img" :src="item.goods_list_img" mode="widthFix"></image>  
						
						<div class="row_between item">
							<text class="card-title">{{item.name}}</text>
							<span class="price">${{item.price}}</span>
						</div>
					</view>  
				</block>  
			</view>  

			<view class="right">  
				<block v-for="(item, index) in detail.goodsInfo" :key="index" class="itemlist" >  
					<view class="card" v-if="index%2==1" @click="goToDetail(index)">  
						<image class="card-img" :src="item.goods_list_img" mode="widthFix"></image>  
						<div class="row_between item">
							<text class="card-title">{{item.name}}</text>
							<span class="price">${{item.price}}</span>
						</div> 
					</view>  
				</block>  
			</view>  
		</view>
	
		
	</view>
</template> 

<script>
	
	import { BASE_IMAGE_URL,store_detail} from '@/utils/api'
	
export default {
	data() {
		return {
			isAPP: false,
			buildingName:"请选择楼宇",
			itemList: [1,2,1],
			t_url: '',
			curIndex: 0,
			contentCurIndex: 0,
			statusBarHeight: 0,
			scrollWidth: 0,
			swipeHeight: 0,
			list: [],
			detail: {}
		};
	},
	onLoad(opt) {
		let that = this;
		uni.getSystemInfo({
		  success: function(res) {
			that.scrollWidth = res.windowWidth;
		  },
		});
		
		let storeID = opt.storeID;
		this.store_detail(storeID);
	},
	methods: {
		callPhone(){
			uni.makePhoneCall({
				phoneNumber:this.detail.store_phone,
				success: () => {
					console.log("成功拨打电话")
				}
			})
		},
		async store_detail(id){
			let res = await store_detail({storeID: id});
			if(res.status == 1){
				this.detail = res.data;
			}
		},
		goToDetail(index){
			uni.navigateTo({
				url: '/pages/mall_detail/mall_detail?goodsID='+this.detail.goodsInfo[index].id
			});
		},
		imageLoad: function(e){
		  let imgWidth = e.mp.detail.width;
		  let imgHeight = e.mp.detail.height;
		  this.swipeHeight = parseFloat(imgHeight*this.scrollWidth/imgWidth)+"px";
		},
		slideChange: function(e){
			this.curIndex = e.mp.detail.current;
		},
	}
};
</script>

<style lang="scss" scoped>
.contain{background-color: #ffffff;}

.content_wrap{padding: 30upx; color: #000000; font-size: 32upx;box-shadow:0px 8upx 24upx 0px rgba(126,125,125,0.14);
				margin: 30upx;}
.content_wrap .title{color: #333333; font-size: 32upx;}
.content_wrap .title img{width: 72upx; height: 72upx; border-radius: 50%; border: 2upx solid #CCCCCC; margin-right: 20upx;}
.content_wrap .info{padding-bottom: 20upx; color: #666666; font-size: 24upx; margin: 20upx 0upx; border-bottom: 2upx solid #E3E3E3;}
.content_wrap img{width: 40upx;}
.content_wrap .item{padding: 0upx; color: #666666; font-size: 24upx;}
.content_wrap .item .address_wrap img{width: 22upx; height: 28upx; margin-right: 20upx;}

.content {position: relative;}
.head_img{width: 100%;}
.center_img{width: 100%; box-sizing: border-box;}

.search_wrap{position: relative;border-radius: 36upx; background-color: rgba(244, 244, 244, 0.75); flex: 1;height: 72upx; margin: 0upx 20upx; padding-left: 20upx; color: #9B9B9B; font-size: 28upx;}
.search_wrap img{width: 28upx; height: 28upx; margin-right: 20upx;}

.nav_wrap{height: 114upx;background-color: #FFFFFF;}
.nav_item{flex: 1;color: #666666; font-size: 24upx;}
.nav_item img{width: 32upx; margin-bottom: 20upx;}

.left,.right{display: inline-block;  vertical-align: top;  width: 44%;}
.left{margin: 0upx 2% 20upx 4%}
.right{margin: 0upx 4% 20upx 2%}
.card-img{width: 100%;}
.card-title{font-size: 24upx; color: #333333; display: inline-block;}
.card{box-shadow:0px 8upx 24upx 0px rgba(126,125,125,0.14); width: 100%; margin: 20upx 0upx; border-radius: 16upx;}
.itemlist{ background-color: #fff;  margin: 1%;   margin-bottom: 20upx;  display: inline-block;  } 
.card .item{padding: 0upx 20upx;}
.card .item .price{color: #FF4544;}

.mall_wrap{background: #FFF; box-shadow:0px 4px 12px 0px rgba(126,125,125,0.14);height: 100upx; margin:20upx 30upx; padding: 0upx 40upx;}
.mall_wrap img{width: 30upx; height: 30upx; margin-right: 20upx;}
</style>
