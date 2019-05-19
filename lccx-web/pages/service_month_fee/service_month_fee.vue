<template>
<div >
  <div class="head_wrap">
    <div>每月服务费</div>
    <div>本服务包不包含交强险与车船税价格</div>
    <div>（交强险 {{ci_prenium}}元+车船税{{tax}}元）</div>
  </div>

  <div class="price_wrap">
    <div class="price_item">
      <span class="price_text">基础服务费</span>
      <div class="item">
        <span>¥</span>
        <span class="num">{{monthly_expense}}</span>
        <span>/月</span>
      </div>
    </div>
    <span class="add_icon">+</span>
    <div class="price_item">
      <span class="price_text">基础服务费</span>
      <div class="item">
        <span>¥</span>
        <span class="num">{{mileage_expense}}</span>
        <span>/公里</span>
      </div>
    </div>
  </div>

  <div class="content_wrap">
    <span class="line"></span>
    <span>服务提醒</span>
  </div>
  
  <div class="service_wrap">
	  <img src="../../static/img/month_fee_group.png" style="width: 100%;">
	  
	  <div class="service_look">
	    <span>点击查看</span>
	    <span style="color: #427DFF;">《服务条款》</span>
	  </div>
	  
	  <div class=" button" @tap="applyUnderwrite">下一步</div>
	  
  </div>
	
	<div class="modal-mask" @tap="hideModal" v-if="showModal"></div>
      <div class="modal-dialog" v-if="showModal">
      <div class="modal-title">报价失败</div>
      <div class="modal-content">
        请确认您的爱车是否已进入投保期。若仍报价失败，请稍后重试。
      </div>
      <div class="modal-footer" >
        <div class="btn_wrap" hover-class="btn_hover" @click="closeModal">
          
          <span>返回</span>
        </div>
      </div>
    </div>
		
		<div class="modal-mask" @tap="hideHeModal" v-if="showHeModal"></div>
		    <div class="modal-dialog" v-if="showHeModal">
					<div class="modal_head_img">
						<image src="../../static/img/he_bao_icon.png" mode="widthFix" style="width: 68upx;"/>
		    
					</div>
				<div class="modal-title" style="padding-top: 20upx; margin-bottom: 60upx;">核保失败</div>
		    <div class="modal-footer" >
		      <div class="btn_wrap" hover-class="btn_hover" @click="closeHeModal">
		        
		        <span>返回报价</span>
		      </div>
		    </div>
		  </div>
		

</div>
</template>
<script>

import { BASE_IMAGE_URL,result,H5login,applyUnderwrite } from "@/utils/api";

export default {
  data () {
    return {
      global: '',
      item: '',
      showModal: false,
			monthly_expense: '',
			mileage_expense: '',
			ci_prenium: '',
			tax: '',
			showHeModal: false
    }
  },

  methods: {
		hideHeModal: function(){
			this.showHeModal = false;
		},
		closeHeModal: function(){
			this.showHeModal = false;
			uni.navigateBack({
					delta: 4
			})
		},
    next () {
			// const url = '../service_confirm_new/service_confirm_new';
			// 	uni.navigateTo({ url })
			// 	return;
				
			let isagent= uni.getStorageSync("isagent");
			if(isagent){
				const url = '../service_confirm_new/service_confirm_new';
				uni.navigateTo({ url })
			}else{
				const url = '../service_confirm/service_confirm';
				uni.navigateTo({ url })
			}
      
    },
		async applyUnderwrite(){
					
					// "insurer": this.item.quote_result.data[0].insurerCode,
		//   "biz_id": this.item.biz_id?this.item.biz_id:'53800845'
				  let params = {
					"insurer": 'ASTP',
					"biz_id": this.item.details.data[0].bizID,
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
				  if((res.code == 200) && (res.data.state == "1")){
						this.monthly_expense = this.item.monthly_expense;
						this.mileage_expense = this.item.mileage_expense;
						this.tax = parseInt(this.item.tax);
						this.tax = this.tax?this.tax:'';
						uni.setStorageSync('global', this.global);
						this.next();
				  }else{
						this.showHeModal = true;
					}
				},
				
    async result(){
      let res = await result(this.global.quotation_id);
      if(res.code == 200){ 
        this.item = res.data; 
				console.log(this.item.details);
        if(this.item && (parseInt(this.item.details.state) == 1)){
          this.monthly_expense = this.item.monthly_expense.toFixed(2);
          this.mileage_expense = this.item.mileage_expense.toFixed(2);
          this.ci_prenium = parseInt(this.item.ci_prenium);
          this.tax = parseInt(this.item.tax);
        }else{
          this.showModal = true;
          this.monthly_expense = '';
          this.mileage_expense = '';
          this.ci_prenium = '';
          this.tax = '';
        }
        
      }else{
				this.showModal = true;
				this.monthly_expense = '';
          this.mileage_expense = '';
          this.ci_prenium = '';
          this.tax = '';
        wx.showToast({
						icon: 'none',
						title: '报价失败',
						duration: 1000
					});
      }
    },
    closeModal: function(){
      this.showModal = false;
			uni.navigateBack({
					delta: 1
			})
    },
		async H5login(){
				let params = {
					partner_id: this.$root.$mp.query.partner_id,
					imei: this.$root.$mp.query.imei
				};
				
				let res = await H5login(params);
				if(res.code == 200){
					let token = res.data.token;
					console.log(token);
					if(token){
						uni.setStorageSync('token', token);
					}
					this.result();
				}
			},
  },

  onLoad () {
    this.global = uni.getStorageSync("global");
		if(!this.global.quotation_id){
			this.global.quotation_id = this.$root.$mp.query.quotation_id;
		}
		
		let token = uni.getStorageSync("token");
		if(!token){
			this.H5login();
		}else{
			this.result();
		}
    
  },

}
</script>

<style >
  .head_wrap{
    padding: 60upx 0upx 40upx;
    width: 100%;
    box-sizing: border-box;
    text-align: center;
    
  }
  .head_wrap .div{
      text-align: center;
    }

  .head_wrap>div:nth-child(1){
    font-weight: bold;
    color: #000000;
    font-size: 50upx;
  }

  .head_wrap>div:nth-child(2){
    font-size: 28upx;
    color: #717171;
  }

  .head_wrap>div:nth-child(3){
    font-size: 24upx;
    color: #BBBBBB;
  }

  .price_wrap{
    width: 92%;
    margin-left: 4%;
    height: 252upx;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .price_item{
    width: 316upx;
    height: 232upx;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border-radius: 20upx;
    box-shadow: 0upx 0upx 20upx 0upx #EAEAEA;
    padding: 30upx 0upx;
    box-sizing: border-box;
    
  }
  
  .price_item .item{
      font-size: 24upx;
      
    }
	
	.price_item .item .num{
        font-size: 60upx;
        color: #E30000;
        margin: 0upx 5upx;
      }

  .add_icon{
    color: #E30000;
  }

  .price_text{
    font-size: 28upx;
    color: #BBBBBB;
  }

  .content_wrap{
    color: #000000;
    font-weight: bold;
    margin-left: 5%;
    padding: 0upx 14upx;
    margin-top: 40upx;
    display: flex;
    flex-direction: row;
    align-items: center;
    
  }
  
  .content_wrap .line{
      display: inline-block;
      width: 10upx;
      height: 100%;
      background-color: #427DFF;
      height: 30upx;
      margin-right: 20upx;
    }

  .service_wrap{
    width: 90%;
    margin-left: 5%;
    margin-top: 20upx;
  }
  
  .service_wrap .service_item{
      border: 1px solid #F4F4F4;
      display: flex;
      flex-direction: row;
      align-items: center;
      background-color: #FFB876;
      margin-bottom: 4upx;
      
    }
	
	.service_wrap .service_item .service_title{
        flex: 1;
        color: #FFFFFF;
        text-align: center;
      }
      .service_wrap .service_item .service_content{
        flex: 2;
        background-color: #FFFFFF;
        color: #424242;
        padding: 26upx 34upx;
        font-size: 24upx;
      }

  .service_look{
    font-size: 30upx;
    margin-top: 20upx;
    color: #676767;
  }

.button{
  margin: 40upx 0;
  width: 100%;
  height: 94upx;
  line-height: 94upx;
  color: #ffffff;
  background-color: #427DFF;
  border-radius: 10upx;
  text-align: center;
  box-sizing: border-box;
    
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
  z-index: 9000;
  color: #fff;
}

.modal-dialog {
  width: 80%;
  overflow: hidden;
  position: fixed;
  top: 15%;
  left: 0;
  z-index: 9999;
  background: #ffffff;
  margin: 10%;
  border-radius: 12upx;
}

.modal-title {
  padding-top: 50upx;
  font-size: 36upx;
  color: #000000;
  font-weight: bold;
  text-align: center;
}

.modal-content {
  padding: 40upx 52upx;
  font-size: 28upx;
  color: rgba(0,0,0,0.6)
}

.modal-footer {
  display: flex;
  flex-direction: row;
  font-size: 34upx;
}

.btn_wrap{
  width: 80%;
  height: 94upx;
  margin: 20upx 10%;
  background: #427DFF;
  border-radius: 12upx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #ffffff;
}

.btn_wrap img{
  width: 44upx;
  height: 44upx;
  margin-right: 12upx;
}

.btn_wrap span{
  font-size: 34upx;
}
.btn_hover{
  background: #0000FF;
}

.modal_head_img{
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	margin-top: 68upx;
}


</style>
