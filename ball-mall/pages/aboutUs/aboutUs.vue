<template>
    <view class="content">
		<div>联系我们：</div>
		<div>&nbsp;&nbsp;&nbsp;&nbsp; 热线电话：0755-89591089（周一~周五9：00-18：00）</div>
		<div>联系地址：</div>
		<div>&nbsp;&nbsp;&nbsp;&nbsp;深圳市坪山区兰金七路3号红色总部大楼</div>
		<div>邮政编码：518118</div>
		<div>投诉电话：13613018830（24小时服务）</div>
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
		padding: 40upx 0upx 0upx 40upx;
	}
</style>
