<template>
	<view class="contain">
		<div v-for="(item, index) in list" :key="index" class="item_wrap">
			<div class="item">{{item.go_g_name}}</div>
			<div v-for="(ite, ind) in item.inputlist" :key="ind" class="row">
				<span>商品编号：</span>
				<input type="text" v-model="ite.value" >
			</div>
			
		</div>
		
		<button  @click="confirmReceipt">确认提交</button>
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,confirmReceipt } from '@/utils/api'
	
	export default {
		data() {
			return {
				list: [],
				allItem: {}
			}
		},
		methods: {
			async confirmReceipt(){
				let listPara = [];
				let flag = false;
				this.list.map((item) => {
					let listParaItem = [];
					item.inputlist.map((item)=>{
						console.log(item.value);
						if(!item.value){
							uni.showToast({
								icon: 'none',
								duration: 1000,
								title: "所有商品编号都要输入"
							});
							flag = true;
						}
						listParaItem.push(item.value);
					})
					
					listPara.push({go_g_id: item.go_g_id, go_id: item.go_id, inputList: listParaItem})
				});
				if(flag){
					return;
				}
				let params = {
					o_id: this.allItem.o_id,
					list: JSON.stringify(listPara)
				};
				
				let res = await confirmReceipt(params);
				if(res.code == 1000){
					uni.showToast({
						icon: 'none',
						duration: 1000,
						title: "操作成功"
					});
					setTimeout(()=>{
						uni.navigateBack();
					}, 1000)
				}
			}
		},
		onLoad() {
			this.allItem = uni.getStorageSync("item");
			this.list = [];
			this.allItem.good_list.map((item)=>{
				if(parseInt(item.go_is_kucun) == 0){
					this.list.push(item);
				}
			})
			this.list.map((item)=>{
				item.inputlist = [];
				for(let i=0; i<item.go_count; i++){
					item.inputlist.push({value: ''});
				}
			});
			console.log(this.list);
			this.$forceUpdate();
		}
	}
</script>

<style>

.contain{padding: 20upx;}
.item_wrap{border-bottom: 2upx solid #DDDDDD;}
.item{margin: 20upx 0upx;}
input{border: 2upx solid #DDDDDD; margin: 20upx 0upx; padding: 10upx;}

button{ margin: 20upx 0upx;}
</style>
