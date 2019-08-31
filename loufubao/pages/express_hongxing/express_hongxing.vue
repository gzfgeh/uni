<template>
	<view>
		<div class="mui-content has-header person-express-col">
			<div class="logo_wrap row_center">
				<img src="../../static/img/hxmkl-small.png" mode="widthFix">
			</div>
			<div class="pd">
				<div class="col person-express-list">
					<li @click="goToExpressInfo(2,1)" >
						<div class="person-express-detail row_center">
							<img src="../../static/img/geren_in_express.png" mode="widthFix">
							<div class="text">
								<div>国内快递</div>
								<p>价格实惠、速度快，江浙沪次日达</p>
							</div>
							<span style="flex: 1;"></span>
							<span class="arraw"></span>
						</div>
					</li>
					<li  @click="goToExpressInfo(2,3)" >
						<div class="person-express-detail row_center">
							<img src="../../static/img/geren_one_express.png" mode="widthFix">
							<div class="text">
								<div>同城快递</div>
								<p>今天送，今天达哦～！</p>
							</div>
							<span style="flex: 1;"></span>
							<span class="arraw"></span>
						</div>
					</li>
					
					<li  @click="goToExpressInfo(2,4)">
						<div class="person-express-detail row_center" >
							<img src="../../static/img/qiye_big_express.png" mode="widthFix">
							<div class="text">
								<div>企业大件物流</div>
								<p>价格实惠、速度快，江浙沪次日达</p>
							</div>
							<span style="flex: 1;"></span>
							<span class="arraw"></span>
						</div>
					</li>
					
					
					<li @click="goToExpressList">
						<div class="person-express-detail row_center" style="border: none;">
							<img src="../../static/img/express_order_query.png" mode="widthFix">
							<div class="text">
								<div>快递订单查询</div>
								<p>订单快速查询，时刻关注物流信息</p>
							</div>
							<span style="flex: 1;"></span>
							<span class="arraw"></span>
						</div>
					</li>
					
					
					
				 
				</div>

			<uni-popup :show="type === 'middle'" position="middle" mode="fixed"  @hidePopup="bindCompany('')">
				
				<div class="company-modal">
				
				<div class="modal-title">绑定企业</div>
				<div class="company-code">
					<input type="text" v-model="companyCode"  placeholder="输入企业号"  />
				</div>
				
				<button  type="primary" @tap="bindCompanyCode()">提交</button>
				
				</div>
				
				
			</uni-popup>


			</div>

			<div class="person-express-bottom clearfix">
				<div class="person-express-col" @click="goToYunFei">
					<div class="person-express-detail" >
						<img src="../../static/img/express_jisuan.png" mode="widthFix">
						<div>打印标签</div>
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
	import { BASE_IMAGE_URL,addQycompany,user_info} from '@/utils/api'
	
	import uniPopup from '@/components/uni-popup.vue'
	
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				type:'',
				orderType:0,
				companyCode:'',
				QrCodeOrderSN:'',
				hongxing: 0
			}
		},
		onLoad:function(options)
		{
			this.user_info();
			this.QrCodeOrderSN = options.orderSN;
			uni.showLoading({ title: '加载中...' });
			setTimeout( () => {
				uni.hideLoading()
			}, 500);
			
			this.hongxing = options.hongxing;
			console.log(this.hongxing);
			
			if(options.orderType==1)
			{
				this.orderType=options.orderType;
				uni.setNavigationBarTitle({
					title: '个人快递'
				});
			}
			else if(options.orderType==2)
			{
				this.orderType=options.orderType;
				uni.setNavigationBarTitle({
					title: '企业快递'
				});
			}
			else{
				uni.setNavigationBarTitle({
					title: '快递'
				});
			}
			
		},
		methods: {
			async user_info(){
				let res = await user_info();
				if(res.status == 1){
					uni.setStorageSync("userInfo", res.data.userInfo);
					var companyCode=uni.getStorageSync("userInfo").companyCode;
					if(companyCode)
					{
						this.companyCode=companyCode;
					}
				}
			},
			goToExpressList(){
				if(!this.isLogin()){
					return;
				}
				uni.navigateTo({
					url: '/pages/express_list/express_list'
				});
			},
			async bindCompanyCode()
			{
				if(!this.isLogin()){
					return;
				}
				
				if(!this.companyCode){
					uni.showToast({
					  icon: 'none',
					  title: '请输入企业号',
					  duration: 1000
					});
					return;
				}
				console.log(this.companyCode);
				let userInfo = uni.getStorageSync("userInfo");
				
				let res = await addQycompany({userID:userInfo.userID,companyCode:this.companyCode});
				
				console.log(res);
				
				if(res.status == 1){
					
					this.type="";
					uni.setStorageSync("userInfo",res.data.userInfo);
					uni.showToast({
					  icon: 'none',
					  title: res.message,
					  duration: 1000
					});
					
					
				}
				else{
					uni.showToast({
					  icon: 'none',
					  title: res.message,
					  duration: 1000
					});
				}
				
				
			},
			
			goToExpressInfo(orderType,createOrderType){
				if(!this.isLogin()){
					return;
				}
				if(orderType==2)
				{
					if(this.companyCode=="")
					{
						this.type = "middle";
						return;
					}
				}
				
				if(this.QrCodeOrderSN)
				{
					uni.navigateTo({
						url: '/pages/express_info/express_info?hongxing=1&createOrderType='+createOrderType+"&orderType="+orderType+"&QrCodeOrderSN="+this.QrCodeOrderSN
					});
				}
				else{
					uni.navigateTo({
						url: '/pages/express_info/express_info?hongxing=1&createOrderType='+createOrderType+"&orderType="+orderType
					});
				}
				
				
				
			},
			goToPrintList(){
				if(!this.isLogin()){
					return;
				}
				if(this.companyCode==""){
					this.type = "middle";
					return;
				}
				uni.navigateTo({
					url: '/pages/print_page/print_page'
				});
			},
			goToYunFei(){
				if(!this.isLogin()){
					return;
				}
				uni.navigateTo({
					url: '/pages/print_page/print_page'
				});
			},
			goToForbid(){
				
				uni.navigateTo({
					url: '/pages/forbid/forbid'
				});
			},
			bindCompany(type)
			{
				this.type=type;
			}
			
		}
	}
</script>

<style>

.logo_wrap{padding-top: 20upx;}
.logo_wrap img{width: 180upx;}

.company-modal{width:500upx;text-align:center;}
.company-code{padding:30upx 0 30upx 0;}
.company-code input{border:1px solid #eee;text-align:left;padding:20upx;}
	
.pd{padding:0 30upx;}
.person-express-list{border:2upx solid rgba(243, 243, 243, 1);
    box-shadow:0px 4upx 12upx 0px rgba(126,125,125,0.14);
    border-radius:8upx;margin:32upx 0;}
.person-express-list li{height:160upx; width: 90%; padding: 0upx 40upx;}
.person-express-list li .person-express-detail{border-bottom:2upx solid #e3e3e3; height: 158upx;}
/* .person-express-list li .person-express-detail:last-child{border-bottom:0;} */
.person-express-list li img{width:78upx; margin-right: 34upx;}
.person-express-list li .right-col{position: absolute;right:20upx;top:52upx;}
.person-express-list li .right-col span{font-size:48upx;color:#999999;}
.person-express-list li .text p{color:#999999;font-size:26upx;padding-top:4upx;}

.person-express-bottom{padding:0 16upx;}
.person-express-bottom .person-express-col{width:50%;float:left;box-sizing: border-box;padding:0 16upx;margin-bottom: 50upx!important;}
.person-express-bottom .person-express-col .person-express-detail{border:2upx solid rgba(243, 243, 243, 1);
    box-shadow:0px 4upx 12upx 0px rgba(126,125,125,0.14);
    border-radius:8upx;}
.person-express-bottom .person-express-col .person-express-detail{text-align: center;height:188upx;box-sizing: border-box;padding-top:32upx;}
.person-express-bottom .person-express-col .person-express-detail div{font-size:26upx;color:#666666;text-align: center;}
.person-express-bottom .person-express-col .person-express-detail img{width:108upx;}
</style>
