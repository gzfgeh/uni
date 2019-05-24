<template>
	<view>
		<div class="mui-content has-header yunfei-col">
			<div class="yunfei-top-col">
				<div class="yunfei-top-detail">
					<div class="middle">
						<img class="expressLogo" src="../../static/img/express_comp_logo.png" mode="widthFix">
						<div class="clearfix">
							<span class="left expressName">顺风快递</span>
							<span class="right">
								<span class="yuandian"></span>
								<span class="status_text">运输中</span> 
							</span>
						</div>
						<div class="danhao">单号:<span class="sn">19A7113C71540664618075</span></div>
					</div>
					<div class="bottom">
						<span class="left-text">已发出</span>
						<span class="right-text">已签收</span>
						<div class="step">
							<div class="step-list">
								<span class="step-left active"></span>
								<span class="step-right"></span>
								<span class="step-middle">
									<span class="step-tag">
										<span>楼服宝已揽件</span>
										<img src="../../static/img/sanjiao.png" mode="widthFix"/>
									</span>
									<span class="dian"></span>
								</span>
								<span class="line active-line"></span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="main-tab-col">
				<span class="middle-tab-col">
					<span class="active">详情</span>
					<span>物流跟踪</span>
				</span>
			</div>

			<div class="main-tab-detail">

				<div class="tab-detail-col">

					<ul class="express-list">
						<li>
							<div class="clearfix top">
								<div class="left">
									<div class="name" id="from_name">张得发</div>
									<p id="from_address">上海市黄浦区歌斐中心</p>
								</div>
								<img class="middle-img" src="../../static/img/express_arraw.jpg" mode="widthFix">
								<div class="right">
									<div class="name" id="to_name">李玖哲</div>
									<p id="to_address">上海市黄浦区歌斐中心 拷贝</p>
								</div>
							</div>
							<div class="middle">
								<span class="first">
									<span class="yuandian"></span>
									<span class="status_text">未签收</span>
								</span>
								<span class="second" id="second_address">广东深圳南山区建华路报社村30栋-01</span>
							</div>
							<div class="bottom">
								<img class="expressLogo" src="../../static/img/express_comp_logo.png" mode="widthFix"/>
								<span class="first expressName">顺丰快递  </span>
								<span class="sn">11001010123030306</span>
							</div>
						</li>
					</ul>

					<ul class="express-detail-list">
						<li class="clearfix">
							<span class="left">物品类型</span>
							<span class="right" id="package">文件</span>
						</li>
						<li class="clearfix">
							<span class="left">重量</span>
							<span class="right"><span id="weight">12</span>KG</span>
						</li>
						<li class="clearfix">
							<span class="left">付款方式</span>
							<span class="right" id="is_freight_collect">到付</span>
						</li>

						<li class="clearfix more-row">
							<span class="left">备注</span>
							<span class="right" id="comment">
                            上善若水，水善利萬物而不爭。處眾人之所上善若水，水善利萬物而不爭。處眾人之所
                        </span>
						</li>


						<li class="clearfix">
							<span class="left">下单时间</span>
							<span class="right" id="created_at">2018-10-21  12:12:12</span>
						</li>
						<li class="clearfix">
							<span class="left">快递类型</span>
							<span class="right" id="create_type">个人件</span>
						</li>
						<li class="clearfix">
							<span class="left">快递费用</span>
							<span class="right">￥<span id="price">￥10.00</span></span>
						</li>
						<li class="clearfix">
							<span class="left">保价费用</span>
							<span class="right" id="insured_price">--</span>
						</li>
					</ul>

					<div class="bottom-btn bottom-btn-list clearfix">
						<button type="button" class="yellow-bg xiadan " id="cancelBtn">取消订单</button>
						<button type="button" class="blue-bg xiadan" onclick="payCaozuo()"> 立即支付</button>
						<button type="button" class="one delete-order " ontouchstart="deleteOrder()"> 删除订单</button>
					</div>
				</div>

				<div class="tab-detail-col hide">
					<ul class="genzong-list">
						<!--<li class="active">
					<div class="left">
						<div class="time">08:28</div>
						<p>2018-09-22</p>
						<div class="line">
							<span></span>
							<div class="line-col"></div>
						</div>
					</div>
					<div class="right">
						快递已经送至北京市西城区阜成门内宫 门口二条19号123楼
					</div>
				</li>
				<li class="active">
					<div class="left">
						<div class="time">08:28</div>
						<p>2018-09-22</p>
						<div class="line">
							<span></span>
							<div class="line-col"></div>
						</div>
					</div>
					<div class="right">
						快递已经送至北京市西城区阜成门内宫 门口二条19号123楼
					</div>
				</li>
				<li>
					<div class="left">
						<div class="time">08:28</div>
						<p>2018-09-22</p>
						<div class="line">
							<span></span>
							<div class="line-col"></div>
						</div>
					</div>
					<div class="right">
						快递已经送至北京市西城区阜成门内宫 门口二条19号123楼
					</div>
				</li>-->
					</ul>
				</div>

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
@import url("../../static/style/yun_fei.css");

.yunfei-top-col{padding:0 30upx;margin-top:30upx;}
.yunfei-top-col .yunfei-top-detail{border:2upx solid rgba(243, 243, 243, 1);
    box-shadow:0px 4upx 12upx 0px rgba(126,125,125,0.14);
    border-radius:8upx;height:330upx;}
.yunfei-top-col img{width:102upx;left:30upx;top:30upx;position: absolute;}
.yunfei-top-col .middle{padding-top:26upx;border-bottom:2upx solid #e3e3e3;position: relative;padding-left:150upx;padding-bottom:26upx;}
.yunfei-top-col .middle .left{color:#666666;font-size:26upx;}
.yunfei-top-col .middle .right{color:#107EFF;font-size:28upx;float: right;margin-right:30upx;}
.yunfei-top-col .middle .right .yuandian{width:12upx;height:12upx;background: #107EFF;border-radius: 50%;display: inline-block;vertical-align: middle;}
.yunfei-top-col .middle .danhao{font-size:32upx;padding:10upx 0;width:90%;box-sizing: border-box;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}

.yunfei-top-detail .bottom .step-list{padding:0 76upx;position: relative;margin-top:84upx;}
.yunfei-top-detail .bottom .step-list .active{background: #B0D1F8!important;}
.yunfei-top-detail .bottom .step-list .step-left{width:16upx;height:16upx;border-radius: 50%;background: #CCCCCC;left:50upx;display: inline-block;position: absolute;top:24upx;}
.yunfei-top-detail .bottom .step-list .step-right{width:16upx;height:16upx;border-radius: 50%;background: #CCCCCC;right:50upx;display: inline-block;position: absolute;top:24upx;}
.yunfei-top-detail .bottom .step-list .line{height:2upx;width:100%;background:#ccc;display: inline-block;position: relative;top:-6upx;}
.yunfei-top-detail .bottom .step-list .line.active-line:after{width:50%;height:2upx;background: #B0D1F8;content: " ";display:block;top:0;left:0;}
.yunfei-top-detail .bottom .step-list .step-middle{width:40upx;height:40upx;background: #fff;position: absolute;top:4upx;left:50%;margin-left:-20upx;text-align: center;border-radius: 50%;}
.yunfei-top-detail .bottom .step-list .step-middle .dian{width:16upx;height:16upx;border-radius: 50%;background: #107EFF;display: inline-block;position: relative;z-index:100;position: absolute;left:50%;top:50%;margin:0upx -8upx;}
.yunfei-top-detail .bottom{position: relative;}
.yunfei-top-detail .bottom .step-tag{background: #107EFF;color:#fff;font-size:24upx;padding:6upx 20upx;border-radius: 20upx;white-space: nowrap;position: absolute;top:-70upx;left:-50%;margin-left:-56upx;}
.yunfei-top-detail .bottom .step-tag img{width:24upx;position: absolute;left:50%;top:48upx;margin-left:-12upx;}
.yunfei-top-detail .bottom .left-text{color:#B0D1F8;font-size:22upx;position: absolute;left:30upx;top:-40upx;}
.yunfei-top-detail .bottom .right-text{color:#CCCCCC;font-size:22upx;position: absolute;right:30upx;top:-40upx;}

.main-tab-col{text-align: center;font-size:36upx;padding:60upx 40upx;color:#999999;}
.main-tab-col span{padding:20upx 12upx;position: relative;}
.main-tab-col span.active{color:#000;}
.main-tab-col span.active:after{content: " ";width:60upx;margin-left:-30upx;height:8upx;background: #107EFF;bottom:-12upx;border-radius:6upx;position:absolute;left:50%;display: block;}

</style>
