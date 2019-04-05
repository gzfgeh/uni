<template>
	<div class="contain">
		
		<div class="header uni-between-item">
			
			<div class="brand_wrap">
				<img src="../../static/img/baoxian_icon.png" >
				<span>大地车险</span>
			</div>
			
			<div class="price">
				<span>{{item.monthly_expense}}元/月+{{item.mileage_expense}}元/公里</span>
				<span class="name">交强险 {{item.compulsory}}元+车船税 {{item.tax}}元</span>
			</div>
			
		</div>
		
		<div class="address_wrap uni-between-item">
			<span>投保地区</span>
			<span>{{item.city_name}}</span>
		</div>
		
		<div class="title uni-between-item">
			<span>商业险</span>
			<span class="change" @tap="changeBill">调整</span>
		</div>
		
		<div class="content_wrap">
			<div class="content_item uni-between-item">
				<div>
					<span>机动车损失险</span>
					<span class="tag" v-if="item.quote_details.excluding">不计免赔</span>
				</div>
				
				<div>{{item.quote_details.destroy?'投保':'不投保'}}</div>
			</div>
			
			<div class="content_item uni-between-item">
				<div>
					<span>第三者责任险</span>
					<span class="tag" v-if="item.quote_details.excluding" >不计免赔</span>
				</div>
				
				<div>{{item.quote_details.liability}}</div>
			</div>
			
			<div class="content_item uni-between-item">
				<span>司机责任险</span>
				<div>{{item.quote_details.driver_seat}}</div>
			</div>
			
			<div class="content_item uni-between-item">
				<span>乘客责任险</span>
				<div>{{item.quote_details.passenger_seat}}</div>
			</div>
			
			
		</div>
		
		
		<div class="title uni-between-item">
			<span>车主信息</span>
		</div>
		
		<div class="content_wrap">
			<div class="content_item uni-between-item">
				<span>姓名</span>
				
				<div>{{item.name}}</div>
			</div>
			
			<div class="content_item uni-between-item">
				<span>手机号</span>
				
				<div>{{item.trueMobile}}</div>
			</div>
			
			<div class="content_item uni-between-item">
				<span>身份证号</span>
				<div>{{item.trueIdcard}}</div>
			</div>
		</div>
		
		<div class="title uni-between-item">
			<span>车辆信息</span>
		</div>
		
		<div class="content_wrap" style="border-bottom: 2upx solid rgba(0,0,0,0.1); padding-bottom: 60upx;">
			<div class="content_item uni-between-item">
				<span>车牌号码</span>
				
				<div>{{item.license_no}}</div>
			</div>
			
			<div class="content_item uni-between-item">
				<span>品牌型号</span>
				
				<div>{{item.brand}}</div>
			</div>
			
			<div class="content_item uni-between-item">
				<span>车辆识别代码</span>
				<div>{{item.trueVin}}</div>
			</div>
			
			<div class="content_item uni-between-item">
				<span>发动机号码</span>
				
				<div>{{item.trueEngineNo}}</div>
			</div>
			
			<div class="content_item uni-between-item">
				<span>注册日期</span>
				<div>{{item.first_reg_date}}</div>
			</div>
			
		</div>
		
		<div class="license">
			<radio  :checked="true" color="#427DFF">我已阅读并同意</radio>

			<text class="link">《服务协议》</text>
		  </div>


		  <div class=" button" @click="applyUnderwrite">我要投保</div>
  
		
	</div>
</template>

<script>
	import { BASE_IMAGE_URL,getQuotations,applyUnderwrite } from "@/utils/api";
	
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
				monthly_expense: 40,
				mileage_expense:0.07,
				compulsory:650,
				tax:320,
			}
	  },

	  methods: {
		next: function(){
		  const url = '../pay_address/pay_address';
		  uni.navigateTo({ url })
		},
		changeBill: function(){
      const url = '../quote_bill/quote_bill';
      wx.navigateTo({ url })
    },

		async applyUnderwrite(){
			// "insurer": this.item.quote_result.data[0].insurerCode,
      //   "biz_id": this.item.biz_id,
		  let params = {
			"insurer": 'ASTP',
        "biz_id": '53800845',
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

		async getQuotations(){
		  let res = await getQuotations(this.global.quotation_id);
		  if(res.code == 200){
			  console.log(res.data);
				this.item = res.data;
				
				this.monthly_expense = this.item.monthly_expense;
				this.mileage_expense = this.item.mileage_expense;
				this.compulsory = this.item.compulsory;
        this.tax = this.item.tax;
        this.city_name = this.item.city_name;
				
				console.log(this.item.quote_details);
        this.item.quote_details = JSON.parse(this.item.quote_details);
        console.log(this.item.quote_details);
				
				if(!this.item.quote_details){
          this.item.quote_details.excluding = true;
        }else{
          this.item.quote_details.excluding = this.item.quote_details.excluding == "true";

          if((this.item.quote_details.liability) 
              && (parseInt(this.item.quote_details.liability) >= 10000)){
            this.item.quote_details.liability = parseInt(this.item.quote_details.liability/10000)+"万";
          }else{
            this.item.quote_details.liability = "不投保";
          }

          if((this.item.quote_details.driver_seat) 
              && (parseInt(this.item.quote_details.driver_seat) >= 10000)){
            this.item.quote_details.driver_seat = parseInt(this.item.quote_details.driver_seat/10000)+"万";
          }else{
            this.item.quote_details.driver_seat = '不投保'
          }

          if((this.item.quote_details.passenger_seat)
            && (parseInt(this.item.quote_details.passenger_seat) >= 10000)){
            this.item.quote_details.passenger_seat = parseInt(this.item.quote_details.passenger_seat/10000)+"万";
          }else{
            this.item.quote_details.passenger_seat = '不投保'
          }
      
        }
				
				this.name = this.item.name;
				if(this.item.mobile){
					this.item.trueMobile = this.item.mobile.substring(0,3)+"****"+this.item.mobile.substring(7,11);
				}

				if(this.item.idcard){
					this.item.trueIdcard = this.item.idcard.substring(0,3)+"***********"+this.item.idcard.substring(14,18);
				}

				if(this.item.vin){
					this.item.trueVin = this.item.vin.substring(0,3)+"***********"+this.item.vin.substring(this.item.vin.length-3,this.item.vin.length);
				}

				if(this.item.engine_no){
					this.item.trueEngineNo = this.item.engine_no.substring(0,1)+"****"+this.item.engine_no.substring(this.item.engine_no.length-1,this.item.engine_no.length);
				}

				this.license_no = this.item.license_no;
        this.brand = this.item.brand;
        this.first_reg_date = this.item.first_reg_date;

				console.log(this.item);
				this.global.biz_id = this.item.biz_id;
				this.item.quote_result = JSON.parse(this.item.quote_result);
				this.$forceUpdate();
				}
			}

	  },

	  onLoad(){
		this.global = uni.getStorageSync("global");
		this.getQuotations();
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
	display: flex;flex-direction: row;align-items: center;
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
