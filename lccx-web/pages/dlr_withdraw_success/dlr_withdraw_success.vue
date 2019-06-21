<template>
<div class="container container-fill">

  <div class="item">
    <img src="../../static/img/pay_success.png">
    <span>提现成功</span>
  </div>

  
  <button type="primary" class="button" hover-class="button-hover" @tap="backAction">确定</button>

</div>
</template>
<script>

export default {
  data: {

  },

  methods: {
    backAction: function(){
      uni.reLaunch({
				url: '/pages/dlr_my_assets/dlr_my_assets'
			})
    }
  },

  created () {
  },

}
</script>

<style >
.container {
  font-size: 28upx;
  background-color: #FEFEFE;
  width: 100%;
  box-sizing: border-box;
}

.item{
  display: flex;
  flex-direction: column;;
  align-items: center;
  justify-content: center;
  margin: 248upx 0upx 88upx;
  
}

.item img{
    width: 100upx;
    height: 100upx;
    margin-bottom: 76upx;
  }
.item  span{
    color: #000000;
    font-size: 36upx;
    opacity: 0.7;
  }

.info{
  text-align: center;
  font-size: 28upx;
  opacity: 0.3;
  color: #000000;
}

.button{
  margin: 0upx 5%;
  width: 90%;
  height: 94upx;
    line-height: 94upx;
    color: #ffffff;
    background-color: #427DFF;
    border-radius: 10upx;
    text-align: center;
    position: fixed;
	bottom: 30upx;
	font-size: 32upx;
}

</style>
