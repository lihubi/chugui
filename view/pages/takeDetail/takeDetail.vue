<template>
	<view>
		<view class="selbox">
			<view class="seltitle">订单详情</view>
			<view class="listbox">
				<view class="lists" v-for="(item,i) in list" :key="i">
					<view class="left">
						<view class="name">{{item.partitionMame || ''}}/{{item.partitionSecMame || ''}}</view>
						<view class="bh">编号: <span class="num">{{item.code || ''}}</span> </view>
					</view>
				<view v-if="item.inspects=='0'" class="selboxss selected" @tap="checked(item.id)">未检查</view>
				<view v-else  class="selboxss">已检查</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				workId:'',
				list:[]
			}
		},
		methods: {  //userOrder/queryByOrderId
			async getmsg(){
				let res = await this.$u.api.getQujianDt({id:this.id});
				if(res.success){
					this.list = res.result
					// this.to('selectShipin/selectShipin',this.form.orderId)
				}
			},
			async checked(id){
				let workId = this.workId;
				let res = await this.$u.api.checkedqj({id,workId});
				if(res.success){
					console.log(res)
					this.getmsg()
					// this.to('selectShipin/selectShipin',this.form.orderId)
				}
			}
		},
		onLoad(options) {
			this.id = options.scene;
			this.workId = getApp().globalData.userId; //获取userID
			this.getmsg()
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
	.listbox {
		width: 100%;
		.lists {
			width: 100%;
			height: 124rpx;
			margin: 0 auto;
			padding: 24rpx 0;
			background: #fff;
			@include flexBetween;
			border-bottom: 1rpx solid #eee;
			&:last-child{
				border-bottom: none;
			}
			.left {
				font-size: 24rpx;
				.name{
					font-size: 24rpx;
					font-weight: 500;
					color: #1E1E1E;
					margin-bottom: 11rpx;
				}
				.bh{
					color: #959595;
				}
				.num{
					font-weight: bold;
					color: #1E1E1E;
				}
			}
	
			.selboxss {
				width: 149rpx;
				height: 54rpx;
				@include flexCenter;
				background: #F8F8F8;
				border-radius: 10rpx;
				color: #3B3B3B;
				font-size: 24rpx;
			}
	
			.selected {
				background-color: $theme-color;
				color: #fff;
			}
	
		}
	}

}
</style>
