<template>
<div class="container container-fill">

  <div class="item">
    <div class="item_left">
      <img src="../../static/img/finish_gray.png" alt="">
      <span></span>
      <img src="../../static/img/finish_gray.png" alt="">
      <span style="height: 144rpx;"></span>
      <img src="../../static/img/finish_blue.png" alt="">
    </div>

    <div class="right">
        <div class="item_right">
          <div class="item_right_wrap">
            <span class="name">里程车险</span>
            <span class="money">服务费用：400元</span>
          </div>
          <span class="item_status">已付款</span>
        </div>

        <div class="item_right">
          <div class="item_right_wrap">
            <span class="name">交强险</span>
            <span class="money">服务费用：970元</span>
          </div>
          <span class="item_status ">未付款</span>
        </div>

        <div class="item_right" style="margin-bottom: 0rpx; height: 144rpx;">
          
          <span class=" active">支付完成</span>
        </div>

    </div>
    

  </div>


	
	<button class="button" @click="next">
	  查看订单
	</button>

</div>
</template>
<script>

export default {
  data(){
    return{

    }
  },


  methods: {
    next () {
      wx.navigateTo({
        url: "../bill_detail/bill_detail"
      })
    },
  },

  created () {
  },

}
</script>

<style lang="scss" scoped>
.container {
  font-size: 28rpx;
  background-color: #F9F9F9;
  width: 100%;
}

.item{
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 40rpx 50rpx 60rpx;
  box-sizing: border-box;
  width: 100%;
  .item_left{
    width: 80rpx;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 20rpx;
    height: 100%;
    margin-top: 36rpx;
    span{
      height: 180rpx;
      width: 2rpx;
      background-color: #ECECEC;
    }
    img{
      width: 80rpx;
      height: 80rpx;
    }
  }
  .right{
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .item_right{
    display: flex;
    flex-direction: row;
    width: 100%;
    box-shadow: 0rpx 0rpx 20rpx 0rpx #EAEAEA;
    border-radius: 12rpx;
    padding: 52rpx 40rpx;
    height: 220rpx;
    box-sizing: border-box;
    background-color: #FFFFFF;
    justify-content: space-between;
    margin-bottom: 40rpx;
    .item_right_wrap{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .name{
        color: rgba(77,77,77,0.4);
        font-size: 34rpx;
      }
      .money{
        font-size: 28rpx;
        color: rgba(159,159,159,0.5);
      }
    }
    .item_status{
        background-color: rgba(0,0,0,0.1);
        color: #FFFFFF;
        border-radius: 26rpx;
        width: 128rpx;
        height: 52rpx;
        line-height: 52rpx;
        text-align: center;
        align-self: center;
      }
    .active{
      color: #4D4D4D;
    }  
  }
}

.info{
  text-align: center;
  font-size: 28rpx;
  opacity: 0.3;
  color: #000000;
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
  position: absolute;
  bottom: 40upx;
}

</style>
