<template>
	<view>
		<view class="title_wrap">
			<view class="status-bar" :style="{'height': statusBarHeight+'px'}"></view>
			<view class="head_wrap row_between" :style="{'height': titleHeight+'px'}">
				<image :src="white_back_icon" mode="aspectFill" class="back_icon" @tap="backAction"></image>
				<image :src="moment_title" mode="aspectFill" style="width: 228upx; height:50upx;"></image>
				<image :src="white_back_icon" mode="aspectFill" class="back_icon" style="visibility: hidden;"></image>
			</view>
		</view>
		
		<view :style="{'height': tempHeight+'px'}"></view>
		
		<image :src="moment_bg" mode="aspectFill" 
		class="team_bg"></image>
		
		<view class="content_wrap">
			
			<view class="left">
				<block v-for="(item, index) in list" :key="index" class="itemlist" >  
					<view class="card"  v-if="index%2==0" @tap="ViewImage" :data-url="item.t_url" >  
						<image class="card-img" :src="item.t_url" mode="aspectFill"></image>  
						<view class="like_view row">
							<image class="like-img" :src="item.is_dianzan == 0 ? unlike_icon : like_icon" mode="aspectFill" @tap.stop="dianzanAndquxiao(item)"></image> 
							<text class="card-title">{{item.t_dianzanshu}}</text> 
						</view>
						 
					</view>  
				</block>  
			</view>  
					
			<view class="right">  
				<block v-for="(item, index) in list" :key="index" class="itemlist" >  
					<view class="card"  v-if="index%2==1"  @tap="ViewImage" :data-url="item.t_url"  >  
						<image class="card-img" :src="item.t_url" mode="aspectFill"></image>  
						<view class="like_view row">
							<image class="like-img" :src="item.is_dianzan == 0 ? unlike_icon : like_icon" mode="aspectFill" @tap.stop="dianzanAndquxiao(item)"></image> 
							<text class="card-title">{{item.t_dianzanshu}}</text> 
						</view>  
					</view>  
				</block>  
			</view>  
			
			<view class="uni-tab-bar-loading" v-if="list.length >= 6" style="color: #FFFFFF!important">
				<uni-load-more :loadingType="loadingType" :contentText="loadingText"  ></uni-load-more>
			</view>
			
		</view>
		
		
		<image :src="add_icon" mode="aspectFill" class="add_icon" @tap="imageAction"></image>
		<image :src="upload_icon" mode="aspectFill" class="upload_icon" @tap="goToTop"></image>
		
		<!--弹窗-->
		<view class="modal-mask" v-if="showModal" style="background: #000000!important;"></view>
		<view class="curClass" v-if="showModal" :style="{'top': (tempHeight-titleHeight/2-12)+'px'}" >{{curIndex}}/{{list.length}}</view>
		<swiper class="swiper"
				:indicator-dots="true" 
				indicator-color="#FFFFFF"
				indicator-active-color="rgb(39, 142, 80)"
				:autoplay="false"
				:current-item-id="item_id"
				@change="changeSwiper"
				v-if="showModal">
			<swiper-item v-for="(item , index) in list" :key="index" class="row_center" :item-id="'slide'+index" @click="hide">
				
				<image :src="item.t_url" mode="widthFix" class="swipe_image"></image>
				
				<view class="bottom_like_view row"  @tap.stop="dianzanAndquxiao(item)">
					<image class="like-img" :src="item.is_dianzan == 0 ? unlike_icon : like_icon" mode="aspectFill" ></image> 
					<text class="card-title">{{item.t_dianzanshu}}</text> 
				</view> 
				
			</swiper-item>
		</swiper>
		
		 
		
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,submitAllPhoto,dianzanAndquxiao,getPhoto } from "@/utils/api";
	import uniLoadMore from '@/components/uni-load-more.vue';
	
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				like_icon: BASE_IMAGE_URL+"like_icon.png",
				moment_bg: BASE_IMAGE_URL+"moment_bg.png",
				moment_title: BASE_IMAGE_URL+"moment_title.png",
				unlike_icon: BASE_IMAGE_URL+"unlike_icon.png",
				white_back_icon: BASE_IMAGE_URL+"white_back_icon.png",
				schedule_title: BASE_IMAGE_URL+"schedule_title.png",
				upload_icon: BASE_IMAGE_URL+"upload_icon.png",
				add_icon: BASE_IMAGE_URL+"add_icon.png",
				scrollTop: 0,
				old: {  
					scrollTop: 0 
				},
				loadingText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				list: [],
				loadingType: 0,
				page: 1,
				statusBarHeight: 0,
				titleHeight: 0,
				tempHeight: 0,
				imgList: [],
				showModal: false,
				item_id: 'slide0',
				curIndex: 0
			}
		},
		methods: {
			hide(){
				this.showModal = false;
			},
			changeSwiper(e){
				this.curIndex = e.detail.current+1;
				this.$forceUpdate();
			},
			ViewImage: function(e){
				console.log(e);
				// uni.previewImage({
				// 	urls: this.imgList,
				// 	current: e ? e.currentTarget.dataset.url: 0
				// });
				let curIndex = 0;
				if(e){
					this.list.map((item, index) => {
						if(item.t_url == e.currentTarget.dataset.url){
							curIndex = index;
						}
					});
				}else{
					curIndex = 0;
				}
				
				this.curIndex = curIndex+1;
				this.item_id = "slide"+curIndex;
				this.showModal = true;
			},
			backAction: function(){
				uni.navigateBack();
			},
			scroll: function(e){
				this.old.scrollTop = e.detail.scrollTop
			},
			goToTop: function(){
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			},
			async dianzanAndquxiao(item){
				let params = {
					d_m_id: uni.getStorageSync("userInfo").m_id,
					d_t_id: item.t_id,
					type: item.is_dianzan == 0 ? 1 : 0
				};
				let res = await dianzanAndquxiao(params);
				if(res.code == 1000){
					uni.showToast({
					  title: params.type == 0 ? '取消点赞':'点赞' + '成功',
					  icon: "none",
					  duration: 1000
					});
					item.is_dianzan = params.type;
					if(params.type == 1){
						item.t_dianzanshu++;
					}else{
						item.t_dianzanshu--;
					}
					this.$forceUpdate();
				}
			},
			imageAction: function(){
				let that = this;
				uni.showActionSheet({
				    itemList: ['相机', '相册', '浏览'],
				    success: function (res) {
				        console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						if(res.tapIndex == 0){
							that.chooseImage("camera");
						}else if(res.tapIndex == 1){
							that.chooseImage("album");
						}else{
							that.ViewImage()
						}
				    },
				    fail: function (res) {
				        console.log(res.errMsg);
				    }
				});
			},
			chooseImage: function(type){
				var that = this;
				let sourceType = [];
				sourceType.push(type);
				uni.chooseImage({
					count: 9, // 默认9  
					sizeType: ['original','compressed'], // 可以指定是原图还是压缩图，默认二者都有  
					sourceType: sourceType, // 可以指定来源是相册还是相机，默认二者都有  
					success: function (res) {
						// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
						console.log(res.tempFilePaths);
							let files = [];
							res.tempFilePaths.map((item, index) => {
								console.log(item);
								uni.uploadFile({
									url: 'https://nk.pro.youzewang.com/Api/CommonApi/uploadFile',
									filePath: item,
									name: 'file' + new Date().getTime(),
									header: {"Content-Type":"multipart/form-data"},
									formData: {},
									success: function(data){
										if(JSON.parse(data.data).data){
											console.log(JSON.parse(data.data).data.url);
											var url = JSON.parse(data.data).data.url;
											files.push(url);
											if(files.length == res.tempFilePaths.length){
												that.fileAction(files);
											}
										}
									  
									}
								})
								
							})
					  
					}
				})
			},
			async fileAction(files){
				// t_xiaozu_id: uni.getStorageSync("userInfo").t_xiaozu_id,
				// t_name: uni.getStorageSync("userInfo").name
				let params = {
					files: files,
					t_xiaozu_id: uni.getStorageSync("userInfo").m_z_id,
					t_name: uni.getStorageSync("userInfo").m_truename
				};
				let res = await submitAllPhoto(params);
				if(res.code == 1000){
					uni.showToast({
					  title: '上传成功',
					  icon: "none",
					  duration: 1000
					});
				}else{
					uni.showToast({
					  title: res.msg,
					  icon: "none",
					  duration: 1000
					});
				}
			},
			async getPhoto(){
				let res = await getPhoto(this.page);
				uni.stopPullDownRefresh();
				if(res.code == 1000){
					if(this.page == 1){
						this.list = res.data;
					}else{
						this.list = this.list.concat(res.data);
					}
					
					if(this.list.length < 20){
						this.loadingType = 2;
					}else{
						this.loadingType = 0;
					}
					
					this.imgList = [];
					this.list.map((item) => {
						this.imgList.push(item.t_url) 
					})
				}
			}
			
		},
		onReachBottom() {
			this.loadingType = 1;
			this.page++;
			this.getPhoto();
		},
		onPullDownRefresh() {
			this.page = 1;
			this.getPhoto();
		},
		onLoad() {
			this.statusBarHeight = wx.getSystemInfoSync().statusBarHeight;
			let screenWidth =  uni.getSystemInfoSync().screenWidth;
			let screenHeight =  uni.getSystemInfoSync().screenHeight;
			console.log(screenWidth + "-----" + screenHeight);
			if(uni.getSystemInfoSync().platform == "android"){
				this.titleHeight = '48';
			}else{
				this.titleHeight = '44'
			}
			this.tempHeight = parseInt(this.statusBarHeight)+parseInt(this.titleHeight);
			this.getPhoto();
		}
	}
</script>

<style>
	page{background: #000000;}
	.title_wrap{position: fixed; top: 0px; left: 0px; width: 100vw; z-index: 2;}
	.status-bar{background-color: #000000;}
	.team_bg{width: 100vw; height: 500upx;}
	.content{background: transparent; width: 100vw;position: relative;z-index: 2; height: calc(100vh - 83px); display: flex;flex-direction: column; box-sizing: border-box;}
	
	.head_wrap{padding:0upx 34upx; background: #000000;}
	.back_icon{width: 17upx; height: 30upx; margin-right: 17upx;}
	
	.content_wrap{width: 100vw; background: #000000; position: relative; box-sizing: border-box; padding-bottom: 15upx;}
	
	.left,.right{display: inline-block;  vertical-align: top;  width: 47%;}
	.left{margin: 0upx 1% 0upx 2%}
	.right{margin: 0upx 2% 0upx 1%}
	.card-img{width: 100%; height: 100%;}
	.like_view{position: absolute;bottom: 20upx; right: 20upx;}
	.like-img{width: 37upx; height: 33upx; margin-right: 20upx;}
	.card-title{font-size: 24upx; color: #ffffff;}
	.card{width: 100%; margin: 15upx 0upx; border-radius: 20upx; height: 250upx;position: relative;}
	.itemlist{ background-color: #fff;  margin: 1%;   margin-bottom: 20upx;  display: inline-block;  } 
	
	.add_icon{width: 56upx; height: 56upx; position: fixed; bottom: 180upx; right: 30upx; z-index: 10;}
	.upload_icon{width: 56upx; height: 56upx; position: fixed; bottom: 100upx; right: 30upx; z-index: 10;}
	
	.swiper{height: 100vh;width: 100vw; position: fixed; z-index: 1000; top: 0upx; left: 0upx; overflow: hidden;}
	
	.swipe_image{width: 100%; position: absolute;z-index: 10001; max-height: 100vh;}
	.bottom_like_view{position: absolute; right: 0upx; bottom: 0upx; z-index: 10002; padding: 50upx;}
	
	.curClass{position: fixed; left: 50%; width: 40upx; margin-left: -20upx; z-index: 10002; color: #FFFFFF;}
	
</style>
