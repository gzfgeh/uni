<template>
	<view>
		<div class="mui-content has-header yunfei-col">
			<div class="yunfei-list">
				<li onclick="showReason(1);">
					<div>
						<span class="left">寄出地</span>
					<span class="right">
						<span class="text" id="address1">请选择</span>
						<span class="arraw"></span>
					</span>
					</div>
				</li>
				
				<li onclick="showReason(2);">
					<div>
						<span class="left">目的地</span>
					<span class="right">
						<span class="text" id="address2">请选择</span>
						<span class="arraw"></span>
					</span>
					</div>
				</li>

				<li id="wupinSelect" @click="showGoodsType">
					<div>
						<span class="left">物品类型</span>
					<span class="right">
						<span class="text">请选择</span>
						<span class="arraw"></span>
					</span>
					</div>
				</li>
				<li class="middle-col">
					<div>
						<span class="left">重量</span>

						<span class="middle">
							<img class="sub-value" src="../../static/img/reduce_icon.png" mode="widthFix"/>
							<span class="value active">0.5</span>
							<img class="add-value" src="../../static/img/add_icon.png" mode="widthFix"/>
						</span>

					<span class="right no-arrow">
						<span class="text">千克</span>
					</span>
					</div>
				</li>

				<li id="kuaidiSelect" @click="showKuaidiType">
					<div>
						<span class="left">快递类型</span>
					<span class="right">
						<span class="text">请选择</span>
						<span class="marraw"></span>
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
							<scroll-view scroll-x class="scroll-Y scrollbar">
								<div class="swiper-slide" v-for="(item, index) in companyList" :key="index">
									<div><img src="../../static/img/express_comp_logo.png" mode="widthFix"/></div>
									<p>顺丰快递</p>
									<div class="express-jiage">
										￥<span class="bottom">12</span>
									</div>
								</div>
								
							</scroll-view>
				
						</div>
					</div>
				</div>
				
			</div>


			<div class="bottom-space"></div>


			<div class="yunfei-bottom">

				<span class="left">运费: <span><label  class="">¥<span id="priceText">0.0</span></label></span></span>

				<button type="button" onclick="countYunfei()">运费试算</button>

			</div>

		</div>

		<div class="beizhu-col" v-if="goodsTypeFlag|| kuaidiTypeFlag">

			<div class="shadow-col" @tap="hideModal"></div>
			
			<div class="beizhu-text" v-if="goodsTypeFlag">
				<div class="clearfix row_between">
					<span class="fl">物品类型</span>

					<span class="fr right-close" @click="hideModal">
						<img src="../../static/img/login_close.png" mode="widthFix">
					</span>
				</div>

				<div class="tag-list">
					<span class="active">文件</span>
					<span>日用品</span>
					<span>食品</span>
					<span>数码产品</span>
					<span>衣物</span>
					<span>其他</span>
				</div>
			</div>
		
			<div class="beizhu-text" v-if="kuaidiTypeFlag">
				<div class="clearfix row_between">
					<span class="fl">快递类型</span>

					<span class="fr right-close" @click="hideModal">
						<img src="../../static/img/login_close.png" mode="widthFix">
					</span>
				</div>

				<div class="tag-list">
					<span data-type="1">国内快递</span>
					<span data-type="2">国际快递</span>
					<span data-type="3">同城快递</span>

					<span data-type="4">物流大件</span>


				</div>

			</div>


		</div>
		

	</view>
</template>

<script>
	export default {
		data() {
			return {
				companyList: [1,2,3,4,5,6],
				kuaidiTypeFlag: false,
				goodsTypeFlag: false
			}
		},
		methods: {
			showGoodsType(){
				this.goodsTypeFlag = true;
			},
			showKuaidiType(){
				this.kuaidiTypeFlag = true;
			},
			hideModal(){
				this.goodsTypeFlag = false;
				this.kuaidiTypeFlag = false;
			},
		}
	}
</script>

<style>
@import url("../../static/style/yun_fei.css");

.mui-content{background: #f9f9f9!important;}

.bottom-space{height:160upx;}
.scroll-Y{ white-space: nowrap; width: 100%; box-sizing: border-box;padding: 0upx;}
::-webkit-scrollbar { width: 0;height: 0;color: transparent;}
</style>
