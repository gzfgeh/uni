<template>
	<view>
		<div class="mui-content has-header tiaozheng-col">
			<div class="pd tip-col">您可以重新安排首页展示的功能选项</div>
			<div class="tiaozheng-list">
				<div class="child-col">
					<img class="first" src="../../static/img/tiaozheng_left.jpg">
					<img class="second" src="../../static/img/tiaozheng_canyin.jpg">
					<span class="text">附近餐饮</span>

					<div class="right-col">

						<switch @change="canYinChange" />

					</div>
				</div>
				<div class="child-col">
					<img class="first" src="../../static/img/tiaozheng_left.jpg">
					<img class="second" src="../../static/img/tiaozheng_shangpin.jpg">
					<span class="text">推荐商品</span>

					<div class="right-col">

						<switch @change="shangPinChange" />

					</div>
				</div>

			</div>


			<div class="pd tip-col">未启用</div>

			<div class="tiaozheng-list">

				<div class="child-col">
					<img class="first" src="../../static/img/tiaozheng_left.jpg">
					<img class="second" src="../../static/img/tiaozheng_fuli.jpg">
					<span class="text">楼宇福利</span>

					<div class="right-col">

						<switch @change="fuliChange" />

					</div>
				</div>
				<div class="child-col">
					<img class="first" src="../../static/img/tiaozheng_left.jpg">
					<img class="second" src="../../static/img/tiaozheng_zhihui.jpg">
					<span class="text">智慧楼宇</span>

					<div class="right-col">

						<switch @change="zhiHuiChange" />

					</div>
				</div>
			</div>
		</div>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			canYinChange(e){
				
			},
			shangPinChange(e){
				
			},
			fuliChange(e){
				
			},
			zhiHuiChange(e){
				
			},
		}
	}
</script>

<style>
.mui-content{background: #f9f9f9;}
.pd{padding:0 30upx;}
.tiaozheng-list .child-col{background: #fff;padding:0 30upx;line-height:120upx;position: relative;margin-bottom:16upx;box-shadow:0px 4upx 12upx 0px rgba(126,125,125,0.14);}
.tiaozheng-col .tip-col{color:rgba(102,102,102,1);line-height:90upx;font-size:28upx;}
.tiaozheng-list .first{width:40upx;display: inline-block;vertical-align: middle;}
.tiaozheng-list .second{display: inline-block;vertical-align: middle;width:48upx;}
.tiaozheng-list .text{color:rgba(51,51,51,1);
    line-height:90upx;font-size:28upx;padding-left:10upx;display: inline-block;vertical-align: middle;position: relative;top:-4upx;}
.tiaozheng-list .child-col .right-col{position: absolute;right:30upx;top:0upx;}
</style>
