<template>
	<view>
		<div class="mui-content">
			<div class="title_txt">
			  联系人
			</div>
			
			<navigator class="address" url="../address_list/address_list?typeIndex=0">地址簿</navigator>

			<navigator class="col item_wrap" url="../address_list/address_list?typeIndex=0">
			  <div class="row item" style="border-top: transparent;">
				<span>姓名</span>
				<span class="name" >{{name}}</span>
			  </div>

			</navigator>



			<navigator class="col item_wrap" url="../address_list/address_list?typeIndex=0">
			  <div class="row item">
				<span>手机号</span>
				<span class="name" >{{phone}}</span>
			  </div>

			</navigator>
			
			<navigator class="col item_wrap" url="../address_list/address_list?typeIndex=0">
			  <div class="row item">
				<span>地址</span>
				<span class="name" >{{address}}</span>
			  </div>

			</navigator>

			<div class="col item_wrap" >
			  <div class="row item">
				<span>公司名称</span>
				<input type="text" placeholder="请填写公司名称(选填)" class="company_name" v-model="companyName"/>
			  </div>

			</div>

			

			<div class="text_wrap">
			  <div style="margin-bottom: 18px;">需求明细</div>
			  <textarea placeholder="请填写需求明细" class="requirements" v-model="demandDetail"></textarea>

			</div>

			<button class=" button" @click="goToFormSure">提交需求</button>

		  </div>

		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
		 
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,addressManage,service} from '@/utils/api'
	import mpvuePicker from '@/components/mpvuePicker.vue';
	import {mapState,mapMutations, mapActions, mapGetters} from 'vuex';
	export default {
		components: {
			mpvuePicker
		},
		data() {
			return {
				type: 0,
				name: '请选择姓名',
				phone: '请选择手机号',
				address: '请选择地址',
				service_order_type: '请选择',
				themeColor: '#007AFF',
				mode: 'multiLinkageSelector',
				deepLength: 2,
				pickerValueDefault: [0,0],
				pickerValueArray: [],
				titleList: ['保洁服务','商务场地','绿植服务','更多服务', '定制需求'],
				demandDetail: '',
				companyName: ''
			}
		},
		computed:{
			...mapState({
				addressID: state => state.addressID
			})
		},
		methods: {
			async goToFormSure(){
				if(this.addressID == 0){
					uni.showToast({
							title: '请选择地址',
							icon: 'none',
							duration: 1000
					 });
					 return;
				};
				
				if(!this.demandDetail){
					uni.showToast({
							title: '请填写需求明细',
							icon: 'none',
							duration: 1000
					 });
					 return;
				}
				
				let params = {
					userID: uni.getStorageSync("userInfo").userID,
					addressID: this.addressID,
					companyName: this.companyName,
					demandDetail: this.demandDetail,
					orderType: this.type
				};
				let res = await service(params);
				if(res.status == 1){
					
					let that = this;
					uni.showModal({
						title: "提交成功",
						content: "您已下单成功，稍后会联系您~",
						showCancel:false,
						success: function (result) {
							if (result.confirm) {
								uni.navigateBack({
									delta:1
								});
							} else if (result.cancel) {
								console.log('用户点击取消');
							}
						}
					});
					
					// uni.showToast({
					// 		title: '提交成功',
					// 		icon: 'none',
					// 		duration: 1000
					//  });
					//  setTimeout( () => {
					// 	 uni.navigateBack({
					// 		delta:1
					// 	 });
					//  }, 1000);
					 
				}else{
					uni.showToast({
							title: res.message,
							icon: 'none',
							duration: 1000
					 });
				}
			},
			// 二级联动选择
			showTypeAction() {
				this.pickerValueArray = []
				this.$refs.mpvuePicker.show()
			},
			async addressManage(){
				let params = {
					userID: uni.getStorageSync("userInfo").userID,
					addressID: this.addressID,
					flag: 4
				};
				let res = await addressManage(params);
				if(res.status == 1){
					this.name = res.data.name;
					this.phone = res.data.phone;
					this.address = res.data.province+res.data.city+res.data.area+res.data.detail;
				}
			},
			
			
		},
		onLoad(options) {
			this.type = options.type;
			uni.setNavigationBarTitle({
					title:this.titleList[this.type-2]
				});
			this.$store.commit("changeAddress", 0);
		},
		onShow() {
			if(this.addressID != 0){
				// this.sendAddressID = this.addressID;
				this.addressManage();
			}
		}
	}
</script>

<style>
	
	.address{border: 2upx dashed #007AFF; text-align: center; margin: 0upx 32upx; height: 88upx; line-height: 88upx; color: #107EFF;font-size: 32upx;box-sizing: border-box;}
.title_txt {
      color: #666666;
      font-size: 24upx;
      padding: 32upx 30upx;
      background-color: #F9F9F9;
    }

    .item_wrap {
      height: 100upx;
      background-color: #FFFFFF;
      padding: 0px 32upx;
    }

    .item {
      height: 100upx;
      width: 100%;
      border-bottom: 2upx solid #E3E3E3;
    }

    .item span:nth-child(1) {
      color: #333333;
      font-size: 28upx;
      width: 160upx;
    }
		
		.item span{
			color: #666666;
		}

    .item input {
      margin-bottom: 0px;
      border: none;
      background: transparent;
      color: #666666;
      font-size: 28upx;
    }

    ::-webkit-input-placeholder {
      color: #cccccc;
      font-size: 28upx;
    }

    .pick_item {
      height: 100upx;
      width: 100%;
      border-bottom: 2upx solid #E3E3E3;
      color: #333333;
      font-size: 28upx;
    }

    .pick_item .content {
      flex: 1;
      text-align: right;
      font-size: 28upx;
      color: #666666;
      height: 100upx;
      line-height: 100upx;

    }

    .arraw {
      width: 20upx;
      height: 20upx;
      border-top: 4upx solid #999999;
      border-right: 4upx solid #999999;
      transform: rotate(45deg);
      margin-left: 4upx;
    }


    .text_wrap {
      padding: 36upx 32upx;
      background-color: #FFFFFF;
      color: #33333;
      font-size: 28upx;
    }

    textarea {
      padding: 18upx 22upx;
      height: 140upx;
      background-color: #F9F9F9;
      margin-bottom: 0rem;
	  width:100%;
	  box-sizing: border-box;
	  min-height: 200upx;
    }

    textarea::-webkit-input-placeholder {
      color: #999999;
      font-size: 24upx;
    }

    .button {
      border-radius: 6upx;
      width: 100%;
      margin: 50upx 5% 146upx;
      box-sizing: border-box;
      font-size: 32upx;
      width: 90%;
      height: 80upx;
      padding: 0px;
      background-color: #107EFF !important;
      color: #FFFFFF;
    }
</style>
