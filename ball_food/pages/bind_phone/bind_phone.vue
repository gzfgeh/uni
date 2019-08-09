<template>
    <view class="content">
		<view class="uni-center-item title">
			快捷登录
		</view>
		<view class="input-row border">
			<m-input class="m-input" type="number"  placeholder-class="input_place_holder" 
				focus v-model="account" placeholder="请输入手机号" maxLength="11"></m-input>
			
			<text class="get_code" @click="getCodeAction">{{count_text}}</text>
		</view>
		<view class="input-row">
			<m-input type="number" v-model="password" placeholder="请输入验证码"></m-input>
		</view>
        
        <view>
            <button type="primary" class="primary" hover-class="button-hover" @tap="bindLogin">登录</button>
        </view>
    </view>
</template>

<script>
    import { BASE_IMAGE_URL,sendCode,bindPost } from '@/utils/api'
    import mInput from '../../components/m-input.vue'

    export default {
        components: {
            mInput
        },
        data() {
            return {
                providerList: [],
                hasProvider: false,
                account: '',
                password: '',
                positionTop: 0,
				isSending: false,
				intervalObj: {}, 
				time: 60,
				count_text: '发送验证码'
            }
        },
        methods: {
			getCodeAction(){
				if(!this.isSending){
					this.getCode();
				}
			},
			async getCode(){
				console.log(this.account);
				if((!this.account) || (this.account.length != 11)){
					uni.showToast({
					  icon: 'none',
					  title: '手机号输入错误',
					  duration: 1000
					});
					return;
				}
				
				let res = await sendCode({phone: this.account});
				if(res.code == 1000){
					uni.showToast({
					  icon: 'none',
					  title: '发送成功',
					  duration: 1000
					});
					this.isSending = true;
					this.countDown();
				}else{
					uni.showToast({
					  icon: 'none',
					  title: '发送失败',
					  duration: 1000
					});
				}
			},
			
			countDown() {
				let that = this;
			    this.intervalObj = setInterval(function() {
			        that.time--;
			        if (that.time <= 0) {
			            that.time = 60;
			            clearInterval(that.intervalObj);
						that.count_text = "重新获取";
			        } else {
						that.count_text = "重新获取("+that.time+"s)";
			        }
			
			    }, 1000);
			},
			
            initPosition() {
                /**
                 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
                 * 反向使用 top 进行定位，可以避免此问题。
                 */
                this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
            },
            async bindLogin() {
                if((!this.account) || (this.account.length != 11)){
                	uni.showToast({
                	  icon: 'none',
                	  title: '手机号输入错误',
                	  duration: 1000
                	});
                	return;
                }
                if (!this.password) {
                    uni.showToast({
                        icon: 'none',
                        title: '密码输入错误'
                    });
                    return;
                }
				let params = {
					openid: uni.getStorageSync("openid"),
					phone: this.account,
					code: this.password
				};
				let res = await bindPost(params);
				if(res.code == 1000){
					uni.showToast({
					    icon: 'none',
					    title: '登录成功'
					});
					uni.setStorageSync("bindPhone", this.account);
					this.toMain();
				}else{
					uni.showToast({
					    icon: 'none',
					    title: '登录失败'
					});
				}
                
            },
            toMain() {
                uni.reLaunch({
                    url: '../main/main',
                });

            }
        },
        onLoad(e) {
			console.log(e.openid);
            this.initPosition();
        }
    }
</script>

<style>
	.content{
		padding-left: 80upx;
		padding-right: 80upx;
	}
	.title{
		color: rgba(0,0,0,0.7);
		font-size: 48upx;
		margin-top: 80upx;
		margin-bottom: 108upx;
	}
	
	.input-row{
		border: 2upx solid rgba(0,0,0,0.1);
		border-radius: 12upx;
		height: 90upx;
		margin-bottom: 40upx;
		padding-left: 40upx;
		padding-right: 34upx;
		font-size: 26upx;
		color: rgba(0,0,0,0.7);
		align-items: center;
	}
	
	.get_code{
		color: rgba(0,0,0,0.7);
		margin-left: 28upx;
		font-size: 28upx;
	}
	
	.primary{
		background-color: #35B583;;
		border-radius: 12upx;
		color: #ffffff;
		font-size: 28upx;
		height: 94upx;
		line-height: 94upx;
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
	.input-row.border::after{
		background-color: transparent!important;
	}
	
</style>
