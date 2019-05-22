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
.row{display: flex; flex-direction: row; align-items: center;}
.row_center{display: flex; flex-direction: row; align-items: center; justify-content: center;}
.row_between{display: flex; flex-direction: row; align-items: center; justify-content: space-between;}
.row_around{display: flex; flex-direction: row; align-items: center; justify-content: space-around;}

.col{display: flex; flex-direction: column; align-items: center;}
.col_justify_center{display: flex; flex-direction: column; justify-content: center;}
.col_center{display: flex; flex-direction: column; align-items: center; justify-content: center;}
</style>
