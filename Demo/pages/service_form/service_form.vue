<template>
	<view>
		<div class="mui-content">
			<div class="title_txt">
			  联系人
			</div>
			
			<navigator url="../address_list/address_list?typeIndex=0" class="addressStyle" >地址簿</navigator>

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

			<navigator class="col item_wrap" v-if="false" url="../address_list/address_list?typeIndex=0">
			  <div class="row item">
				<span>公司名称</span>
				<input type="text" placeholder="请填写公司姓名" class="company_name" />
			  </div>

			</navigator>

			<div class="title_txt">
			  需求明细
			</div>

			<div class="row item_wrap" @click="showTypeAction">
			  <div class="row pick_item">
				<span>类型</span>
				<span class="content">{{service_order_name}}</span>
				<span class="arraw"></span>
			  </div>
			</div>

			<div class="col item_wrap">
			  <div class="row item">
				<span>数量</span>
				<input type="number" maxlength="5" placeholder="请填写数量" class="number" v-model="quantity"/>
			  </div>

			</div>

			<div class="row item_wrap" @click="lookTime">
			  <div class="row pick_item">
				<span>服务时间</span>
				<span class="content ">{{service_time}}</span>
				<span class="arraw"></span>
			  </div>

			</div>

			<div class="text_wrap">
			  <div style="margin-bottom: 18px;">需求明细</div>
			  <textarea placeholder="请填写需求明细" class="requirements" v-model="demandDetail"></textarea>

			</div>

			<button class=" button" @click="create_water_order">提交需求</button>

		  </div>

		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
		 
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,addressManage,getwaterTypeAndPrice,create_water_order} from '@/utils/api'
	import mpvuePicker from '@/components/mpvuePicker.vue';
	import {mapState,mapMutations, mapActions, mapGetters} from 'vuex';
	
	import cityData from '../../components/city.data.js';
	
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
				service_order_type: '',
				service_time: '请选择',
				themeColor: '#007AFF',
				mode: 'multiLinkageSelector',
				deepLength: 2,
				pickerValueDefault: [0,0],
				pickerValueArray: [],
				mulLinkageTwoPicker: [],
				itemList: ['一小时内', '当天上午', '当天下午', '隔天上午', '隔天下午'],
				companyID: 0,
				quantity: '',
				demandDetail: '',
				money: '',
				service_order_name: '请选择',
				waterPrice: 0,
				imgPic: '',
				selectAddressID: 0
			}
		},
		computed:{
			...mapState({
				addressID: state => state.addressID
			})
		},
		methods: {
			async create_water_order(){
				if(this.selectAddressID == 0){
					uni.showToast({
						icon:'none',
						title:"请选择地址",
						duration:1000
					})
					return;
				};
				
				if(this.service_order_name == '请选择'){
					uni.showToast({
						icon:'none',
						title:"请选择服务类型",
						duration:1000
					})
					return;
				};
				
				if(this.service_time == '请选择'){
					uni.showToast({
						icon:'none',
						title:"请选择服务时间",
						duration:1000
					})
					return;
				};
				
				if(!this.quantity){
					uni.showToast({
						icon:'none',
						title:"请填写数量",
						duration:1000
					})
					return;
				};
				let userInfo = uni.getStorageSync("userInfo");
				let platform = 3;
				// #ifdef APP-PLUS
					platform = 1;
				// #endif
				let params = {
					userID: userInfo.userID,
					addressID: this.selectAddressID,
					platform: platform,
					companyID: userInfo.qyCompanyID,
					isCompany: this.type == 1?'1':'0',
					companyName: userInfo.qyCompanyName,
					quantity: this.quantity,
					serviceTime: this.service_time,
					demandDetail: this.demandDetail,
					waterTypeID: this.service_order_type,
					service_order_name: this.service_order_name,
					name: this.name,
					phone: this.phone,
					address: this.address,
					money: parseFloat(parseFloat(this.waterPrice).toFixed(2)*parseFloat(this.quantity).toFixed(2)).toFixed(2),
					waterPrice: this.waterPrice,
					imgPic: this.imgPic
				};
				uni.setStorageSync("serviceOrder", params);
				this.goToFormSure();
			},
			async getwaterTypeAndPrice(){
				let params = {
					companyID: this.type == 0?0:this.companyID
				};
				let res = await getwaterTypeAndPrice(params);
				if(res.status == 1){
					res.data.map((item) => {
						item.value = item.wtId;
						item.label = item.wtName;
						item.children = [];
						item.sizes.map((ite) => {
							let child = {
								label: ite.wtsName,
								value: this.type==1?ite.qwsId:ite.wtsId,
								wtsImg: ite.wtsImg,
								wtsPrice: ite.wtsPrice
							};
							item.children.push(child);
						});
					});
					this.mulLinkageTwoPicker = res.data;
				}
			},
			goToAddress(){
				uni.navigateTo({
					url: "/page/address_list/address_list?typeIndex=0"
				});
				
			},
			goToFormSure(){
				uni.navigateTo({
					url: '/pages/service_form_sure/service_form_sure?type='+this.type
				});
			},
			lookTime(){
				// #ifdef APP-PLUS
					plus.key.hideSoftKeybord();
				// #endif
				let that = this;
				uni.showActionSheet({
					itemList: that.itemList,
					success(res) {
						console.log(res.tapIndex);
						that.service_time = that.itemList[res.tapIndex];
					}
				})
			},
			onConfirm(e) {
				console.log(e)
				this.service_order_name = e.label;
				this.service_order_type = e.value[1];
				this.waterPrice = this.mulLinkageTwoPicker[e.index[0]].sizes[e.index[1]].wtsPrice;
				this.imgPic = this.mulLinkageTwoPicker[e.index[0]].sizes[e.index[1]].wtsImg;
				
			},
			// 二级联动选择
			showTypeAction() {
				// #ifdef APP-PLUS
					plus.key.hideSoftKeybord();
				// #endif
				this.pickerValueArray = this.mulLinkageTwoPicker;
				this.$refs.mpvuePicker.show()
			},
			async addressManage(){
				let params = {
					userID: uni.getStorageSync("userInfo").userID,
					addressID: this.selectAddressID,
					flag: 4
				};
				let res = await addressManage(params);
				if(res.status == 1){
					this.name = res.data.name;
					this.phone = res.data.phone;
					this.address = res.data.province+res.data.city+res.data.area+res.data.detail;
					this.selectAddressID = res.data.addressID;
				}
			},
			
			
		},
		onLoad(options) {
			this.type = options.type;
			if(this.type == 1){
				uni.setNavigationBarTitle({
					title:"企业饮水服务"
				});
				this.companyID = uni.getStorageSync("userInfo").qyCompanyID
			}else{
				uni.setNavigationBarTitle({
					title:"个人饮水服务"
				});
				this.companyID = 0;
			};
			this.$store.commit("changeAddress", 0);
			this.getwaterTypeAndPrice();
		},
		onShow() {
			if(this.addressID != 0){
				this.selectAddressID = this.addressID;
				this.addressManage();
			}
		}
	}
</script>

<style>
	
	.addressStyle{border: 2upx dashed #007AFF; text-align: center; margin: 0upx 32upx; height: 88upx; line-height: 88upx; color: #107EFF;font-size: 32upx;box-sizing: border-box;}
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
	  flex: 1;
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
