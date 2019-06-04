<script>
export default {
	onLaunch: function() {
		console.log('App Launch');

		setTimeout(() => {
			uni.setTabBarBadge({
				index: 1,
				text: '31'
			});
			uni.showTabBarRedDot({
				index: 3
			});
		}, 1000);
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/*每个页面公共css */ 
ul, li{list-style:none;}
.row{display: flex; flex-direction: row; align-items: center;}
.row_center{display: flex; flex-direction: row; align-items: center; justify-content: center;}
.row_between{display: flex; flex-direction: row; align-items: center; justify-content: space-between;}
.row_around{display: flex; flex-direction: row; align-items: center; justify-content: space-around;}

.col{display: flex; flex-direction: column; align-items: center;}
.col_justify_center{display: flex; flex-direction: column; justify-content: center;}
.col_between{display: flex; flex-direction: column; justify-content: space-between;}
.col_center{display: flex; flex-direction: column; align-items: center; justify-content: center;}

.flex_one{flex: 1;}

.hover_class{opacity: 0.9; background-color: #F7F7F7;}
.no_data_wrap{text-align: center; padding-top: 100upx;}
.arraw{width: 20upx;height: 20upx;border-top: 4upx solid #999999;border-right: 4upx solid #999999;transform: rotate(45deg);margin-left: 4upx;display: inline-block;}
</style>
