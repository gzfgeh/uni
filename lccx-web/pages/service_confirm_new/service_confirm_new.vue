<template>
	<div class="contain">
		
		<div class="header uni-between-item">
			
			<div class="brand_wrap">
				<img :src="company_logo" >
				<span>{{company_name}}</span>
			</div>
			
			<div class="price">
				<span>{{monthly_expense}}元/月+{{mileage_expense}}元/公里</span>
				<span class="name">交强险 {{compulsory}}元+车船税 {{tax}}元</span>
			</div>
			
		</div>
		
		<div class="address_wrap uni-between-item" style="border-bottom: 2upx solid rgba(0,0,0,0.1);">
			<span>投保地区</span>
			<span>{{city_name}}</span>
		</div>
		
		<div class="address_wrap uni-between-item" style="padding-bottom: 20upx; font-size: 24upx;">
			<div class="uni-between-item yong_jin">
				<image src="../../static/img/yong_jin_icon.png" mode=""></image>
				<span>里程车险佣金</span>
			</div>
			<span>{{bi_commission}}元</span>
		</div>
		
		<div class="address_wrap uni-between-item" style="padding: 0upx 40upx; margin-bottom: 40upx; font-size: 24upx;">
			<div class="uni-between-item yong_jin">
				<image src="../../static/img/yong_jin_icon.png" mode=""></image>
				<span>交强险佣金</span>
			</div>
			<span>{{ci_commission}}元</span>
		</div>
		
		<div class="yong_jin_money uni-between-item">
			<span>佣金合计（税前）</span>
			<span>
				<span style="font-size: 52upx; color: #F30000">{{all_commission}}</span>
				<span>元</span>
			</span>
		</div>
		
		
		<div class="title uni-between-item">
			<span>商业险</span>
			<span class="change" @tap="changeBill">调整</span>
		</div>
		
		<div class="content_wrap">
			<block v-for="(ite, index) in list" :key="index">
				<div class="content_item uni-between-item">
					<div class="uni-between-item content_item_wrap">
						<span v-if="ite.value != '不投保'">{{ite.name}}</span>
						<span class="tag" v-if="ite.value != '不投保'">不计免赔</span>
						<span v-else>{{ite.name}}</span>
					</div>
					
					<div>{{ite.value}}</div>
				</div>
			</block>	
			
			
		</div>
		
		
		<div class="title uni-between-item">
			<span>车主信息</span>
		</div>
		
		<div class="content_wrap">
			<div class="content_item uni-between-item">
				<span>姓名</span>
				
				<div>{{name}}</div>
			</div>
			
			<div class="content_item uni-between-item">
				<span>手机号</span>
				
				<div>{{trueMobile}}</div>
			</div>
			
			<div class="content_item uni-between-item">
				<span>身份证号</span>
				<div>{{trueIdcard}}</div>
			</div>
		</div>
		
		<div class="title uni-between-item">
			<span>车辆信息</span>
		</div>
		
		<div class="content_wrap" style="border-bottom: 2upx solid rgba(0,0,0,0.1); padding-bottom: 60upx;">
			<div class="content_item uni-between-item">
				<span>车牌号码</span>
				
				<div>{{license_no}}</div>
			</div>
			
			<div class="content_item uni-between-item">
				<span>品牌型号</span>
				
				<div>{{brand}}</div>
			</div>
			
			<div class="content_item uni-between-item">
				<span>车辆识别代码</span>
				<div>{{trueVin}}</div>
			</div>
			
			<div class="content_item uni-between-item">
				<span>发动机号码</span>
				
				<div>{{trueEngineNo}}</div>
			</div>
			
			<div class="content_item uni-between-item">
				<span>注册日期</span>
				<div>{{first_reg_date}}</div>
			</div>
			
		</div>


		  <div class=" button" @click="next">代缴保费</div>
		  
		<div class=" button changeBtn" @click="goToErWeiMa">生成付款二维码并转发</div>
		
	</div>
</template>

<script>
	import { BASE_IMAGE_URL,getQuotations,applyUnderwrite,H5login } from "@/utils/api";
	import {isWeiXin} from "@/utils/index.js"
	
	export default {
	  data () {
		return {
				global: {},
				item: {
					quote_details: {
						excluding: true,
						liability: '不投保',
						driver_seat: '不投保',
						passenger_seat: '不投保',
					},
				},
				quote_result: {},
				trueMobile: '',
				trueIdcard: '',
				name: '',
				license_no: '',
				brand: '',
				trueVin: '',
				trueEngineNo: '',
				first_reg_date: '',
				city_name: '',
				monthly_expense: '',
				mileage_expense: '',
				compulsory: '',
				tax: '',
				list: [],
				isChecked: false,
				companyNameList: ['安盛天平', '天安财险', '大地保险'],
				companyLogo: [BASE_IMAGE_URL+'an_sheng.png', BASE_IMAGE_URL+'tian_an.png', BASE_IMAGE_URL+'da_di.png'],
				company_logo: '',
				company_name: '',
				ci_commission: 0,
				bi_commission: 0,
				all_commission: 0
			}
	  },

	  methods: {
		  async H5login(){
				let params = {
					partner_id: uni.getStorageSync("partner_id"),
					imei: uni.getStorageSync("imei")
				};
				
				let res = await H5login(params);
				if(res.code == 200){
					let token = res.data.token;
					console.log(token);
					if(token){
						uni.setStorageSync('token', token);
					}
					
				}
			},
			
		  changeChecked: function(){
			this.isChecked = !this.isChecked;  
		  },
		next: function(){
		  let openid = uni.getStorageSync("openid");
			console.log(openid);
			
			if(!isWeiXin()){
				uni.removeStorageSync("openid");
			}
		
			if(!openid){
				if(isWeiXin()){
					//如果是微信浏览器 去获取openid
					let partner_id = uni.getStorageSync("partner_id");
					let imei = uni.getStorageSync("imei");
					window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx49aad3a138063b53&redirect_uri=https://api.kaikaibao.com.cn/3.1/getoauth?redit_url=https%3a%2f%2fm.kaikaibao.com.cn%2flccx2%2findex.html%23%2fpages%2fpay_address%2fpay_address%3fquotation_id%3d"+this.quotation_id+"%26partner_id%3d"+partner_id+"%26imei%3d"+imei+"&response_type=code&scope=snsapi_base&state=1&connect_redirect=1#wechat_redirect";
				}else{
					const url = '../pay_address/pay_address?quotation_id='+this.quotation_id;
					uni.navigateTo({ url })
				}
			}else{
				const url = '../pay_address/pay_address?quotation_id='+this.quotation_id;
				uni.navigateTo({ url })
			}
		},
		goToErWeiMa: function(){
		  const url = '../er_wei_ma/er_wei_ma?quotation_id='+this.quotation_id;
		  uni.navigateTo({ url })
		},
		changeBill: function(){
      const url = '../quote_bill/quote_bill';
      wx.navigateTo({ url })
    },

		async applyUnderwrite(){
			if(!this.isChecked){
				wx.showToast({
						icon: 'none',
						title: '请同意服务协议',
						duration: 1000
					});
				return;
			}
			
			// "insurer": this.item.quote_result.data[0].insurerCode,
      //   "biz_id": this.item.biz_id,
		  let params = {
			"insurer": 'ASTP',
        "biz_id": this.item.biz_id?this.item.biz_id:'53800845',
			"channel_code": "QUANLIAN_PROXY_INSURE",
			"address_name": this.global.name,
			"address_mobile": this.global.mobile,
			"address_details": "路",
			"address_county": "110112",
			"address_city": "110100",
			"address_province": "110000",
			"policy_email": "caingougou@qq.com"
		  };

		  let res = await applyUnderwrite(params);
		  if(res.code == 200){
			this.monthly_expense = this.item.monthly_expense;
			this.mileage_expense = this.item.mileage_expense;
			this.compulsory = parseInt(this.item.compulsory);
			this.compulsory = this.compulsory?this.compulsory:'';
			this.tax = parseInt(this.item.tax);
			this.tax = this.tax?this.tax:'';
			uni.setStorageSync('global', this.global);
			this.next();
		  }
		},

		async getQuotations(){
				let res = await getQuotations(this.quotation_id);
				if(res.code == 200){
					this.item = res.data;
					// this.ci_commission = parseFloat(res.data.ci_commission).toFixed(2);
					// this.bi_commission = parseFloat(res.data.bi_commission).toFixed(2);
					this.all_commission = parseFloat(parseFloat(this.ci_commission) + parseFloat(this.bi_commission)).toFixed(2);
					
					this.ci_commission = parseFloat(res.data.ci_commission).toFixed(2);
					this.bi_commission = parseFloat(res.data.bi_commission).toFixed(2);
					this.all_commission = parseFloat(this.ci_commission + this.bi_commission).toFixed(2);
					this.all_commission = parseFloat(parseFloat(this.ci_commission) + parseFloat(this.bi_commission)).toFixed(2);
					
					
					if(this.item.company){
					  if(this.item.company == "ASTP"){
						this.company_name = this.companyNameList[0];
						this.company_logo = this.companyLogo[0];
					  }else if(this.item.company == "TAIC"){
						this.company_name = this.companyNameList[1];
						this.company_logo = this.companyLogo[1];
					  }else if(this.item.company == 'CCIC'){
						this.company_name = this.companyNameList[2];
						this.company_logo = this.companyLogo[2];
					  }else{
						this.company_name = this.companyNameList[2];
						this.company_logo = this.companyLogo[2];
					  }
					}
		

					this.monthly_expense = this.item.monthly_expense;
					this.mileage_expense = this.item.mileage_expense;
					this.compulsory = parseInt(this.item.compulsory);
					this.compulsory = this.compulsory?this.compulsory:'';
					this.tax = parseInt(this.item.tax);
					this.tax = this.tax?this.tax:'';
					this.city_name = this.item.city_name;

					console.log(this.item.quote_details);
					this.item.quote_details = JSON.parse(this.item.quote_details);
					// this.item.quote_details = JSON.parse(this.item.quote_details);
					console.log(this.item.quote_details);

					if(!this.item.quote_details){
						this.item.quote_details.excluding = true;
					}else{
						this.list = [];
						let that = this;
					Object.keys(this.item.quote_details).forEach(function(key){
							let itemKey = that.item.quote_details[key];
							
								let params = {};
								if(key == 'burn'){
									params.name = '自燃险';
								}else if(key == 'destroy'){
									params.name = '车损险';
								}else if(key == 'stolen'){
									params.name = '盗抢险';
								}else if(key == 'liability'){
									params.name = '第三者责任险';
								}else if(key == 'driver_seat'){
									params.name = '司机座位险';
								}else if(key == 'passenger_seat'){
									params.name = '乘客座位险';
								}else if(key == 'stolen'){
									params.name = '盗抢险';
								}else if(key == 'glasses'){
									params.name = '玻璃险';
								}else if(key == 'scratch'){
									params.name = '刮痕险';
								}else if(key == 'water'){
									params.name = '涉水险';
								}else if(key == 'escape'){
									params.name = '无法找到第三方险';
								}else if(key == 'lights'){
									params.name = '车灯险';
								}else if(key == 'compulsory'){
									params.name = '交强险';
								}else if(key == 'no_3rd_party'){
									params.name = '无法找到第三方特约险';
								}
								
								if(((typeof(that.item.quote_details[key]) == 'boolean') && (that.item.quote_details[key]))){
									  //返回true
									  params.value = "投保";
								  }else if(((typeof(that.item.quote_details[key]) == 'boolean') && (that.item.quote_details[key]) == false)){
									params.value = "不投保";
								  }else if(key == 'glasses'){
									params.value = that.item.quote_details[key] == 1? '国产玻璃':'进口玻璃';
								  }else{
									params.value = parseInt(that.item.quote_details[key]);
									if(params.value > 10000){
									  params.value = params.value/10000 + "万";
									}
								  }
								  if(key == 'excluding' || key == 'compulsory'){
									
								  }else if(((typeof(that.item.quote_details[key]) == 'boolean') && (that.item.quote_details[key]) == false)){

								  }else{
									that.list.push(params);
								  }

					});
				
					}

					console.log('this.item.quote_details');
					console.log(this.item.name);
					this.name = this.item.name;
					if(this.item.mobile){
						this.trueMobile = this.item.mobile.substring(0,3)+"****"+this.item.mobile.substring(7,11);
					}

					if(this.item.idcard){
						this.trueIdcard = this.item.idcard.substring(0,3)+"***********"+this.item.idcard.substring(14,18);
					}

					if(this.item.vin){
						this.trueVin = this.item.vin.substring(0,3)+"***********"+this.item.vin.substring(this.item.vin.length-3,this.item.vin.length);
					}

					if(this.item.engine_no){
						this.trueEngineNo = this.item.engine_no.substring(0,1)+"****"+this.item.engine_no.substring(this.item.engine_no.length-1,this.item.engine_no.length);
					}
					this.license_no = this.item.license_no;
					this.brand = this.item.brand;
					this.first_reg_date = this.item.first_reg_date;

					console.log(this.item);
					this.global.biz_id = this.item.biz_id;
					console.log('this.item.quote_details');
					console.log(this.item);
					this.$forceUpdate();
				}
			},
			
			async H5login(){
				let partner_id = uni.getStorageSync("partner_id");
				let imei = uni.getStorageSync("imei");
				let params = {
					partner_id: partner_id,
					imei: imei
				};
				
				let res = await H5login(params);
				if(res.code == 200){
					let token = res.data.token;
					console.log(token);
					if(token){
						uni.setStorageSync('token', token);
					}
					this.getQuotations();
				}
			},
			
			getQueryString(name) {
				var reg = new RegExp("[?&]" + name + "=([^&#]*)", "i");
				var res = window.location.href.match(reg);
			 
				if( res && res.length>1 ){
					return decodeURIComponent(res[1]);
				}
				return '';
			}
			
		},
	  onLoad(){
		this.quotation_id = this.getQueryString("quotation_id");
		if(!this.quotation_id){
			this.global = uni.getStorageSync("global");
			if(!this.global.quotation_id){
				this.quotation_id = this.$root.$mp.query.quotation_id;
			}else{
				this.quotation_id = this.global.quotation_id;
			}
		}
		
		let openid = uni.getStorageSync("openid");
		if(!openid){
			openid = this.$root.$mp.query.openid;
			if(openid){
				uni.setStorageSync("openid", openid);
			}
		}
		
		this.H5login();
		
		// let token = uni.getStorageSync("token");
		// if(!token){
		// 	this.H5login();
		// }else{
		// 	this.getQuotations();
		// }
		
	  }
	  

	}
</script>

<style>
	.contain{
		width: 100%;
	}
	.header{
		margin-top: 60upx;
		width: 100%;
		padding: 0upx 40upx;
		box-sizing: border-box;
	}
	.brand_wrap{
		display: flex;
		flex-direction: column;
	}
	
	.brand_wrap img{
		width: 124upx;
		height: 34upx;
	}
	
	.brand_wrap span{
		color: #000000;
		font-size: 32upx;
	}
	
	.price {
	  color: #f00;
	  font-size: 32upx;
	  text-align: right;
	  display: flex;
	  flex-direction: column;
	  
	}
	.price .name{
		font-size: 28upx;
		color: #BBBBBB;
	  }
	  
	  .address_wrap{
		  width: 100%;
		  box-sizing: border-box;
		  padding: 40upx;
		  font-size: 30upx;
		  color: #676767;
	  }
	  
	  .title {
		  border-left: #427DFF 10upx solid;
		  padding: 0upx 30upx;
		  font-size: 34upx;
		  color: #3D3D3D;
		  font-weight: 600;
		  background-color: #F9F9F9;
		  height: 70upx;
		  line-height: 70upx;
		  box-sizing: border-box;
		}
		
		.change {
  text-align: right;
  color: #427DFF;
  font-size: 28upx;
}

.content_wrap{
	width: 100%;
	box-sizing: border-box;
	background-color: #FFFFFF;
	padding: 10upx 40upx 30upx;
	font-size: 30upx;
	color: #676767;
}

.yong_jin_money{
	font-size: 30upx;
	color: #676767;
	padding: 0upx 40upx;
	margin-bottom: 30upx;
}

.content_item{
	margin-top: 10upx;
}

.content_item_wrap{
	min-width: 300upx;
}

.content_item_wrap span:nth-child(1){
	min-width: 200upx;
}

.content_item .tag{
	font-size: 20upx;
	color: #FF4242;
	background-color: #FFF2EC;
	border-radius: 6upx;
	padding: 0upx 10upx;
	margin-left: 32upx;
}

.license {
  padding: 20upx 40upx 0upx;
  border-top: 1upx solid #E4E4E4;
	display: flex;flex-direction: row;align-items: center;
	color: #292929;
	font-size: 28upx;
}

.link{
  color: #427DFF;
}

.yong_jin image{
	width: 24upx;
	height: 24upx;
	margin-right: 10upx;
}

.button{
  margin: 40upx 5%;
  width: 90%;
  height: 94upx;
  line-height: 94upx;
  color: #ffffff;
  background-color: #427DFF;
  border-radius: 10upx;
  text-align: center;
  box-sizing: border-box;
    
}

.changeBtn{
	color: #427DFF;
	background-color: #FFFFFF;
	border: 2upx solid #427DFF;
}

checkbox .wx-checkbox-input{
   border-radius: 50%;/* 圆角 */
   width: 30upx; /* 背景的宽 */
   height: 30upx; /* 背景的高 */
}
/* 选中后的 背景样式 （红色背景 无边框 可根据UI需求自己修改） */
checkbox .wx-checkbox-input.wx-checkbox-input-checked{
   border: none;
   background: #427DFF;
   padding: 3upx;
}
/* 选中后的 对勾样式 （白色对勾 可根据UI需求自己修改） */
checkbox .wx-checkbox-input.wx-checkbox-input-checked::before{
   border-radius: 50%;/* 圆角 */
   width: 30upx;/* 选中后对勾大小，不要超过背景的尺寸 */
   height: 30upx;/* 选中后对勾大小，不要超过背景的尺寸 */
   line-height: 30upx;
   text-align: center;
   font-size:20upx; /* 对勾大小 30upx */
   color:#fff; /* 对勾颜色 白色 */
   background: transparent;
   transform:translate(-50%, -50%) scale(1);
   -webkit-transform:translate(-50%, -50%) scale(1);
}

</style>
