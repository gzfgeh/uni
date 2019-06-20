<template>
	<div class="contain">
		<div class="title_wrap">
			交强险
		</div>
		<div class="header uni-between-item">
			
			<div class="brand_wrap">
				<img :src="company_logo" mode="widthFix" :class="{'hidden': isHidden}">
        <span>{{company_name}}</span>
			</div>
			
			
			
		</div>
		
		<div class="content_wrap">
			<div class="content_item uni-between-item">
				<span>投保地区</span>
				<div>{{name}}</div>
			</div>
			
			<div class="content_item uni-between-item">
				<span>保障期限</span>
				<div>{{starts_on}} ~ {{ends_on}}</div>
			</div>
			
			<div class="content_item uni-between-item">
				<span>保单号：</span>
				<div>{{policyno}}</div>
			</div>
		</div>
		
		
		<div class="title uni-between-item">
			<span>交强险</span>
		</div>
		
		<div class="content_wrap">
			
			<div class="content_item uni-between-item">
				<span>交强险</span>
				<div>{{compulsory}}万</div>
			</div>
			
			<div class="content_item uni-between-item">
				<span>车船税</span>
				<div>{{tax}}万</div>
			</div>
			
			
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
		
		<div class="content_wrap" style=" padding-bottom: 20upx;">
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


		  <div class=" button" @click="applyUnderwrite">我要理赔</div>
  
		
	</div>
</template>

<script>
	import { BASE_IMAGE_URL,getOrders,applyUnderwrite } from "@/utils/api";
	
	export default {
	  data () {
		return {
		  global: {},
		  item: {
			quote_details: {}
		  },
		  quote_result: {},
		  order_id: 3,
		  list: [],
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
			starts_on: '',
			policyno: 0,
			ends_on: '',
			companyNameList: ['安盛天平', '天安财险', '大地保险'],
        companyLogo: [BASE_IMAGE_URL+'an_sheng.png', BASE_IMAGE_URL+'tian_an.png', BASE_IMAGE_URL+'da_di.png'],
        company_logo: '',
        company_name: '',
        isHidden: false
		}
	  },

	  methods: {
		next: function(){
		  const url = '../pay_address/main';
		  uni.navigateTo({ url })
		},

		async applyUnderwrite(){
		  let params = {
			"insurer": this.item.quote_result.data[0].insurerCode,
			"biz_id": this.item.biz_id,
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
			this.global.monthly_expense = this.item.monthly_expense;
			this.global.mileage_expense = this.item.mileage_expense;
			this.global.compulsory = this.item.compulsory;
			this.global.tax = this.item.tax;
			uni.setStorageSync('global', this.global);
			this.next();
		  }
		},

		async getOrders(){
			  let that = this;
			  let res = await getOrders();
			  if(res.code == 200){
				res.data.map((data) => {
				  if(data.id == that.order_id){
					this.item = data;
					this.item.quote_details = data.detail;

					if(this.item.insurance_company){
              if(this.item.insurance_company == "ASTP"){
                this.company_name = this.companyNameList[0];
                this.company_logo = this.companyLogo[0];
              }else if(this.item.insurance_company == "TAIC"){
                this.company_name = this.companyNameList[1];
                this.company_logo = this.companyLogo[1];
              }else if(this.item.insurance_company == 'CCIC'){
                this.company_name = this.companyNameList[2];
                this.company_logo = this.companyLogo[2];
              }else{
                this.company_name = '';
                this.isHidden = true;
              }
            }else{
              this.company_name = '';
                this.isHidden = true;
            }
						
						
					this.starts_on = this.item.starts_on;
					this.ends_on = this.item.ends_on;
					this.policyno = this.item.policyno;
					this.monthly_expense = this.item.monthly_expense;
					this.mileage_expense = this.item.mileage_expense;
					this.compulsory = parseInt(this.item.compulsory);
					this.tax = parseInt(this.item.tax);
					// this.city_name = this.item.city_name;

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
					this.brand = this.item.model;
					this.first_reg_date = this.item.registered_on;

					// console.log(this.item);
					// this.global.biz_id = this.item.biz_id;

					this.list = [];
					
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
				})
			  }
			},

	  },

	  onLoad(){
		this.global = wx.getStorageSync("global");
		this.order_id = this.$root.$mp.query.id;
		this.order_id = this.order_id ? this.order_id : 3;
		this.getOrders();
	  }

	}
</script>

<style>
	.contain{
		width: 100%;
	}
	.title_wrap{
		width: 100%;
		height: 94upx;
		line-height: 94upx;
		text-align: center;
		color: #070707;
		font-size: 34upx;
		border-bottom: 1px solid rgba(0,0,0,0.1);
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

.content_item{
	margin-top: 10upx;
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
}

.hidden{
  visibility: hidden;
}

.link{
  color: #427DFF;
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
