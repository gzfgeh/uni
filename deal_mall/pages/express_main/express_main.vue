<template>
	<view>
		
		
		
		<div class="mui-content has-header person-express-col">
			
			<div class="pd">
				<div class="col person-express-list">
					<li @click="goToExpressInfo">
						<div class="person-express-detail row_center">
							<img src="../../static/img/express_guonei.png" mode="widthFix">
							<div class="text">
								<div>国内快递</div>
								<p>价格实惠、速度快，江浙沪次日达</p>
							</div>
							<span style="flex: 1;"></span>
							<span class="arraw"></span>
						</div>
					</li>
					 <li data-type="2">
						<div class="person-express-detail row_center">
							<img src="../../static/img/express_guoji.png" mode="widthFix">
							<div class="text">
								<div>国际快递</div>
								<p>优秀的服务，更便捷的选择</p>
							</div>
							<span style="flex: 1;"></span>
							<span class="arraw"></span>
						</div>
					</li>
					<li data-type="3">
						<div class="person-express-detail row_center">
							<img src="../../static/img/express_tongcheng.png" mode="widthFix">
							<div class="text">
								<div>同城快递</div>
								<p>今天送，今天达哦～！</p>
							</div>
							<span style="flex: 1;"></span>
							<span class="arraw"></span>
						</div>
					</li>
					<li data-type="4">
						<div class="person-express-detail row_center" style="border-bottom:0;">
							<img src="../../static/img/express_wuliu.png" mode="widthFix">
							<div class="text">
								<div>物流大件</div>
								<p>哪怕重如泰山我们也能轻松抬走</p>
							</div>
							<span style="flex: 1;"></span>
							<span class="arraw"></span>
						</div>
					</li>
				 
				</div>



			</div>

			<div class="person-express-bottom clearfix">
				<div class="person-express-col" @click="goToYunFei">
					<div class="person-express-detail" >
						<img src="../../static/img/express_jisuan.png" mode="widthFix">
						<div>运费计算</div>
					</div>
				</div>
				<div class="person-express-col" @click="goToForbid">
					<div class="person-express-detail" >
						<img src="../../static/img/express_weijin.png" mode="widthFix">
						<div>违禁品信息</div>
					</div>
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
			goToExpressInfo(){
				uni.navigateTo({
					url: '/pages/express_info/express_info'
				});
			},
			goToYunFei(){
				uni.navigateTo({
					url: '/pages/yun_fei/yun_fei'
				});
			},
			goToForbid(){
				uni.navigateTo({
					url: '/pages/forbid/forbid'
				});
			}
		}
	}
</script>

<style>
.pd{padding:0 30upx;}
.person-express-list{border:2upx solid rgba(243, 243, 243, 1);
    box-shadow:0px 4upx 12upx 0px rgba(126,125,125,0.14);
    border-radius:8upx;margin:32upx 0;}
.person-express-list li{height:160upx; width: 90%; padding: 0upx 40upx;}
.person-express-list li .person-express-detail{border-bottom:2upx solid #e3e3e3; height: 158upx;}
/* .person-express-list li .person-express-detail:last-child{border-bottom:0;} */
.person-express-list li img{width:62upx; margin-right: 34upx;}
.person-express-list li .right-col{position: absolute;right:20upx;top:52upx;}
.person-express-list li .right-col span{font-size:48upx;color:#999999;}
.person-express-list li .text p{color:#999999;font-size:26upx;padding-top:4upx;}

.person-express-bottom{padding:0 16upx;}
.person-express-bottom .person-express-col{width:50%;float:left;box-sizing: border-box;padding:0 16upx;}
.person-express-bottom .person-express-col .person-express-detail{border:2upx solid rgba(243, 243, 243, 1);
    box-shadow:0px 4upx 12upx 0px rgba(126,125,125,0.14);
    border-radius:8upx;}
.person-express-bottom .person-express-col .person-express-detail{text-align: center;height:188upx;box-sizing: border-box;padding-top:32upx;}
.person-express-bottom .person-express-col .person-express-detail div{font-size:26upx;color:#666666;text-align: center;}
.person-express-bottom .person-express-col .person-express-detail img{width:108upx;}
</style>
