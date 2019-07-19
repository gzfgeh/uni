<template>
	<view class="contain">
		<div class="row item_wrap">
			<span>*</span>
			<img src="https://mall.baobaoloufu.com/build/images/img-login/louYuJoinCompanyName.png" mode="widthFix">
			<input type="text" placeholder="企业名称" v-model="louYuJoinCompanyName"/>
		</div>
		
		<div class="row item_wrap">
			<span>*</span>
			<img src="https://mall.baobaoloufu.com/build/images/img-login/louYuJoinCompanyType.png" mode="widthFix">
			<input type="text" placeholder="企业类型" v-model="louYuJoinCompanyType"/>
		</div>
		
		<div class="row item_wrap" @click="showHezuo">
			<span>*</span>
			<img src="https://mall.baobaoloufu.com/build/images/img-login/louYuJoinCooperationType.png" mode="widthFix">
			<span style="color: #999">{{louYuJoinCooperationType}}</span>
		</div>
		
		<div class="row item_wrap">
			<span>*</span>
			<img src="https://mall.baobaoloufu.com/build/images/me@2x.png" mode="widthFix">
			<input type="text" placeholder="联系人姓名" v-model="louYuJoinName"/>
		</div>
		
		<div class="row item_wrap">
			<span>*</span>
			<img src="https://mall.baobaoloufu.com/build/images/img-login/usename@2x_15.png" mode="widthFix">
			<input type="number" placeholder="联系人手机号" maxlength="11" v-model="louYuJoinPhone"/>
		</div>
		
		<div class="row item_wrap">
			<span>*</span>
			<img src="https://mall.baobaoloufu.com/build/images/img-login/louYuJoinJobType.png" mode="widthFix">
			<input type="text" placeholder="联系人职位" v-model="louYuJoinJobType"/>
		</div>
		
		<div class="row item_wrap">
			<span>*</span>
			<img src="https://mall.baobaoloufu.com/build/images/img-login/Verification@2x.png" mode="widthFix">
			<input type="text" placeholder="联系人邮箱" v-model="louYuJoinEmail"/>
		</div>
		
		<button class="btn" hover-class="hover_class" @click="joinus">立即申请加盟</button>
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,joinus } from '@/utils/api'
	
	export default {
		data() {
			return {
				louYuJoinCompanyName: '',
				louYuJoinCompanyType: '',
				louYuJoinCooperationType: '请选择',
				louYuJoinName: '',
				louYuJoinPhone: '',
				louYuJoinJobType: '',
				louYuJoinEmail: '',
				itemList: ['活动赞助','平台入驻', '品牌互推', '其他']
			}
		},
		methods: {
			showHezuo(){
				let that = this;
				uni.showActionSheet({
					itemList:this.itemList,
					success(res) {
						console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						that.louYuJoinCooperationType = that.itemList[res.tapIndex]
					}
				})
			},
			async joinus(){
				if(!this.louYuJoinCompanyName){
					uni.showToast({
					  icon: 'none',
					  title: '请输入企业名称',
					  duration: 1000
					});
					return;
				}
				if(!this.louYuJoinCompanyType){
					uni.showToast({
					  icon: 'none',
					  title: '请输入企业类型',
					  duration: 1000
					});
					return;
				}
				if(!this.louYuJoinCooperationType){
					uni.showToast({
					  icon: 'none',
					  title: '请选择合作方式',
					  duration: 1000
					});
					return;
				}
				if(!this.louYuJoinName){
					uni.showToast({
					  icon: 'none',
					  title: '请输入联系人姓名',
					  duration: 1000
					});
					return;
				}
				
				if(!this.louYuJoinPhone){
					uni.showToast({
					  icon: 'none',
					  title: '请输入联系人手机号',
					  duration: 1000
					});
					return;
				}
				if(!this.louYuJoinJobType){
					uni.showToast({
					  icon: 'none',
					  title: '请输入联系人职位',
					  duration: 1000
					});
					return;
				}
				
				if(!this.louYuJoinEmail){
					uni.showToast({
					  icon: 'none',
					  title: '请输入联系人邮箱',
					  duration: 1000
					});
					return;
				}
				
				let params = {
					louYuJoinType: 2,
					userID: uni.getStorageSync("userInfo").userID,
					louYuJoinCompanyName: this.louYuJoinCompanyName,
					louYuJoinCompanyType: this.louYuJoinCompanyType,
					louYuJoinCooperationType: this.louYuJoinCooperationType,
					louYuJoinName: this.louYuJoinName,
					louYuJoinPhone: this.louYuJoinPhone,
					louYuJoinJobType: this.louYuJoinJobType,
					louYuJoinEmail: this.louYuJoinEmail
				};
				let res = await joinus(params);
				if(res.status == 1){
					uni.showToast({
					  icon: 'none',
					  title: '操作成功',
					  duration: 1000
					});
					uni.navigateBack({
						delta: 1
					});
				}
			}
		}
	}
</script>

<style>
.contain{width: 100%; height: 100%; padding: 40upx; background: #FFFFFF;box-sizing: border-box;}
.item_wrap{ border-bottom: 1upx solid #E3E3E3; width: 100%; height: 120upx;}
.item_wrap img{width: 60upx; margin: 0upx 20upx;}
.item_wrap span{color: red;}
.btn{width: 90%;
    margin: 15% 5% 0;
    background: #21a9f5;
    color: #ffffff;
    border: 0;
    padding: 0upx 0;
    font-size: 36upx;
    border-radius: 40upx;}
</style>
