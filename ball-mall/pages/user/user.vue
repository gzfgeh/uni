<template>
    <view class="content">
		<div class="item_wrap" @click="bindPhone">
            <div class="row_center left_wrap">
                <img :src="phone" >
                <span>手机绑定</span>
            </div>
            <img :src="right">
        </div>

        <hr>
		
		<!-- <div class="item_wrap" @click="register">
		    <div class="row_center left_wrap">
		        <img :src="share" >
		        <span>资质审核</span>
		    </div>
		    <img :src="right">
		</div>
		
		<hr>

        <div class="item_wrap" >
            <div class="row_center left_wrap">
                <img :src="share" >
                <span>分享</span>
            </div>
            <img :src="right">
        </div>
		
		<hr> -->

        <!-- <div class="item_wrap" @click="apply">
            <div class="row_center left_wrap" >
                <img :src="release_ball" >
                <span>商品上架</span>
            </div>
            <img :src="right">
        </div>

        <hr> -->

        <div class="item_wrap" @click="watchOrder">
            <div class="row_center left_wrap">
                <img :src="release_ball" >
                <span>查看订单</span>
            </div>
            <img :src="right">
        </div>

        <hr>

        <div class="item_wrap" @click="aboutUs">
            <div class="row_center left_wrap">
                <img :src="about" >
                <span>关于我们</span>
            </div>
            <img :src="right">
        </div>

        <hr>

        <div class="item_wrap" @click="contactUs">
            <div class="row_center left_wrap">
                <img :src="contact" >
                <span>联系我们</span>
            </div>
            <img :src="right">
        </div>

        <hr>
		
		
		<!-- <div class="modal-mask" v-if="isShowModal"></div>
		<div class="modal-dialog" v-if="isShowModal">
			<div class="modal-title">行驶证识别</div>
			<img :src="file_url" class="info_img">
			<div class="info" v-if="isShowBtn">请将手机横向拍摄，保证照片清晰无反光</div>
			<button type="primary" class="take_photo_btn" @click="showBottomPopup" v-if="isShowBtn">拍摄或选择照片</button>
		</div>
		<img src="../../static/img/close.png" class="close_icon" v-if="isShowModal"
				:class="{'close_show_icon':!isShowBtn}" @tap="closeModal"> -->
		
		
		
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
	.item_wrap{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 120upx;
        margin: 0upx 40upx;
		box-sizing: border-box;
    }

    .item_wrap img{
        width: 80upx;
        height: 80upx;
    }
	
	hr{
        width: 85%; 
        margin-left: 15%; 
        border-bottom: 0.5px solid #b1b2b3;
        opacity: 0.2;
    }
	
	.modal-mask {
	  width: 100%;
	  height: 100%;
	  position: fixed;
	  top: 0;
	  left: 0;
	  background: #000;
	  opacity: 0.5;
	  overflow: hidden;
	  z-index: 1;
	  color: #fff;
	}

	.modal-dialog {
	  width: 90%;
	  overflow: hidden;
	  position: fixed;
	  top: 15%;
	  left: 0;
	  z-index: 2;
	  background: #ffffff;
	  margin: 5%;
	  border-radius: 12upx;
	}

	.modal-title {
	  padding-top: 30upx;
	  font-size: 36upx;
	  color: #030303;
	  text-align: center;
	}
	
	.modal-dialog .info_img{
		height: 462upx;
		width: 100%;
		padding: 0upx 10upx;
		box-sizing: border-box;
	}
	
	.modal-dialog .info{
		font-size: 28upx;
		color: rgba(0,0,0, 0.4);
		text-align: center;
		margin-bottom: 26upx;
	}
	
		
	.close_icon{
		width: 48upx;
		height: 48upx;
		position: fixed;
		bottom: 200upx;
		left: 50%;
		margin-left: -24upx;
		z-index: 1000;
	}
	
	.take_photo_btn{
		margin: 0upx 30upx 24upx;
		box-sizing: border-box;
		height: 100upx;
		line-height: 100upx;
		font-size: 32upx;
		background-color: #427DFF;
	}
	
	.input-placeholder{
		color: rgba(0,0,0,0.3);
		font-size: 28upx;
	}
	
	.close_show_icon{
		width: 48upx;
		height: 48upx;
		position: fixed;
		bottom: 400upx;
		left: 50%;
		margin-left: -24upx;
		z-index: 1000;
	}

</style>
