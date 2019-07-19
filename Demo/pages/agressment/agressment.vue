<template>
	<view style="padding: 20upx;">
		<rich-text :nodes="detail"></rich-text> 
		
		<div @click="setAgress" class="agree_btn row_center" v-if="false">
			<label class="checkbox">
				<checkbox  :checked="isAgress" /> 点击同意用户协议
			</label>
		</div>
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,getConfigList } from '@/utils/api'
	
	export default {
		data() {
			return {
				detail: '',
				isAgress: false
			}
		},
		methods: {
			setAgress(){
				this.isAgress = !this.isAgress;
				this.$eventHub.$emit('agressment', this.isAgress);
			},
			async getConfigList(){
				let res = await getConfigList();
				if(res.status == 1){
					this.detail = res.data;
					var richtext=  this.detail;
					const regex = new RegExp('<img', 'gi');
					richtext= richtext.replace(regex, `<img style="max-width: 100%;"`);
				 
					this.detail = richtext;
				}
			}
		},
		onLoad() {
			this.getConfigList();
		}
	}
</script>

<style>
.agree_btn{position: fixed; bottom: 0upx; height:100upx; width: 100%; box-sizing: border-box; text-align: center;border-top: 2upx solid #F1F1F1;}
</style>
