<template>
	<view>
		<div class="mui-content has-header yunfei-col">

			<div class="address-tab hide clearfix tongcheng-col">
				<div class="address-col active" data-id="1">
					<div class="address-detail">
						单程件
						<div>A -> B</div>
					</div>
				</div>
				<div class="address-col" data-id="2">
					<div class="address-detail">
						来回件
						<div>A -> B -> A</div>
					</div>
				</div>
				<div class="address-col" data-id="3">
					<div class="address-detail">
						联程件
						<div>A -> B -> C</div>
					</div>
				</div>
			</div>

			<div class="express-info">
				<div class="express-info-col">
					<img src="../../static/img/express_start_add.png">

					<div class="middle-text" id="chufa" onclick="selectAddress(1, true)">
						<div class="placeholder">从哪里寄</div>
						<div class="middle-value">

						</div>
					</div>

					<span class="right" onclick="selectAddress(1)">地址簿</span>

				</div>
				<div class="express-info-col">
					<img src="../../static/img/express_end_add.png">
					<div class="middle-text" id="daoda" onclick="selectAddress(2, true)">
						<div class="placeholder">寄到哪里</div>
						<div class="middle-value">
						</div>
					</div>
					<span class="right" onclick="selectAddress(2)">地址簿</span>

				</div>

				<div class="express-info-col hide liancheng-col">
					<img src="../../static/img/express_end_add.png">
					<div class="middle-text" id="daoda1">
						<div class="placeholder">再寄到哪里</div>
						<div class="middle-value">

						</div>
					</div>
					<span class="right" onclick="selectAddress(3)">地址簿</span>

				</div>


			</div>

			<div class="yunfei-list">
				<li id="wupinSelect">
					<div>
						<span class="left">物品类型</span>
						<span class="right">
							<span class="text">文件</span>
							<span class="arraw"></span>
							<!-- <span class="mui-icon mui-icon-arrowright"></span> -->
						</span>
					</div>
				</li>
				<li class="middle-col">
					<div>
						<span class="left">重量</span>

						<span class="middle">
							<img class="sub-value" src="../../static/img/reduce_icon.png" />
							<span class="weight-value active">0.5</span>
							<img class="add-value" src="../../static/img/add_icon.png" />
						</span>

						<span class="right no-arrow">
							<span class="text">千克</span>
						</span>
					</div>
				</li>
				<li id="payWaySelect" class="guoji-col hide">
					<div>
						<span class="left">付款方式</span>
						<span class="right">
							<span class="text">寄付</span>
							<span class="arraw"></span>
						</span>
					</div>
				</li>

				<li id="fapiaoSelect" class="baoguo-col hide">
					<div>
						<span class="left">发票类型</span>
						<span class="right">
							<span class="text" data-value="1">商业发票</span>
							<span class="arraw"></span>
						</span>
					</div>
				</li>

				<li id="baoguoCol" class="hide baoguo-col">
					<div>
						<span class="left">包裹详情</span>
						<span class="right">
							<span class="mui-icon mui-icon-plus"></span>
						</span>
					</div>
				</li>

				<!-- <li id="baoguoDetailCol">

				</li> -->

				<li class="guoji-col hide">
					<div>
						<span class="left">是否保价</span>
						<span class="right">
							<switch @change="BaoJiaChange" />
						</span>
					</div>
				</li>
				<li class="liancheng-col hide">
					<div>
						<span class="left">是否加急</span>
						<span class="right">
							<switch @change="JiaJiChange" />
						</span>
					</div>
				</li>
				<li id="baojiaCol" class="hide">
					<div class="row_between">
						<span class="left">保价金额</span>
						<span class="middle">
							<input type="number" id="baojiaColInput" onkeyup="this.value=this.value.replace(/[^0-9.]/g,'')" placeholder="请输入保价金额" />
						</span>
						<span class="right">
							<span>保费:<span class="baofei">0</span>元</span>
						</span>
					</div>
				</li>
				<li id="beizhuWenzi">
					<div>
						<span class="left">备注</span>
						<span class="middle">
							<span class="beizhu">这是备注信息这是备注信息这是备...</span>
						</span>
						<span class="right">
							<span class="arraw"></span>
						</span>
					</div>
				</li>
			</div>

			<div class="select-company">
				<div class="yunfei-img-title">
					请选择快递公司
				</div>
				
				
			
				<div class="yunfei-img-list">
					<div class="swiper-container">
						<div class="swiper-wrapper" >
							<!-- <div class="swiper-slide" v-for="(item, index) in companyList" :key="index">
								<div><img src="../../static/img/express_comp_logo.png"/></div>
								<p>顺丰快递</p>
								<div class="express-jiage">
									￥<span class="bottom">12</span>
								</div>
							</div> -->
							<scroll-view scroll-x class="scroll-Y scrollbar">
								<div class="swiper-slide" v-for="(item, index) in companyList" :key="index">
									<div><img src="../../static/img/express_comp_logo.png"/></div>
									<p>顺丰快递</p>
									<div class="express-jiage">
										￥<span class="bottom">12</span>
									</div>
								</div>
								
							</scroll-view>
				
						</div>
					</div>
				</div>
				<div class="pd guoji-col hide" >
					<div class="miandan clearfix">

						<div class="left">是否打印电子面单</div>
						<span class="right">
							<switch @change="JiaJiChange" />
						</span>

					</div>
				</div>

			</div>


			<div class="bottom-space"></div>

			<div class="yunfei-bottom">

				<div class="left has-tip">运费<em style="font-style:normal;" id="qiyeText"></em>:<span><span id="priceText" data-yufei="0">0.0</span></span>

					<div class="tip">（含保费)<label class="baofei">0</label>元</div>

				</div>

				<button type="button" id="submitBtn" onclick="submitData()">提交订单</button>

			</div>

		</div>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				companyList: [1,2,3,4,5,6,7]
			}
		},
		methods: {
			BaoJiaChange(e){
				
			},
			JiaJiChange(e){
				
			}
		}
	}
</script>

<style>
	/* .has-header{padding-top:96upx;} */
.tongcheng-col{display: flex; flex-direction: row;}	
.address-tab {padding: 0 10upx;box-sizing: border-box;}
.address-tab>.address-col {width: 33.3%;float: left;text-align: center;padding: 20upx;font-size: 24upx;box-sizing: border-box;}
.address-tab>.address-col .address-detail {border-radius: 8upx;border: 2upx solid #eee;background: #fff;padding: 16upx 0;line-height: normal;}
.address-tab>.address-col.active .address-detail {background: #107EFF;color: #fff;}

.express-info{background: #fff;padding-left:30upx;}
.express-info img{width:64upx;position: absolute;left:0;top:40upx;}
.express-info .express-info-col{height:156upx;position: relative;padding-left:84upx;border-bottom:2upx solid #e3e3e3;}
/* .express-info .express-info-col:first-child{border-bottom:2upx solid #e3e3e3;} */
.express-info .express-info-col .middle-text{padding:0 0;border:0;font-size:28upx;color:#e3e3e3;}
.express-info .express-info-col .middle-text .placeholder{padding:64upx 0;}
.express-info .express-info-col .right{position: absolute;right:30upx;top:64upx;font-size:24upx;color:#107EFF;}
.express-info .express-info-col .middle-text.active .placeholder{display: none;}
.express-info .express-info-col .middle-text.active .middle-value{color:#999999;font-size:24upx;padding-top:36upx;}
.express-info .express-info-col .middle-text.active .middle-value .middle-value-top{color:#333333;font-size:30upx;}

.express-list .top>div{width:50%;float:left;}
.express-list .top .left{padding-right:20upx;box-sizing: border-box;}
.express-list .top .right{padding-left:20upx;box-sizing: border-box;}
.express-list .top .name{font-size:28upx;color:#000;}
.express-list .top p{margin-bottom:0;padding-top:6upx;font-size:24upx;}
.express-list .middle{padding:20upx 0;}
.express-list .middle .first{color:#F39800;margin-right:4upx;padding:20upx 0;}
.express-list .middle .first .yuandian{display: inline-block;width:6upx;height:6upx;border-radius: 50%;background: #F39800;display: inline-block;vertical-align: middle;margin-right:6upx;}
.express-list .bottom{border-top:2upx solid #e3e3e3;padding:20upx 0;}
.express-list .bottom img{width:32upx;display: inline-block;vertical-align: middle;margin-right:2px;position: relative;top:0;}
.express-list .bottom span{display: inline-block;vertical-align: middle;}
.express-list .bottom .first{width:120upx;}
.express-list .top{position: relative;padding-top:20upx;}
.express-list .top .middle-img{width:52upx;left:48%;position: absolute;margin-left:-26upx;top:45%;}

.yunfei-col .yunfei-list{margin-top:14upx;}
.yunfei-col .yunfei-list li{height:100upx;padding-left:30upx;background: #fff;box-sizing: border-box;}
.yunfei-col .yunfei-list .middle-col{height:140upx;}
.yunfei-col .yunfei-list .middle-col>div{line-height:140upx;height:140upx;}
.yunfei-col .yunfei-list li>div{border-bottom:2upx solid #e3e3e3;line-height:100upx;height:100upx;position: relative;}
.yunfei-col .yunfei-list li>div .right{position: absolute;right:30upx;font-size:26upx;color:#666;z-index:100;top:0;}
.yunfei-col .yunfei-list li>div .right .mui-icon-arrowright{color:#999;font-size:28upx;}
.yunfei-col .yunfei-list li>div .right.no-arrow .text{margin-right:30upx;display: inline-block;}
.yunfei-col .yunfei-list li>div .left{font-size:26upx;position: absolute;left:0;z-index:100;}
.yunfei-col .yunfei-list li>div{text-align: center;}
.yunfei-img-title{font-size:28upx;padding:30upx;}

.yunfei-col .yunfei-list li>div .right .mui-switch{margin-top:20upx;}
.yunfei-col .yunfei-list li .middle img{width:68upx;display: inline-block;vertical-align: middle;}
.yunfei-col .yunfei-list li .middle span{vertical-align: middle;display: inline-block;width:106upx;color:#333333;}
.yunfei-col .yunfei-list li .middle span.active{color:#107EFF;}

.yunfei-col .yunfei-list li .middle{position: relative;box-sizing: border-box;}
.yunfei-col .yunfei-list li .middle .beizhu{width:100%;padding-right:80upx;text-align: left;display: inline-block;font-size:28upx;color:#999;box-sizing: border-box;padding-left:140upx;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;position: relative;}
.yunfei-col .yunfei-list li .middle .beizhu.active{color:#333;}
.yunfei-col .yunfei-list li .middle input{background:transparent;border:0;padding:0 40upx 0 140upx;position:relative;box-sizing: border-box;font-size:28upx;}

.yunfei-img-list{padding:0 0 0 30upx;box-sizing: border-box;}
.yunfei-img-list .swiper-slide{width: 180upx; height: 224upx;display: inline-block;margin-right: 20upx;}
.yunfei-img-list .swiper-slide img{width:94upx;height:94upx;}
.yunfei-img-list .swiper-slide{border:2upx solid rgba(243, 243, 243, 1);
    box-shadow:0px 4upx 12upx 0px rgba(126,125,125,0.14);text-align: center;padding:32upx 30upx 10upx ;position: relative;background: #fff;border-radius:8upx;}
.yunfei-img-list .swiper-slide p{font-size:24upx;margin-bottom:0;}
.yunfei-img-list .swiper-slide .bottom{color:#666666;font-size:28upx;}
.yunfei-img-list .swiper-slide .bottom .second{font-size:16upx;color:#999;position: relative;margin-left:10upx;}
.yunfei-img-list .swiper-slide .bottom .second:after{width:100%;height:2upx;background: #999;content: " ";left:0;top:50%;position: absolute;}
.yunfei-img-list .swiper-slide.active{border:2upx solid #107EFF;}
/* .yunfei-img-list .swiper-slide.active:after{width:32upx;height:32upx;position: absolute;right:-4upx;top:-2upx;content:" ";background: url("../images/yunfei/yunfei_21.png");background-size:100% 100%;} */

.yunfei-bottom{height:144upx;position: fixed;bottom:0;width:100%;left:0;width:100%;box-shadow:-2upx -14upx 22upx 0px rgba(126,125,125,0.08);box-sizing: border-box;padding-top:26upx;background: #fff;z-index:900;}
.yunfei-bottom button{background: #107EFF;line-height: 88upx;font-size:26upx;color:#fff;padding:0;width:364upx;text-align: center;float:right;margin-right:30upx;}
.yunfei-bottom .left{font-size:30upx;display: inline-block;margin-left:30upx;color:#666;padding-top:24upx;text-align: center;}
.yunfei-bottom .left .tip{font-size:24upx;color:#999999;}
.yunfei-bottom .left span{font-size:44upx;color:#FF5269;}
.yunfei-bottom .left span.small{font-size:24upx;color:#FF5269;}
.yunfei-bottom .left.has-tip{position: relative;top:-16upx;}

.select-company{background: #fff;margin-top:16upx;border-bottom:16upx solid #f9f9f9;}
.select-company .miandan{height:94upx;line-height: 94upx;border-top:2upx solid #e3e3e3;}
.select-company .miandan .left{font-size:26upx;float:left;margin-left: 30upx;}
.select-company .miandan .right{float:right;margin-right:30upx;}
.select-company .yunfei-img-list{padding-bottom:30upx;}

.bottom-space{height:160upx;}

</style>
