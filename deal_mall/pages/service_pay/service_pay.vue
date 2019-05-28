<template>
	<view>
		<div class="mui-content">
			<div class="head_wrap">
				<div class="row_between" style="padding-right: 56upx;">
					<span>收货人</span>
					<span>王先生  1380013000 </span>
				</div>
				
				<div class="row_between address_item">
					<span>收货地址:</span>
					<span class="address">上海市湖滨路222号企业天地1号楼18楼</span>
					<span class="arraw"></span>
				</div>
				
				<div class="row coupon_item">
					<div class="row_between item">
						<span>优惠券:</span>
						<span class="address" style="color:#666666">满1000减500</span>
						<span class="arraw"></span>
					</div>
					
				</div>
			</div>
			
			<div class=" content_wrap">
				<div class="col_between border">
					<div class="content_up">
						<img src="../../static/img/goods_item.jpg" mode="widthFix"/>
						<span class="content_center">农夫山泉饮用水饮用天然水5L*4桶整箱装桶装水</span>
						<div class="content_end">
							<span>￥169.00</span>
							<span class="number">x2</span>
						</div>
					</div>
					<div class="content_down">
						<span class="first_txt">共 <span class="num">8</span> 件</span>
						<span class="sencod_txt">应付金额:
							<span class="money">￥</span><span class="money_number">169</span>
							<span class="num_float">.00</span>
						</span>
					</div>
				</div>
				
				
			</div>
			
			<div class="agree_wrap">
				<div class="radio_wrap">
					<div class="mui-input-row mui-radio mui-left">
						<input name="radio" type="radio" class="radio_item">
						<label>本人同意并接受以下协议</label>
					</div>
				</div>
				
				<div></div>
			</div>
			
			<div class="row_between bottom_wrap">
				<div class="money_info">
					<span class="money_num" style="font-size: 0.16rem;">¥</span>
					<span class="money_num">1033.0</span>
				</div>
				
				<span class="btn">提交订单</span>
			</div>
			
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
.mui-content{
	background-color: #FFFFFF;
}
.head_wrap{
	margin: 36upx 30upx 16upx;
	padding: 36upx 0upx 36upx 28upx;
	color: #323333;
	font-size: 28upx;
	height: 280upx;
	box-shadow: 0px 0px 20upx 0px #EAEAEA;
	box-sizing: border-box;
}

.head_wrap .item{
	padding-right: 28upx;
}

.head_wrap .item .address{
	flex: 1;
	text-align: right;
}

.item_wrap{
  height: 100upx;
  background-color: #FFFFFF;
  padding: 0px 30upx;
}

.item{
  height: 100upx;
  width: 100%;
  border-bottom: 2upx solid #E3E3E3;
}

.item span:nth-child(1){
	color: #333333;
	font-size: 28upx;
	width: 160upx;
}

.item input{
	margin-bottom: 0px;
	border: none;
	background: transparent;
	color: #666666;
	font-size: 28upx;
}

::-webkit-input-placeholder{
	color: #cccccc;
	font-size: 24upx;
}

.coupon_item{
	height: 96upx;
	width: 100%;
}

.coupon_item .item{
	width: 100%;
	box-sizing: border-box;
	border-top: 2upx solid #E3E3E2;
	padding-right: 30upx;
	height: 96upx;
}

.address_item{
	padding-right:30upx;
	margin-top: 32upx; margin-bottom: 36upx;
}
  
.content_wrap{
	box-sizing: border-box;
	padding: 30upx 30upx 0upx;
	box-shadow: 0px 0px 20upx 0px #EAEAEA;
	margin: 36upx 30upx 16upx;
}

.content_wrap .border{
	height: 244upx;
	width: 100%;
	border-bottom: 2upx solid #E3E3E3;
}

.content_up{
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}

.content_up img{
	width: 140upx;
	height: 140upx;
	border-radius: 8upx;
}

.content_center{
	width:336upx;
	max-height:114upx;
	position: relative;
	line-height: 40upx;
	overflow: hidden;
	font-size: 28upx;
	color: #666666;
	flex: 1;
	padding: 0px 32upx;
}

.content_end{
	color: #666666;
	font-size: 28upx;
	display: flex;
	flex-direction: column;
}

.content_end .number{
	text-align: right;
}

.first_txt{
	color: #999999;
	font-size: 28upx;
}

.first_txt .num{
	color: #333333;
}

.sencod_txt{
	font-size: 28upx;
	color: #333333;
}

.sencod_txt .money{
	font-size: 24upx;
}

.sencod_txt .money_number{
	font-size: 36upx;
	color: #323333;
	font-weight: bold;
}

.sencod_txt .num_float{
	font-size: 24upx;
}

.content_down{
	width: 100%;
	text-align: right;
	margin-bottom: 20upx;
}

.agree_wrap{
	position: fixed;
	bottom: 144upx;
	left: 0rem;
	width: 100%;
	box-sizing: border-box;
	background-color: #F5F5F5;
	height: 100upx;
}

.bottom_wrap{
	height: 144upx;
	padding: 0upx 30upx;
	position: fixed;
	bottom: 0upx;
	left: 0upx;
	width: 100%;
	box-sizing: border-box;
	background-color: #FFFFFF;
	box-shadow: 0px 0px 20upx 0px #EAEAEA;
}

.bottom_wrap .btn{
	width: 364upx;
	height: 88upx;
	line-height: 88upx;
	color: #FFFFFF;
	background-color: #107EFF;
	border-radius: 6upx;
	text-align: center;
}

.money_info{
	color: #333333;
	font-size: 32upx;
}

.money_num{
	color: #FF5269; font-size: 48upx;
}

.radio_wrap{
	background-color: #FFFFFF;
	width: 100%;
}

.radio_item{
	height: 150upx!important;
	display: flex;
	flex-direction: row;
	align-items: center;
	border-bottom: 2upx solid #E3E3E3;
	color: #000000;
}

.radio_item img{
	width: 40upx;
	height: 40upx;
	margin-right: 26upx;
}

.mui-checkbox input[type=checkbox], .mui-radio input[type=radio]{
	top: auto!important;
}
</style>
