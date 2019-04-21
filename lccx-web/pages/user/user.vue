<template>
    <view class="content">
		<div class="title_wrap uni-between-item">
			<span>填写信息</span>
			<span class="info" @tap="lookEx">在哪儿查看?</span>
		</div>
		
		<div class="uni-inline-item">
			<span>车架号</span>
			<input type="text"  class="item_input" v-model="frameNo" @blur="watchInput"
          placeholder-class="place-holder" placeholder="请输入车架号" @focus="focusInput">
			<img src="../../static/img/delete_icon.png" class="close" v-if="frameClose" @click="closeFrame">
		</div>
		
		<div class="uni-inline-item">
			<span>发动机号</span>
			<input type="text"  class="item_input" v-model="engineNo" @blur="watchEngineInput"
          placeholder-class="place-holder" placeholder="请输入发动机号" @focus="focusEngineInput">
		  <img src="../../static/img/delete_icon.png" class="close" v-if="engineClose" @click="closeEngine">
		</div>
		
		<div class="uni-inline-item">
			<span>初登日期</span>
			<picker mode="date" @change="dateChange" :value="firstRegisterDate">
				<div class="item_input" :class="{'unActive': (firstRegisterDate == '请选择具体日期')}">
				  {{firstRegisterDate}}
				</div>
			  </picker>
		</div>
		
		<div class="uni-inline-item">
			<span>品牌型号</span>
			<input type="text"  class="item_input" v-model="brandCode" @blur="watchBrandInput"
          placeholder-class="place-holder" placeholder="请输入品牌型号">
		</div>
		
		<div class="uni-inline-item">
			<span>车主姓名</span>
			<input type="text" v-model="name" placeholder="请输入车主姓名" @blur="fixIos"
				placeholder-class="place-holder" class="item_input">
		</div>
		
		<div class="uni-inline-item">
			<span>身份证号</span>
			<input type="text" v-model="idcard" placeholder="请输入证件号码" @blur="watchCardInput"
				placeholder-class="place-holder" class="item_input">
		</div>
		
		<div class="uni-inline-item">
			<span>手机号码</span>
			<input type="number" v-model="mobile" placeholder="请输入手机号码" @blur="fixIos"
				placeholder-class="place-holder" class="item_input">
		</div>
		
		<view class="uni-center-item">
			<view class="take_photo_wrap uni-center-item" @tap="showModal">
				<img src="../../static/img/take_photo.png" alt="">
				<span>识别行驶证，自动填信息</span>
			</view>
		</view>
		
		
		
        <view class="btn_wrap" :class="{'hideBtnClass': hideBtn}">
            <button  type="primary" class="primary" hover-class="button-hover"
			@tap="basic">下一步</button>
            
        </view>
		
		
		<div class="modal-mask" v-if="isShowModal"></div>
		<div class="modal-dialog" v-if="isShowModal">
			<div class="modal-title">行驶证识别</div>
			<img :src="file_url" class="info_img">
			<div class="info" v-if="isShowBtn">请将手机横向拍摄，保证照片清晰无反光</div>
			<button type="primary" class="take_photo_btn" @click="showBottomPopup" v-if="isShowBtn">拍摄或选择照片</button>
		</div>
		<img src="../../static/img/close.png" class="close_icon" v-if="isShowModal"
				:class="{'close_show_icon':!isShowBtn}" @tap="closeModal">
		
		
		
    </view>
</template>

<script>
	import { BASE_IMAGE_URL,basic,getVechileData } from "@/utils/api";
	import {isChinese,getDay} from '../../utils'
	import {check_card} from '../../utils/check_code';
	
// 	mobile: '13800138000', 13671700400
// 				  item: '',
// 				  name: '冯瑛',  曹占栋
// 				  idcard: '612426197408240028',  612701197612173415

    export default {
		data(){
			return {
				license_no: '',
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
				  firstRegisterDate: '请选择具体日期',
				  brandCode: '',
				  responseNo: '',
				  id: 9,
				  frameClose: false,
					engineClose:false,
				  globalData: {
					name:'',
					mobile:'',
					idcard:'',
					brand:'',
					firstRegisterDate:'请选择具体日期',
					engineNo:'',
					frameNo:'',
					responseNo:'',
					license_no:''
				  },
				  closeFrameChange: false,
					closeEngineChange: false,
					clientHeight:document.documentElement.clientHeight,
					hideBtn: false,
					timer: {}
			}
		},
		onLoad () {
			Object.assign(this.$data, this.$options.data());
			  this.license_no = this.$root.$mp.query.license_no?this.$root.$mp.query.license_no:'陕G61B86';
			  this.id = this.$root.$mp.query.id?this.$root.$mp.query.id:'94';
			  this.getVechileData();
			  this.isShowBtn = true;
			  console.log('this.globalData.billInfo');
			  console.log(this.globalData);
				
				window.onresize= ()=>{
					if(this.clientHeight>document.documentElement.clientHeight+50) {
						   this.hideBtn = true;
					}else{                
							 this.hideBtn = false;          
					}        
				}


		  },
        methods: {
			scrollV: function(obj){
				this.timer = setInterval(() => {
					obj.scrollIntoView(false);
				})
			},
			
			clearScrollView: function(){
				clearInterval(this.timer);
			},
			
			fixIos: function(){
				setTimeout(function() {                
					var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
					window.scrollTo(0, Math.max(scrollHeight - 1, 0));            
				}, 100);
			},
			
			closeFrame: function(){
			  this.closeFrameChange = true;
			  this.frameClose = false;
			  
			},
			closeEngine: function(){
			  this.closeEngineChange = true;
			  this.closeEngine = false;
			},
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
			focusInput(e){
			  this.frameNo = this.trueFrameNo;
			  if(this.frameNo){
				this.frameClose = true;
			  }else{
				this.frameClose = false;
			  }
			  
			},
			watchCardInput(e){
				this.fixIos();
			  let value = e.mp.detail.value; 
			  this.idcard= value.toLocaleUpperCase();
				if(check_card(value) === false){  
					wx.showToast({
					  icon: 'none',
					  title: '请输入正确的身份证',
					  duration: 1000
					});
					return; 
				}
			},
			watchBrandInput(e){
				this.fixIos();
			  let value = e.mp.detail.value;
			  this.brandCode= value.toLocaleUpperCase();
			},
			focusEngineInput(e){
			  this.engineNo = this.trueEngineNo;
			  if(this.engineNo){
				this.engineClose = true;
			  }else{
				this.engineClose = false;
			  }
			  
			},
			watchInput(e){
				this.fixIos();
			  setTimeout(() => {
				console.log(e.mp.detail.value);
				let value = e.mp.detail.value;
				if(this.closeFrameChange){
				  this.closeFrameChange = false;
				  this.trueFrameNo = "";
				  this.frameNo = "";
				  return;
				}
				this.trueFrameNo= value.toLocaleUpperCase();
				this.frameClose = false;
				if(value.length != 17){
				  wx.showToast({
					  icon: 'none',
					  title: '请输入正确的车架号',
					  duration: 1000
					});
					return;
				}

				this.frameNo = this.trueFrameNo.substring(0,7)+"*****"+this.trueFrameNo.substring(12);
			  }, 100);
			  
			},
			watchEngineInput(e){
				this.fixIos();
			  console.log(e.mp.detail.value);
			  setTimeout(() => {
				if(this.closeEngineChange){
				  this.closeEngineChange = false;
				  this.trueEngineNo = "";
				  this.engineNo = "";
				  return;
				}
				let value = e.mp.detail.value;
				// value = this.trueEngineNo;
				this.trueEngineNo= value.toLocaleUpperCase();
				this.engineClose = false;
				let length = this.trueEngineNo.length;
				this.engineNo = this.trueEngineNo.substring(0,length-3)+"***";
			  }, 100);
			  
			},
	
			//展示底部 popup
			showBottomPopup: function() {
				var that = this
				wx.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					success: function (res) {
						console.log(res.tempFilePaths[0]);
						wx.showLoading({ title: "上传中..." });
						  wx.uploadFile({
							url:"https://api.kaikaibao.com.cn/3.1/ocr",
							filePath: res.tempFilePaths[0],
							name: "file",
							header: { 
							  
							  "Authorization": "Bearer "+uni.getStorageSync('token'),
							  "x-lccx-did":2 },
							formData: {"file":res.tempFilePaths[0]},
							success: function(data) {
							  console.log(JSON.parse(data.data));
							  that.isShowModal = false;
							  uni.hideLoading();
							  that.file_url = JSON.parse(data.data).data.url;
							  uni.showToast({
								icon: 'none',
								title: '上传成功',
								duration: 1000
							  });
							  let result = JSON.parse(data.data).data.words_result;
							  Object.keys(result).forEach(function(key){
								  if(key == "发动机号码"){
									  that.engineNo = result[key].words;
									  that.trueEngineNo = that.engineNo;
								  }else if(key == '注册日期'){
									  that.firstRegisterDate = result[key].words.substring(0, 4)+"-"
											+ result[key].words.substring(4, 6) +"-"
											+ result[key].words.substring(6, 8);
								  }else if(key == '品牌型号'){
									that.brandCode = result[key].words;
								  }else if(key == '车辆识别代号'){
									that.frameNo = result[key].words;
									that.trueFrameNo = that.frameNo;
								  }else if(key == '所有人'){
									that.name = result[key].words;
								  }else if(key == '号牌号码'){
									that.license_no = result[key].words;
								  }
							  });
							  
							},
							fail: function(){
								uni.showToast({
									icon: 'none',
									title: '上传失败',
									duration: 1000
								});
							}
						  });
		  
					},
				})
			},
			
			lookEx: function(){
				this.isShowModal = true;
				this.isShowBtn = false;
				this.file_url = BASE_IMAGE_URL+'take_photo_exg.png'
			},
			
            next() {
                uni.navigateTo({
                    url: '../carmodal/carmodal?brandCode='+this.brandCode,
                });
            },
			
			async getVechileData(){
			  let that = this;
			  let res = await getVechileData({license_no: that.license_no});
			  if(res.code == 200){
					if((res.data.state == "1") || (res.data.state == 1)){
							console.log(res.data);
							this.item = res.data.data;
							this.frameNo = this.item.frameNo;
							this.trueFrameNo = this.frameNo;
							this.frameNo = this.frameNo.substring(0,7)+"*****"+this.frameNo.substring(12);
							this.trueEngineNo = this.item.engineNo;
							this.engineNo = this.item.engineNo.substring(0,this.trueEngineNo.length-3)+"***";
							console.log('this.trueEngineNo---'+this.trueEngineNo);
							console.log('this.engineNo---'+this.engineNo);
							this.firstRegisterDate = this.item.firstRegisterDate;
							this.brandCode = this.item.brandCode?this.item.brandCode:'';
							this.responseNo = this.item.responseNo;
							if(!this.firstRegisterDate){
								this.firstRegisterDate = "请选择具体日期";
							}
					}else{
						this.firstRegisterDate = getDay(0);
					}
					
		
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
			  
			  let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
			  if(reg.test(this.idcard) === false){  
				  wx.showToast({
					icon: 'none',
					title: '请输入正确的身份证',
					duration: 1000
				  });
				  return; 
			  }

			  if (!this.frameNo || (this.frameNo.length != 17)){
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
		position: relative;
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
		margin: 48upx 0upx 180upx;
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
	
	.close_show_icon{
		width: 48upx;
		height: 48upx;
		position: fixed;
		bottom: 400upx;
		left: 50%;
		margin-left: -24upx;
		z-index: 1000;
	}
	
	.unActive{color: rgba(0,0,0,0.3);}
	.place-holder{font-size: 28upx;color: rgba(0,0,0,0.3);}
	
	.hideBtnClass{z-index: -2;}
</style>
