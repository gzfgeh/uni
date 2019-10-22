<template>
	<view>
		<div class="mui-content has-header yunfei-col">

			<div class="address-tab hide clearfix tongcheng-col" v-if="createOrderType == 3">
				<div class="address-col" :class="classA" @tap="liancheng(1)">
					<div class="address-detail">
						单程件
						<div>A -> B</div>
					</div>
				</div>
				<div class="address-col" :class="classB" @tap="liancheng(2)">
					<div class="address-detail">
						来回件
						<div>A -> B -> A</div>
					</div>
				</div>
				<div class="address-col" :class="classC" @tap="liancheng(3)">
					<div class="address-detail">
						联程件
						<div>A -> B -> C</div>
					</div>
				</div>
			</div>

			<div class="express-info">
				<div class="express-info-col" @click="selectAddress(0)">
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

					<span class="right" >地址簿</span>

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
					<span class="right" >地址簿</span>

				</div>

				<div class="express-info-col hide liancheng-col" v-if="createOrderType == 3&&qcOrderType==3" @click="selectAddress(2)">
					<img src="../../static/img/express_end_add.png" mode="widthFix">
					<div class="middle-text" id="daoda1" :class="{'active': (end_name1.length>0)}">
						<div class="placeholder" v-if="end_name1.length == 0">再寄到哪里</div>
						
						<div class="middle-value">
							<div class="middle-value-top">
								{{end_name1}}  {{end_phone1}}
							</div>
							<div class="middle-value-bottom">
								{{end_province1}}{{end_city1}}{{end_area1}}{{end_detail1}}
							</div>
						</div>
						
					</div>
					<span class="right">地址簿</span>

				</div>


			</div>

			<div class="yunfei-list">
				<li id="wupinSelect" v-if="isHongxing == 1">
					<div>
						<span class="left">输入姓名</span>
						<span class="right" style="top:28upx!important;">
							<input type="text" placeholder="请输入姓名" class="name" v-model="hongxingName">
						</span>
					</div>
				</li>
				
				<li id="wupinSelect" v-if="isHongxing == 1" @click="selectDepartment">
					<div>
						<span class="left">选择部门</span>
						<span class="right">
							<span class="text" :class="{'place-holder': (departmentName == '请选择部门')}">{{departmentName}}</span>
							<span class="arraw"></span>
						</span>
					</div>
				</li>
				
				<li id="wupinSelect" @click="showGoodsType" v-if="createOrderType != 4">
					<div>
						<span class="left">物品类型</span>
						<span class="right">
							<span class="text">{{tagList[tag_index]}}</span>
							<span class="arraw"></span>
						</span>
					</div>
				</li>
				<li class="middle-col">
					<div class="row_center">
						<span class="left">重量</span>

						<div class="middle weight_wrap">
							<img class="sub-value" src="../../static/img/reduce_icon.png" mode="widthFix" @click="reduceWeight"/>
							<!-- <span class="weight-value active">{{weight}}</span> -->
							<input type="number" oninput="value=value.replace(/[^\d]/g,'')" maxlength="8" v-model="weight" class="input_weight" @blur="calAllPrice" @input="weightChange"/>
							<img class="add-value" src="../../static/img/add_icon.png" mode="widthFix" @click="addWeight"/>
						</div>

						<span class="right no-arrow">
							<span class="text">千克</span>
						</span>
					</div>
				</li>
				<li class="guoji-col" @click="showPayStyle">
					<div>
						<span class="left">付款方式</span>
						<span class="right">
							<span class="text">{{payList[pay_index]}}</span>
							<span class="arraw"></span>
						</span>
					</div>
				</li>

				<li class="baoguo-col" @click="showFaPiaoFlag" v-if="createOrderType == 2">
					<div>
						<span class="left">发票类型</span>
						<span class="right">
							<span class="text">{{piaoList[piao_index]}}</span>
							<span class="arraw"></span>
						</span>
					</div>
				</li>

				<li class="baoguo-col" @click="showPackageFlag" v-if="false">
					<div>
						<span class="left">包裹详情</span>
						<span class="right">
							<span class="arraw"></span>
						</span>
					</div>
				</li>
			
				<li id="baojiaCol" v-if="goodsValueFlag">
					<div class="row_between">
						<span class="left">申报价值</span>
						<!-- <span class="middle"> :disabled=" (expressCompanyName != 'EMS' && createOrderType != 4)"
							<input type="number" v-model="insuredValue" onkeyup="this.value=this.value.replace(/[^0-9.]/g,'')" placeholder="请输入保价金额" maxlength="5" @input="baoJiaChange"/>
						</span> --> 
						
						<input type="number" oninput="value=value.replace(/[^\d]/g,'')"
						v-model="goodsValueInput" placeholder="请输入申报价值" maxlength="5"  @blur="goodsValueBlur" style="margin-left: 200upx;"/>
						
						
					</div>
				</li>
				
				<li id="baojiaCol" @click="showBaoJia" >
					<div class="row_between">
						<span class="left">保价金额</span>
						<!-- <span class="middle"> :disabled=" (expressCompanyName != 'EMS' && createOrderType != 4)"
							<input type="number" v-model="insuredValue" onkeyup="this.value=this.value.replace(/[^0-9.]/g,'')" placeholder="请输入保价金额" maxlength="5" @input="baoJiaChange"/>
						</span> --> 
						
						<input type="number" v-model="insuredValue" :disabled=" (expressCompanyName != 'EMS' && createOrderType != 4)"
							placeholder="请输入保价金额" maxlength="5" @input="baoJiaChange" @blur="baoJiaBlur" style="margin-left: 200upx;"/>
						
						<span class="right" v-if="createOrderType!=3">
							<span>保费:<span class="baofei">{{insuredPrice}}</span>元</span>
						</span>
					</div>
				</li>
				
				<li class="liancheng-col" v-if="createOrderType==3">
					<div>
						<span class="left">是否加急</span>
						<span class="right">
							<switch @change="JiaJiChange" />
						</span>
					</div>
				</li>
				
				<li @tap="showGoodsInfoFlag" v-if="createOrderType == 4">
					<div>
						<span class="left">物品信息</span>
						<span class="middle">
							<span class="beizhu">{{goodsInfo}}</span>
						</span>
						<span class="right">
							<span class="arraw"></span>
						</span>
					</div>
				</li>
				
				<li @click="showBeiZhuFlag">
					<div>
						<span class="left">备注</span>
						<span class="middle">
							<span class="beizhu">{{comment}}</span>
						</span>
						<span class="right">
							<span class="arraw"></span>
						</span>
					</div>
				</li>
				
				<div  v-if="createOrderType == 4" class="goods_warning_wrap">
					<div class="row">
						<image src="../../static/img/big_warning.jpg" mode="aspectFill"></image>
						<span>提示</span>
					</div>
					<p>1、请详细描述要寄出的物品信息，以便工作人员对您的物品做出正确的评估；</p>
					<p>2、由于大件物品的运费计算涉及到重量、体积、打包方式、运输方式等，工作人员在取货时当面与您确认。</p>
				</div>
				
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
									<div class="express-jiage" v-if="createOrderType != 2 && (item.price)">
										<span class="bottom">{{orderType==1?'￥'+item.price:'按照合同价'}}</span>
									</div>
									<img src="../../static/img/yunfei_select.png" mode="widthFix" class="company_select" v-if="(company_index == index)">
								</div>
								
							</scroll-view>
				
						</div>
					</div>
				</div>
				<div class="pd guoji-col hide">
					<div class="miandan clearfix">

						<div class="left">是否打印小标签</div>
						<span class="right">
							<switch @change="PrintChange" />
						</span>

					</div>
				</div>

			</div>


			<div class="bottom-space"></div>

			<div class="yunfei-bottom row">

				<div class="left has-tip">
					<div class="price-cell">
					运费:
					<span>
						<span id="priceText" v-if="createOrderType!=3&&createOrderType!=2&&allMoney!=0&&pay_index==0&&(start_province == '上海')">{{allMoney}}元</span>
						
						<span id="priceText" v-if="pay_index==1&&(start_province == '上海')" style="font-size:30upx;">到付件无需支付</span>
						
						<span id="priceText" v-if="parseInt(allMoney)==0 &&pay_index==0&&(start_province == '上海')" style="font-size:30upx;">请与工作人员联系</span>
						
						<span id="priceText" v-if="start_province != '上海'" style="font-size:24upx;">提示按照合同价格结算</span>
					
					</span>

					<div class="tip" >
						 <span v-if="insuredValue&&pay_index==0&&createOrderType!=3&&(expressCompanyName == 'EMS')">（含保费)<label class="baofei">{{insuredPrice}}</label>元</span>
						 <!-- <span v-if="coupon_price">优惠:{{coupon_price}}元</span> -->
					</div>
					<div class="tip" v-if="coupon_price">（优惠价格)<label class="baofei">{{coupon_price}}</label>元</div>
					
					
				</div>
					
				</div>

					
				<button type="button" id="submitBtn"  @click="createOrder">提交订单</button>
				
				<uni-popup :show="popupParam === 'bottom'" position="bottom" mode="fixed" :payWay="'0'" :orderSN="orderSN" :orderID="orderID" :money="allMoney" @hidePopup="payPopup('')" />

			</div>

		</div>
		
		<div class="beizhu-col" v-if="goodsTypeFlag|| payStyleFlag || packageFlag || faPiaoFlag || beiZhuFlag || goodsInfoFlag">

			<div class="shadow-col" @tap="hideModal"></div>
			
			<div class="beizhu-text" v-if="goodsTypeFlag">
				<div class="clearfix row_between">
					<span class="fl">物品类型</span>

					<span class="fr right-close" @click="hideModal">
						<img src="../../static/img/login_close.png" mode="widthFix">
					</span>
				</div>

				<div class="tag-list">
					<span :class="{'active': (tag_index == index)}" v-for="(item, index) in tagList" :key="index" @click="changeTag(index)">
						{{item}}
					</span>
				</div>
			</div>
		
			<div class="beizhu-text" v-if="payStyleFlag">
				<div class="clearfix row_between" >
					<span class="fl">付款方式</span>

					<span class="fr right-close" @click="hideModal">
						<img src="../../static/img/login_close.png" mode="widthFix">
					</span>
				</div>

				<div class="tag-list">
					<span :class="{'active': (pay_index == index)}" v-for="(item, index) in payList" :key="index" @click="changePay(index)">
						{{item}}
					</span>
				</div>

			</div>
		
			<div class="beizhu-text" v-if="packageFlag">
				<div class="clearfix row_between">
					<span class="fl">添加包裹详情</span>

					<span class="fr right-close" @click="hideModal">
						<img src="../../static/img/login_close.png" mode="widthFix">
					</span>
				</div>

				<div class="add-list">

					<div class="mui-input-group">
						<div class="mui-input-row">
							<label>内件品名</label>
							<input type="text" id="rowValue1" placeholder="请输入内件品名">
						</div>

						<div class="mui-input-row jianshu-col">
							<label>件数</label>
							<span class="middle">
								<img class="sub-value" src="../../static/img/reduce_icon.png" mode="widthFix"/>
								<span class="value active">1</span>
								<img class="add-value" src="../../static/img/add_icon.png" mode="widthFix"/>
							</span>
						</div>

						<div class="mui-input-row">
							<label>重量</label>
							<input type="number" id="rowValue3" placeholder="请输入重量">
						</div>
						<div class="mui-input-row">
							<label>单件价值(USD)</label>
							<input type="number" id="rowValue4" placeholder="请输入单件价值">
						</div>
						<div class="mui-input-row">
							<label>原产地</label>
							<input type="text" id="rowValue5" placeholder="请输入原产地">
						</div>



						<div class="btn_wrap row_center">
							<div class="btn" onclick="addBaoguoRow()">保存
							</div>
						</div>
					</div>

				</div>

			</div>

			<div class="beizhu-text" v-if="faPiaoFlag">
				<div class="clearfix row_between">
					<span class="fl">发票类型</span>

					<span class="fr right-close" @click="hideModal">
							<img src="../../static/img/login_close.png" mode="widthFix">
					</span>
				</div>

				<div class="tag-list">
					<span :class="{'active': (piao_index == index)}" v-for="(item, index) in piaoList" :key="index" @click="changePiao(index)">
						{{item}}
					</span>
				</div>

			</div>

			<div class="beizhu-text" v-if="beiZhuFlag">
				<div class="clearfix row_between">
					<span class="fl">填写备注</span>
					<span class="fr" id="confirmBtn" @click="hideModal">确定</span>
				</div>

				<textarea :placeholder="commentPlaceHolder" v-model="comment"></textarea>

			</div>
			
			<div class="beizhu-text" v-if="goodsInfoFlag">
				<div class="clearfix row_between">
					<span class="fl">填写物品信息</span>
					<span class="fr" id="confirmBtn" @click="hideModal">确定</span>
				</div>
			
				<textarea placeholder="请填写物品信息信息" v-model="goodsInfo"></textarea>
			
			</div>

		</div>
		

	</view>
</template>

<script>
	import { BASE_IMAGE_URL,calculateExpressPrice,addressManage,createOrder,specAddress,getDefaultAddress,getExpressCompany,
		createOrderTongCheng,calculateExpressPriceTongCheng,department,user_express_coupon} from '@/utils/api'
	import uniPopup from '@/components/popup-pay.vue'
	import {mapState,mapMutations, mapActions, mapGetters} from 'vuex';
	
	export default {
		components: {
			uniPopup
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
				start_name: '',
				start_phone: '',
				start_province: '上海',
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
				piaoList: ['形式发票', '商业发票'],
				piao_index: 0,
				comment: '',
				baoJiaFlag: false,
				insuredValue: '',
				expressProductType: 1,
				orderType:0,
				allMoney: '',
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
				expressCompanyName: '',
				isHongxing: 0,
				hongxingName: '',
				departmentName: '请选择部门',
				itemList: [],
				goodsInfo: "",
				goodsInfoFlag: false,
				coupon_price: 0,
				c_id: 0,
				specAddr: {},
				goodsValueFlag: false,
				goodsValueInput: '',
				commentPlaceHolder: '请填写备注信息'
			}
		},
		computed:{
			...mapState({
				addressID: state => state.addressID
			})
		},
		
		methods: {
			goodsValueBlur(e){
				if(!this.goodsValueInput || parseFloat(this.goodsValueInput)==0){
					this.goodsValueInput = 0
					this.$forceUpdate();
				}
				
				if(e.detail.value.substring(0, 1) == "."){
					this.goodsValueInput = 1
				}
				
				if(this.goodsValueInput%1 === 0){
					this.goodsValueInput = parseFloat(this.goodsValueInput).toFixed(1)
				}
			},
			async specAddress(){
				let res = await specAddress(1);
				if(res.status == 1){
					this.specAddr = res.data;
					this.start_name = res.data.name;
					this.start_phone = res.data.fixedphone;
					this.start_province = res.data.province;
					this.start_city = res.data.city;
					this.start_area = res.data.area;
					this.sendAddressID = res.data.addressID;
				}
			},
			async user_express_coupon(){
				let res = await user_express_coupon();
				if(res.status == 1){
					this.c_id = res.data.c_id;
					this.coupon_price = res.data.price?res.data.price:0;
					this.allMoney = parseFloat(parseFloat(this.allMoney) - parseFloat(this.coupon_price)).toFixed(2) ;
					if(this.allMoney < 0){
						this.allMoney = 0;
					}
				}
			},
			async getDepartment(){
				let res = await department();
				if(res.status == 1){
					res.data.map((item) => {
						this.itemList.push(item.name);
					})
				}
			},
			selectDepartment(){
				let that = this;
				uni.showActionSheet({
					itemList: that.itemList,
					success: function (res) {
							that.departmentName = that.itemList[res.tapIndex];
							
					},
					fail: function (res) {}
				});
			},
			showBaoJia(){
				if(this.createOrderType != 4){
					if(this.expressCompanyName != 'EMS'){
						uni.showToast({
							title:"只有EMS可以保价",
							icon: 'none',
							duration:1000
						})
					}
				}
				
			},
			liancheng(data)
			{
				if(data==1)
				{
					this.classA="active";
					this.classB="";
					this.classC="";
				}
				else if(data==2)
				{
					this.classA="";
					this.classB="active";
					this.classC="";
				}
				else if(data==3)
				{
					this.classA="";
					this.classB="";
					this.classC="active";
				}
				this.qcOrderType=data;
			},
			weightChange(e){
				console.log(e.detail.value);
				// if(e.detail.value%1 === 0){
				// 	this.weight = parseFloat(this.weight).toFixed(1)
				// }
				
				// console.log(this.weight);
			},
			calAllPrice(e){
				console.log("calAllPrice");
				if(e && e.detail && e.detail.value){
					console.log("calAllPrice"+e.detail.value);
					if(e.detail.value.substring(e.detail.value.length-1, e.detail.value.length) == "."){
						this.weight = e.detail.value.substring(0, e.detail.value.length-1)
						console.log(this.weight);
					}
					if(e.detail.value.substring(0, 1) == "."){
						this.weight = 1
					}
				}
				
				console.log(this.weight);
				
				if(!this.weight || parseFloat(this.weight)==0){
					this.weight = 1
				}
				if(this.weight%1 === 0){
					this.weight = parseFloat(this.weight).toFixed(1)
				}
				// this.weight = parseFloat(this.weight).toFixed(1)
				console.log(this.weight);
				this.$forceUpdate()
				if(this.createOrderType==3)
				{
					this.calculateExpressPriceTongCheng();
				}
				else{
					this.calculateExpressPrice();
				}
			},
			baoJiaChange(e){
				console.log(e);
				this.insuredValue = e.detail.value;
				this.calAllPrice();
			},
			baoJiaBlur(e){
				console.log(e);
				if(this.insuredValue%1 === 0){
					this.insuredValue = parseFloat(this.insuredValue).toFixed(1)
				}
				this.$forceUpdate()
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
				// this.goodsTypeFlag = false;
				// if(this.tagList[index] == '包裹'){
				// 	this.goodsValueFlag = true
				// }
			},
			changePay(index){
				this.pay_index = index;
				this.payStyleFlag = false;
				this.calculateExpressPrice();
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
				this.expressCompanyName = this.companyList[index].expressCompanyName;
				if(this.expressCompanyName != 'EMS'){
					this.allMoney = parseFloat(parseFloat(this.allMoney) - parseFloat(this.insuredPrice)).toFixed(2) ;
					
				}
				this.allMoney = parseFloat(parseFloat(this.allMoney) - parseFloat(this.coupon_price)).toFixed(2) ;
				
				// this.calAllPrice();
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
			showGoodsInfoFlag(){
				this.goodsInfoFlag = true;
			},
			hideModal(){
				this.goodsTypeFlag = false;
				this.payStyleFlag = false;
				this.packageFlag = false;
				this.faPiaoFlag = false;
				this.beiZhuFlag = false;
				this.goodsInfoFlag = false;
			},
			BaoJiaChange(e){
				console.log(e);
				this.baoJiaFlag = e.detail.value;
				if(!this.baoJiaFlag){
					// 关闭了
					this.insuredValue = 0;
					this.insuredPrice = 0;
					this.calAllPrice()();
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
			
			selectAddress(index){
				if(this.createOrderType != 2){
					//国内
					if(index == 0){
						//始发地
						if(this.isHongxing == 1){
							// 红星美凯龙
						}else{
							this.addressType = 0;
							uni.navigateTo({
								url: '/pages/address_list/address_list?typeIndex=0'
							});
						}
						
					}else if(index == 1){
						//收件地址
						this.addressType = 1;
						uni.navigateTo({
							url: '/pages/address_list/address_list?typeIndex=0&shou=1'
						});
					}
					else if(index == 2){
						//收件地址
						this.addressType = 2;
						uni.navigateTo({
							url: '/pages/address_list/address_list?typeIndex=0&shou=1'
						});
					}
				}else if(this.createOrderType == 2){
					//国际快递
					if(index == 0){
						//始发地
						this.addressType = 0;
						uni.navigateTo({
							url: '/pages/address_list/address_list?typeIndex=1'
						});
					}else if(index == 1){
						//收件地址
						this.addressType = 1;
						uni.navigateTo({
							url: '/pages/address_list/address_list?typeIndex=1'
						});
					}
				}
				
			},
			
			async addressManage(){
				let params = {
					userID: uni.getStorageSync("userInfo").userID,
					addressID: this.addressID,
					flag: 4
				};
				let res = await addressManage(params);
				if(res.status == 1){
					if(this.addressType == 0){
						this.start_name = res.data.name;
						this.start_phone = res.data.phone;
						this.start_province = res.data.province;
						this.start_city = res.data.city;
						this.start_area = res.data.area;
						this.start_detail = res.data.detail;
					}else if(this.addressType == 1){
						this.end_name = res.data.name;
						this.end_phone = res.data.phone;
						this.end_province = res.data.province;
						this.end_city = res.data.city;
						this.end_area = res.data.area;
						this.end_detail = res.data.detail;
					}
					else if(this.addressType == 2){
						this.end_name1 = res.data.name;
						this.end_phone1 = res.data.phone;
						this.end_province1 = res.data.province;
						this.end_city1 = res.data.city;
						this.end_area1 = res.data.area;
						this.end_detail1 = res.data.detail;
					}
					
					if(this.createOrderType==3)
					{
						this.calculateExpressPriceTongCheng();
					}
					else{
						this.calculateExpressPrice();
					}
					
				}
			},
			showModal(){
				uni.showModal({
					title: '温馨提示',
					showCancel: false,
					content: '稍后工作人员会和你联系',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
							uni.redirectTo({
								url: '/pages/express_list/express_list'
							});	
						}
					}
				});

			},
			async createOrderNext(){
				if(!this.sendAddressID){
					uni.showToast({
					  icon: 'none',
					  title: '请选择寄件地址',
					  duration: 1000
					});
					return;
				};
				
				if(!this.receiveAddressID){
					uni.showToast({
					  icon: 'none',
					  title: '请选择收件地址',
					  duration: 1000
					});
					return;
				};
				if(this.createOrderType!=3&&!this.expressCompanyID){
					uni.showToast({
					  icon: 'none',
					  title: '请选择快递公司',
					  duration: 1000
					});
					return;
				};
				
				if(this.isHongxing == 1){
					if(!this.hongxingName){
						uni.showToast({
						  icon: 'none',
						  title: '请输入姓名',
						  duration: 1000
						});
						return;
					}
					
					if(this.departmentName == '请选择部门'){
						uni.showToast({
						  icon: 'none',
						  title: '请选择部门',
						  duration: 1000
						});
						return;
					}
				}
				
				if(this.tagList[this.tag_index]=='包裹' && (!this.comment)){
					uni.showToast({
					  icon: 'none',
					  title: '请填写备注',
					  duration: 1000
					});
					return;
				}
				if(this.tagList[this.tag_index]=='包裹' && (!this.goodsValueInput || parseFloat(this.goodsValueInput)==0)){
					uni.showToast({
					  icon: 'none',
					  title: '请填写申报价值',
					  duration: 1000
					});
					return;
				}
				
				if((this.createOrderType == 4) && (parseFloat(this.allMoney).toFixed(2) ==0) && (this.orderType==1)){
					uni.showToast({
					  icon: 'none',
					  title: '价格计算错误',
					  duration: 1000
					});
					return;
				}
				
				if((this.createOrderType==3) && (this.qcOrderType == 1 || this.qcOrderType==2)){
					if(this.start_province != this.end_province){
						uni.showToast({
						  icon: 'none',
						  title: '请选择同城地址',
						  duration: 1000
						});
						return;
					}
				}
				
				if((this.createOrderType==3) && (this.qcOrderType == 3)){
					if(this.start_province != this.end_province || this.start_province != this.end_province1){
						uni.showToast({
						  icon: 'none',
						  title: '请选择同城地址',
						  duration: 1000
						});
						return;
					}
				}
				
				console.log("999999")
				let userInfo = uni.getStorageSync("userInfo");
				
				console.log("888888"+this.createOrderType)
				//创建订单的类型 1 国内件 默认 2 国际件3 全程件4 物流件
				if(this.createOrderType==1 || (this.createOrderType == 2) || (this.createOrderType == 4))
				{
					let params = {
						userID: userInfo.userID,
						sendAddressID: this.sendAddressID,
						receiveAddressID: this.receiveAddressID,
						expressCompanyID: this.expressCompanyID,
						weight: this.weight,
						orderType: this.orderType,
						price: this.allMoney,
						comment: this.comment,
						isDaoFu: this.pay_index,
						expressProductType: this.expressProductType,
						isInternational: this.isInternational,
						invoiceType: this.piao_index==0?2:1,
						createOrderType: this.createOrderType,
						insuredValue: this.insuredValue,
						platform: this.platform,
						thing: this.tagList[this.tag_index],
						qyCompanyID: userInfo.qyCompanyID,
						expressPackageDetail: this.expressPackageDetail,
						isQrCode:this.isQrCode,
						QrCodeOrderSN:this.QrCodeOrderSN,
						isPrintEs: this.isPrintEs?1:0,
						expressPackageDetail: this.goodsInfo,
						c_id: this.coupon_price?this.c_id:'',
						valueOfPackage: this.goodsValueInput,
						internationalGoodsStr: this.tagList[this.tag_index]
					};
					
					if(this.isHongxing == 1){
						params.truename = this.hongxingName;
						params.depName = this.departmentName;
					}
					let res = await createOrder(params);
					if(res.status == 1){
						
						this.orderID=res.data.orderID;
						this.orderSN=res.data.orderSN;
						
						if(this.createOrderType==1 || this.createOrderType==4){
							//国内件
							console.log("企业编码："+userInfo.qyCompanyID);
							
							if(this.orderType==1){
								// 个人
								if(this.pay_index == 1){
									// 到付
									uni.showToast({
									  icon: 'none',
									  title: '下单成功',
									  duration: 1000
									});
									uni.redirectTo({
										url: '/pages/express_list/express_list'
									});	
								}else{
									// 寄付
									console.log(this.allMoney);
									if((parseInt(this.allMoney) == 0) && (this.start_province == "上海") && (this.createOrderType!=4)){
										uni.showToast({
										  icon: 'none',
										  title: '输入地址错误',
										  duration: 1000
										});
										return;
									}else{
										uni.showToast({
										  icon: 'none',
										  title: '下单成功',
										  duration: 1000
										});
										if(this.start_province == "上海"){
											this.payPopup('bottom');
										}else{
											// 非上海的
											uni.redirectTo({
												url: '/pages/express_list/express_list'
											});	
										}
										
									}
									
								}
									
								
							}
							else{
								uni.showToast({
								  icon: 'none',
								  title: '下单成功',
								  duration: 1000
								});
								// this.showModal();
								uni.redirectTo({
									url: '/pages/express_list/express_list'
								});	
							}
							
							
						}else{
							//国际件
							uni.showToast({
							  icon: 'none',
							  title: '下单成功',
							  duration: 1000
							});
							if(this.orderType==1){
								//个人
								this.showModal();
							}else{
								uni.redirectTo({
									url: '/pages/express_list/express_list'
								});	
							}
						}
						
					}
					
					else{
						
						uni.showToast({
						  icon: 'none',
						  title: res.message,
						  duration: 1000
						});
						
					}
					
					
					
				}
				
				//联程件
				else if(this.createOrderType==3)
				{
					
				if(this.qcOrderType==3)
				{
					var receiveAddressIDS=this.receiveAddressID+","+this.receiveAddressID1;
				}
				else{
					var receiveAddressIDS=this.receiveAddressID;
				}
					
				let params = {
					userID: userInfo.userID,
					qcOrderType:this.qcOrderType,
					weight: this.weight,
					sendAddressID: this.sendAddressID,
					receiveAddressID: receiveAddressIDS,
					thing: this.tagList[this.tag_index],
					orderType: this.orderType,
					expressCompanyID: this.expressCompanyID,
					orderType: this.orderType,
					qyCompanyID: userInfo.qyCompanyID,
					isDaoFu: this.pay_index,
					price: this.allMoney,
					qcServiceType:this.qcServiceType,
					insuredValue: this.insuredValue,
					isQrCode:this.isQrCode,
					QrCodeOrderSN:this.QrCodeOrderSN,
					comment: this.comment
					
				};	
					if(this.isHongxing == 1){
						params.truename = this.hongxingName;
						params.depName = this.departmentName;
					}
					
					let res = await createOrderTongCheng(params);
					
					if(res.status == 1){
						this.orderID=res.data.orderID;
						uni.showToast({
						  icon: 'none',
						  title: '下单成功',
						  duration: 1000
						});
						
						if(this.orderType==1){
							this.showModal();
						}else{
							uni.redirectTo({
								url: '/pages/express_list/express_list'
							});
						}
					}
					else{
						uni.showToast({
						  icon: 'none',
						  title: res.message,
						  duration: 1000
						});
					}
					
					
					
				}
			},
			async createOrder(){
				let that = this;
				if(parseFloat(this.weight) > 99 && (this.createOrderType==1)){
					uni.showModal({
						title: "提示",
						content: "物品已超过99kg用大件物流性价比更高，是否继续使用快递发货?",
						success: function (result) {
							if (result.confirm) {
								that.createOrderNext();
								
							} else if (result.cancel) {
								console.log('用户点击取消');
								
								uni.redirectTo({
									url: '/pages/express_info/express_info?createOrderType=4'+"&orderType="+that.orderType
								});
							}
						}
					});
				}else{
					that.createOrderNext();
				}
				
				
				
			},
			
			async calculateExpressPriceTongCheng(){
				if(!this.sendAddressID){
					return;
				};
				
				if(!this.receiveAddressID){
					return;
				};
				
				if(this.baoJiaFlag){
					if(!this.insuredValue){
						return;
					}
				};
				
				let userInfo = uni.getStorageSync("userInfo");
				
				if(this.qcOrderType==3)
				{
					var receiveAddressIDS=this.receiveAddressID+","+this.receiveAddressID1;
				}
				else{
					var receiveAddressIDS=this.receiveAddressID;
				}
				
				let params = {
					fromAddressID: this.sendAddressID,
					toAddressID: receiveAddressIDS,
					qcOrderType: this.qcOrderType,
					weight: this.weight,
					qcServiceType:this.qcServiceType,
					insuredValue: this.insuredValue
				};
				uni.setStorageSync("isShow", false);
				let res = await calculateExpressPriceTongCheng(params);
				
				console.log(res);
				
				if(res.status == 1){
				
					this.allMoney = 0;
					
					this.isCalculateExpressPriceTongCheng=1;
					
					console.log(this.allMoney);
					
				}
				else{
					
						uni.showToast({
						  icon: 'none',
						  title: res.message,
						  duration: 1000
						});
					
					}
				
			},
			
			async calculateExpressPrice(){
				if(!this.sendAddressID){
					return;
				};
				
				if(!this.receiveAddressID){
					return;
				};
				
				if(this.baoJiaFlag){
					if(!this.insuredValue){
						return;
					}
				};
				
				let userInfo = uni.getStorageSync("userInfo");
				uni.setStorageSync("isShow", false);
				let params = {
					fromAddressID: this.sendAddressID,
					toAddressID: this.receiveAddressID,
					fromWhere: this.start_province,
					toWhere: this.end_province,
					yzID: userInfo.yzID,
					userID: userInfo.userID,
					weight: this.weight,
					expressProductType: this.expressProductType,
					insuredValue: this.insuredValue,
					orderType: this.orderType,
					createOrderType: this.createOrderType
				};
				console.log(params);
				let res = await calculateExpressPrice(params);
				if(res.status == 1){
					this.companyList = res.data.defaultExpressInfo;
					this.company_index = 0;
					if(this.expressCompanyName == "EMS"){
						this.companyList.map((item, index) => {
							if(item.expressCompanyName == "EMS"){
								this.company_index = index;
							}
						});
					}
					
					
					this.expressCompanyID = this.companyList[this.company_index].expressCompanyID;
					this.expressCompanyName = this.companyList[this.company_index].expressCompanyName;
					
					if(this.pay_index == 1){
						//到付
						this.allMoney = parseFloat(this.companyList[this.company_index].price_total).toFixed(2);
						this.insuredPrice = parseFloat(this.companyList[this.company_index].insuredPrice).toFixed(2);
						
						
					}else{
						this.allMoney = parseFloat(this.companyList[this.company_index].price_total).toFixed(2);
						this.insuredPrice = parseFloat(this.companyList[this.company_index].insuredPrice).toFixed(2);
					}
					if(this.orderType == 1){
						if(this.createOrderType == 1||this.createOrderType==4){
							this.user_express_coupon();
						}
					}
					
				}
				else{
					uni.showToast({
					  icon: 'none',
					  title: res.message,
					  duration: 1000
					});
				}
				
			},
			
			async getDefaultAddress(){
				let res = await getDefaultAddress();
				if(res.status == 1){
					this.start_name = res.data.name;
					this.start_phone = res.data.phone;
					this.start_province = res.data.province;
					this.start_city = res.data.city;
					this.start_area = res.data.area;
					this.start_detail = res.data.detail;
					this.sendAddressID = res.data.addressID;
				}
			},
			
			async getExpressCompany(){
				let params = {
					userID: uni.getStorageSync("userInfo").userID,
					yzID: uni.getStorageSync("userInfo").yzID,
					orderType: this.orderType,
					isInternational: this.isInternational
				};
				let res = await getExpressCompany(params);
				if(res.status == 1){
					this.companyList = res.data;
					this.company_index = 0;
				}
				
			}
			
		},
		onLoad(options) {
			uni.showLoading({ title: '加载中...' });
			setTimeout( () => {
				uni.hideLoading()
			}, 500);
			
			this.isHongxing = options.hongxing;
			if(this.isHongxing == 1){
				this.getDepartment();
				this.specAddress();
			}
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
				this.tagList = ['文件', '包裹']
				this.commentPlaceHolder = "提供内容和数量"
				this.goodsValueFlag = true;
			}
			else if(this.orderType==1&&this.createOrderType==3)
			{
				uni.setNavigationBarTitle({
					title: '个人同城快递'
				});
			}
			else if(this.orderType==1&&this.createOrderType==4)
			{
				uni.setNavigationBarTitle({
					title: '个人大件物流'
				});
			}
			else if(this.orderType==2&&this.createOrderType==1)
			{
				uni.setNavigationBarTitle({
					title: '企业国内快递'
				});
				this.payList[0] = "月结"
			}
			else if(this.orderType==2&&this.createOrderType == 2){
				uni.setNavigationBarTitle({
					title: '企业国际快递'
				});
				this.isInternational = 1;
				this.payList[0] = "月结"
				this.tagList = ['文件', '包裹']
				this.commentPlaceHolder = "提供内容和数量"
				this.goodsValueFlag = true;
			}
			else if(this.orderType==2&&this.createOrderType==3)
			{
				uni.setNavigationBarTitle({
					title: '企业同城快递'
				});
				this.payList[0] = "月结"
			}
			else if(this.orderType==2&&this.createOrderType==4)
			{
				uni.setNavigationBarTitle({
					title: '企业大件物流'
				});
				this.payList[0] = "月结"
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
			
			this.getDefaultAddress();
			this.getExpressCompany();
		},
		onShow(){
			
			console.log(this.selectAddress);
			if(this.addressType == 0){
				//始发地
				if(this.addressID != 0){
					this.sendAddressID = this.addressID;
					this.addressManage();
				}
			}else if(this.addressType ==1){
				//收件地址
				if(this.addressID != 0){
					this.receiveAddressID = this.addressID;
					this.addressManage();
				}
			}
			else if(this.addressType ==2){
				//收件地址
				if(this.addressID != 0){
					this.receiveAddressID1 = this.addressID;
					this.addressManage();
				}
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

/* .yunfei-col .yunfei-list{margin-top:14upx;} */
.yunfei-col .yunfei-list li{padding-left:30upx;background: #fff;box-sizing: border-box;}
/* .yunfei-col .yunfei-list .middle-col{height:140upx;} */
/* .yunfei-col .yunfei-list .middle-col>div{line-height:140upx;height:140upx;} */
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
.yunfei-col .yunfei-list li .middle input{background:transparent;border:0;position:relative;box-sizing: border-box;font-size:28upx;}

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

.yunfei-bottom{height:144upx;position: fixed;bottom:0;width:100%;left:0;width:100%;box-shadow:-2upx -14upx 22upx 0px rgba(126,125,125,0.08);box-sizing: border-box;padding-top:0upx;background: #fff;z-index:900;}
.yunfei-bottom button{background: #107EFF;line-height: 88upx;font-size:26upx;color:#fff;padding:0;width:364upx;text-align: center;float:right;margin-right:30upx;}
.yunfei-bottom .left{font-size:30upx;display: inline-block;margin-left:30upx;color:#666;text-align: center;}
.yunfei-bottom .left .tip{font-size:24upx;color:#999999;}
.yunfei-bottom .left #priceText{font-size:44upx;color:#FF5269;}
.yunfei-bottom .left span.small{font-size:24upx;color:#FF5269;}
.yunfei-bottom .left.has-tip{position: relative;}
.yunfei-bottom .left.has-tip .price-cell{display: table-cell;vertical-align: middle;line-height:normal;height:100upx;}
.company_select{width: 40upx!important;height: 40upx!important; position: absolute;right: -4upx; top: -4upx;}

.select-company{background: #fff;margin-top:16upx;border-bottom:16upx solid #f9f9f9;}
.select-company .miandan{height:94upx;line-height: 94upx;border-top:2upx solid #e3e3e3;}
.select-company .miandan .left{font-size:26upx;float:left;margin-left: 30upx;line-height: 94upx;}
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
.input_weight{width: 120upx; height: 100upx;}

.name{margin-top: 28upx; text-align: right; display: inline-block;}

.goods_warning_wrap{background-color: #fffbe6;border: 1px solid #ffe58f;padding: 16upx 30upx;font-size: 32upx;color: brown;margin: 20upx 2%; width: 96%;box-sizing: border-box;}
.goods_warning_wrap image{width: 40upx; height: 40upx;margin-right: 20upx;}
.goods_warning_wrap p{font-size: 28upx;color: rgba(0, 0, 0, 0.65);}
</style>
