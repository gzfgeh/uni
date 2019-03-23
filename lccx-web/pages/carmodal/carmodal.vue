<template>
	<div class="contain">
		<div class="title_wrap">
			<div class="car_name">奥迪A3</div>
			<div>奥迪FV1236LADGG轿车</div>
		</div>
		
		<div class="content_wrap">
			<radio-group @change="radioChange">
                <label class="uni-center-item " v-for="(item, index) in items" :value="index" :key="index">
                    <view class="radio_wrap">
						<span>{{item.name}}</span>
						<span class="price">{{item.price}}</span>
					</view>
					<view>
                        <radio :value="currentIndex" :checked="index === currentIndex" />
                    </view>
                    
                </label>
            </radio-group>
		</div>
		
		<view class="btn_wrap">
		    <button  type="primary" class="primary" hover-class="button-hover"
			@tap="next">下一步</button>
		    
		</view>
		
		
	</div>
</template>

<script>
	export default {
		data(){
			return {
				items: [
					{name: "双离合变速器2015款Sportback 300万纪念乐享型5座", price: '新车参考价：258700元'},
					{name: "双离合变速器2015款Sportback 300万纪念乐享型5座",  price: '新车参考价：258700元'},
					{name: "双离合变速器2015款Sportback 300万纪念乐享型5座",  price: '新车参考价：258700元'},
					{name: "双离合变速器2015款Sportback 300万纪念乐享型5座",  price: '新车参考价：258700元'},
					{name: "双离合变速器2015款Sportback 300万纪念乐享型5座",  price: '新车参考价：258700元'},
					{name: "双离合变速器2015款Sportback 300万纪念乐享型5座",  price: '新车参考价：258700元'},
					{name: "双离合变速器2015款Sportback 300万纪念乐享型5座",  price: '新车参考价：258700元'},
					{name: "双离合变速器2015款Sportback 300万纪念乐享型5座",  price: '新车参考价：258700元'},
					{name: "双离合变速器2015款Sportback 300万纪念乐享型5座",  price: '新车参考价：258700元'},
					{name: "双离合变速器2015款Sportback 300万纪念乐享型5座",  price: '新车参考价：258700元'}
				],
				currentIndex: 1
			}
		},
		
		methods: {
			radioChange(e){
				console.log(e.mp.detail.value);
				this.currentIndex = e.mp.detail.value;
			},
			next(){
				
			}
		}
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
