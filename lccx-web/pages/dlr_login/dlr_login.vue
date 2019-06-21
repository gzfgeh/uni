<template>
    <view class="content">
		<view class="title">
			账号登录
		</view>
		<view class="input-box">
			<view class="input-sub">
				手机号
			</view>
			<input class="item_right" type="text"  placeholder-class="place-holder" focus @blur="fixIos" v-model="mobile" placeholder="请输入手机号"></m-input>
		</view>
		<view class="input-box">
			<view class="input-sub">
				验证码
			</view>
			<view class="input-row">
				<input class="item_right min-width" placeholder-class="place-holder" type="number" v-model="code" @blur="fixIos" placeholder="请输入验证码"></m-input>
				<span class="border-left"></span >
				<text class="get_code" @tap="getCode">{{codeText}}</text>
			</view>
		</view>
        
        <view>
            <button type="primary" class="primary" hover-class="button-hover" @tap="bindLogin">登录</button>
        </view>
		
		<view class="register" @tap="goDlrRegister">
            注册
        </view>
    </view>
</template>

<script>
    import service from '../../service.js';
    import mInput from '../../components/m-input.vue'
	import { dlrHandleLogin, dlrLoginCode } from '@/utils/api'

    export default {
        components: {
            mInput
        },
        data() {
            return {
                providerList: [],
                hasProvider: false,
                mobile: '',
                code: '',
                positionTop: 0,
				codeText: '发送验证码',
				codeTimer: null
            }
        },
        methods: {
			goDlrRegister(e){
				uni.redirectTo({
					url: '/pages/dlr_register/dlr_register'
				})
			},
			fixIos: function(){
				setTimeout(function() {                
					var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
					window.scrollTo(0, Math.max(scrollHeight - 1, 0));            
				}, 100);
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
				
				dlrLoginCode({mobile: this.mobile})
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
			async bindLogin(){
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
				
				let params = {
					mobile: this.mobile,
					code: this.code
				}
				
				let res = await dlrHandleLogin(params)
				
				if(res.code == 200){
					let token = res.token
					if(token){
						uni.setStorageSync('token', token);
						uni.navigateBack()
					}else {
						wx.showToast({
							icon: 'none',
							title: '注册失败',
							duration: 1000
						})
					}
				}
			}
        },
        onLoad() {
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
	
	.place-holder{
	  font-size: 28upx;
	  color: rgba(0,0,0,0.3);
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
	.register{
		width: 100%;
		font-size:34upx;
		color:rgba(66,125,255,1);
		line-height:48upx;
		height: 48upx;
		align-items: center;
		text-align: center;
		margin-top: 34upx;
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
	
	.border-left{
		display: inline-block;
		height: 40upx;
		border-right: 2upx solid #979797;
		margin-top: 6upx;
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
