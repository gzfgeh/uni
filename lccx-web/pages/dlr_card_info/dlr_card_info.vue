<template>
    <view class="content">
		<view class="title">
			持卡人信息
		</view>
		<view class="input-box">
			<view class="input-sub">
				持卡人姓名
			</view>
			<input class="item_right" type="text"  placeholder-class="place-holder" focus v-model="realname" @blur="fixIos" placeholder="请输入持卡人姓名"></m-input>
		</view>
		<view class="input-box">
			<view class="input-sub">
				身份证
			</view>
			<input class="item_right" type="text"  placeholder-class="place-holder" v-model="id_card" @blur="fixIos" placeholder="请输入持卡人身份证"></m-input>
		</view>
		
		<view class="info-box">
			<img src="../../static/img/info_blue.png" class="info-icon"><span>为了保证账户资金安全，只能绑定认证用户本人的银行卡</span>
		</view>
		
		<view class="title min-top">
			银行卡信息
		</view>
		<view class="input-box">
			<view class="input-sub">
				银行卡号
			</view>
			<input class="item_right" type="number"  placeholder-class="place-holder" v-model="bank_account" @blur="fixIos" placeholder="请输入银行卡号"></m-input>
		</view>
		<view class="input-box">
			<view class="input-sub">
				开户行
			</view>
			  <view class="row_item" @tap="showBankPicker">
				<span :class="[this.bank_name ? '' : 'place-holder']">{{bank_name || '请选择开户行'}}</span>
				<span class="arraw"></span>
			  </view>
		</view>
		<view class="input-box">
			<view class="input-sub">
				开户区域
			</view>
			  <view class="row_item" @tap="showMulLinkageTwoPicker">
				<span :class="[this.areaText ? '' : 'place-holder']">{{areaText || '请输入开户区域'}}</span>
				<span class="arraw"></span>
			  </view>
		</view>
		<view class="input-box">
			<view class="input-sub">
				开户分行支行
			</view>
			<input class="item_right" type="text"  placeholder-class="place-holder" v-model="bank_branch" @blur="fixIos" placeholder="请输入开户行分行支行"></m-input>
		</view>
        
        <view>
            <button type="primary" class="primary" hover-class="button-hover" @tap="bindCard">确定</button>
        </view>
		
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
	   @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
	   
	   <mpvue-picker :themeColor="themeColor" ref="bankPicker" mode="selector" :pickerValueDefault="pickerValueDefault"
	   @onConfirm="bankSelect" :pickerValueArray="bankArray"></mpvue-picker>
    </view>
</template>

<script>
	import mpvuePicker from '../../components/mpvue-picker/mpvuePicker.vue';
	import { getRegions, bindCard, getMyAssets } from '@/utils/api'

    export default {
        components: {
			mpvuePicker
        },
        data() {
            return {
                providerList: [],
                hasProvider: false,
                bank_branch: '',
				areaText: '',
				bank_name: '',
				realname: '',
				id_card: '',
				bank_account: '',
                positionTop: 0,
				mulLinkageTwoPicker: [],
				pickerValueDefault:[0],
				mode: '',
				deepLength: 1,
				themeColor: '#007AFF',
				pickerValueIndex: [0, 0],
				pickerText: '',
				pickerValueArray: [],
				bankArray: [{"label":"工商银行"},{"label":"农业银行"},{"label":"中国银行"},{"label":"建设银行"},{"label":"交通银行"},{"label":"招商银行"},{"label":"中信银行"},{"label":"浦发银行"},{"label":"民生银行"},{"label":"广发银行"},{"label":"兴业银行"}]
            }
        },
        methods: {
			fixIos: function(){
				setTimeout(function() {                
					var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
					window.scrollTo(0, Math.max(scrollHeight - 1, 0));            
				}, 100);
			},
			showBankPicker() {
				this.$refs.bankPicker.show()
			},
			// 二级联动选择
			showMulLinkageTwoPicker() {
				this.pickerValueArray = this.mulLinkageTwoPicker
				this.mode = 'multiLinkageSelector'
				this.deepLength = 2
				this.pickerValueDefault = [0, 0]
				this.$refs.mpvuePicker.show()
			},
			onConfirm(e) {
				this.city = e.value[1];
				this.bank_region = e.label.split("-")[1];
				this.areaText = e.label.split("-").join(' ');
			},
			onCancel(e){
				
			},
			bankSelect(e) {
				this.bank_name = e.label;
			},
			async bindCard(){
				if(!this.realname.trim()){
					wx.showToast({
						icon: 'none',
						title: '请输入姓名',
						duration: 1000
					})
					return
				}
				
				if(!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(this.id_card)){
					wx.showToast({
						icon: 'none',
						title: '请输入正确的身份证号码',
						duration: 1000
					})
					return
				}
				
				if(!this.bank_account) {
					wx.showToast({
						icon: 'none',
						title: '请输入卡号',
						duration: 1000
					})
					return
				}
				
				if(!this.bank_name) {
					wx.showToast({
						icon: 'none',
						title: '请选择开户行',
						duration: 1000
					})
					return
				}
				
				if(!this.bank_region) {
					wx.showToast({
						icon: 'none',
						title: '请选择开户地区',
						duration: 1000
					})
					return
				}
				
				if(!this.bank_branch) {
					wx.showToast({
						icon: 'none',
						title: '请输入开户行分行支行',
						duration: 1000
					})
					return
				}
				
				let params = {
					bank_branch: this.bank_branch,
					bank_name: this.bank_name, 
					realname: this.realname, 
					id_card: this.id_card, 
					bank_region: this.bank_region, 
					bank_account: this.bank_account 
				}
				
				let res = await bindCard(params)
				
				if(res.code == 200){
					wx.showToast({
						icon: 'none',
						title: '绑卡成功',
						duration: 1000
					})
					await this.getMyAssets()
					
					let curPage = this.getCurPage();
					let curParam = curPage.options || curPage.$route.query;
					let delta = curParam.delta;
					
					uni.navigateBack({
						delta: Number(delta) || 1
					})
				}
			},
			getCurPage(){
				let pages = getCurrentPages();
				let curPage = pages[pages.length-1];
				return curPage
			},
			async getMyAssets() {
				let res = await getMyAssets()
				
				if(res.code == 200){
					this.withdrawable = res.withdrawable
					this.withdrew = res.withdrew
					this.incomes = res.incomes
					uni.setStorageSync("global", {
						withdrawable: res.withdrawable,
						withdrew: res.withdrew,
						incomes: res.incomes,
						realname: res.realname,
						id_card: res.id_card,
						bank_name: res.bank_name,
						bank_account: res.bank_account
					});
				}
			}
			
        },
        async onLoad() {
			let global = uni.getStorageSync('global')
			if(global) {
				this.realname = global.realname || ''
				this.id_card = global.id_card || ''
			}
			
			let res = await getRegions()
			if(res.code == 200){
				this.mulLinkageTwoPicker = res.data
			}
        },
    }
</script>

<style lang="less" scoped>
	.content{
		padding-left: 50upx;
		padding-right: 50upx;
	}
	.title{
		color: rgba(0,0,0,0.7);
		font-size: 40upx;
		margin-top: 60upx;
		margin-bottom: 40upx;
		&.min-top{
			margin-top: 40upx;
		}
	}
	
	.input-box{
		flex-direction: column;
		border-bottom: 2upx solid rgba(0,0,0,0.1);
		height: 118upx;
		margin-bottom: 40upx;
		padding-right: 34upx;
		font-size: 26upx;
		color: rgba(0,0,0,0.7);
		.m-input-view{
			padding: 0;
		}
		.input-placeholder{
			color: rgba(0,0,0,0.3);
		}
	}
	
	.input-row{
		padding-left: 0upx;
		.min-width{
			min-width: 440upx;
		}
	}
	
	.input-sub{
		height:34upx;
		font-size:24upx;
		color:rgba(0,0,0,0.7);
		line-height:34upx;
		padding-bottom: 10upx;
	}
	
	.get_code{
		color: rgba(0,0,0,0.7);
		margin-left: 28upx;
		font-size: 28upx;
		width: 140upx;
		text-align: center;
	}
	
	.primary{
		background-color: #427DFF;
		border-radius: 12upx;
		color: #ffffff;
		font-size: 34upx;
		height: 94upx;
		line-height: 94upx;
		margin-top: 26upx;
		margin-bottom: 30upx;
	}
	
	.row_item {
		position: relative;
	}
	.arraw{
		display: inline-block;
		width: 18upx;
		height: 18upx;
		border-top: 4upx solid #D9D9D9;
		border-right: 4upx solid #D9D9D9;
		transform: rotate(45deg);
		margin-left: 10upx;
		position: absolute;
		right: 0;
		top: 12upx;
	}
	.info-box{
		margin-top: -20upx;
		.info-icon{
			position: relative;
			top: 2upx;
			margin-right: 4upx;
			width: 24upx;
			height: 24upx;
		}
		span{
			font-size: 24upx;
			height: 34upx;
			line-height: 34upx;
			color: rgba(59,59,67,1);
		}
	}
	
	.border-left{
		display: inline-block;
		height: 40upx;
		border-right: 2upx solid #979797;
		margin-top: 6upx;
	}

	.place-holder{
	  font-size: 28upx;
	  color: rgba(0,0,0,0.3);
	}
    .action-row {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .action-row navigator {
        color: #007aff;
        padding: 0 20upx;
    }

    .oauth-row {
        display: flex;
        flex-direction: row;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    }

    .oauth-image {
        width: 100upx;
        height: 100upx;
        border: 1upx solid #dddddd;
        border-radius: 100upx;
        margin: 0 40upx;
        background-color: #ffffff;
    }

    .oauth-image image {
        width: 60upx;
        height: 60upx;
        margin: 20upx;
    }
</style>
