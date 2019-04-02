<template>
  <div  class="contain" >

		<div class="item-wrap col" >
		  <span class="text-size">收货地址</span>
		  <input type="text" v-model="address" placeholder="请输入地址">
		</div>
		
    <div>
      <div class="goodsItemWrap" v-for="(item,index) in selectItems" :key="index">
        <img :src="item.g_img" >
				<div class="col">
					<span>{{item.g_sheng}}{{item.g_shi}}{{item.g_qu}}</span>
					<span style="width: 260rpx;">{{item.g_name}}</span>
				</div>
        <span style="flex: 1;"></span>
        <div class="info_wrap">
          <span>￥{{item.g_price}}x{{item.ct_count}}</span>
        </div>  
        
      </div>

      

    </div>

    <div class="bottom_wrap">
			<div class="head_wrap" >实付金额：
			  <span>￥{{params.o_money}}</span>
			</div>
			<span class="button" @click="payNow" :disabled='buyDisabled'>确认付款</span>
		</div>

    <!-- <div style="text-align: center; margin-top: 20rpx;" @click="openWord">《支付协议》</div> -->

    

  </div>
</template>

<script>
import { BASE_IMAGE_URL,weixinPay } from "@/utils/api";
import weixin_sdk from '@/utils/weixin-jsapi.js';



export default {
  data() {
		return {
			wxicon: BASE_IMAGE_URL + "wx.png",
			right_icon: BASE_IMAGE_URL + "right_icon.png",
			isChecked: true,  
			buyDisabled: false,
			goodsId: 3,
			price: 0.1,
			address: '',
			selectItems: '',
			params: '',
			buy_icon: BASE_IMAGE_URL + "buy_icon.jpg",
			
		}
    
  },

  methods: {
    goToAddress: function(){
      const url = "../editAddress/main";
      wx.navigateTo({ url });
    },

    checkedClick: function() {
      this.isChecked = !this.isChecked;
      console.log(this.isChecked);
    },
		
    openWord: function(){
      wx.downloadFile({
          url: BASE_IMAGE_URL+'pay.docx',
          success: function (res) {
              var filePath = res.tempFilePath
              wx.openDocument({
                  filePath: filePath,
                  fileType:'docx',
                  success: function (res) {
                      console.log(res);
                      console.log('打开文档成功'+res)
                  }
              })
          }
      })
    },
    async payNow(){
      if(!this.address){
        wx.showToast({
            title: '请填写收货地址',
            icon: 'none',
            duration: 1000
        });
        return;
      }
      let that = this;
			this.params.o_address = this.address;
			
			uni.request({
				url: 'https://mall.xiuqiupaopaopao.com/index.php?g=Api&m=Weixin&a=addOrder',
				header: {'content-type':'application/x-www-form-urlencoded'},
				method: 'POST',
				dataType: 'json',
				data: this.params,
				success: (res) => {
						
						let result = res.data.data;
						console.log('result');
						console.log(result);
						if(result.code == 1000){
						  that.buyDisabled = true;
							
							weixin_sdk.config({
									debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
									appId: 'wx83b3874e61dc8353', // 必填，公众号的唯一标识
									timestamp: result.timeStamp, // 必填，生成签名的时间戳
									nonceStr: result.nonceStr, // 必填，生成签名的随机串
									signature: result.paySign,// 必填，签名，见附录1
									jsApiList: ['getBrandWCPayRequest'] // 必填，需要使用的JS接口列表，这里只写支付的
							});
							
							weixin_sdk.ready(function(){
											weixin_sdk.checkJsApi({
												jsApiList: ["getBrandWCPayRequest"],
												success: res => {
													
														weixin_sdk.invoke(
															 'getBrandWCPayRequest', {
																	 "appId" : 'wx83b3874e61dc8353',       //公众号名称，由商户传入
																	 "timeStamp":result.timeStamp, //时间戳，自1970年以来的秒数     
																	 "nonceStr" : result.nonceStr, //随机串     
																	 "package" : result.package,     
																	 "signType" :'MD5',  //微信签名方式：     
																	 "paySign" : result.paySign     //微信签名 

															 },
															 function(res){ 
																	 if(res.err_msg == "get_brand_wcpay_request:ok" ) {
																			 wx.showToast({
																			 		title: '支付成功',
																			 		icon: 'none',
																			 		duration: 1000
																			 });
																			 wx.navigateBack({
																				 delta: 10,
																				});
																	 }
															 }
														)
																	
													},
													'fail':function(res){
															console.log(res);
															wx.showToast({
																	title: '支付失败',
																	icon: 'none',
																	duration: 1000
															});
															that.buyDisabled = false;
													},
													
												})
											})
							
						  
						}
				},
				fail: (res) => {
					wx.showToast({
							title: '支付失败',
							icon: 'none',
							duration: 1000
					});
				}
			})
			
      
    }


  },

  onLoad(){
    let that = this;
    this.address = uni.getStorageSync("location");
  },

  onShow(){
    this.selectItems = wx.getStorageSync("selectItems");
    this.params = wx.getStorageSync('params');
    this.buyDisabled = false;
		console.log(this.selectItems);
  }

};
</script>

<style >

page {
  background: #dddddd;
  height: 100%;
}

.contain{width: 100%;}

.info_wrap{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
	font-size: 34upx;
}

.color_wrap{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.itemColor{
  width: 40rpx;
  height: 40rpx;
}

.goodsItemWrap{
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #ffffff;
  padding: 20rpx 40rpx;
  border-bottom: 1rpx solid #DDDDDD;
  font-size: 25rpx;
}

.goodsItemWrap img{
  width: 100rpx;
  height: 100rpx;
  margin-right: 20rpx;
}

.head_wrap{
  height: 120rpx;
  line-height: 120rpx;
  font-size: 40rpx;
  color: #999999;
  background: #ffffff;
	flex: 2;
	text-align: right;
	padding-right: 20upx;
}

.head_wrap span{
  color: #ff5445;
}

.content_wrap{
  display: flex;
  flex-direction: row;
  padding: 20rpx 40rpx;
  align-items: center;
  justify-content: space-between;
  height: 160rpx;
  width: 100%;
  box-sizing: border-box;
  background: #ffffff;
}

.content_wrap img{
  width: 100rpx;
  height: 60rpx;
  margin-right: 20rpx;
}

.text_wrap{
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 30rpx;
  color: #999999;
}

.item-wrap {
  padding: 30rpx 40rpx ;
  border-bottom: 1rpx solid #dddddd;
  background: #ffffff;
  font-size: 30rpx;
}

.text-img {
  width: 50rpx;
  height: 50rpx;
  margin-right: 20rpx;
  display: inline-block;
}

.text-size {
  font-size: 35rpx;
  color: #767676;
}
.right {
  width: 30rpx;
  height: 30rpx;
}

.right_text{
  font-size: 30rpx;
  color: #cdcdcd;
}

.address_span{
  flex: 1;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  text-align: right;
}

.button {
  flex: 1;
  color: #ffffff;
  background: #35B583;
  border-radius: 0rpx;
	text-align: center;
	height: 120upx;
	line-height: 120upx;
}

.buy_text_wrap{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 30rpx;
  margin-top: 20rpx;
}

.buy_text_wrap img{
  width: 50rpx;
  height: 50rpx;
  margin-right: 20rpx;
}

.bottom_wrap{
	position: fixed;
	bottom: 0upx;
	height: 120upx;
	width: 100%;
	box-sizing: border-box;
	box-shadow:0px 0px 14upx 0px rgba(0,0,0,0.5);
	background: #ffffff;
	display: flex;
	flex-direction: row;
	
}


checkbox .wx-checkbox-input{
   border-radius: 50%;/* 圆角 */
   width: 50rpx; /* 背景的宽 */
   height: 50rpx; /* 背景的高 */
}
/* 选中后的 背景样式 （红色背景 无边框 可根据UI需求自己修改） */
checkbox .wx-checkbox-input.wx-checkbox-input-checked{
   border: none;
   background: #E2723B;
   padding: 3rpx;
}
/* 选中后的 对勾样式 （白色对勾 可根据UI需求自己修改） */
checkbox .wx-checkbox-input.wx-checkbox-input-checked::before{
   border-radius: 50%;/* 圆角 */
   width: 50rpx;/* 选中后对勾大小，不要超过背景的尺寸 */
   height: 50rpx;/* 选中后对勾大小，不要超过背景的尺寸 */
   line-height: 50rpx;
   text-align: center;
   font-size:30rpx; /* 对勾大小 30rpx */
   color:#fff; /* 对勾颜色 白色 */
   background: transparent;
   transform:translate(-50%, -50%) scale(1);
   -webkit-transform:translate(-50%, -50%) scale(1);
}

</style>
