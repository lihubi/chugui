<template>
	<view class="darkbgbox">
		<view class="tips">
			<image src="../../static/icon/my/yinliang.png" mode="widthFix"></image>
			<view>3天内要取走的</view>
		</view>
		<view class="listbox">
			<view class="lists" v-for="(item,i) in list" :key=i @tap="to('takeDetail/takeDetail',item.id)">
				<view class="left">{{i+1}}</view>
				<view class="centerinfo">
					<view> <span class="justify">客户</span>: <span class="centerin">{{item.userCode}}</span> </view>
					<view> <span class="justify">订单号</span>: <span class="centerin">{{item.orderNO}}</span> </view>
				</view>
				<view v-if="item.inspects=='0'" class="selbox selected">未检查</view>
				<view v-else  class="selbox">已检查</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		methods: {
			to(url, scene) {
				uni.navigateTo({
					url: "/pages/" + url + "?scene=" + scene
				})
			},
			async getmsg(){
				let res = await this.$u.api.getQujian();
				if(res.success){
					this.list = res.result
					// this.to('selectShipin/selectShipin',this.form.orderId)
				}
			}
		},
		onShow() {
			this.getmsg()
		}
	}
</script>

<style scoped lang="scss">
	.darkbgbox {
		padding-top: 0.1px;
	}

	.tips {
		width: 688rpx;
		height: 50rpx;
		margin: 28rpx auto;
		background: #FFFFFF;
		border-radius: 10rpx;
		@include flexCenter;

		image {
			width: 20rpx;
			height: 20rpx;
			margin-right: 11rpx;
		}
	}

	.listbox {
		.lists {
			width: 688rpx;
			height: 130rpx;
			margin: 24rpx auto;
			background: #fff;
			@include flexBetween;

			.left {
				@include flexCenter;
				width: 86rpx;
				height: 100%;
				background: $theme-color;
				border-radius: 10rpx 0px 0px 10rpx;
				font-size: 24rpx;
				font-weight: bold;
				color: #FFFFFF;
			}

			.centerinfo {
				flex: 1;
				line-height: 1.8;
				margin-left: 35rpx;

				.centerin {
					margin-left: 10rpx;
					font-weight: bold;
				}
			}

			.selbox {
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

			.justify {
				display: inline-block;
				width: 90rpx;
				text-align: justify;
				text-justify: distribute-all-lines;
				text-align-last: justify;
				-moz-text-align-last: justify;
				-webkit-text-align-last: justify;
				vertical-align: top;
				overflow: hidden;
				height: 1.8em;

			}

			.justify::after {
				content: "";
				display: inline-block;
				width: 100%;
				height: 0;
			}
		}
	}
</style>
