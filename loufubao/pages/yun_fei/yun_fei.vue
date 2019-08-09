<template>
	<view>
		<div class="mui-content has-header yunfei-col">
			<div class="express-info">
				<div class="express-info-col" >
					<img src="../../static/img/express_start_add.png" mode="widthFix">

					<div class="middle-text" id="chufa" :class="{'active': (start_name.length>0)}">
						<div class="placeholder" v-if="start_name.length == 0">从哪里寄</div>
						<div class="middle-value">
							<div class="middle-value-top">
								{{start_name}}  {{start_phone}}
							</div>
							<div class="middle-value-bottom">
								{{start_province}}{{start_city}}{{start_area}}{{start_detail}}
							</div>
						</div>
					</div>


				</div>
				<div class="express-info-col" @click="selectAddress(1)">
					<img src="../../static/img/express_end_add.png" mode="widthFix">
					<div class="middle-text" id="daoda" :class="{'active': (end_name.length>0)}">
						<div class="placeholder" v-if="end_name.length == 0">寄到哪里</div>
						<div class="middle-value">
							<div class="middle-value-top">
								 {{end_name}}  {{end_phone}}
							</div>
							<div class="middle-value-bottom">
								{{end_province}}{{end_city}}{{end_area}}{{end_detail}}
							</div>
						</div>
					</div>
					

				</div>


			</div>

			<div class="yunfei-list">
			
				<li class="middle-col">
					<div class="row_center">
						<span class="left">重量</span>
				
						<div class="middle weight_wrap">
							<img class="sub-value" src="../../static/img/reduce_icon.png" mode="widthFix" @click="reduceWeight"/>
							<!-- <span class="weight-value active">{{weight}}</span> -->
							<input type="number" maxlength="4" v-model="weight" class="input_weight" @blur="calAllPrice"/>
							<img class="add-value" src="../../static/img/add_icon.png" mode="widthFix" @click="addWeight"/>
						</div>
				
						<span class="right no-arrow">
							<span class="text">千克</span>
						</span>
					</div>
				</li>
				
				<li class="guoji-col hide">
					<div>
						<span class="left">是否保价</span>
						<span class="right">
							<switch @change="BaoJiaChange" />
						</span>
					</div>
				</li>
				
				<li id="baojiaCol" v-if="baoJiaFlag">
					<div class="row_between">
						<span class="left">保价金额</span>
						<span class="middle">
							<input type="number" v-model="insuredValue" onkeyup="this.value=this.value.replace(/[^0-9.]/g,'')" placeholder="请输入保价金额" maxlength="5" @input="baoJiaChange"/>
						</span>
						<span class="right">
							<span>保费:<span class="baofei">{{insuredPrice}}</span>元</span>
						</span>
					</div>
				</li>
				
			</div>

			<div class="select-company" v-if="createOrderType!=3">
				<div class="yunfei-img-title" >
					请选择快递公司
				</div>
			
				<div class="yunfei-img-list" >
					<div class="swiper-container">
						<div class="swiper-wrapper" >
							<scroll-view scroll-x class="scroll-Y scrollbar">
								<div class="swiper-slide" v-for="(item, index) in companyList" :key="index" 
								:class="{'active': (company_index == index)}" @click="changeCompany(index)">
									<div><img :src="item.logoURL" mode="widthFix"/></div>
									<p>{{item.expressCompanyName}}</p>
									<div class="express-jiage" v-if="createOrderType != 2">
										￥<span class="bottom">{{item.price}}</span>
									</div>
									<img src="../../static/img/yunfei_select.png" mode="widthFix" class="company_select" v-if="(company_index == index)">
								</div>
								
							</scroll-view>
				
						</div>
					</div>
				</div>
				

			</div>


			<div class="bottom-space"></div>

			<div class="yunfei-bottom">

				<div class="left has-tip">
					<div class="price-cell">
					运费:
					<span>
						<span id="priceText" >￥{{allMoney}}元</span>
					
					</span>

					<div class="tip" v-if="insuredValue">（含保费)<label class="baofei">{{insuredPrice}}</label>元</div>
					</div>
				</div>

					
				<!-- <button type="button" id="submitBtn"  @click="calculatePrice">运费计算</button> -->
				

			</div>

		</div>
		
		<mpvue-picker themeColor="#007AFF" ref="mpvuePicker" mode="selector" :pickerValueDefault="pickerValueDefault"
	   @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
	  

	</view>
</template>

<script>
	import { BASE_IMAGE_URL,calculateExpressPrice,addressManage,region} from '@/utils/api'
	import {mapState,mapMutations, mapActions, mapGetters} from 'vuex';
	import mpvuePicker from '../../components/mpvuePicker.vue';
	
	export default {
		components: {
			mpvuePicker
		},
		data() {
			return {
				popupParam:'',
				companyList: [],
				qcServiceType:1,
				qcOrderType:1,
				company_index: 0,
				goodsTypeFlag: false,
				payStyleFlag: false,
				packageFlag: false,
				faPiaoFlag: false,
				beiZhuFlag: false,
				createOrderType: 1,
				addressType: -1,
				start_name: '上海',
				start_phone: '',
				start_province: '',
				start_city: '',
				start_area: '',
				start_detail: '',
				end_name: '',
				end_phone: '',
				end_province: '',
				end_city: '',
				end_area: '',
				end_detail: '',
				
				end_name1: '',
				end_phone1: '',
				end_province1: '',
				end_city1: '',
				end_area1: '',
				QrCodeOrderSN:'',
				end_detail1: '',
				isQrCode:0,
				isCalculateExpressPriceTongCheng:0,
				
				sendAddressID: 0,
				receiveAddressID: 0,
				receiveAddressID1:0,
				tagList: ['文件','日用品','食品','数码产品','衣物','其他'],
				tag_index: 0,
				weight: 1,
				payList: ['寄付','到付'],
				pay_index: 0,
				piaoList: ['商业发票', '形式发票'],
				piao_index: 0,
				comment: '',
				baoJiaFlag: false,
				insuredValue: '',
				expressProductType: 1,
				orderType:0,
				allMoney: 0,
				insuredPrice: 0,
				expressCompanyID: 0,
				platform: 2,
				classA:'active',
				classB:'',
				classC:'',
				isInternational: 0,
				expressPackageDetail: '',
				isPrintEs: false,
				orderID:"",
				orderSN:"",
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray: []
			}
		},
		computed:{
			...mapState({
				addressID: state => state.addressID
			})
		},
		
		methods: {
			onConfirm(e){
				if(e.label == "上海"){
					uni.showToast({
						title:"不能选择同一个城市",
						icon: 'none',
						duration:1000
					});
					return;
				}
				this.end_name = e.label;
				console.log(this.end_name);
				this.calculateExpressPrice();
			},
			baoJiaChange(e){
				console.log(e);
				this.insuredValue = e.detail.value;
				
				if(this.createOrderType==3)
				{
					this.calculateExpressPriceTongCheng();
				}
				else{
					this.calculateExpressPrice();
				}
				
			},
			addWeight(){
				this.weight = parseFloat(this.weight);
				this.weight += 0.5;
				this.calAllPrice();
				
			},
			reduceWeight(){
				this.weight = parseFloat(this.weight);
				if(this.weight <= 1){
					this.weight = 1;
					return;
				}
				this.weight -= 0.5;
				this.calAllPrice();
				
			},
			changeTag(index){
				this.tag_index = index;
				this.goodsTypeFlag = false;
			},
			changePay(index){
				this.pay_index = index;
				this.payStyleFlag = false;
			},
			changePiao(index){
				this.piao_index = index;
				this.faPiaoFlag = false;
			},
			changeCompany(index){
				this.company_index = index;
				this.allMoney = parseFloat(this.companyList[index].price_total).toFixed(2);
				this.insuredPrice = parseFloat(this.companyList[index].insuredPrice).toFixed(2);
				this.expressCompanyID = this.companyList[index].expressCompanyID;
			},
			payPopup(popupParam) {
				this.popupParam=popupParam;
			},
			showGoodsType(){
				this.goodsTypeFlag = true;
			},
			showPayStyle(){
				this.payStyleFlag = true;
			},
			showPackageFlag(){
				this.packageFlag = true;
			},
			showFaPiaoFlag(){
				this.faPiaoFlag = true;
			},
			showBeiZhuFlag(){
				this.beiZhuFlag = true;
			},
			hideModal(){
				this.goodsTypeFlag = false;
				this.payStyleFlag = false;
				this.packageFlag = false;
				this.faPiaoFlag = false;
				this.beiZhuFlag = false;
			},
			BaoJiaChange(e){
				console.log(e);
				this.baoJiaFlag = e.detail.value;
				if(!this.baoJiaFlag){
					// 关闭了
					this.insuredValue = 0;
					this.insuredPrice = 0;
					this.calculateExpressPrice();
				}else{
					// 打开 了
					this.insuredValue = 0;
					this.insuredPrice = 0;
					
				}
			},
			JiaJiChange(e){
				
				if(e.detail.value)
				{
					this.qcServiceType=2;
				}
				else{
					this.qcServiceType=1;
				}
				console.log(this.qcServiceType);
			},
			
			PrintChange(e){
				this.isPrintEs = e.detail.value;
			},
			
			async region(){
				let params = {
					type: 0,
					isShow: false
				};
				
				let res = await region(params);
				if(res.status==1){
					res.data.map((item, index) => {
						item.label = item.name;
						item.value = item.id;
						this.pickerValueArray.push(item);
						
					});
				}
			},
			
			
			selectAddress(index){
				this.$refs.mpvuePicker.show();
			},
			
			async calculatePrice(){
				
				if(!this.end_name){
					uni.showToast({
					  icon: 'none',
					  title: '请选择收件地址',
					  duration: 1000
					});
					return;
				};
				
				this.calculateExpressPrice();
				
			},
			
			calAllPrice(){
				if(this.createOrderType==3)
				{
					this.calculateExpressPriceTongCheng();
				}
				else{
					this.calculateExpressPrice();
				}
			},
			
			async calculateExpressPrice(){
				
				if(this.baoJiaFlag){
					if(!this.insuredValue){
						return;
					}
				};
				
				if(this.end_name==""){
					return;
				};
				
				let userInfo = uni.getStorageSync("userInfo");
				uni.setStorageSync("isShow", false);
				let params = {
					fromAddressID: this.sendAddressID,
					toAddressID: this.receiveAddressID,
					fromWhere: this.start_name,
					toWhere: this.end_name,
					yzID: userInfo.yzID,
					userID: userInfo.userID,
					weight: this.weight,
					expressProductType: this.expressProductType,
					insuredValue: this.insuredValue,
					orderType: this.orderType
				};
				console.log(params);
				let res = await calculateExpressPrice(params);
				if(res.status == 1){
					this.companyList = res.data.defaultExpressInfo;
					if(this.companyList.length <= this.company_index){
						this.company_index = 0;
					}
					this.allMoney = parseFloat(this.companyList[this.company_index].price_total).toFixed(2);
					this.insuredPrice = parseFloat(this.companyList[this.company_index].insuredPrice).toFixed(2);
					this.expressCompanyID = this.companyList[this.company_index].expressCompanyID;
				}else{
					uni.showToast({
					  icon: 'none',
					  title: res.message,
					  duration: 1000
					});
				}
				
			},
		},
		onLoad(options) {
			this.region();
			//this.popupParam="bottom";
			
			this.createOrderType = options.createOrderType;
			this.orderType = options.orderType;
			
			if(options.QrCodeOrderSN)
			{
				this.isQrCode=1;
				this.QrCodeOrderSN=options.QrCodeOrderSN;
			}
			
			if(this.orderType==1&&this.createOrderType==1)
			{
				uni.setNavigationBarTitle({
					title: '个人国内快递'
				});
			}
			else if(this.orderType==1&&this.createOrderType == 2){
				uni.setNavigationBarTitle({
					title: '个人国际快递'
				});
				this.isInternational = 1;
			}
			else if(this.orderType==1&&this.createOrderType==3)
			{
				uni.setNavigationBarTitle({
					title: '个人同城快递'
				});
			}
			else if(this.orderType==2&&this.createOrderType==1)
			{
				uni.setNavigationBarTitle({
					title: '企业国内快递'
				});
			}
			else if(this.orderType==2&&this.createOrderType == 2){
				uni.setNavigationBarTitle({
					title: '企业国际快递'
				});
				this.isInternational = 1;
			}
			else if(this.orderType==2&&this.createOrderType==3)
			{
				uni.setNavigationBarTitle({
					title: '企业同城快递'
				});
			}
			
			
			this.$store.dispatch("changeAddressFunc", 0);
			let plat = uni.getSystemInfoSync().platform;
			console.log(plat);
			if(plat == 'android'){
				this.platform = 2;
			}else if(plat == 'ios'){
				this.platform = 3;
			}else {
				//weixin
				this.platform = 1;
			};
			
			if(this.orderType == 2){
				this.platform = 4;
			}
		},
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
.express-info .express-info-col .middle-text.active .middle-value{color:#999999;font-size:24upx;padding-top:50upx;}
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
.yunfei-img-list .swiper-slide{width: 180upx; height: 224upx;display: inline-block;margin-right: 20upx;position: relative;}
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
.yunfei-bottom .left{font-size:30upx;display: inline-block;margin-left:30upx;color:#666;text-align: center;}
.yunfei-bottom .left .tip{font-size:24upx;color:#999999;}
.yunfei-bottom .left span{font-size:44upx;color:#FF5269;}
.yunfei-bottom .left span.small{font-size:24upx;color:#FF5269;}
.yunfei-bottom .left.has-tip{position: relative;}
.yunfei-bottom .left.has-tip .price-cell{display: table-cell;vertical-align: middle;line-height:normal;height:100upx;}
.company_select{width: 40upx!important;height: 40upx!important; position: absolute;right: -4upx; top: -4upx;}

.select-company{background: #fff;margin-top:16upx;border-bottom:16upx solid #f9f9f9;}
.select-company .miandan{height:94upx;line-height: 94upx;border-top:2upx solid #e3e3e3;}
.select-company .miandan .left{font-size:26upx;float:left;margin-left: 30upx;}
.select-company .miandan .right{float:right;margin-right:30upx;}
.select-company .yunfei-img-list{padding-bottom:30upx;}

.bottom-space{height:160upx;}
.scroll-Y{ white-space: nowrap; width: 100%; box-sizing: border-box;padding: 0upx;}
::-webkit-scrollbar { width: 0;height: 0;color: transparent;}

.guige-col .clearfix{height:0.65rem;}
.guige-col .fl img{width:1.05rem;border-radius:4px;position: absolute;top:-0.35rem;}

.guige-row{padding:20upx 0;}
.guige-row .title-col{font-size:32upx;padding:0 0 10upx 0;}
.guige-list{width:100%;padding:0 0;}
.guige-list li{text-align: center;font-size:26upx;padding:4upx 40upx;}
.guige-list li.active{color:#107EFF;}
.beizhu-col .shadow-col{background: rgba(0,0,0,0.6);left:0;top:0;position: fixed;height:100%;width:100%;z-index:1000;}
.beizhu-text{background:#fff;border-radius:4px;width:100%;left:0;bottom:0;position: fixed;padding:30upx;z-index:10000;box-sizing: border-box;}
/* .beizhu-text .right-close{position: relative;top:-24upx;right:20upx;z-index: 1000;}
.beizhu-text .right-close span{color:#333333;font-size:64upx;} */
.beizhu-text .right-close img{width: 30upx;}

.beizhu-text .clearfix{padding-bottom:26upx;font-size:28upx;font-weight: bold;}
.beizhu-text .clearfix .fr{color:#107EFF;font-size:26upx;display: inline-block;padding:4upx 0  4upx 10upx;}
.beizhu-text textarea{font-size:26upx;border:none;background-color: #FBF8F9;width: 100%;padding: 20upx;box-sizing: border-box;}

.beizhu-text .tag-list{margin:0upx -10upx;}
.beizhu-text .tag-list span{color:#666666;border:2upx solid #999999;width:200upx;text-align:center;line-height: 68upx;display: inline-block;font-size:26upx;border:2upx solid rgba(153,153,153,1);
    border-radius:34upx;padding:0 0;margin:10upx;}
.beizhu-text .tag-list span.active{background: #107EFF;color:#fff;border-color: #107EFF}


.add-list .mui-input-row{height:100upx; display: flex; flex-direction: row; align-items: center;border-bottom: 2upx solid #E3E3E3;}
.add-list .mui-input-row label{font-size:28upx;line-height: 100upx;box-sizing: border-box;padding:0 30upx; min-width: 260upx;}
.add-list .mui-input-row input{font-size:28upx;height:100upx;}
.add-list{margin-top:-30upx;}
.add-list .mui-input-group:before{display: none;}
.add-list .mui-input-group:after{display: none;}
.add-list .btn{height:80upx;line-height: 80upx;text-align:center;display: block; width: 100upx;background-color: #107EFF;color: #FFFFFF;border-radius: 20upx; padding: 0upx 40upx;}
.jianshu-col img{width:48upx;display: inline-block;vertical-align: middle;}
/* .jianshu-col .middle{position: relative;top:24upx;} */
.jianshu-col .middle .value{display: inline-block;vertical-align: middle;width:40upx;text-align: center;}
.btn_wrap{margin: 40upx 0upx;}
.middle-value-bottom{overflow: hidden;text-overflow: ellipsis;white-space: nowrap;padding-right: 80upx;}

.weight_wrap{display: flex; flex-direction: row; align-items: center;}
.input_weight{display: inline-block;width: 120upx; height: 100upx; line-height: 100upx; text-align: center; padding: 0upx 10upx!important;}


</style>
