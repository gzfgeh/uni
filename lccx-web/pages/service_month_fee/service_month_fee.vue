<template>
<div >
  <div class="head_wrap">
    <div>每月服务费</div>
    <div>本服务包不包含交强险与车船税价格</div>
    <div>（交强险 650元+车船税320元）</div>
  </div>

  <div class="price_wrap">
    <div class="price_item">
      <span class="price_text">基础服务费</span>
      <div class="item">
        <span>¥</span>
        <span class="num">40.00</span>
        <span>/月</span>
      </div>
    </div>
    <span class="add_icon">+</span>
    <div class="price_item">
      <span class="price_text">基础服务费</span>
      <div class="item">
        <span>¥</span>
        <span class="num">40.00</span>
        <span>/月</span>
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
	  
	  <div class=" button" >下一步</div>
	  
  </div>

</div>
</template>
<script>

export default {
  data () {
    return {
      userInfo: {}
    }
  },

  methods: {
  },

  created () {
  },

}
</script>

<style >
  .head_wrap{
    padding: 60rpx 0rpx 40rpx;
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
    font-size: 50rpx;
  }

  .head_wrap>div:nth-child(2){
    font-size: 28rpx;
    color: #717171;
  }

  .head_wrap>div:nth-child(3){
    font-size: 24rpx;
    color: #BBBBBB;
  }

  .price_wrap{
    width: 92%;
    margin-left: 4%;
    height: 252rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .price_item{
    width: 316rpx;
    height: 232rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border-radius: 20rpx;
    box-shadow: 0rpx 0rpx 20rpx 0rpx #EAEAEA;
    padding: 30rpx 0rpx;
    box-sizing: border-box;
    
  }
  
  .price_item .item{
      font-size: 24rpx;
      
    }
	
	.price_item .item .num{
        font-size: 60rpx;
        color: #E30000;
        margin: 0rpx 5rpx;
      }

  .add_icon{
    color: #E30000;
  }

  .price_text{
    font-size: 28rpx;
    color: #BBBBBB;
  }

  .content_wrap{
    color: #000000;
    font-weight: bold;
    margin-left: 5%;
    padding: 0rpx 14rpx;
    margin-top: 40rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    
  }
  
  .content_wrap .line{
      display: inline-block;
      width: 10rpx;
      height: 100%;
      background-color: #427DFF;
      height: 30rpx;
      margin-right: 20rpx;
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
      margin-bottom: 4rpx;
      
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
        padding: 26rpx 34rpx;
        font-size: 24rpx;
      }

  .service_look{
    font-size: 30rpx;
    margin-top: 20rpx;
    color: #676767;
  }

.button{
  margin: 40rpx 0;
  width: 100%;
  height: 94rpx;
  line-height: 94rpx;
  color: #ffffff;
  background-color: #427DFF;
  border-radius: 10rpx;
  text-align: center;
  box-sizing: border-box;
    
}


</style>
