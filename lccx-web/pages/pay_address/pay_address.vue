<template>
<div class="container_wrap container-fill">
  
  <div class="wrap">
    <div class="info_title">付款信息</div>
    <div class="item_wrap">
      <div>
        <span class="item_text">设备押金：</span>
        <span class="item_info">（可退还）</span>
      </div>
      <span class="item_right">200元</span>
    </div>

    <div class="item_wrap">
      <div class="item_title">
        <span class="item_text">账户预存：</span>
        <div class="item_service">
          <img src="../../static/img/about.png" mode="widthFix">
          <span>服务费：40元/月+0.07元/公里</span>
        </div>
      </div>
      <span class="item_right">200元</span>
    </div>

    <div class="item_wrap">
      <span class="item_text">交强险：</span>
      <span class="item_right">200元</span>
    </div>

    <div class="item_wrap">
      <span class="item_text">车船税：</span>
      <span class="item_right">200元</span>
    </div>
    
  </div>

  <div class="info">收件信息</div>

  <div class="wrap" style="margin-bottom: 184upx;">
    <div class="item_wrap">
      <span class="item_text">姓名：</span>
      <span class="item_right">张三</span>
    </div>
    <div class="item_wrap">
      <span class="item_text">手机号码：</span>
      <span class="item_right">13671780212</span>
    </div>

    <div class="input_wrap">
      <div class="input_info">
        <span class="item_text">设备安装/保单寄送地址：</span>
        <span class="item_right">请输入详细地址</span>
      </div>
      <input type="text">
    </div>

  </div>
  
  <div class="bottom_wrap">
    <div class="bottom_left">
      <span>实付</span>
      <span class="bottom_money">¥1370</span>
    </div>
    <span class="bottom_right">立即支付</span>
  </div>
  

</div>
</template>
<script>

export default {
  data () {
    return {
      step: 1,
      device_id: 0
    }
  },

  methods: {
    next () {
      wx.navigateTo({
        url: "../device_success/main?device_id="+this.device_id
      })
    },
  },

  mounted () {
  },

}
</script>

<style >
.container_wrap {
  background-color: #F9F9F9;
  padding-top: 20upx;
  width: 100%;
  box-sizing: border-box;
}
.input_wrap{
  display: flex;
  flex-direction: column;
  
}
.input_wrap .input_info{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 28upx;
  }
  
.input_wrap .input_info  .item_text{
	font-size: 28upx;
	color: #070707;
}

.input_wrap  input{
	margin: 20upx 0upx;
}
.info{
  font-size: 28upx;
  color: #b8b8b8;
  padding: 30upx 40upx 10upx;
}
.wrap{
  background-color: #FFFFFF;
  padding: 34upx 40upx 0upx;
}
.item_wrap{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 30upx 0upx;
  border-bottom: 1px solid #f2f2f2;
  
}

.item_wrap .item_text{
    font-size: 28upx;
    color: #000;
  }
.item_wrap  .item_info{
    font-size: 28upx;
    color: #6E6E6E;
  }
  
.item_wrap  .item_title{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

.item_wrap  .item_service{
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 24upx;
    color: #6E6E6E;
  }

.item_wrap  .item_service img{
	width: 26upx;
	height: 26upx;
}


.item_right{
    font-size: 28upx;
    color: #6E6E6E;
  }

.info_title{
  color: #000;
  font-size: 52upx;
  background-color: #FFFFFF;
  padding-bottom: 40upx;
  border-bottom: 1px solid #f2f2f2;
}

.content_wrap{
  width: 90%;
  margin: -180upx 5% 0upx;
  height: 332upx;
  background-color: #FFFFFF;
  border-radius: 20upx;
  box-shadow: 0upx 0upx 20upx 0upx #EAEAEA;
  padding: 0upx 16upx;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
}

.content_item{
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #000000;
  font-size: 34upx;
  height: 166upx;
  padding: 0upx 24upx;
  
  .text{
    color: #427DFF;
    font-size: 24upx;
  }
}

.row_item{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.arraw{
    width: 18upx;
    height: 18upx;
    border-top: 6upx solid #D9D9D9;
    border-right: 6upx solid #D9D9D9;
    transform: rotate(45deg);
    margin-left: 10upx;
  }

  .place-holder{
  font-size: 28upx;
  color: #b2b2b2;
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
    position: absolute;
    bottom: 0upx;
}

.bottom_wrap{
  width: 100%;
  position: fixed;
  bottom: 0upx;
  left: 0upx;
  border-top: 1px solid #CCCCCC;
  height: 120upx;
  line-height: 120upx;
  color: #000000;
  font-size: 32upx;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: row;
  
}

.bottom_wrap .bottom_left{
    padding-left: 44upx;
    flex: 2;
  }
 .bottom_wrap .bottom_right{
    flex: 1;
    background-color: #427DFF;
    color: #FFFFFF;
    font-size: 30upx;
    text-align: center;
  }
 .bottom_wrap .bottom_money{
    color: #f00;
	margin-left: 10upx;
  }
  
</style>