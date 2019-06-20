<template>
	<view class="contain">
		<div class="mui-content">

			<div class="row item_wrap">
			  <div class="row_between item">
				<span class="item_span">快递公司</span>
				<input type="text" v-model="express_name" placeholder="输入快递公司">
			  </div>
			</div>

			<div class="row item_wrap">
			  <div class="row_between item">
				<span class="item_span">快递编号</span>
				<input type="text" v-model="express_no" placeholder="输入快递编号">
			  </div>
			</div>
			
			<div class="row item_wrap" v-for="(item, index) in list" :key="index">
			  <div class="bycode">
				<span class="item_span">{{item.go_g_name}} 商品编码</span>
				<input type="text" v-for="(ite, ind) in item.go_no_list" :key="ind"
					v-model="ite.go_id" placeholder="请输入商品编码">
			  </div>
			</div>
			
			
			
		</div>
		
		<!-- <div class="bottom_wrap" @click="confirmShipping">提交</div> -->
		<form @submit="formSubmit" :report-submit="reportForm">
			<view class="btn-area">
				<button formType="submit" class="bottom_wrap">提交</button>
			</view>
		</form>

	</view>
</template>

<script>
	import { BASE_IMAGE_URL,confirmShipping } from '@/utils/api'
	
	export default {
		data() {
			return {
				b_name: '',
				b_phone: '',
				b_content: '',
				b_address: '',
				b_goods_no: '',
				o_id: '',
				list: [1,2,3],
				formid: '',
				reportForm: true
			}
		},
		onLoad(opt) {
			this.o_id = opt.o_id;
			this.list = uni.getStorageSync("good_list");
			this.list.map((item)=>{
				item.go_no_list = [];
				for(let i=0; i<parseInt(item.go_count); i++){
					let p = {
						go_id: ''
					};
					item.go_no_list.push(p);
				}
			})
		},
		methods: {
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：', e.detail.value)
			 },
			async confirmShipping(){
				if(!this.express_name){
					uni.showToast({
						icon: 'none',
						duration: 1000,
						title: "请输入快递公司"
					});
					return;
				};
				
				if(!this.express_no){
					uni.showToast({
						icon: 'none',
						duration: 1000,
						title: "请输入快递编号"
					});
					return;
				};
				
				let gn_no_list = [];
				
				this.list.map((item)=>{
					let no_list = [];
					item.go_no_list.map( (ite) => {
						no_list.push(ite.go_id);
					});
					
					let para = {
						go_id: item.go_id,
						go_no_list: no_list
					};
					gn_no_list.push(para);
					
				});
					
				let params = {
					o_id: this.o_id,
					o_express_name: this.express_name,
					o_express_no: this.express_no,
					gn_no_list: go_no_list,
					formid: this.formid
				};
				let res = await confirmShipping(params);
				
				if(res.code == 1000){
					uni.showToast({
						icon: 'none',
						duration: 1000,
						title: "操作成功"
					})
					uni.navigateBack({
						delta: 1
					});
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
	
	.bycode input{margin: 10upx 0upx;}

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
