<template>
	<view class="contain">
		<div class="mui-content">

			<div class="row item_wrap">
			  <div class="row_between item">
				<span class="item_span">收货人</span>
				<input type="text" v-model="a_name">
			  </div>
			</div>

			<div class="row item_wrap">
			  <div class="row_between item">
				<span class="item_span">联系电话</span>
				<input type="number" v-model="a_phone" maxlength="11">
			  </div>
			</div>

			<div class="row item_wrap" @click="showMulLinkageThreePicker">
			  <div class="row_between item">
				<span class="item_span">所在地区</span>
				<span class="content">{{pickerText}}</span>
				<span class="arraw"></span>
			  </div>
			</div>

			<div class="row item_wrap">
			  <div class="row_between item">
				<span class="item_span">详细地址</span>
				<input type="text" v-model="a_address">
			  </div>
			</div>
			
			<div class="row item_wrap">
			  <div class="row_between item">
				<span class="item_span">设置默认</span>
				<switch @change="changeDefault" v-model="a_is_default"/>
			  </div>
			</div>
			
			
			
			
		</div>
		
		<div class="bottom_wrap" @click="addAddress">保存</div>
		
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>

	</view>
</template>

<script>
	import { BASE_IMAGE_URL,addAddress,editAddress } from '@/utils/api'
	import mpvueCityPicker from '../../components/mpvueCityPicker.vue'
	
	export default {
		components: {
			mpvueCityPicker
		},
		data() {
			return {
				a_name: '',
				a_phone: '',
				a_address: '',
				cityPickerValueDefault: [0, 0, 1],
				themeColor: '#007AFF',
				pickerText: '请选择',
				a_sheng: '',
				a_shi: '',
				a_qu: '',
				a_is_default: false,
				item: ''
			}
		},
		onLoad() {
			this.item = uni.getStorageSync("itemList");
			console.log(this.item);
			let item = this.item;
			if(item){
				this.a_name = item.a_name;
				this.a_phone = item.a_phone;
				this.a_address = item.a_address;
				this.a_sheng = item.a_sheng;
				this.a_shi = item.a_shi;
				this.a_qu = item.a_qu;
				this.pickerText = this.a_sheng+"-"+this.a_shi+"-"+this.a_qu;
				this.a_is_default = item.a_is_default == 1;
				uni.setNavigationBarTitle({
						title: "修改地址"
					})
			}else{
				Object.assign(this, this.$options.data());
			}
		},
		methods: {
			changeDefault(e){
				console.log(e);
				this.a_is_default = e.detail.value;
			},
			// 三级联动选择
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show();
			},
			onCancel(e){},
			onConfirm(e) {
				console.log(e);
				this.cityPickerValueDefault = e.value;
				this.pickerText = e.label;
				let address = this.pickerText.split("-");
				this.a_sheng = address[0];
				this.a_shi = address[1];
				this.a_qu = address[2];
			},
			async addAddress(){
				if(!this.a_name){
					uni.showToast({
						icon: 'none',
						duration: 1000,
						title: "请输入收货人"
					});
					return;
				};
				
				if(!this.a_phone){
					uni.showToast({
						icon: 'none',
						duration: 1000,
						title: "请输入联系电话"
					});
					return;
				};
				
				if(!this.a_address){
					uni.showToast({
						icon: 'none',
						duration: 1000,
						title: "请输入详细地址"
					});
					return;
				};
				
				if(this.pickerText == '请选择'){
					uni.showToast({
						icon: 'none',
						duration: 1000,
						title: "请选择省市区"
					});
					return;
				};
				
				let params = {
					a_sheng: this.a_sheng,
					a_shi: this.a_shi,
					a_qu: this.a_qu,
					a_name: this.a_name,
					a_address: this.a_address,
					a_phone: this.a_phone,
					a_openid: uni.getStorageSync("openid"),
					a_is_default: this.a_is_default?1:0
				};
				let res;
				console.log(this.item);
				if(this.item){
					params.a_id = this.item.a_id;
					res = await editAddress(params);
				}else{
					res = await addAddress(params);
				};
				
				if(res.code == 1000){
					uni.showToast({
						icon: 'none',
						duration: 1000,
						title: "操作成功"
					})
					uni.navigateBack({
						delta: 1
					});
				}
			}
		}
	}
</script>

<style>
	page{height: 100%; background: #EFEFF4;}
	.bottom_wrap{position: fixed;bottom: 0upx;left:0upx; width: 100%; height: 100upx;line-height: 100upx;text-align: center;color: #FFF; background: #FF4544; font-size: 34upx;}
.head_wrap {
      padding: 28upx;
      width: 100%;
      text-align: left;
      color: #666666;
      font-size: 24upx;
	  box-sizing: border-box;
    }

    ::-webkit-input-placeholder {
      color: #CCCCCC;
      font-size: 28upx;
    }

    .item_wrap {
      width: 100%;
      background-color: #FFFFFF;
      padding-left: 28upx;
	  box-sizing: border-box;
    }

    .item {
      height: 100upx;
      width: 100%;
      border-bottom: 2upx solid #E3E3E3;
      color: #333333;
      font-size: 28upx;
      padding-right: 30upx;
	  box-sizing: border-box;
    }

    .item .content {
      flex: 1;
      text-align: right;
      font-size: 32upx;
      color: #666666;
      height: 100upx;
      line-height: 100upx;

    }

    .button {
      border-radius: 6upx;
      width: 90%;
      margin: 20upx 5% 0px;
      box-sizing: border-box;
      background-color: #107EFF;
      color: #FFFFFF;
      font-size: 32upx;
      height: 88upx;
    }

    .arraw {
      width: 20upx;
      height: 20upx;
      border-top: 4upx solid #999999;
      border-right: 4upx solid #999999;
      transform: rotate(45deg);
      margin-left: 4upx;
    }

    .item input {
      margin: 0px;
      border: none;
      background: transparent;
      flex: 1;
      text-align: left;
      padding: 0px 0px 0px 16upx;
			font-size: 34upx;
    }

    .item .item_span {
      width: 200upx;
      color: #333333;
      font-size: 34upx;
    }

    .upload_wrap {
      padding: 36upx 30upx;
      background: #FFFFFF;
      color: #333333;
      font-size: 28upx;
    }

    .img_wrap {
      flex-flow: wrap;
      margin-top: 36upx;
    }

    textarea {
      padding: 18upx 22upx;
      height: 120upx;
      background-color: #F9F9F9;
      margin-top: 40upx;
      margin-left: 5%;
      width: 90%;
      margin-bottom: 10upx;
      font-size: 24upx;
    }

    textarea::-webkit-input-placeholder {
      color: #999999;
      font-size: 24upx;
    }

    .mui-bar-nav {
      box-shadow: none;
    }
	
	.contain {
      background-color: #F3F3F3;
    }
</style>
