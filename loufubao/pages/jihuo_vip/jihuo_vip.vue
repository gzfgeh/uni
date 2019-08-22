<template>
	<view>
		<view class="head_bg"></view>
		<view class="head_wrap">
			<image src="../../static/img/lfb_vip_normal.png" mode="widthFix" class="bg"></image>
			
			<div class="content_wrap">
				<view class="row_between name_wrap" >
					<div>
						<span class="name">{{userInfo.userName}}</span>
						<span class="phone">({{phone}}登录）</span>
					</div>
					<span class="phone">切换账号</span>
				</view>
				<view class="text">激活码</view>
				<input type="text" class="input_wrap" placeholder-class="phclass"
					placeholder="请输入XXXX-XXXX-XXXX-XXXX格式激活码" v-model="cdk"/>
			</div>
			
		</view>
		
		<button type="primary" class="btn" @click="member_cdk">立即续费</button>
	
		
		<div class="info_title">会员卡激活说明</div>
		<div class="info_pay">1. 登录楼服宝账号后，输入激活码和验证码即可激活VIP会员卡；</div>
		<div class="info_pay">2. 激活成功后立即升级为楼服宝VIP会员，享受VIP服务；</div>
		<div class="info_pay">3. 此卡严禁倒卖、转让，不可兑换现金，请妥善保管，遗失泄露等不补；</div>
		
		<view class="info_text">激活vip享四大专属特权</view>
		
		<view class="row_center">
			<view class="type_item">
				<image src="../../static/img/spyh.png" mode="aspectFill"></image>
				<span>商品优惠</span>
			</view>
			<view class="type_item">
				<image src="../../static/img/kdyh.png" mode="aspectFill"></image>
				<span>快递优惠</span>
			</view>
			<view class="type_item">
				<image src="../../static/img/cjhd.png" mode="aspectFill"></image>
				<span>抽奖活动</span>
			</view>
			<view class="type_item">
				<image src="../../static/img/zbhd.png" mode="aspectFill"></image>
				<span>周边优惠</span>
			</view>
		</view>
		
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,member_cdk,member_list } from '@/utils/api'
	
	export default {
		data() {
			return {
				typeList: [1,2,3,4,5,6,7],
				curIndex: 0,
				cdk: "",
				userInfo: {},
				phone: 0
			}
		},
		methods: {
			changeType(index){
				this.curIndex = index;
				this.$forceUpdate();
			},
			async member_cdk(){
				if(!this.cdk){
					uni.showToast({
					  icon: 'none',
					  title: '请输入激活码',
					  duration: 1000
					});
					return;
				}
				let params = {
					user_id: this.userInfo.userID,
					cdk: this.cdk
				};
				let res = await member_cdk(params);
				if(res.status == 1){
					uni.showToast({
					  icon: 'none',
					  title: '激活成功',
					  duration: 1000
					});
					setTimeout(()=>{
						uni.navigateBack();
					}, 1000);
					
				}
			},
			callPhone: function(){
				uni.makePhoneCall({
					phoneNumber:"4008888808",
					success: () => {
						console.log("成功拨打电话")
					}
				})
			},
			
		},
		onLoad() {
			this.userInfo = uni.getStorageSync("userInfo");
			this.phone = this.userInfo.phone.substring(0,3)+"****"+this.userInfo.phone.substring(7,11);
		},
		
		onNavigationBarButtonTap() {
			this.callPhone();
		}
	}
</script>

<style>

.head_bg{height: 240upx; background: #107EFF;}
.head_wrap{height: 364upx; width: 100%; padding: 0upx 30upx;margin-top: -145upx; display: flex;flex-direction: row; align-items: center;
	position: relative;box-sizing: border-box; color: #FFFFFF; font-size: 22upx; z-index: 1;}
.head_wrap .bg{position: absolute;top: 0upx; left: 30upx; height: 100%;width: 91.5%; z-index: 0;}
.head_wrap .content{position: relative;z-index: 2; display: flex;flex-direction: column;}
.head_wrap .head_icon{ width: 88upx; height: 88upx; margin-right: 20upx;margin-left: 30upx;}
.head_wrap .head_item .name{font-size: 30upx;}
.head_wrap .head_item {color: #FFFFFF;}
.head_wrap .head_item image{width: 32upx; height: 27upx;}
.info_text{color: #2293FF; font-size: 38upx;text-align: center; margin: 50upx auto 20upx;}

.type_item{flex: 1; color: #8C8C8C; font-size: 28upx;display: flex;flex-direction: column;align-items: center;justify-content: center;}
.type_item image{width: 70upx; height: 70upx; margin-bottom: 20upx;}

.content_wrap{position: relative;z-index: 3;width: 100%; padding: 0upx 32upx 0upx 47upx;height: 364upx;}
.content_wrap .name_wrap{width: 100%; margin-top: 30upx;}
.content_wrap .name_wrap .name{font-size: 30upx;}
.content_wrap .name_wrap .phone{font-size: 22upx;}
.content_wrap .text{text-align: center; margin-top: 58upx; font-size: 38upx;}
.content_wrap .input_wrap{background:rgba(255,255,255,1);border-radius:40px; position: absolute;color: #333333;
		height: 80upx; width: 600upx; padding: 27upx 40upx; box-sizing: border-box; bottom: 40upx;}
.phclass{color: #8C8C8C; font-size: 26upx;}

.info_title{color: #424242; font-size: 30upx;margin-top: 50upx; padding-left: 30upx;margin-bottom: 10upx;}
.info_pay{color: #8C8C8C; font-size: 26upx;padding-left: 30upx;}
.auto_pay_info{color: #8C8C8C; font-size: 26upx;margin-top: 10upx;padding-left: 30upx; margin-bottom: 100upx;}

.btn{margin: 50upx 30upx 30upx; box-sizing: border-box;  width: 91%;}

</style>
