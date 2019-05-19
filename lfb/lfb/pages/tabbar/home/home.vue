<template>
	<view class="content">
		<swiper :indicator-dots="false" :autoplay="true" @change="slideChange"
					:interval="5000" :duration="1000" class="head_img">            
				<swiper-item v-for="(item, index) in itemList" :key="index" class="head_img">  
					<image :src="item.t_url" mode="widthFix" class="head_img"  />           
				</swiper-item>        
		</swiper>
		
		<view class="dots">
			<block v-for="(item, index) in itemList" :key="index">
				<view class="dot_normal" :class="{'active': (index==curIndex)}"></view>
			</block>
		</view>
	</view>
</template>

<script>
	
	import { BASE_IMAGE_URL,getImgList } from '@/utils/api'
	
export default {
	data() {
		return {
			itemList: [],
			t_url: '',
			curIndex: 0
		};
	},
	onLoad() {
		this.getImgList();
	},
	methods: {
		slideChange: function(e){
			this.curIndex = e.mp.detail.current;
		},
		async getImgList(){
				let res = await getImgList();
				if(res.code == 1000){
					console.log(res.data);
					this.itemList = res.data;
					
					this.itemList.map((item) => {
						if(item.t_url.indexOf("http:") != -1){
							item.t_url = "https" + item.t_url.substring(4, item.t_url.length);
						}
					})
				}
			},
	}
};
</script>

<style>
.content {
	padding-top: 60upx;
	height: 400upx;
	position: relative;
}

.head_img{
	width: 100%;
	height: 400upx!important;
}

.dots{
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	position: absolute;
	bottom: 20upx;
	height: 20upx;
	width: 100%;
	z-index: 100;
}

.dot_normal{
	width: 10upx;
	height: 10upx;
	border-radius: 50%;
	background-color: #E0E5ED;
	margin: 0upx 6upx;
	position: relative;
	z-index: 100;
}

.active{
	width: 24upx;
	height: 10upx;
	border-radius: 40%;
	background-color: #107EFF;
	z-index: 100;
}
</style>
