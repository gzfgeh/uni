<template>
    <view class="content" :style="'height:'+(winHeight-168) + 'px'">
		
		<div>
			<div class="title_wrap uni-between-item">
			</div>
			
			
			<div class="uni-inline-item">
				<span>品类</span>
				<span>广西甜橘</span>
			</div>
			
			<div class="uni-inline-item">
				<span>特色</span>
				<span>饱满果肉 甜蜜多汁</span>
			</div>
			
			<div class="uni-inline-item">
				<span>优惠</span>
				<span>限量抢购</span>
			</div>
			
			<div class="uni-inline-item">
				<span>地区</span>
				<span>深圳市平岗区</span>
			</div>
			
			<div class="uni-inline-item">
				<span>单位</span>
				<span>1.5Kg/个</span>
			</div>
			
			<div class="uni-inline-item">
				<span>价格</span>
				<input type="text">
			</div>
		</div>
		
		
		
		
        <view class="btn_wrap">
            <button  type="primary" class="primary" hover-class="button-hover"
			@tap="next">发布</button>
            
        </view>
		
		
		
		
		
    </view>
</template>

<script>
	import { BASE_IMAGE_URL,basic,getVechileData } from "@/utils/api";
	

    export default {
		data(){
			return {
				license_no: '陕AL800U',
				  mobile: '',
				  item: '',
				  name: '',
				  idcard: '',
				  isShowModal: false,
				  file_url: BASE_IMAGE_URL+'take_photo_ex.png',
				  take_photo: BASE_IMAGE_URL+'take_photo.png',
				  close: BASE_IMAGE_URL+'close.png',
				  isShowBtn: true,
				  frameNo:'',
				  trueFrameNo: '',
				  trueEngineNo: '',
				  engineNo: '',
				  firstRegisterDate: '',
				  brandCode: '',
				  responseNo: '',
				  id: 9,
				  winHeight: 0,
				  globalData: {
					name:'',
					mobile:'',
					idcard:'',
					brand:'',
					firstRegisterDate:'',
					engineNo:'',
					frameNo:'',
					responseNo:'',
					license_no:''
				  }
			}
		},
		onLoad () {
			this.winHeight= uni.getSystemInfoSync().screenHeight;
		},
        methods: {
			dateChange: function(e){
			  console.log(e.mp.detail.value);
			  this.firstRegisterDate = e.mp.detail.value;
			},
			showModal(){
				this.isShowModal = true;
				this.isShowBtn = true;
				this.file_url = BASE_IMAGE_URL+'take_photo_ex.png';
			},
			closeModal(){
				this.isShowModal = false;
			},
			watchInput(e){
			  console.log(e.mp.detail.value);
			  let value = e.mp.detail.value;
			  this.trueFrameNo= value.toLocaleUpperCase();
			  this.frameNo = this.trueFrameNo;
			},
			watchEngineInput(e){
			  console.log(e.mp.detail.value);
			  let value = e.mp.detail.value;
			  this.trueEngineNo= value.toLocaleUpperCase();
			  this.engineNo = this.trueEngineNo;
			},
			
			lookEx: function(){
				this.isShowModal = true;
				this.isShowBtn = false;
				this.file_url = BASE_IMAGE_URL+'take_photo_exg.png'
			},
			
            next() {
//                 uni.navigateTo({
//                     url: '../carmodal/carmodal',
//                 });
            },
			
			async getVechileData(){
			  let that = this;
			  let res = await getVechileData({license_no: that.license_no});
			  if(res.code == 200){
				console.log(res.data);
				this.item = res.data.data;
				this.frameNo = this.item.frameNo;
				this.trueFrameNo = this.frameNo;
				this.frameNo = this.frameNo.substring(0,7)+"*****"+this.frameNo.substring(12);
				this.trueEngineNo = this.item.engineNo;
				this.engineNo = this.item.engineNo.substring(0,2)+"****"+this.item.engineNo.substring(6,8);
				this.firstRegisterDate = this.item.firstRegisterDate;
				this.brandCode = this.item.brandCode;
				this.responseNo = this.item.responseNo;
			  }
			},
	
			
			async basic(){
			  if (this.mobile == null || this.mobile.length != 11){
				uni.showToast({
				  icon: 'none',
				  title: '手机号输入错误',
				  duration: 1000
				});
				return;
			  }

			  if (!this.name){
				uni.showToast({
				  icon: 'none',
				  title: '请输入姓名',
				  duration: 1000
				});
				return;
			  }

			  if (!this.idcard){
				uni.showToast({
				  icon: 'none',
				  title: '请输入身份证号',
				  duration: 1000
				});
				return;
			  }

			  if (!this.frameNo && (this.frameNo.length == 17)){
				uni.showToast({
				  icon: 'none',
				  title: '请输入正确的车架号',
				  duration: 1000
				});
				return;
			  }

			  this.trueEngineNo = this.trueEngineNo.toLocaleUpperCase();
			  this.trueFrameNo = this.trueFrameNo.toLocaleUpperCase();

			  let params = {
				"name": this.name,
				"mobile": this.mobile,
				"idcard": this.idcard,
				"brand": this.brandCode,
				"first_reg_date": this.firstRegisterDate,
				"engine_no": this.trueEngineNo,
				"vin": this.trueFrameNo
			  };

			  let res = await basic(this.id, params);
			  if(res.code == 200){
				uni.showToast({
				  icon: 'none',
				  title: '提交成功',
				  duration: 1000
				});

				console.log(this.globalData);
				this.globalData = uni.getStorageSync("global");
				this.globalData.name = this.name;
				this.globalData.mobile = this.mobile;
				this.globalData.idcard = this.idcard;
				this.globalData.brand = this.brandCode;
				this.globalData.firstRegisterDate = this.firstRegisterDate;
				this.globalData.engineNo = this.trueEngineNo;
				this.globalData.frameNo = this.trueFrameNo;
				this.globalData.responseNo = this.responseNo;
				this.globalData.license_no = this.license_no;
				uni.setStorageSync("global", this.globalData);

				this.next();
			  }
			},
	
        }
    }
</script>

<style>
	.content{
		background-color: #F9F9F9;
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: space-between;
		box-sizing: border-box;
	}
	
	.title_wrap{
		border-bottom: 2upx solid rgba(0,0,0,0.1);
	}
	
	.title_wrap .info{
		color: #427DFF;
	}
	
	.item_input{
	  flex: 1;
	  text-align: left;
	  color: rgba(0,0,0,0.7);
	  font-size: 28rpx;
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
		width: 100%;
		height: 160upx;
		background-color: #FFFFFF;
		padding: 30upx 40upx;
		box-sizing: border-box;
	}
	
	.primary{
		background-color: #35B583;
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
