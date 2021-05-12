<script>
	export default {
		globalData: {
		    userId:'',
			phone:'',
			//手机屏幕信息
			minelogoHeight:'',
			navHeight:'',
			statusBarHeight:'',
			headerHeight:'',
		},
		onLaunch: function() {
			console.log('App Launch')
			//获取用户id
			this.globalData.userId = wx.getStorageSync('userId');
			this.globalData.phone = wx.getStorageSync('phone');
			//获取手机屏幕信息
			uni.getSystemInfo({
				success: (res) => {
					//获取通知栏、胶囊高度
					const menuButton = uni.getMenuButtonBoundingClientRect()		// 胶囊
					const navBarPadding = (menuButton.top - res.statusBarHeight) * 2	
					let statusBarHeight = res.statusBarHeight
					let navHeight = menuButton.height + navBarPadding		
					let headerHeight = navHeight + statusBarHeight
					let minelogoHeight = statusBarHeight + navBarPadding/2
					this.globalData.navHeight = navHeight;
					this.globalData.statusBarHeight = statusBarHeight;
					this.globalData.headerHeight = headerHeight;
					this.globalData.minelogoHeight = minelogoHeight;
			
				}
			})
			
			
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	*{
		margin: 0;
		padding: 0;
	}
	/*每个页面公共css */
	@import "uview-ui/index.scss";
	image,img{
		height: auto; 
	}
	.marginContainer{
		width: 706rpx;
		margin: 0 auto;
	}
	.darkbgbox{
		background-color: $datkbg-color;
		min-height: 100vh;
		width: 100%;
	}
</style>
