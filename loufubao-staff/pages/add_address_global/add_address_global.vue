<template>
	<view>
		
		<div class="mui-content">
		
		  <div class="row item_wrap">
		    <div class="row_between item">
					<span class="item_span">
						<span>姓名:</span>
						<span>Name</span>
					</span>
					<div class="value_item">
						<span>请输入姓名</span>
						<input type="text" placeholder="Please Enter your name" v-model="name">
					</div>
					
		    </div>
		  </div>
		
		  <div class="row item_wrap">
		    <div class="row_between item">
		      <span class="item_span">
		  			<span>手机号码:</span>
		  			<span>Phone Number</span>
		  		</span>
		  		<div class="value_item">
		  			<span>可选</span>
		  			<input type="text" placeholder="Optional" :value="phoneValue" maxlength="11" @input="phoneChnage">
		  		</div>
		  		
		    </div>
		  </div>
			
			<div class="row item_wrap">
			  <div class="row_between item">
			    <span class="item_span">
						<span>固定电话:</span>
						<span>Fixed Telephone</span>
					</span>
					<div class="value_item">
						<span>手机/固话二选一</span>
						<input type="tel" placeholder="Two fill in a fixed/mobile phone" :value="fixedphoneValue" @input="phoneValueChnage">
					</div>
					
			  </div>
			</div>
			
			<div class="row item_wrap">
			  <div class="row_between item">
			    <span class="item_span">
						<span>公司名称:</span>
						<span>Company</span>
					</span>
					<div class="value_item">
						<span>请输入公司名称</span>
						<input type="text" placeholder="Please enter the company name" v-model="companyName">
					</div>
					
			  </div>
			</div>
			
			<div class="row item_wrap">
			  <div class="row_between item">
			    <span class="item_span">
						<span>国家:</span>
						<span>Country</span>
					</span>
					<div class="value_item" @click="showCountry">
						<span class="select_country">请选择国家</span>
						<span class="country" style="color: grey;">{{province}}</span>
					</div>
					<span class="arraw"></span>
			  </div>
			</div>
			
			
			<div class="row item_wrap">
			  <div class="row_between item">
			    <span class="item_span">
						<span>城市:</span>
						<span>City</span>
					</span>
					<div class="value_item">
						<span>请输入城市名称</span>
						<input type="text" placeholder="Please enter a city name" v-model="city">
					</div>
					
			  </div>
			</div>
			
			<div class="row item_wrap">
			  <div class="row_between item">
			    <span class="item_span">
						<span>详细地址:</span>
						<span>Detailed Address</span>
					</span>
					<div class="value_item">
						<span>请输入详细地址</span>
						<input type="text" placeholder="Please enter the detailed address" :value="detailValue" @input="detailChange" >
					</div>
					
			  </div>
			</div>
			
			<div class="row item_wrap">
			  <div class="row_between item">
			    <span class="item_span">
						<span>邮政编码:</span>
						<span>Postal Code</span>
					</span>
					<div class="value_item">
						<span>请输入邮政编码</span>
						<input type="text" placeholder="Please enter the postal code" v-model="postcode">
					</div>
					
			  </div>
			</div>
			
		
		  <div class="row item_wrap">
		    <div class="row_between item">
		      <span class="item_span">设为默认地址</span>
		      <switch @change="defaultChange" :checked="ifDefault"/>
		    </div>
		  </div>
		
		  <button type="button" class=" button" @click="saveAddress">保存</button>
		  <button type="button" class="button" @click="delAddress">删除</button>
		
		</div>
		
		<mpvue-picker themeColor="#007AFF" ref="mpvuePicker" mode="selector" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
	   @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
	  
		
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,saveAddress,region,addressManage } from '@/utils/api'
	import mpvuePicker from '../../components/mpvuePicker.vue';
	
	export default {
		components: {
			mpvuePicker
		},
		data() {
			return {
				province: 'Please select a country',
				city: '',
				area: '',
				phone: '',
				phoneValue: '',
				name: '',
				type: -1,
				detail: '',
				detailValue: '',
				fixedphone: '',
				fixedphoneValue: '',
				pickerValueDefault: [0],
				pickerValueArray: [],
				address: "请选择",
				deepIndex: 0,
				deepLength: 1,
				item: '',
				ifDefault: false,
				postcode: "",
				companyName: ''
			}
		},
		methods: {
			detailChange(e){
				console.log(e.detail.value);
				this.detail=e.detail.value;
			},
			phoneChnage(e){
				console.log(e.detail.value);
				this.phone=e.detail.value;
			},
			phoneValueChnage(e){
				console.log(e.detail.value);
				this.fixedphone=e.detail.value;
			},
			defaultChange(e){
				console.log(e);
				this.ifDefault = e.target.value;
			},
			showCountry() {
				// #ifdef APP-PLUS
					plus.key.hideSoftKeybord();
				// #endif
				this.$refs.mpvuePicker.show()
			},
			onConfirm(e){
				console.log(e);
				this.province = e.label;
			},
			onCancel(e){},
			async region(){
				let params = {
					type: 1,
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
					});
					this.pickerValueArray = res.data;
					console.log(this.pickerValueDefault);
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
			
			async saveAddress(){
				if(this.province == "Please select a country"){
					uni.showToast({
						title: "请选择国家",
						icon: 'none',
						duration: 2000
					});
					return;
				};
				
				if(!this.city){
					uni.showToast({
						title: "请填写城市",
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
				
				if(!this.phone){
					if(!this.fixedphone){
						uni.showToast({
							title: "手机/固话至少选填一个",
							icon: 'none',
							duration: 2000
						});
						return;
					}
				};
				
				if(!this.detail){
					uni.showToast({
						title: "请填写详细地址",
						icon: 'none',
						duration: 2000
					});
					return;
				};
				
				
				
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
					isInternationalAddress: 1,
					fixedphone: this.fixedphone,
					ifDefault: this.ifDefault?1:0,
					companyName: this.companyName,
					postcode: this.postcode
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
					return;
				}
			},
			
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
					this.postcode = data.postcode;
					this.detail = data.detail;
					this.fixedphone = data.fixedphone;
					this.companyName = data.companyName;
					this.ifDefault = data.ifDefault == 1;
					uni.setNavigationBarTitle({
						title: "修改地址"
					})
				}
			}
			
			this.phoneValue=this.phone;
			this.detailValue = this.detail;
			this.fixedphoneValue = this.fixedphone;
			this.region();
		}
	}
</script>

<style>

page {
      background-color: #F8F8F8;
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
      height: 120upx;
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
      margin: 30upx 5% 0upx;
      box-sizing: border-box;
      background-color: #107EFF;
      color: #FFFFFF;
      font-size: 32upx;
      height: 88upx;
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
      width: 240upx;
      color: #333333;
      font-size: 28upx;
			display: flex;
			flex-direction: column;
			
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
		
		.value_item{display: flex; flex-direction: column; flex: 1; justify-content: center; padding: 0rem 0rem 20upx;box-sizing: border-box;height: 120upx;}
		.value_item span{color: #DBDBDB; padding-left: 20upx; padding-top: 20upx;}
		
</style>
