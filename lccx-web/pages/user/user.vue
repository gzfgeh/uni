<template>
    <view class="content">
		<div class="title_wrap uni-between-item">
			<span>填写信息</span>
			<span class="info">在哪儿查看?</span>
		</div>
		
		<div class="uni-inline-item">
			<span>车架号</span>
			<span >{{car_num}}</span>
		</div>
		
		<div class="uni-inline-item">
			<span>发动机号</span>
			<span >{{car_num}}</span>
		</div>
		
		<div class="uni-inline-item">
			<span>初登日期</span>
			<span >{{car_num}}</span>
		</div>
		
		<div class="uni-inline-item">
			<span>品牌型号</span>
			<span >{{car_num}}</span>
		</div>
		
		<div class="uni-inline-item">
			<span>车主姓名</span>
			<input type="text" v-model="name" placeholder="请输入车主姓名"
				placeholder-class="input-placeholder">
		</div>
		
		<div class="uni-inline-item">
			<span>身份证号</span>
			<input type="text" v-model="card_num" placeholder="请输入证件号码"
				placeholder-class="input-placeholder">
		</div>
		
		<div class="uni-inline-item">
			<span>手机号码</span>
			<input type="tel" v-model="phone" placeholder="请输入手机号码"
				placeholder-class="input-placeholder">
		</div>
		
		<div class="take_photo_wrap uni-center-item" @tap="showModal">
			<img src="../../static/img/take_photo.png" alt="">
			<span>识别行驶证，自动填信息</span>
		</div>
		
		
        <view class="btn_wrap">
            <button  type="primary" class="primary" hover-class="button-hover"
			@tap="bindLogin">下一步</button>
            
        </view>
		
		
		<div class="modal-mask" v-if="isShowModal"></div>
		<div class="modal-dialog" v-if="isShowModal">
			<div class="modal-title">行驶证识别</div>
			<img :src="imageSrc" class="info_img">
			<div class="info">请将手机横向拍摄，保证照片清晰无反光</div>
			<button type="primary" class="take_photo_btn" @click="showBottomPopup">拍摄或选择照片</button>
		</div>
		<img src="../../static/img/close.png" class="close_icon" @tap="closeModal">
		
		
		
    </view>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from 'vuex'

    export default {
		data(){
			return {
				car_num: "LFVGAYH*****123817",
				isShowModal: false,
				name: '',
				card_num: '',
				phone: '',
				popType: 'middle',
				title: 'popup',
				showPopupBottom: false,
				msg: '',
				imageSrc: '../../static/img/take_photo_ex.png'
			}
		},
        computed: {
            ...mapState(['hasLogin', 'forcedLogin'])
        },
        methods: {
            ...mapMutations(['logout']),
			showModal(){
				this.isShowModal = true;
			},
			closeModal(){
				this.isShowModal = false;
			},
			//展示底部 popup
			showBottomPopup: function() {
				var _this = this
				uni.chooseImage({
					success: function (res) {
						_this.imageSrc = res.tempFilePaths[0];
					},
				})
			},
			
            bindLogin() {
                uni.navigateTo({
                    url: '../login/login',
                });
            },
            bindLogout() {
                this.logout();
                /**
                 * 如果需要强制登录跳转回登录页面
                 */
                if (this.forcedLogin) {
                    uni.reLaunch({
                        url: '../login/login',
                    });
                }
            }
        }
    }
</script>

<style>
	.content{
		background-color: #F9F9F9;
	}
	
	.title_wrap{
		padding: 18upx 32upx 14upx;
		color: #989898;
		font-size: 26upx;
		border-top: 2upx solid rgba(0,0,0,0.1);
		border-bottom: 2upx solid rgba(0,0,0,0.1);
	}
	
	.title_wrap .info{
		color: #427DFF;
	}
	
	.uni-inline-item{
		color: rgba(0,0,0,0.4);
		font-size: 28upx;
		background-color: #FFFFFF;
		padding: 26upx 0upx 26upx 32upx;
		border-bottom: 2upx solid rgba(0,0,0,0.1);
	}
	
	.uni-inline-item span:nth-child(1){
		width: 140upx;
	}
	
	.uni-inline-item span:nth-child(2),
	input{
		color: rgba(0,0,0, 0.7);
		font-size: 28upx;
	}
	
	.take_photo_wrap{
		margin: 48upx 144upx;
		background-color: rgba(66, 225, 255, 0.1);
		border-radius: 48upx;
		padding: 28upx 48upx;
		color: #427DFF;
	}
	
	.take_photo_wrap img{
		width: 48upx;
		height: 36upx;
		margin-right: 10upx;
	}
	
	.btn_wrap{
		position: fixed;
		bottom: 0upx;
		width: 100%;
		height: 160upx;
		background-color: #FFFFFF;
		padding: 30upx 40upx;
		box-sizing: border-box;
	}
	
	.primary{
		background-color: #427DFF;
		color: #FFFFFF;
		border-radius: 10upx;
		font-size: 32upx;
		height: 100upx;
		line-height: 100upx;
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

</style>
