<template>
	<view class="contain">
		<div class="mui-content">

			<div class="row item_wrap">
			  <div class="row_between item">
				<span class="item_span">收货人</span>
				<input type="text" v-model="name">
			  </div>
			</div>

			<div class="row item_wrap">
			  <div class="row_between item">
				<span class="item_span">联系电话</span>
				<input type="text" v-model="mobile">
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
				<input type="text" v-model="detail">
			  </div>
			</div>
			
		</div>
		
		<div class="bottom_wrap">保存</div>
		
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>

	</view>
</template>

<script>
	import mpvueCityPicker from '../../components/mpvueCityPicker.vue'
	
	export default {
		components: {
			mpvueCityPicker
		},
		data() {
			return {
				name: '',
				phone: '',
				detail: '',
				cityPickerValueDefault: [0, 0, 1],
				themeColor: '#007AFF',
				pickerText: '请选择'
			}
		},
		methods: {
			// 三级联动选择
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show()
			},
			onConfirm(e) {
				this.pickerText = e.label;
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
