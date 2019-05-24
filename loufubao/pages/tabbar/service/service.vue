<template>
	<view class="content">
		
		<div class="top-col">
            <img class="main-img" src="../../../static/img/fuwu_head.jpg" mode="widthFix"/>

            <div class="text" id="louyuText">
				<span>请选择楼宇</span>
				<img class="img" src="../../../static/img/lou_select.png" mode="widthFix">
			</div>

        </div>
		
		<div class="sosuo">
            <span>
                <img src="../../../static/img/home_search.png" mode="widthFix">
                <input placeholder="请输入您要搜索的单号" id="searchText" type="search" />
            </span>
        </div>
        <div class="pd">
            <div class="imc-col fuwu-first-col clearfix">
                <img class="left" @click="goToKuaidi" src="../../../static/img/service_kuaidi.jpg" mode="widthFix" />
                <div class="right clearfix">
                    <div @click="goToGeRenKuaidi">
                        <img src="../../../static/img/fuwu_geren_kuaidi.jpg" mode="widthFix">
                    </div>
                    <div @click="openExpressPage(1)">
                        <img src="../../../static/img/fuwu_qiye_kuaidi.jpg" mode="widthFix">
                    </div>
                    <div @click="openExpressPage(2)">
                        <img src="../../../static/img/fuwu_yundan_genzong.jpg" mode="widthFix">
                    </div>
                    <div @click="goToExpressList">
                        <img src="../../../static/img/fuwu_kuaidi_qianshou.jpg" mode="widthFix">
                    </div>

                </div>

            </div>
        </div>
		
		<div class="pd">

            <div class="imc-col clearfix">

                <img class="left" src="../../../static/img/fuwu_bg.jpg" mode="widthFix" @click="goToServiceForm"/>

                <div class="right clearfix" id="company_services">
					
                    <div onclick="goToServiceOrder(1);">
                        <img src="../../../static/img/fuwu_yinshui.jpg" mode="widthFix">
                    </div>
                    <div onclick="goToServiceOrder(2);">
                        <img src="../../../static/img/fuwu_baojie.jpg" mode="widthFix">
                    </div>
                    <div onclick="goToServiceOrder(3);">
                        <img src="../../../static/img/fuwu_shangwu.jpg" mode="widthFix">
                    </div>
                    <div onclick="goToServiceOrder(4);">
                        <img src="../../../static/img/fuwu_lvzhi.jpg" mode="widthFix">
                    </div>
                </div>
            </div>
		</div>
		
		<div class="pd">
			<div class="bottom-col">
                <img class="full-img" src="../../../static/img/fuwu_bottom.jpg" mode="widthFix"/>
                <div class="col_center bottom-col-detail">
                    <p>需要更多企业服务?</p>
                    <button type="button" >按需定制服务</button>
                </div>
            </div>
		</div>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			goToKuaidi(){
				uni.navigateTo({
					url: '/pages/message/message'
				});
			},
			goToGeRenKuaidi(){
				uni.navigateTo({
					url: '/pages/express_main/express_main'
				});
			},
			goToExpressList(){
				uni.navigateTo({
					url: '/pages/express_list/express_list'
				});
			},
			goToServiceForm(){
				uni.navigateTo({
					url: '/pages/service_form/service_form'
				});
			}
		}
	}
</script>

<style>
	.content {
		text-align: center;
		display: flex;
		flex-direction: column;
	}
	
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
            top: 60upx;
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
