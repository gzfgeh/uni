<template>
    <div class="app">
        
		
		<swiper :indicator-dots="true" :autoplay="true"
					:interval="5000" :duration="1000" :style="{'height': scrollHeight+'px'}">            
				<swiper-item v-for="(item, index) in itemList" :key="index" :style="{'height': scrollHeight+'px'}">  
					<image :src="item.t_url" mode="widthFix" class="head_img" @load="imageLoad" />           
				</swiper-item>        
		</swiper>


        <div class="row_around content_wrap">
			<view class="col_center item_wrap" hover-class="uni-list-cell-hover" @tap="goDetail(0)">
				<img src="../../static/img/shu_cai.png" >
				<span>新鲜蔬菜</span>
			</view>
			
			<view class="col_center item_wrap" hover-class="uni-list-cell-hover" @tap="goDetail(1)">
				<img src="../../static/img/rou.png" >
				<span>肉禽产品</span>
			</view>
			
			<view class="col_center item_wrap" hover-class="uni-list-cell-hover" @tap="goDetail(2)">
				<img src="../../static/img/liang_you.png" >
				<span>米面粮油</span>
			</view>
			
			<view class="col_center item_wrap" hover-class="uni-list-cell-hover" @tap="goDetail(3)">
				<img src="../../static/img/hai_xian.png" >
				<span>海鲜水产</span>
			</view>
			
			<view class="col_center item_wrap" hover-class="uni-list-cell-hover" @tap="goDetail(4)">
				<img src="../../static/img/dan_dou.png" >
				<span>蛋品豆类</span>
			</view>
			
			<view class="col_center item_wrap" hover-class="uni-list-cell-hover" @tap="goDetail(5)">
				<img src="../../static/img/tiao_liao.png" >
				<span>调料干货</span>
			</view>

        </div>

    </div>
</template>

<script>
	import { BASE_IMAGE_URL,getImgList } from '@/utils/api'
	
	export default {
		
		data() {
			return {
				home_pic: '../../static/img/home_top.png',
				money_btn: BASE_IMAGE_URL+'money_btn.png',
				hongniang_btn: BASE_IMAGE_URL+'pipaiting.png',
				jiaoyou_btn: BASE_IMAGE_URL+'jiaoyou_btn.png',
				youxi_btn: BASE_IMAGE_URL+'youxi_btn.png',
				shipin_btn: BASE_IMAGE_URL+'zhishixiuqiu.png',
				toutiao_btn: BASE_IMAGE_URL+'toutiao_btn.png',
				itemList: [],
				scrollHeight: 0
			}
		},
		onLoad: function() {
			
			this.getImgList();
		},
		methods: {
			imageLoad: function(e){
				let imgWidth = e.mp.detail.width;
				let imgHeight = e.mp.detail.height;
				let winWidth = uni.getSystemInfoSync().screenWidth;
				let scale = winWidth / imgWidth;
				this.scrollHeight = imgHeight * scale;
				console.log(this.scrollHeight)
			},
			async getImgList(){
				let res = await getImgList();
				if(res.code == 1000){
					console.log(res.data);
					this.itemList = res.data;
				}
			},
			goDetail(index) {
				uni.navigateTo({
					url: '../mall_list/mall_list?id='+index
				})
			},
			close(index1, index2) {
				uni.showModal({
					content: '是否删除本条信息？',
					success: (res) => {
						if (res.confirm) {
							this.listData[index1].data.splice(index2, 1);
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.app{
	background-color: #FFFFFF;
}

.content_wrap{
	flex-flow: wrap;
}

.head_img{
	width: 100%;
}

.item_wrap{
	color: #35B583;
	font-size: 40upx;
	margin-top: 20upx;
	img{
		width: 120upx;
		height: 120upx;
		margin-top: 10upx;
		padding: 0upx 40upx;
	}
}

swiper{
	width: 100%;
}
swiper-item{
	width: 100%;
}


	
</style>
