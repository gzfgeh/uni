<template>
	<view class="content">
		
		<navigator class="top-col">
            <img class="main-img" src="../../../static/img/fuwu_head.jpg" mode="widthFix"/>

            <div class="text" id="louyuText" @tap="selectBuild()" :style="{'top': (isAPP?'80upx':'40upx')}">
				<span>{{buildingName}}</span>
				<img class="img" src="../../../static/img/lou_select.png" mode="widthFix">
			</div>

        </navigator>
		
		<div class="sosuo" @click="goToSearch">
            <span>
                <img src="../../../static/img/home_search.png" mode="widthFix">
                <input placeholder="请输入您要搜索的单号" type="search" disabled="disabled" :style="{'padding-top': (isAPP?'-10upx': '0upx')}"/>
            </span>
        </div>
        <div class="pd">
            <div class="imc-col fuwu-first-col clearfix">
                <img class="left" @click="goToKuaidi(0)" src="../../../static/img/service_kuaidi.jpg" mode="widthFix" />
                <div class="right clearfix">
                    <div @click="goToKuaidi(1)">
                        <img src="../../../static/img/fuwu_geren_kuaidi.png" mode="widthFix">
                    </div>
                    <div @click="goToKuaidi(2)">
                        <img src="../../../static/img/fuwu_qiye_kuaidi.png" mode="widthFix">
                    </div>
                    <div @click="goToExpressListOrder">
                        <img src="../../../static/img/fuwu_yundan_genzong.png" mode="widthFix">
                    </div>
                    <div @click="goToExpressList">
                        <img src="../../../static/img/kuaidi_list.png" mode="widthFix">
                    </div>

                </div>

            </div>
        </div>
		
		<div class="pd" @click="goToWaiMai" style="margin-bottom: 20upx;">
            <div class="row">
                <img class="wai_mai_img"  src="../../../static/img/service_waimai.jpg" mode="widthFix" />
                <img src="../../../static/img/wai_mai_icon.png" mode="aspectFill" class="wai_mai_wrap">
				
				
            </div>
        </div>
		
		<div class="pd">

            <div class="imc-col clearfix">

                <img class="left" src="../../../static/img/fuwu_bg.png" mode="widthFix" @click="goToServiceForm"/>

                <div class="right clearfix" id="company_services">
					<div @click="goToServiceOrder(0)">
                        <img src="../../../static/img/ge_ren_water.png" mode="widthFix">
                    </div>
                    <div @click="goToServiceOrder(1)">
                        <img src="../../../static/img/qi_ye_water.png" mode="widthFix">
                    </div>
                    
                    <div @click="goToServiceOrder(2)">
                        <img src="../../../static/img/fuwu_baojie.png" mode="widthFix">
                    </div>
                    <div @click="goToServiceOrder(3)">
                        <img src="../../../static/img/fuwu_shangwu.png" mode="widthFix">
                    </div>
                    <div @click="goToServiceOrder(4)">
                        <img src="../../../static/img/fuwu_lvzhi.png" mode="widthFix">
                    </div>
					<div @click="goToServiceOrder(5)">
                        <img src="../../../static/img/more_service.png" mode="widthFix">
                    </div>
                </div>
            </div>
		</div>
		
		<div class="pd" @click="goToServiceOrder(6)">
			<div class="bottom-col">
                <img class="full-img" src="../../../static/img/fuwu_bottom.jpg" mode="widthFix"/>
                <div class="col_center bottom-col-detail">
                    <p>需要更多企业服务?</p>
                    <button type="button" >按需定制服务</button>
                </div>
            </div>
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

	</view>
</template>

<script>
	import { BASE_IMAGE_URL,addQycompany} from '@/utils/api'
	
	import uniPopup from '@/components/uni-popup.vue'
	
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				buildingName:"请选择楼宇",
				title: 'Hello',
				isAPP: true,
				type: '',
				companyCode:''
			}
		},
		onLoad() {
			// #ifdef APP-PLUS
				this.isAPP = true;
			// #endif
			
			// #ifdef H5
				this.isAPP = false;
			// #endif
			uni.showLoading({ title: '加载中...' });
			setTimeout( () => {
				uni.hideLoading()
			}, 500);
			
		},
		onShow() {
			this.buildingName=uni.getStorageSync("userInfo").buildingName;
			if(!this.buildingName){
				this.buildingName = "请选择楼宇";
			}
			this.companyCode = uni.getStorageSync("userInfo").companyCode
		},
		methods: {
			bindCompany(type)
			{
				this.type=type;
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
			goToSearch: function(){
				if(!this.isLogin()){
					return;
				}
				uni.navigateTo({
					url: '/pages/express_list/express_list'
				});
			},
			selectBuild: function(){
				if(!this.isLogin()){
					return;
				}
				uni.navigateTo({
					url: '/pages/build/build'
				});
			},
			goToWaiMai(){
				if(!this.isLogin()){
					return;
				}
				uni.navigateTo({
					url: '/pages/wai_mai_address/wai_mai_address'
				});
			},
			goToKuaidi(orderType){
				if(!this.isLogin()){
					return;
				}
				uni.navigateTo({
					url: '/pages/express_main/express_main?orderType='+orderType
				});
			},
			goToExpressListOrder(){
				if(!this.isLogin()){
					return;
				}
				uni.navigateTo({
					url: '/pages/express_list_order/express_list_order'
				});
			},
			goToExpressList(){
				if(!this.isLogin()){
					return;
				}
				uni.navigateTo({
					url: '/pages/express_list/express_list'
				});
			},
			goToServiceForm(){
				if(!this.isLogin()){
					return;
				}
				uni.navigateTo({
					url: '/pages/service_form/service_form'
				});
			},
			goToServiceOrder(index){
				let userInfo = uni.getStorageSync("userInfo");
				if(userInfo){
					
					if(index == 0){
						uni.navigateTo({
							url: '/pages/service_form/service_form?type=0'
						});
					}else if(index == 1){
						if(this.companyCode=="")
						{
							this.type = "middle";
							return;
						}
						uni.navigateTo({
							url: '/pages/service_form/service_form?type=1'
						});
					}else if(index == 5){
						uni.showToast({
						  icon: 'none',
						  title: '敬请期待',
						  duration: 1000
						});
					}
					else{
						uni.navigateTo({
							url: '/pages/custom_service/custom_service?type='+index
						});
					}
					
				}else{
					uni.navigateTo({
						url: '/pages/login/login'
					});
				}
			}
		}
	}
</script>

<style>
	
	.company-modal{width:500upx;text-align:center;}
	.company-code{padding:30upx 0 30upx 0;}
	.company-code input{border:1px solid #eee;text-align:left;padding:20upx;}
	
	.content {
		text-align: center;
		display: flex;
		flex-direction: column;
	}
	
	.wai_mai_img{width: 220upx; height: 160upx;margin-right: 10upx;}
	.wai_mai_wrap{height: 160upx; flex: 1;}
	.wai_mai_icon{height: 40upx; width: 40upx; margin-right: 20upx;}
	
	.mui-content {
            background: #fff;
        }
		
		.pd{padding: 0 30upx;}

        .top-col {
            position: relative;
            box-sizing: border-box;
        }

        .top-col .main-img {
            display: block;
            width: 100%;
            box-sizing: border-box;
        }

        .top-col .text {
            font-size: 34upx;
            position: absolute;
            width: 100%;
            top: 80upx;
            color: #fff;
            text-align: center;
        }

        .top-col .img {
            width: 36upx;
            position: relative;
            top: 6upx;
            margin-left: 8upx;
        }

        .sosuo {
            position: relative;
            top: -48upx;
        }

        .sosuo span img {
            width: 32upx;
            position: absolute;
            top: 36upx;
            left: 120upx;
            opacity: 0.6;
			z-index: 100;
        }

        .sosuo span input {
            border: 2upx solid rgba(221, 221, 221, 1);
            box-shadow: 0px 4upx 8upx 0px rgba(126, 125, 125, 0.06);
            border-radius: 48upx;
            height: 100upx;
            padding-left: 10upx;
            font-size: 32upx;
            background: #fff;
			width: 90%;
			margin-left: 5%;
			box-sizing: border-box;
        }

        .imc-col .left {
            width: 32.5%;
            float: left;
        }

        .imc-col .right {
            width: 67.5%;
            float: right;
            box-sizing: border-box;
            padding-left: 4upx;
        }

        .imc-col .right div {
            width: 50%;
            float: left;
            box-sizing: border-box;
            padding: 0 4upx;
        }

        .imc-col .right img {
            width: 100%;
			border-radius: 5upx;
        }

        .bottom-col {
            position: relative;
        }

        .bottom-col .bottom-col-detail p {
            color: #666666;
			font-size: 28upx;
			margin-bottom: 30upx;
        }

        .bottom-col .bottom-col-detail {
            width: 100%;
            top: 20%;
            position: absolute;
            left: 0;
            text-align: center;
        }

        .bottom-col .bottom-col-detail button {
            border: 2upx solid #277EFF;
            color: #277EFF;
            border-radius: 40upx;
			font-size: 24upx;
			height: 64upx;
			text-align: center;
			line-height: 64upx;
			width: 204upx;
			box-sizing: border-box;
			background-color: #FFFFFF;
        }

        .fuwu-first-col .left {
            height: 246upx;
        }

        .fuwu-first-col .right img {
            height: 120upx;
        }

        .imc-col .right .waimai-col {
            width: 100%;
            box-shadow: #ddd 0px 0px 4upx;
            margin-top: 4upx;
            height: 152upx;
            border-radius: 4upx;
        }

        .imc-col .right .waimai-main {
            box-sizing: border-box;
            padding-left: 6upx;
            float: none;
            width: 100%;
            padding-right: 4upx;
        }


        .imc-col .right .waimai-col .top-col {
            position: relative;
            padding-left: 84upx;
            box-sizing: border-box;
            float: none;
            width: 100%;
        }

        .waimai-col .top-col .top-col-left {
            width: 60upx;
            height: 60upx;
            border-radius: 50%;
            float: none;
            position: absolute;
            left: 20upx;
            top: 24upx;
        }

        .waimai-col .top-col .top-col-right {
            float: none;
            width: 100%;
            padding-top: 16upx;
        }

        .waimai-col .top-col .top-col-right p span {
            color: #666;
        }

        .waimai-col .top-col .top-col-right div {
            float: none;
            font-size: 28upx;
            color: #999;
            width: 100%;
        }

        .waimai-col .top-col .top-col-right p {
            font-size: 24upx;
            margin-top: -4upx;
            margin-bottom: 0;
        }

        .imc-col .right .waimai-col .detail-col {
            float: none;
            width: 100%;
            font-size: 26upx;
            color: #000;
            padding-left: 20upx;
        }
		
		.full-img{display: block;width:100%;}
</style>
