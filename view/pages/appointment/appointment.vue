<template>
	<view>
		<view class="selbox">
			<view class="seltitle">客户信息</view>
			<view class="inputbox">
				<view class="label">时间</view>
				<u-input v-model="form.arrivalTime" @click="clickgetpac(i)" :disabled="true" type="type"/>
			</view>
			<view class="inputbox">
				<view class="label">姓名</view>
				<u-input v-model="form.userName"/>
			</view>
			<view class="inputbox">
				<view class="label">手机号</view>
				<u-input v-model="form.userPhone" type="number"/>
			</view>
		</view>
		<view class="btnbox" @tap="submitinfo">提交</view>
		<u-calendar v-model="getpac" mode="date" @change="getpacchange" max-date="2050-01-01" :safe-area-inset-bottom="true"></u-calendar>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form:{
					arrivalTime:'',
					userName:'',
					userPhone:'',
					reserveUserId:''
				},
				getpac:false
			}
		},
		methods: {
			clickgetpac(i){
				this.getpac = !this.getpac
			},
			getpacchange(e){
				console.log(e)
				this.form.arrivalTime = e.result
				// this.getGoodsName()
			},
			async submitinfo(){
				if(!this.$u.test.mobile(this.form.userPhone)){
					this.$refs.uToast.show({
						title: '电话格式错误',
						type: 'error',
					})
					return false;
				}
				console.log(this.form)
				let res = await this.$u.api.appointment(this.form);
				if(res.success){
					console.log(res)
					this.$refs.uToast.show({
						title: '预约成功！',
						type: 'success',
					})
					setTimeout(function(){
						uni.navigateBack();
					},1500)
				}
			}
		},
		onLoad() {
			this.form.reserveUserId = getApp().globalData.userId; //获取userID
		}
	}
</script>

<style scoped lang="scss">
.selbox{
	width: 688rpx;
	background: #FFFFFF;
	box-shadow: 0px 7rpx 15rpx 1rpx rgba(95, 95, 95, 0.1);
	border-radius: 10rpx;
	padding: 34rpx;
	margin: 0 auto;
	box-sizing: border-box;
	.seltitle{
		font-size: 32rpx;
		font-weight: bold;
		color: #1E1E1E;
	}
	.inputbox{
		display: flex;
		align-items: center;
		padding: 21rpx 0;
		border-bottom: 1rpx solid #eee;
		.label{
			width: 90rpx;
			font-size: 26rpx;
			font-weight: 500;
			color: #393939;
			margin-right: 147rpx;
		}
		&:last-child{
			border-bottom: none;
		}
	}
}
.btnbox{
	// width: 47%;
	@include button(24rpx, 291rpx, 67rpx);
	margin: 105rpx auto;
	&:hover{
		background-color: #000;
	}
	
}
</style>
