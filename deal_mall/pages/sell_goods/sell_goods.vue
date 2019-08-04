<template>
	<view class="contain">
		<div class="mui-content">

			<div class="row item_wrap">
			  <div class="row_between item">
				<span class="item_span">姓名</span>
				<input type="text" v-model="o_name" placeholder="请输入姓名">
			  </div>
			</div>

			<div class="row item_wrap">
			  <div class="row_between item">
				<span class="item_span">手机号</span>
				<input type="number" maxlength="11" v-model="o_phone" placeholder="请输入手机号">
			  </div>
			</div>
			
			<div class="row item_wrap">
			  <div class="row_between item">
				<span class="item_span">数量</span>
				<input type="number" maxlength="5" v-model="o_num" @blur="inputChange"
					placeholder="请输入数量">
			  </div>
			</div>
			
			<div class="row item_wrap">
			  <div class="bycode">
				<span class="item_span">商品编码</span>
				<input type="text"  v-for="(item, index) in list" :key="index"
					v-model="item.go_id" placeholder="请输入商品编码">
			  </div>
			</div>
			
			<div class="row item_wrap">
			  <div class="row_between item">
				<span class="item_span">推荐人姓名</span>
				<input type="text" v-model="tuijian_name" placeholder="请输入姓名">
			  </div>
			</div>
			
			<div class="row item_wrap">
			  <div class="row_between item">
				<span class="item_span">推荐人手机号</span>
				<input type="number" maxlength="11" v-model="tuijian_phone" placeholder="请输入手机号">
			  </div>
			</div>
			
		</div>
		
		<!-- <div class="bottom_wrap" @click="confirmShipping">提交</div> -->
		<form @submit="formSubmit" :report-submit="reportForm">
			<view class="btn-area">
				<button form-type="submit" class="bottom_wrap formid">提交</button>
			</view>
		</form>

	</view>
</template>

<script>
	import { BASE_IMAGE_URL,addSaleOrder } from '@/utils/api'
	
	export default {
		data() {
			return {
				o_name: '',
				o_phone: '',
				o_num: '',
				b_address: '',
				b_goods_no: '',
				o_id: '',
				list: [{go_id: ''}],
				formid: '',
				reportForm: true,
				item: {},
				go_g_no_list: [],
				tuijian_name: '',
				tuijian_phone: ''
			}
		},
		onLoad(opt) {
			this.item = uni.getStorageSync("good_list");
			if(parseInt(this.item.t_is_no) == 0){
				this.list = [];
			}
		},
		methods: {
			inputChange(e){
				this.list = [];
				if(parseInt(this.item.t_is_no) == 0){
					return;
				}
				let num = parseInt(this.o_num);
				for(let i=0; i<num; i++){
					let params = {
						go_id: ''
					};
					this.list.push(params);
				}
				if(num == 0){
					this.list = [{go_id: ''}];
				}
			},
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：', e.detail.formId);
				this.addSaleOrder(e.detail.formId);
			 },
			async addSaleOrder(formId){
				if(!this.o_name){
					uni.showToast({
						icon: 'none',
						duration: 1000,
						title: "请输入姓名"
					});
					return;
				};
				
				if(!this.o_phone){
					uni.showToast({
						icon: 'none',
						duration: 1000,
						title: "请输入手机号"
					});
					return;
				};
				
				if(!this.o_num || (this.o_num == 0)){
					uni.showToast({
						icon: 'none',
						duration: 1000,
						title: "请输入正确的数值"
					});
					return;
				};
				
				let gn_no_list = [];
				
				this.list.map((item)=>{
					gn_no_list.push(item.go_id);
				});
					
				let params = {
					o_name: this.o_name,
					o_phone: this.o_phone,
					go_g_id: this.item.g_id,
					go_count: this.o_num,
					go_g_price: this.item.g_price,
					go_g_name: this.item.g_name,
					go_g_img: this.item.g_img,
					o_openid: uni.getStorageSync("openid"),
					go_t_is_no: this.item.t_is_no,
					formid: formId,
					go_g_no_list: gn_no_list,
					o_js_name: this.tuijian_name,
					o_js_phone: this.tuijian_phone,
				};
				// console.log(params);
				// return;
				let res = await addSaleOrder(params);
				
				if(res.code == 1000){
					uni.showToast({
						icon: 'none',
						duration: 1000,
						title: "操作成功"
					})
					uni.navigateBack({
						delta: 1
					});
				}else{
					uni.showToast({
						icon: 'none',
						duration: 1000,
						title: res.msg
					})
				}
			}
		}
	}
</script>

<style>
	page{height: 100%; background: #EFEFF4;}
	.btn-area{position: fixed;bottom: 0upx;left:0upx;z-index: 100;}
	.bottom_wrap{position: fixed;bottom: 0upx;left:0upx; width: 100%; height: 100upx;line-height: 100upx;text-align: center;color: #FFF; background: #FF4544; font-size: 34upx;border-radius: 0upx;}
.head_wrap {
      padding: 28upx;
      width: 100%;
      text-align: left;
      color: #666666;
      font-size: 24upx;
	  box-sizing: border-box;
    }

    ::-webkit-input-placeholder {
      color: #CCCCCC;
      font-size: 28upx;
    }

    .item_wrap {
      width: 100%;
      background-color: #FFFFFF;
      padding-left: 28upx;
	  box-sizing: border-box;
    }

    .item {
      height: 100upx;
      width: 100%;
      border-bottom: 2upx solid #E3E3E3;
      color: #333333;
      font-size: 28upx;
      padding-right: 30upx;
	  box-sizing: border-box;
    }
	
	.bycode{
		display: flex;
		flex-direction: column;
		width: 100%;
      border-bottom: 2upx solid #E3E3E3;
      color: #333333;
      font-size: 28upx;
      padding-right: 30upx;
	  box-sizing: border-box;
	  padding: 10upx 0upx;
	}
	
	.bycode input{margin: 10upx 0upx;border-bottom: 2upx solid #E3E3E3;}
	.bycode input:last-child{border: none}
    .item .content {
      flex: 1;
      text-align: right;
      font-size: 32upx;
      color: #666666;
      height: 100upx;
      line-height: 100upx;

    }

    .button {
      border-radius: 6upx;
      width: 90%;
      margin: 20upx 5% 0px;
      box-sizing: border-box;
      background-color: #107EFF;
      color: #FFFFFF;
      font-size: 32upx;
      height: 88upx;
    }

    .arraw {
      width: 20upx;
      height: 20upx;
      border-top: 4upx solid #999999;
      border-right: 4upx solid #999999;
      transform: rotate(45deg);
      margin-left: 4upx;
    }
	.bao_xiu{
		display: flex;
		flex-direction: column;
		width: 100%;
		padding-top: 20upx;
	}

    .item input {
      margin: 0px;
      border: none;
      background: transparent;
      flex: 1;
      text-align: left;
      padding: 0px 0px 0px 16upx;
			font-size: 34upx;
    }

    .item .item_span {
      width: 200upx;
      color: #333333;
      font-size: 34upx;
    }

    .upload_wrap {
      padding: 36upx 30upx;
      background: #FFFFFF;
      color: #333333;
      font-size: 28upx;
    }

    .img_wrap {
      flex-flow: wrap;
      margin-top: 36upx;
    }

    textarea {
      padding: 18upx 22upx;
      height: 220upx;
      background-color: #F9F9F9;
      margin-top: 40upx;
      width: 100%;
      margin-bottom: 10upx;
      font-size: 24upx;
	  box-sizing: border-box;
	  margin-right: 5%;
    }

    textarea::-webkit-input-placeholder {
      color: #999999;
      font-size: 24upx;
    }

    .mui-bar-nav {
      box-shadow: none;
    }
	
	.contain {
      background-color: #F3F3F3;
    }
</style>
