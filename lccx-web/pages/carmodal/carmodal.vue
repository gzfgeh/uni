<template>
	<div class="contain">
		<div class="title_wrap">
			<div class="car_name">{{familyName}}</div>
			<div>{{brand_name}}</div>
		</div>
		
		<div class="content_wrap">
			<radio-group @change="radioChange">
                <label class="uni-between-item " v-for="(item, index) in items" :value="index" :key="index">
                    <view class="radio_wrap">
						<span>{{item.parentVehName}}{{item.engineDesc}}{{item.gearboxType}}{{item.seat}}</span>
						<span class="price">新车参考价：{{item.newCarPrice}}元</span>
					</view>
					<view>
                        <radio :value="currentIndex" :checked="index === currentIndex" />
                    </view>
                    
                </label>
            </radio-group>
		</div>
		
		<view class="btn_wrap">
		    <button  type="primary" class="primary" hover-class="button-hover"
			@tap="vehicle">下一步</button>
		    
		</view>
		
		
	</div>
</template>

<script>
	import { BASE_IMAGE_URL,getModelMistiness,getModelExactness,vehicle } from "@/utils/api";


	export default {
		data(){
			return {
				items: [],
				current: 0,
				brand_name: '法拉利',
				familyName:'',
				license_no: '',
				response_no: '',
				brandCode: '',
				isExactness: true,
				sendTime: '',
				global: '',
				currentIndex: 0
			}
		},
		
		methods: {
			radioChange(e){
				console.log(e.mp.detail.value);
				this.currentIndex = e.mp.detail.value;
			},
			next(){
				this.global.brandCode = this.items[this.currentIndex].brandCode;
				uni.setStorageSync("global",this.global);
				console.log(this.global);
				uni.navigateTo({
					url: "../quote_bill/quote_bill"
				})
			},
			async vehicle(){
				let params = {
					"brand_code": this.global.brandCode,
					"model_details": {
						"family_name": this.items[0].familyName,
						"standard_name": this.items[0].standardName,
						"parent_veh_name": this.items[0].parentVehName,
						"engine_desc": this.items[0].engineDesc,
						"gearbox_type": this.items[0].gearboxType,
						"seat": this.items[0].seat,
						"new_car_price": this.items[0].newCarPrice
						}
					};

					let res = await vehicle(this.global.quotation_id, params);
					if(res.code == 200){
						this.next();
					}
				},
				
				async getModelExactness(){
					let params = {
						license_no: this.license_no,
						response_no: this.response_no
					};

					let res = await getModelExactness(params);
					if(res.code == 200){
						if(!res.data){
							this.isExactness = false;
							this.getModelMistiness();
						}else{
							this.isExactness = true;
							this.items = res.data.data;
							this.familyName = res.data.data[0].familyName;
							this.brand_name = res.data.data[0].standardName;
							this.sendTime = res.data.sendTime;
							this.global.brandCode = res.data.data[0].brandCode;
						}
					}
				},
				  async getModelMistiness(){
					let params = {
					  row: 10,
					  page: this.current+1,
					  brand_name: this.brandCode
					};
					let res = await getModelMistiness(params);
					if(res.code == 200){
					  uni.stopPullDownRefresh();
					  console.log(res.data.data);
					  this.items = res.data.data;
					  this.familyName = res.data.data[0].familyName;
								this.brand_name = res.data.data[0].standardName;
								this.sendTime = res.data.sendTime;
					}
				  }
	  
		},
		onLoad(){
			this.global = uni.getStorageSync("global");
			console.log('global');
			console.log(global);
			this.license_no = this.global.license_no;
			this.response_no = this.global.responseNo;
			this.brandCode = this.global.brandCode;
			this.isExactness = true;
		  this.getModelExactness();
		},
		onReachBottom: function(){
				if(!this.isExactness){
					this.current++;
			this.getModelMistiness();
				}
		  
		},
		onPullDownRefresh: function(){
				if(!this.isExactness){
						this.current = 0;
				this.getModelMistiness();
				}
		  
		},
	
	}
</script>

<style>
	.contain{
		width: 100%;
	}
	
	.title_wrap{
		color: rgba(0,0,0,0.7);
		height: 160upx;
		padding: 20upx 50upx; 
		background-color: #F9F9F9;
		width: 100%;
		box-sizing: border-box;
	}
	.car_name{
		color: #000000;
		font-size: 56upx;
		font-weight: bold;
	}
	
	.content_wrap{
		padding-left: 48upx;
		padding-top: 18upx;
		padding-bottom: 18upx;
	}
	
	.radio_wrap{
		display: flex;
		flex-direction: column;
		color: rgba(0,0,0,1);
		font-size: 28upx;
		margin-right: 40upx;
	}
	
	.radio_wrap .price{
		font-size: 24upx;
		color: rgba(0,0,0,0.4);
	}
	
	radio-group label{
		border-bottom:  2upx solid rgba(0,0,0,0.1);
	}
	
	.btn_wrap{
		position: fixed;
		bottom: 0upx;
		width: 100%;
		height: 160upx;
		background-color: #FFFFFF;
		padding: 30upx 40upx;
		box-sizing: border-box;
	}
	
	.primary{
		background-color: #427DFF;
		color: #FFFFFF;
		border-radius: 10upx;
		font-size: 32upx;
		height: 100upx;
		line-height: 100upx;
	}
	
</style>
