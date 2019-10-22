<template>
	<view class="contain">
		<div class="mui-content">
			<div class="head_wrap">
			  <span>联系人</span>
			</div>

			<div class="row item_wrap" v-if="(is_vip == 0) || (shou == 1)">
			  <div class="row_between item">
				<span class="item_span">姓名</span>
				<input type="text" placeholder="请填写姓名" v-model="name" placeholder-class="place-holder">
			  </div>
			</div>
			
			<div class="row item_wrap" v-else>
			  <div class="row_between item">
				<span class="item_span">UID</span>
				<input type="text" placeholder="请填写UID" v-model="name" placeholder-class="place-holder">
			  </div>
			</div>

			<div class="row item_wrap">
			  <div class="row_between item">
				<span class="item_span">手机号</span>

				<input type="number" maxlength="11" :value="phoneValue" placeholder="手机固话二填一"  @input="phoneChnage"  placeholder-class="place-holder">

			  </div>
			</div>
				
				<div class="row item_wrap">
				  <div class="row_between item">
					<span class="item_span">固定电话</span>
					<input type="text" placeholder="手机固话二填一" :value="fixedphoneValue" placeholder-class="place-holder" @input="fixedphoneChange">
				  </div>
				</div>
				
				<div class="row item_wrap">
				  <div class="row_between item">
					<span class="item_span">公司名称</span>
					<input type="text" placeholder="请输入公司名称" v-model="companyName" placeholder-class="place-holder" >
				  </div>
				</div>

			<div class="head_wrap">
			  <span>收货地址</span>
			</div>

			<div class="row item_wrap" @click="showAddressType" v-if="false">
			  <div class="row_between item">
				<span>地址类型</span>
				<span class="content">{{addressType}}</span>
				
				<span class="arraw"></span>
			  </div>
			</div>

			<div class="row item_wrap" @click="showAddress">
			  <div class="row_between item">
				<span>所在地区</span>
				<span class="content">{{address}}</span>
				<span class="arraw"></span>
			  </div>
			</div>

			<div class="row item_wrap">
			  <div class="row_between item">
				<span class="item_span">详细地址</span>
				<input type="text" placeholder="请填写详细地址" placeholder-class="place-holder" :value="detailValue" @input="detailChange">
			  </div>
			</div>

			<div class="row item_wrap">
			  <div class="row_between item">
				<span class="item_span">设为默认地址</span>
				<switch @change="defaultChange" :checked="ifDefault"/>
			  </div>
			</div>
			
			<div class="row item_wrap" v-if="!item">
			  <div class="col_between " style="width: 96%; padding-top: 20upx; padding-bottom: 20upx;">
				<span class="item_span">粘贴整段地址，智能识别姓名、电话和地址。</span>
				<textarea placeholder="例如：顺小哥，13122299900，上海市闵行区浦江镇101" v-model="fencitext"
					style="margin-top: 0upx; margin-left: 0upx; width: 94%; font-size: 30upx;"></textarea>
				<button type="button" class=" button" @click="fenciClick">智能识别</button>
				
			  </div>
			</div>
			
			

			<button type="button" class=" button" @click="saveAddress">保存</button>
			<button type="button" class=" button" @click="delAddress" v-if="item">删除</button>

		  </div>
			
			<mpvue-picker themeColor="#007AFF" ref="mpvuePicker" mode="multiLinkageSelector" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
	   @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
	  
	</view>
	
</template>

<script>
	
	import { BASE_IMAGE_URL,saveAddress,region,addressManage,fenci } from '@/utils/api'
	import mpvuePicker from '../../components/mpvuePicker.vue';
	
	export default {
		components: {
			mpvuePicker
		},
		data() {
			return {
				province: '',
				city: '',
				area: '',
				name: '',
				type: -1,
				detail: '',
				detailValue: '',
				phone:'',
				phoneValue:'',
				fixedphone: '',
				fixedphoneValue: '',
				addressType: '请选择',
				addressTypeList: ["寄件地址", "收件地址"],
				pickerValueDefault: [0,0,0],
				pickerValueArray: [],
				address: "请选择",
				deepIndex: 0,
				deepLength: 3,
				item: '',
				ifDefault: false,
				is_vip: 0,
				shou: 0,
				companyName: '',
				fencitext: ''
			}
		},
		methods: {
			detailChange(e){
				console.log(e.detail.value);
				this.detail=e.detail.value;
			},
			fixedphoneChange(e){
				console.log(e.detail.value);
				this.fixedphone=e.detail.value;
			},
			defaultChange(e){
				console.log(e);
				this.ifDefault = e.target.value;
			},
			showAddress() {
				// #ifdef APP-PLUS
					plus.key.hideSoftKeybord();
				// #endif
				this.$refs.mpvuePicker.show()
			},
			onConfirm(e){
				console.log(e);
				this.address = e.label;
			},
			onCancel(e){},
			async fenciClick(){
				if(!this.fencitext){
					uni.showToast({
						title: "请输入地址",
						icon: 'none',
						duration: 2000
					});
					return
				};
				let params = {
					str: this.fencitext
				};
				let res = await fenci(params);
				if(res.status == 1){
					this.name = res.data.name;
					this.phoneValue = res.data.phone;
					this.phone = this.phoneValue;
					this.fixedphone = res.data.fixedphone;
					this.fixedphoneValue = res.data.fixedphone;
					this.address = res.data.provinceName+"-"+res.data.cityName+"-"+res.data.areaName;
					this.detailValue = res.data.luduan;
					this.detail = res.data.luduan;
				}
			},
			async delAddress(){
				let params = {
					userID: uni.getStorageSync("userInfo").userID,
					addressID: this.item.addressID,
					flag: 3
				};
				let res = await addressManage(params);
				if(res.status == 1){
					uni.showToast({
						title: "删除成功",
						icon: 'none',
						duration: 2000
					});
					uni.navigateBack({
						delta: 1
					});
				}else{
					
					uni.showToast({
						title: res.message,
						icon: 'none',
						duration: 2000
					});
				}
			},
			phoneChnage(e)
			{
				console.log(e.detail.value);
				this.phone=e.detail.value;
			},
			async saveAddress(){
				if(this.address == "请选择"){
					uni.showToast({
						title: "请选择地区",
						icon: 'none',
						duration: 2000
					});
					return;
				};
				
				if(!this.name){
					uni.showToast({
						title: "请填写姓名",
						icon: 'none',
						duration: 2000
					});
					return;
				};
				
				if(!this.phone && !this.fixedphone){
					uni.showToast({
						title: "手机固话二填一",
						icon: 'none',
						duration: 2000
					});
					return;
				};
				
				if(!this.detail){
					uni.showToast({
						title: "请填写详细地址",
						icon: 'none',
						duration: 2000
					});
					return;
				};
				
				let addressAry = this.address.split("-");
				this.province = addressAry[0];
				this.city = addressAry[1];
				this.area = addressAry[2];
				
				let params = {
					qyCompayId: 0,
					userID: uni.getStorageSync("userInfo").userID,
					province: this.province,
					city: this.city,
					area: this.area,
					phone: this.phone,
					name: this.name,
					type: this.type,
					detail: this.detail,
					isInternationalAddress: 0,
					fixedphone: this.fixedphone,
					ifDefault: this.ifDefault?1:0,
					companyName: this.companyName
				};
				
				if(this.item){
					params.addressID = this.item.addressID;
				}
				
				let res = await saveAddress(params);
				if(res.status == 1){
					uni.navigateBack({
						delta: 1
					});
				}else{
					uni.showToast({
						title: res.message,
						icon: 'none',
						duration: 2000
					});
				}
			},
			
			async region(){
				let params = {
					type: 0,
					isShow: false
				};
				
				let res = await region(params);
				if(res.status==1){
					res.data.map((item, index) => {
						item.label = item.name;
						item.value = item.id;
						if(this.item){
							if(item.name == this.province){
								this.pickerValueDefault[0] = index;
							}
						}
						item.children.map((ite, inde) => {
							ite.label = ite.name;
							ite.value = ite.id;
							if(this.item){
								if(ite.name == this.city){
									this.pickerValueDefault[1] = inde;
								}
							}
							ite.children.map((items, ind) => {
								items.label = items.name;
								items.value = items.id;
								if(this.item){
									if(items.name == this.area){
										this.pickerValueDefault[2] = ind;
									}
								}
							})
						})
					});
					this.pickerValueArray = res.data;
				}
			},
			showAddressType(){
				let that = this;
				uni.showActionSheet({
						itemList: that.addressTypeList,
						success: function (res) {
								that.addressType = that.addressTypeList[res.tapIndex];
								that.type = res.tapIndex +1;
						},
						fail: function (res) {}
				});
			}
			
		},
		onLoad(options) {
			if(options.params){
				let data = JSON.parse(options.params); // 字符串转对象
				if(data){
					this.item = data;
					this.name = data.name;
					this.phone = data.phone;
					this.province = data.province;
					this.city = data.city;
					this.area = data.area;
					this.detail = data.detail;
					this.fixedphone = data.fixedphone;
					// this.type = data.type;
					// this.addressType = this.addressTypeList[this.type-1];
					this.address = this.province+"-"+this.city+"-"+this.area;
					this.ifDefault = data.ifDefault == 1;
					uni.setNavigationBarTitle({
						title: "修改地址"
					})
				}
			}
			
			this.phoneValue=this.phone;
			this.fixedphoneValue = this.fixedphone;
			this.detailValue = this.detail;
			this.deepIndex = 0;
			this.region();
			
			let userInfo = uni.getStorageSync("userInfo");
			this.is_vip = parseInt(userInfo.is_vip);
			
			this.shou = options.shou;
			this.shou = this.shou=='undefined'?0:this.shou;
			console.log(this.shou);
		}
	}
</script>

<style>
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
      font-size: 28upx;
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
      font-size: 28upx;
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
	  padding-bottom: 20upx;
    }
</style>
