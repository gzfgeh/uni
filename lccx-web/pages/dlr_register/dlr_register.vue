<template>
    <view class="content">
		<view class="title">
			账号注册
		</view>
		<view class="input-box">
			<view class="input-sub">
				手机号
			</view>
			<input class="item_right" type="number"  placeholder-class="place-holder" focus v-model="mobile" @blur="fixIos" placeholder="请输入手机号"></m-input>
		</view>
		<view class="input-box">
			<view class="input-sub">
				验证码
			</view>
			<view class="input-row">
				<input class="item_right min-width"  placeholder-class="place-holder" type="number" v-model="code" @blur="fixIos" placeholder="请输入验证码"></m-input>
				<span class="border-left"></span>
				<text class="get_code" @tap="getCode">{{codeText}}</text>
			</view>
		</view>
		<view class="input-box">
			<view class="input-sub">
				所在城市
			</view>
			  <view class="row_item" @tap="showMulLinkageTwoPicker">
				<span :class="[this.pickerText ? '' : 'place-holder']">{{pickerText || '请输入所在城市'}}</span>
				<span class="arraw"></span>
			  </view>
		</view>
		<view class="input-box">
			<view class="input-sub">
				渠道号
			</view>
			<input class="item_right" type="number"  placeholder-class="place-holder" v-model="partner_id" @blur="fixIos" placeholder="请输入专属渠道号码"></m-input>
		</view>
		<view class="input-box">
			<view class="input-sub">
				姓名
			</view>
			<input class="item_right" type="text"  placeholder-class="place-holder" v-model="realname" @blur="fixIos" placeholder="请输入身份证姓名"></m-input>
		</view>
		<view class="input-box">
			<view class="input-sub">
				身份证号
			</view>
			<input class="item_right" type="text"  placeholder-class="place-holder" v-model="id_card" @blur="fixIos" placeholder="请输入身份证号码"></m-input>
		</view>
		<view class="info-box">
			<img src="../../static/img/info_blue.png" class="info-icon"><span>请填写正确身份信息以方便后期提现使用</span>
		</view>
        
        <view>
            <button type="primary" class="primary" hover-class="button-hover" @tap="bindRegister">注册</button>
        </view>
		
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
	   @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
    </view>
</template>

<script>
    import service from '../../service.js';
	import mpvuePicker from '../../components/mpvue-picker/mpvuePicker.vue';
    import mInput from '../../components/m-input.vue'
	import { dlrRegister, getRegions, dlrRegisterCode } from '@/utils/api'

    export default {
        components: {
            mInput,
			mpvuePicker
        },
        data() {
            return {
                providerList: [],
                hasProvider: false,
                mobile: '',
                code: '',
				partner_id: '',
				realname: '',
				id_card: '',
                positionTop: 0,
				mulLinkageTwoPicker: [],
				pickerValueDefault:[0],
				mode: '',
				deepLength: 1,
				themeColor: '#007AFF',
				pickerValueIndex: [0, 0],
				pickerText: '',
				pickerValueArray: [],
				city_name: '',
				city: '',
				codeText: '发送验证码',
				codeTimer: null,
				newPage: 'dlr_'
            }
        },
        methods: {
			fixIos: function(){
				setTimeout(function() {                
					var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
					window.scrollTo(0, Math.max(scrollHeight - 1, 0));            
				}, 100);
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
				this.city_name = e.label.split("-")[1];
				this.pickerText = e.label.split("-").join(' ');
				// this.activeText = e.index[0] == 1 ? '桂' : '陕';
			},
			onCancel(e){
				
			},
			async getCode(){
				if(this.codeText != '发送验证码' &&  this.codeText != '再次发送') return
				
				if(!/^(0|86|17951)?(13[0-9]|14[5-9]|15[012356789]|16[6]|17[0-8]|18[0-9]|19[89])[0-9]{8}$/.test(this.mobile)){
					wx.showToast({
						icon: 'none',
						title: '请输入正确的手机号',
						duration: 1000
					})
					return
				}
				
				dlrRegisterCode({mobile: this.mobile})
				wx.showToast({
					icon: 'none',
					title: '发送成功',
					duration: 1000
				})
				
				this.codeText = 30
				this.codeTimer = setInterval(()=>{
					if(this.codeText == 1) {
						this.codeText = '再次发送'
						clearInterval(this.codeTimer)
					} else {
						this.codeText == --this.codeText
					}
				}, 1000)
			},
			async bindRegister(){
				if(!/^(0|86|17951)?(13[0-9]|14[5-9]|15[012356789]|16[6]|17[0-8]|18[0-9]|19[89])[0-9]{8}$/.test(this.mobile)){
					wx.showToast({
						icon: 'none',
						title: '请输入正确的手机号',
						duration: 1000
					})
					return
				}
				
				if(!this.code.trim()){
					wx.showToast({
						icon: 'none',
						title: '请输入正确的验证码',
						duration: 1000
					})
					return
				}
				
				if(!this.city) {
					wx.showToast({
						icon: 'none',
						title: '请选择地区',
						duration: 1000
					})
					return
				}
				
				if(!this.partner_id) {
					wx.showToast({
						icon: 'none',
						title: '请输入渠道号',
						duration: 1000
					})
					return
				}
				
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
				let curPage = this.getCurPage();
				let curParam = curPage.options || curPage.$route.query;
				let openidParam = curParam.open_id;
				let openid = uni.getStorageSync('openid')
				let params = {
					mobile: this.mobile,
					code: this.code, 
					partner_id: this.partner_id, 
					realname: this.realname, 
					id_card: this.id_card, 
					city_name: this.city_name, 
					city: this.city,
					openid: openid || openidParam
				}
				
				let res = await dlrRegister(params)
				
				if(res.code == 200){
					let token = res.token
					if(token){
						uni.setStorageSync('token', token);
						let curPage = this.getCurPage();
						let curParam = curPage.options || curPage.$route.query;
						let openid = curParam.open_id;
						let redit_url = curParam.redit_url;
						let registerBack = uni.getStorageSync('registerBack')
						
						if(redit_url){
							let path = decodeURIComponent(redit_url).split('#')[1]
							if(path.indexOf(this.newPage) != -1){	
								uni.reLaunch({
									url: path + `?open_id=${openid}`
								})
							} else {
								uni.reLaunch({
									url: path + `?partner_id=${this.partner_id}&imei=${this.mobile}`
								})
							}
						}else if(registerBack){
							uni.reLaunch({
								url: registerBack
							})
						} else {
							uni.navigateBack()
						}
					}else {
						wx.showToast({
							icon: 'none',
							title: '注册失败',
							duration: 1000
						})
					}
				}
			},
			getCurPage(){
				let pages = getCurrentPages();
				let curPage = pages[pages.length-1];
				return curPage
			},
        },
        async onLoad() {
			let res = await getRegions()
			if(res.code == 200){
				this.mulLinkageTwoPicker = res.data
			}
        },
		onHide(){
			clearInterval(this.codeTimer)
		}
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
