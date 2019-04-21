<template>
    <view class="content">
		<div>平台简介：</div>
		<div>【绣球抛抛抛】专业实体店服务平台，是深圳一情科技旗下一个带有中国民族文化元素的新平台，专业为线下实体店服务。平台将帮助线下实体店提高运营效率和提升店铺业绩。我们提出的口号是“成就实体店，方便消费者。”</div>
		
		<div>我们的产品功能简单易操作，在手机上就可以随时随地发布新店开业、促销活动和品牌宣传广告。同时【抛抛商城】食材配送中心将以当地市场批发价格直接配送食材到门店，让餐饮店再也不用每天起早贪黑去菜市场买菜了。</div>
		
    </view>
</template>

<script>
	import { BASE_IMAGE_URL } from "@/utils/api";
	

    export default {
		data(){
			return {
				money: BASE_IMAGE_URL+'money.png',
				contact: BASE_IMAGE_URL+'contact.png',
				right: BASE_IMAGE_URL+'right.png',
				phone: BASE_IMAGE_URL+'phone.png',
				share: BASE_IMAGE_URL+'share.png',
				about: BASE_IMAGE_URL+'about.png',
				release_ball: BASE_IMAGE_URL+'release_ball.png',
				baozhengjin: 0,
				openid: '',
				showModal: false,
				phoneNum: ''
			}
		},
		onShow: function(){
			this.phoneNum = uni.getStorageSync("bindPhone");
		},
        methods: {
			bindPhone: function(){
				uni.navigateTo({
					url: '../bind_phone/bind_phone'
				})
			},
			register: function(){
				uni.navigateTo({
					url: '../reg/reg'
				})
			},
			watchOrder: function(){
// 				uni.navigateTo({
// 					url: '../order_list/order_list'
// 				})
// 				return;
				if(this.phoneNum){
					uni.navigateTo({
						url: '../order_list/order_list'
					})
				}else{
					uni.navigateTo({
						url: '../bind_phone/bind_phone'
					})
				}
				
			},
			contactUs: function(){
				uni.openDocument({
				    filePath: BASE_IMAGE_URL+'ball_mall_us.doc',
				    fileType:'doc',
				    success: function (res) {
				        console.log(res);
				        console.log('打开文档成功'+res)
				    }
				})
			},
			aboutUs: function(){
				uni.openDocument({
				    filePath: BASE_IMAGE_URL+'ball_mall_jieshao.doc',
				    fileType:'doc',
				    success: function (res) {
				        console.log(res);
				        console.log('打开文档成功'+res)
				    }
				})
			},
			
        }
    }
</script>

<style>
	.content{
		width: 100%;
		height: 100%;
		padding: 40upx;
	}
</style>
