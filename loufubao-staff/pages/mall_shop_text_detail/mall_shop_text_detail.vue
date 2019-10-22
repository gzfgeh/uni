<template>
	<view class="contain">
		<div class="row item_wrap" v-for="(item,index) in store_form" :key="index">
			<span>{{item.name}}</span>
			<input type="text" :placeholder="'请输入'+item.name" v-model="item.value"/>
		</div>
		
		
		<button class="btn" hover-class="hover_class" @click="store_submit">提交</button>
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,store_detail,store_submit } from '@/utils/api'
	export default {
		data() {
			return {
				storeID:'',
				store_form: []
			}
		},
		methods: {
			async store_detail(id){
				let res = await store_detail({storeID: id});
				if(res.status == 1){
					this.store_form = JSON.parse(res.data.store_form);
					this.store_form.map( (item) => {
						item.value = ""
					})
				}
			},
			
			async store_submit(){
				this.store_form.map( (item) => {
						if(!item.value){
							uni.showToast({
							  icon: 'none',
							  title: '请输入'+item.name,
							  duration: 1000
							});
							return;
						}
				})
				let submit = JSON.stringify(this.store_form);
				
				let params = {
					user_id: uni.getStorageSync("userInfo").userID,
					store_id: this.storeID,
					submit: submit
				};
				let res = await store_submit(params);
				if(res.status == 1){
					uni.showToast({
					  icon: 'none',
					  title: '提交成功',
					  duration: 1000
					});
					setTimeout( ()=>{
						uni.navigateBack({
							delta:10
						})
					}, 1000);
					
				}
			}
		},
		onLoad(opt) {
			this.storeID = opt.storeID;
			this.store_detail(this.storeID);
		}
	}
</script>

<style>
.contain{width: 100%; height: 100%; padding: 40upx; background: #FFFFFF;box-sizing: border-box;}
.item_wrap{ border-bottom: 1upx solid #E3E3E3; width: 100%; height: 120upx;}
.item_wrap span{min-width: 140upx;}
.item_wrap img{width: 60upx; margin: 0upx 20upx;}
.btn{width: 90%;
    margin: 15% 5% 0;
    background: #21a9f5;
    color: #ffffff;
    border: 0;
    padding: 0upx 0;
    font-size: 36upx;
    border-radius: 40upx;}
</style>
