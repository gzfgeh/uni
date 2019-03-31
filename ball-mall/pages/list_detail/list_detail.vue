<template>
    <view class="content" :style="'height:'+(winHeight-168) + 'px'">
		
		<div>
			<div class="title_wrap uni-between-item">
			</div>
			
			
			<div class="uni-inline-item">
				<span>品类</span>
				<span>{{item.g_name}}</span>
			</div>
			
			<div class="uni-inline-item">
				<span>特色</span>
				<span>{{item.g_miaoshu}}</span>
			</div>
			
			<div class="uni-inline-item">
				<span>优惠</span>
				<span>{{item.g_tag}}</span>
			</div>
			
			<div class="uni-inline-item">
				<span>地区</span>
				<span>{{item.g_sheng}}{{item.g_shi}}{{item.g_qu}}</span>
			</div>
			
			<div class="uni-inline-item">
				<span>单位</span>
				<span>{{item.g_danwei}}</span>
			</div>
			
			<div class="uni-inline-item">
				<span>价格</span>
				<input type="text" v-model="item.g_price">
				<span style="flex: 1; text-align: right; padding-right: 40upx">元</span>
			</div>
		</div>
		
		
		
		
        <view class="btn_wrap">
            <button  type="primary" class="primary" hover-class="button-hover"
			@tap="goodsEdit">发布</button>
            
        </view>
		
		
		
		
		
    </view>
</template>

<script>
	import { BASE_IMAGE_URL,goodsDetail,goodsEdit } from "@/utils/api";
	

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
		onLoad (e) {
			this.goodsDetail(e.id)
		},
        methods: {
			
			async goodsDetail(id){
			  let that = this;
			  let res = await goodsDetail(id);
			  if(res.code == 1000){
				console.log(res.data);
				this.item = res.data;
			  }
			},
			
			async goodsEdit(){
				let params = {
					g_name:this.item.g_name,
					g_miaoshu:this.item.g_miaoshu,
					g_tag:this.item.g_tag,
					g_price:this.item.g_price,
					g_danwei:this.item.g_danwei
				};
				let res = await goodsEdit(params);
				if(res.code == 1000){
					uni.showToast({
					  icon: 'none',
					  title: '修改成功',
					  duration: 1000
					});
					uni.navigateBack();
				}else{
					uni.showToast({
					  icon: 'none',
					  title: '修改失败',
					  duration: 1000
					});
				}
			}
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
