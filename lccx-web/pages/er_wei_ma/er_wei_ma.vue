<template>
    <view class="content">
		<!-- <img :src="src" mode="widthFix"> -->
		<view @longpress="saveQrcode">
			<tki-qrcode
			ref="qrcode"
			:val="val"
			:size="size"
			:unit="unit"
			:background="background"
			:foreground="foreground"
			:pdground="pdground"
			:icon="icon"
			:iconSize="iconsize"
			:lv="lv" 
			:onval="onval"
			:loadMake="loadMake"
			@result="qrR" />
		</view>
		
	
		<span>长按保存二维码转发至客户</span>
    </view>
</template>

<script>
	
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	
	import { BASE_IMAGE_URL,basic,getVechileData } from "@/utils/api";

    export default {
		data(){
			return {
				val: '二维码', // 要生成的二维码值
				size: 440, // 二维码大小
				unit: 'upx', // 单位
				background: '#FFFFFF', // 背景色
				foreground: '#000000', // 前景色
				pdground: '#000000', // 角标色
				icon: '', // 二维码图标
				iconsize: 40, // 二维码图标大小
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: true, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				src: '' // 二维码生成后的图片地址或base64
			}
		},
		components: {tkiQrcode},
		onLoad () {
			let quotation_id = this.$root.$mp.query.quotation_id;
			console.log(quotation_id);
			let partner_id = uni.getStorageSync("partner_id");
			let imei = uni.getStorageSync("imei");
			this.val = "http://m.kaikaibao.com.cn/lccx2/index.html#/pages/service_confirm/service_confirm?partner_id="+partner_id+"&imei="+imei+"&quotation_id="+quotation_id;
			// this.$refs.qrcode._makeCode();
		 },
        methods: {
			qrR(res) {
				this.src = res
			},
			base64ToBlob(code) {
				let parts = code.split(';base64,');
				let contentType = parts[0].split(':')[1];
				let raw = window.atob(parts[1]);
				let rawLength = raw.length;
		 
				let uInt8Array = new Uint8Array(rawLength);
		 
				for (let i = 0; i < rawLength; ++i) {
				  uInt8Array[i] = raw.charCodeAt(i);
				}
				return URL.createObjectURL(new Blob([uInt8Array], {type: contentType}));
			 },
			saveQrcode() {
				// this.$refs.qrcode._saveCode()
				let Url = this.base64ToBlob(this.src);
				console.log(Url);
				
				var a = document.createElement('a');
 
				a.href = Url;
			 
				a.download = Url.replace(/(.*\/)*([^.]+.*)/ig,"$2").split("?")[0];
			 
				var e = document.createEvent('MouseEvents');
			 
				e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			 
				a.dispatchEvent(e);
			 
				URL.revokeObjectURL(Url);
				return;
				
				
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
						  

				
				uni.saveImageToPhotosAlbum({
					filePath: url,
					success: (res) => {
						uni.showToast({
							title: '保存成功',
							icon: 'none',
							duration: 1000
						})
					
						// that.getImgListApi();
					},

					fail: () => {
						uni.showToast({
							title: '保存失败',
							icon: 'none',
							duration: 1000
						})
					}
				})
						
			},
	
        }
    }
</script>

<style>
	.content{
		background-color: #F9F9F9;
		color: rgba(0,0,0,0.6);
		font-size: 36upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;;
	}
	
	img{
		width: 444upx;
		height: 440upx;
		margin-bottom: 8upx;
	}
	
	
</style>
