<template>
	<view class="contain col">
		<image src="../../static/img/hexiao.png" mode="aspectFill" @tap="getJSSDKConfig"></image>
		<image src="../../static/img/jilu.png" mode="aspectFill" @tap="goToRecords"></image>
	</view>
	
</template>

<script>
	import { BASE_IMAGE_URL,getJSSDKConfig } from '@/utils/api'
	// #ifdef H5
	import weixin_sdk from '../../utils/weixin-jsapi.js';
	// #endif
	
	export default {
	data() {
		return {
		};
	},
	onLoad() {
	},
	methods: {
		goToRecords(){
			uni.navigateTo({
				url:'/pages/records/records'
			})
		},
		async getJSSDKConfig(){
			let result = await getJSSDKConfig();
			if(result.status == 1){
				weixin_sdk.config({
						debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						appId: result.data.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
						timestamp: result.data.timestamp, // 必填，生成签名的时间戳
						nonceStr: result.data.noncestr, // 必填，生成签名的随机串
						signature: result.data.signature,// 必填，签名，见附录1
						jsApiList: ['checkJsApi','scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				});
				weixin_sdk.ready(function() {
					setTimeout(() => {
						weixin_sdk.scanQRCode({
							needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
							scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
							success: function (res) {
							var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
								console.log(res);
								alert(res.resultStr);
								uni.navigateTo({
									url:'/pages/records_detail/records_detail'
								})
								//其它网页调用二维码扫描结果： 
								//var result=sessionStorage.getItem('saomiao_result');
							}
						});
					}, 1000)
					
				});
			}
		}
	}
};
</script>

<style>
	page{height: 100%; background: #F5F5F5; }
	.contain{padding: 60upx 40upx;}
	.contain image{height: 240upx; width: 100%;  margin-bottom: 40upx; border-radius: 10upx;}
</style>
