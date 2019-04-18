<template>
<div class="container_wrap container-fill">
  
  <div class="wrap">
    <div class="info_title">
      <span class="circle active">1</span>
      <span style="margin:0rpx 12rpx 0rpx 10rpx;">服务费用</span>
      <span class="line active"></span>
      <span class="circle active">2</span>
      <span>交强险</span>
    </div>


    <div class="item_wrap">
      <span class="item_text">交强险：</span>
      <span class="item_right">{{global.compulsory}}元</span>
    </div>

    <div class="item_wrap">
      <span class="item_text">车船税：</span>
      <span class="item_right">{{global.tax}}元</span>
    </div>
    
  </div>

 <div class="info" >支付方式</div>
  <radio-group @change="radioChange">
        <label class="item_wrap" v-for="(item, index) in items" :key="index">
            <view class="radio_wrap">
              <img :src="item.icon_url" >
              <span class="price">{{item.name}}</span>
            </view>
            <view>
                <radio  checked color="#427DFF"/>
            </view>
            
        </label>
    </radio-group>

  <div class="bottom_info">
      <span class="star">*</span>
      <span>交强险与车船税将直接支付给指定保险公司</span>
    </div>
  
  <div class="bottom_wrap">
    <div class="bottom_left">
      <span>实付</span>
      <span class="bottom_money">¥400</span>
    </div>
    <span class="bottom_right" @click="pay">立即支付</span>
  </div>
  

</div>
</template>
<script>
import { BASE_IMAGE_URL,pay} from "@/utils/api";

export default {
  data () {
    return {
      jiaoqiang_order_id: '',
      global: {
				compulsory: 200,
				tax: 200
			},
      items: [
        {name: '微信支付', icon_url: BASE_IMAGE_URL+'weixin_pay.png'}
      ],
			currentIndex: 0
    }
  },

  methods: {
    next () {
//       wx.navigateTo({
//         url: "../pay_two/pay_two"
//       })
    },

    async pay(){
			window.location.href = "http://chexian.axatp.com/template/policy/pay/payRequest.html?ecInsureId=10900019041579255057&external=true";
			return;
			
      this.global.address = this.global.address?this.global.address:"address";
      let params = {
        name: this.global.name,
        mobile: this.global.mobile,
        address: this.global.address,
        paytype: 2,
        openid: wx.getStorageSync("openid")
      };

      let res = await pay(this.jiaoqiang_order_id, params);
      if(res.success){
        let result = res.result;
        console.log(result);
        console.log(result.timestamp);
				window.location.href = result.payLink;
				
				return;
		};
    }

  },

  onLoad () {
    this.global = wx.getStorageSync("global");
    this.jiaoqiang_order_id = this.$root.$mp.query.jiaoqiang_order_id;
    this.jiaoqiang_order_id = this.jiaoqiang_order_id ? this.jiaoqiang_order_id : 4;
  },

}
</script>

<style lang="scss" scoped>
.container_wrap {
  background-color: #F9F9F9;
  height: 100%;
	width: 100%;
}

.bottom_info{
  display: flex;
  flex-direction: row;
  font-size: 28rpx;
  color: rgba(0,0,0,0.4);
  margin: 14rpx 40rpx;
  .star{
    color: #FF0000;
    margin-right: 8rpx;
  }
}

.input_wrap{
  display: flex;
  flex-direction: column;
  padding: 0rpx 40rpx 20rpx;
  .input_info{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 30rpx;
  }
}
.info{
  font-size: 28rpx;
  color: rgba(7,7,7,0.4);
  padding: 30rpx 40rpx 10rpx;
}
.wrap{
  background-color: #FFFFFF;
}
.item_wrap{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #FFFFFF;
  padding: 30rpx 40rpx;
  border-bottom: 1px solid #f2f2f2;
  .item_text{
    font-size: 28rpx;
    color: #000;
  }
  .item_info{
    font-size: 28rpx;
    color: #6E6E6E;
  }
  
  .item_title{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .item_service{
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 24rpx;
    color: #6E6E6E;
    img{
      width: 26rpx;
      height: 26rpx;
      margin-right: 4rpx;
    }
  }
}
.item_right{
    font-size: 28rpx;
    color: #6E6E6E;
  }

.info_title{
  color: rgba(0,0,0,0.7);
  font-size: 34rpx;
  background-color: #F9F9F9;
  height: 108rpx;
  border-bottom: 1px solid #f2f2f2;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 40rpx;
  box-sizing: border-box;
  .circle{
    border-radius: 50%;
    width: 32rpx;
    height: 32rpx;
    text-align: center;
    line-height: 32rpx;
    background-color: rgba(0,0,0,0.1);
    color: #FFFFFF;
    font-size: 28rpx;
    margin-right: 8rpx;
    
  }
  .active{
    background-color: #427DFF!important;
  }
  .line{
    width: 40rpx;
    height: 2rpx;
    background-color: #D6D6D6;
    margin-right: 12rpx;
  }
}

.content_wrap{
  width: 90%;
  margin: -180rpx 5% 0rpx;
  height: 332rpx;
  background-color: #FFFFFF;
  border-radius: 20rpx;
  box-shadow: 0rpx 0rpx 20rpx 0rpx #EAEAEA;
  padding: 0rpx 16rpx;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
}

.content_item{
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #000000;
  font-size: 34rpx;
  height: 166rpx;
  padding: 0rpx 24rpx;
  
  .text{
    color: #427DFF;
    font-size: 24rpx;
  }
}

.row_item{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.arraw{
    width: 18rpx;
    height: 18rpx;
    border-top: 6rpx solid #D9D9D9;
    border-right: 6rpx solid #D9D9D9;
    transform: rotate(45deg);
    margin-left: 10rpx;
  }

  .place-holder{
  font-size: 28rpx;
  color: #b2b2b2;
}

.button{
  margin: 40rpx 5%;
  width: 90%;
  height: 94rpx;
    line-height: 94rpx;
    color: #ffffff;
    background-color: #427DFF;
    border-radius: 10rpx;
    text-align: center;
    position: absolute;
    bottom: 0rpx;
}

.bottom_wrap{
  width: 100%;
  position: fixed;
  bottom: 0rpx;
  left: 0rpx;
  border-top: 1px solid #CCCCCC;
  height: 120rpx;
  line-height: 120rpx;
  color: #000000;
  font-size: 28rpx;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: row;
  .bottom_left{
    padding-left: 44rpx;
    flex: 2;
  }
  .bottom_right{
    flex: 1;
    background-color: #427DFF;
    color: #FFFFFF;
    font-size: 30rpx;
    text-align: center;
  }
  .bottom_money{
    color: #f00;
    margin-left: 8rpx;
  }
}

radio-group{
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
}

.radio_wrap{
  display: flex;
  flex-direction: row;
  align-items: center;
}

.radio_wrap img{
  width: 32rpx;
  height: 32rpx;
  margin-right: 10rpx;
}
</style>