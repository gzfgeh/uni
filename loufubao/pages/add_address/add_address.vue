<template>
	<view class="contain">
		<div class="mui-content">
			<div class="head_wrap">
			  <span>联系人</span>
			</div>

			<div class="row item_wrap">
			  <div class="row_between item">
				<span class="item_span">姓名</span>
				<input type="text" placeholder="请填写收件人姓名" class="name">
			  </div>
			</div>

			<div class="row item_wrap">
			  <div class="row_between item">
				<span class="item_span">手机号</span>
				<input type="tel" maxlength="11" placeholder="请输入手机号码" class="mobile">
			  </div>
			</div>
				
				<div class="row item_wrap">
				  <div class="row_between item">
					<span class="item_span">固定电话</span>
					<input type="text" placeholder="请输入固定电话号码" class="phone">
				  </div>
				</div>

			<div class="head_wrap">
			  <span>收货地址</span>
			</div>

			<div class="row item_wrap" id="addressType" onclick="showAddress();">
			  <div class="row_between item">
				<span>地址类型</span>
				<span class="content">请选择</span>
				
				<span class="arraw"></span>
			  </div>
			</div>

			<div class="row item_wrap" onclick="showReason();">
			  <div class="row_between item">
				<span>所在地区</span>
				<span class="content">请选择</span>
				<!-- <span class="content city">市</span>
				  <span class="content region">区</span> -->
				<span class="arraw"></span>
			  </div>
			</div>

			<div class="row item_wrap">
			  <div class="row_between item">
				<span class="item_span">详细地址</span>
				<input type="text" placeholder="请填写详细地址" class="detail">
			  </div>
			</div>

			<div class="row item_wrap">
			  <div class="row_between item">
				<span class="item_span">设为默认地址</span>
				<div class="mui-switch mui-switch-blue mui-switch-mini">
				  <div class="mui-switch-handle"></div>
				</div>
			  </div>
			</div>

			<button type="button" class="mui-btn mui-btn-primary button" onclick="saveAddress();">保存</button>
			<button type="button" class="mui-btn mui-btn-primary button" onclick="delAddress();">删除</button>

		  </div>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.head_wrap {
      padding: 28upx;
      width: 100%;
      text-align: left;
      color: #666666;
      font-size: 24upx;
	  box-sizing: border-box;
    }

    ::-webkit-input-placeholder {
      color: #CCCCCC;
      font-size: 28upx;
    }

    .item_wrap {
      width: 100%;
      background-color: #FFFFFF;
      padding-left: 28upx;
	  box-sizing: border-box;
    }

    .item {
      height: 100upx;
      width: 100%;
      border-bottom: 2upx solid #E3E3E3;
      color: #333333;
      font-size: 28upx;
      padding-right: 30upx;
	  box-sizing: border-box;
    }

    .item .content {
      flex: 1;
      text-align: right;
      font-size: 28upx;
      color: #666666;
      height: 100upx;
      line-height: 100upx;

    }

    .button {
      border-radius: 6upx;
      width: 90%;
      margin: 20upx 5% 0px;
      box-sizing: border-box;
      background-color: #107EFF;
      color: #FFFFFF;
      font-size: 32upx;
      height: 88upx;
    }

    .arraw {
      width: 20upx;
      height: 20upx;
      border-top: 4upx solid #999999;
      border-right: 4upx solid #999999;
      transform: rotate(45deg);
      margin-left: 4upx;
    }

    .item input {
      margin: 0px;
      border: none;
      background: transparent;
      flex: 1;
      text-align: left;
      padding: 0px 0px 0px 16upx;
    }

    .item .item_span {
      width: 200upx;
      color: #333333;
      font-size: 28upx;
    }

    .upload_wrap {
      padding: 36upx 30upx;
      background: #FFFFFF;
      color: #333333;
      font-size: 28upx;
    }

    .img_wrap {
      flex-flow: wrap;
      margin-top: 36upx;
    }

    textarea {
      padding: 18upx 22upx;
      height: 120upx;
      background-color: #F9F9F9;
      margin-top: 40upx;
      margin-left: 5%;
      width: 90%;
      margin-bottom: 10upx;
      font-size: 24upx;
    }

    textarea::-webkit-input-placeholder {
      color: #999999;
      font-size: 24upx;
    }

    .mui-bar-nav {
      box-shadow: none;
    }
	
	.contain {
      background-color: #F3F3F3;
    }
</style>
