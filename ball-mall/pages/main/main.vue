<template>
    <div class="app">
        <img src="../../static/img/home_top.png" mode="widthFix" class="head_img">

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
	import { BASE_IMAGE_URL } from '@/utils/api'
	
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
			}
		},
		onLoad: function() {
			
		},
		methods: {
			goDetail() {
				uni.navigateTo({
					url: '../mall_list/mall_list'
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
	color: #000000;
	font-size: 40upx;
	margin-top: 20upx;
	img{
		width: 200upx;
		height: 200upx;
		margin-top: 10upx;
	}
}
	
</style>
