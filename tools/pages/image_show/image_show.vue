<template>
	<view>
		
		<view class="info">点击图片可以放大</view>
		
		<scroll-view 
		class="scroll_content" 
		:scroll-x="type == 0"
		:scroll-y="type == 1">
			<image :src="image" mode="aspectFit" @tap="preImage"
				:style="[{width: width}, {height: height}]"></image>
		</scroll-view>
		
		<button type="primary" @tap="saveImg">保存到相册</button>
		
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,uploadFile } from "@/utils/api";
	import DownloadSaveFile  from "@/utils/downloadSaveFile";
	
	export default {
		data() {
			return {
				image: '',
				type: '',
				width: 0,
				height: 0
			}
		},
		methods: {
			preImage(){
				
				uni.previewImage({
				    urls: [this.image],
					current:0
				});
			},
			saveImg(){
				DownloadSaveFile.downloadFile('image', this.image); //video或image
			},
			async uploadFile(){
				let that = this;
				uni.uploadFile({
					url: 'https://gzf.liangyicloud.xyz/Api/CommonApi/uploadFile',
					filePath: this.image,
					name: 'file',
					header: {"Content-Type":"multipart/form-data"},
					formData: {},
					success: function(data){
						if(JSON.parse(data.data).data){
							console.log(JSON.parse(data.data).data.url);
							that.image = JSON.parse(data.data).data.url;
							
						}
					  
					}
				})
			}
		},
		onLoad(opt) {
			this.image = opt.url;
			this.type = opt.type;
			console.log(this.image);
			this.uploadFile();
			
			let that = this;
			uni.getImageInfo({
				src: opt.url,
				success(data) {
					console.log(data);
					if(that.type == 0){
						that.height = '300px';
						that.width = parseFloat((300 * parseFloat(data.width)) / data.height) + 'px';
					}else{
						that.width = '300px';
						that.height = parseFloat((300 * parseFloat(data.height)) / data.width) + 'px';
					}
					console.log(that.width);
					console.log(that.height);
				}
			})
		}
	}
</script>

<style>
	page{background: #FFFFFF;}
	.scroll_content{width: 300px; margin-left: calc(50vw - 150px) ; margin-top: 100upx;
		height: 300px; box-shadow: 0px 0px 4px 4px #ccc;}
	.info{margin: 20upx auto; text-align: center; font-size: 34upx;}
	button{width: 80%; margin-left: 10%; margin-top: 40upx;}
</style>
