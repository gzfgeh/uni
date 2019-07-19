<template>
	<view>
		<div class="mui-content">
			<!-- <div class="head_wrap">
				<div style="margin-bottom: 0.17rem; font-weight: bold;">成交内容</div>
				<span class="service_content">由楼服宝提供{{params.quantity}}个{{params.service_order_name}}，并且送水上门</span>
			</div> -->
			
			<div class=" content_wrap">
				<div class="col_between border">
					<div class="content_up">
						<img :src="params.imgPic" mode="widthFix"/>
						<span class="content_center">{{params.service_order_name}}</span>
						<div class="content_end">
							<span v-if="type == 0">￥{{params.waterPrice}}</span>
							<!-- <span class="number">x{{params.quantity}}</span> -->
						</div>
					</div>
					<div class="content_down" v-if="type == 0">
						<span class="first_txt">共 <span class="num">{{params.quantity}}</span> 件</span>
						<span class="sencod_txt">应付金额:
							<span class="money">￥</span><span class="money_number">{{params.money}}</span>
							
						</span>
					</div>
				</div>
			</div>
			
			<navigator class="row_around img_wrap" url="../agressment/agressment">
				<img src="../../static/img/hetongchakan.png" mode="widthFix">
				<span style="flex: 1;">查看合同</span>
				<span class="arraw"></span>
			</navigator>
			
			<div class="row_between time_wrap" v-if="false">
				<span>服务期限</span>
				<span class="service_time">{{params.service_time}}</span>
			</div>
			
			<div class="content_wrap">
				<div class="info">联系人信息</div>
				<div class="row_between item_wrap">
					<span>姓名</span>
					<span class="content name">{{params.name}}</span>
				</div>
				
				<div class="row_between item_wrap">
					<span>手机</span>
					<span class="content mobile">{{params.phone}}</span>
				</div>
				
				<div class="row_between item_wrap">
					<span>地址</span>
					<span class="content mobile">{{params.address}}</span>
				</div>
				
				<div class="row_between item_wrap">
					<span>服务时间</span>
					<span class="content company_name">{{params.serviceTime}}</span>
				</div>
				
				<div class="row_between item_wrap" v-if="type == 1">
					<span>公司名称</span>
					<span class="content company_name">{{params.companyName}}</span>
				</div>
			</div>
			
			<div class="content_wrap" style="height: 236upx; margin-bottom: 200upx;">
				<div class="info">需求明细</div>
				
				<div class="area requirements">
					{{params.demandDetail}}
				</div>
			</div>
			
			<!-- <div class="agree_wrap">
				<label>
					<checkbox value="cb" :checked="isAgress" />本人同意并接受以下协议
				</label>
			</div> -->
			
			<div class="row_center bottom_wrap" >
				<div class="money_info" v-if="type == 0">
					<span>总价:</span>
					<span class="money_num" style="font-size: 32upx;">¥</span>
					<span class="money_num pay_money">{{params.money}}</span>
				</div>
				
				<span class="btn" @click="create_water_order">{{type==0?'立即支付':'提交订单'}}</span>
			</div>
			
		</div>
		
		<uni-popup :show="popupParam === 'bottom'" position="bottom" mode="fixed" :payWay="'2'"  :orderID="orderID" :money="params.money+''" @hidePopup="payPopup('')" />

	</view>
</template>

<script>
	import { BASE_IMAGE_URL,create_water_order} from '@/utils/api'
	import uniPopup from '@/components/popup-pay.vue'
	
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				type: 0,
				isAgress: false,
				params: '',
				popupParam:'',
				allMoney: "0",
				orderID: "0"
			}
		},
		methods: {
			async create_water_order(){
				let res = await create_water_order(this.params);
				console.log(res);
				console.log(JSON.stringify(res));
				if(res.status == 1){
					if(this.type == 1){
						//公司
						this.goToList();
					}else{
						//个人
						this.payPopup('bottom');
						this.orderID = res.data.orderID;
					}
				}else{
					uni.showToast({
						icon:'none',
						title:res.message,
						duration:1000
					})
				}
			},
			goToList(){
				uni.redirectTo({
					url: '/pages/service_order_list/service_order_list'
				});
			},
			payPopup(popupParam) {
				this.popupParam=popupParam;
			},
		},
		onLoad(options) {
			this.type = options.type;
			if(this.type == 1){
				uni.setNavigationBarTitle({
					title:"企业饮水服务"
				})
			}else{
				uni.setNavigationBarTitle({
					title:"个人饮水服务"
				})
			};
			this.params = uni.getStorageSync("serviceOrder");
		},
		onShow() {
			this.$eventHub.$on('agressment', (data) => {
				this.isAgress = data;
				console.log(this.isAgress);
				if(!this.isAgress){
					uni.showModal({
						title: "提示",
						content:"请点击同意协议，不然没法下单哦",
						success(res) {
							if(res.confirm){
								
							}
						}
					})
				}
			})
		},
		onUnload() {
			this.$eventHub.$off('agressment');
		}
	}
</script>

<style>
.mui-content{
				background-color: #FFFFFF;
			}
			
			.agree_wrap{
	position: fixed;
	bottom: 140upx;
	left: 0upx;
	width: 92%;
	margin: 0upx 4%;
	box-sizing: border-box;
	background-color: #FFFFFF;
	height: 100upx;
}

			.head_wrap{
				padding: 36upx 0rem 36upx 32upx;
				width: 100%;
				text-align: left;
				color: #333333;
				font-size: 32upx;
				box-sizing: border-box;
			}
			
			.item_wrap{
				width: 100%;
				background-color: #FFFFFF;
				height: 96upx;
				border-bottom: 2upx solid #E3E3E3;
				color: #333333;
				font-size: 28upx;
			}
			
			.item_wrap .content{
				color: #666666;
				font-size: 28upx;
			}
			
			.button{
				border-radius: 6upx;
				width: 90%;
				margin: 28upx 5%;
				box-sizing: border-box;
				background-color: #107EFF;
				color: #FEFEFE;
				font-size: 32upx;
				height: 88upx;
			}
			  
			.img_wrap{
				width: 92%;
				text-align: center;
				height: 140upx;
				margin-left: 4%;
				box-shadow: 0px 0px 20upx 0px #EAEAEA;
				padding: 0upx 36upx;
				box-sizing: border-box;
			}
			
			.img_wrap img{
				width: 40upx;
				height: 46upx;
				margin-right: 36upx;
			}  
			
			.img_wrap span{
				font-size: 28upx;
				color: #333333;
				font-weight: bold;
				text-align: left;
			}
			
			.time_wrap{
				padding: 0upx 32upx;
				color: #999999;
				font-size: 28upx;
				margin: 26upx 0upx 46upx;
			}
			
			.content_wrap{
	box-sizing: border-box;
	padding: 30upx 30upx;
	box-shadow: 0px 0px 20upx 0px #EAEAEA;
	margin: 36upx 30upx 16upx;
}

.content_wrap .border{
	width: 100%;
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
	margin-right: 20upx;
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
				min-width: 40%;
			}
			
			.money_num{
				color: #FF5269; font-size: 48upx; margin-left: 10upx;
			}
			
			.content_down{
	width: 100%;
	text-align: right;
	margin-bottom: 20upx;
}
</style>
