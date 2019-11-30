<template>
	<view>
		
		
		
		<scroll-view class="scroll_content" scroll-y="true" @scroll="scroll" 
			scroll-with-animation="true"   >
			<view class="temp_view"  ></view>
			<view class="content_wrap" :style="{'height' : scrollHeightVal+'px'}" >
				<view v-for="(item,index) in list" :key="index" class="item" @click="clickItem(index)">
					<view class="time">{{item.c_title}}</view>
					<image :src="message_notice_icon" mode="aspectFill"></image>
					
					<rich-text :nodes="item.c_detail"></rich-text>
				</view>
			</view>
		</scroll-view>
		
		
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,getContentList } from "@/utils/api";
	import uniStatusBar from '@/components/mini_status_bar.vue';
	
	export default {
		components: {
			uniStatusBar
		},
		data() {
			return {
				head_logo: BASE_IMAGE_URL+"head_logo.png",
				message_bg: BASE_IMAGE_URL+"message_bg.png",
				white_back_icon: BASE_IMAGE_URL+"white_back_icon.png",
				message_title: BASE_IMAGE_URL+"message_title.png",
				message_notice_icon: BASE_IMAGE_URL+"message_notice_icon.png",
				animation: {},
				upDown: {},
				list: [],
				oldScroll: 0,
				topScroll: 340,
				bottomScroll: 270,
				scrollHeight: 66,
				scrollX: 0,
				statusBarHeight: 0,
				titleHeight: 0,
				tempHeight: 0,
				scrollHeightVal: 0,
			}
		},
		methods: {
			
		},
		onLoad() {
		}
	}
</script>

<style>
	page{background: #FFFFFF;}
	
</style>
