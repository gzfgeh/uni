<template>
	<view>
		<div class="mui-content">
			<div class="title_txt">
			  联系人
			</div>

			<div class="col item_wrap">
			  <div class="row_between item" style="border-top: transparent;">
				<span>姓名</span>
				<input type="text" placeholder="请填写收件人姓名" class="name" />
			  </div>

			</div>



			<div class="col item_wrap">
			  <div class="row_between item">
				<span>手机号</span>
				<input type="tel" placeholder="请填写收件人手机号" maxlength="11" class="mobile" />
			  </div>

			</div>

			<div class="col item_wrap">
			  <div class="row_between item">
				<span>公司名称</span>
				<input type="text" placeholder="请填写公司姓名" class="company_name" />
			  </div>

			</div>

			<div class="title_txt">
			  需求明细
			</div>

			<div class="row item_wrap" onclick="showTypeAction();">
			  <div class="row_between pick_item">
				<span>类型</span>
				<span class="content">请选择</span>
				<span class="arraw"></span>
			  </div>
			</div>

			<div class="col item_wrap">
			  <div class="row_between item">
				<span>数量</span>
				<input type="tel" placeholder="请填写数量" class="number" />
			  </div>

			</div>

			<div class="row item_wrap" onclick="lookTime();">
			  <div class="row_between pick_item">
				<span>服务时间</span>
				<span class="content service_time">请选择</span>
				<span class="arraw"></span>
			  </div>

			</div>

			<div class="text_wrap">
			  <div style="margin-bottom: 18px;">需求明细</div>
			  <textarea placeholder="请填写需求明细" class="requirements"></textarea>

			</div>

			<button class="mui-btn mui-btn-primary button" onclick="goToServiceOrderSure();">提交需求</button>

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
.title_txt {
      color: #666666;
      font-size: 24upx;
      padding: 32upx 30upx;
      background-color: #F9F9F9;
    }

    .item_wrap {
      height: 100upx;
      background-color: #FFFFFF;
      padding: 0px 32upx;
    }

    .item {
      height: 100upx;
      width: 100%;
      border-bottom: 2upx solid #E3E3E3;
    }

    .item span:nth-child(1) {
      color: #333333;
      font-size: 28upx;
      width: 160upx;
    }

    .item input {
      margin-bottom: 0px;
      border: none;
      background: transparent;
      color: #666666;
      font-size: 28upx;
    }

    ::-webkit-input-placeholder {
      color: #cccccc;
      font-size: 28upx;
    }

    .pick_item {
      height: 100upx;
      width: 100%;
      border-bottom: 2upx solid #E3E3E3;
      color: #333333;
      font-size: 28upx;
      padding-right: 30upx;
    }

    .pick_item .content {
      flex: 1;
      text-align: right;
      font-size: 28upx;
      color: #666666;
      height: 100upx;
      line-height: 100upx;

    }

    .arraw {
      width: 20upx;
      height: 20upx;
      border-top: 4upx solid #999999;
      border-right: 4upx solid #999999;
      transform: rotate(45deg);
      margin-left: 4upx;
    }


    .text_wrap {
      padding: 36upx 32upx;
      background-color: #FFFFFF;
      color: #33333;
      font-size: 28upx;
    }

    textarea {
      padding: 18upx 22upx;
      height: 140upx;
      background-color: #F9F9F9;
      margin-bottom: 0rem;
    }

    textarea::-webkit-input-placeholder {
      color: #999999;
      font-size: 24upx;
    }

    .button {
      border-radius: 6upx;
      width: 100%;
      margin: 50upx 5% 146upx;
      box-sizing: border-box;
      font-size: 32upx;
      width: 90%;
      height: 80upx;
      padding: 0px;
      background-color: #107EFF !important;
      color: #FFFFFF;
    }
</style>
