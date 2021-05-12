<template>
	<view class="wrap">
		<view class="selbox">
			<view class="seltitle">订单详情</view>
			<view class="listbox">
				<view class="lists" v-for="(item,i) in stayOrder" :key="i">
					<view class="left">
						<view class="line">订单类型: <span class="num">{{item.type|type}}</span> </view>
						<view class="line">{{item.partitionMame || ''}} <span v-if="item.partitionSecMame">/</span> {{item.partitionSecMame || ''}}</view>
						<view class="line">编号: <span class="num">{{item.code || ''}}</span> </view>
						<view class="line">下单时间: <span class="num">{{item.createTime || ''}}</span> </view>
					</view>
					<view v-if="item.ids&&item.type==1" class="selboxss selected" @tap="to('detail/detail',item.ids)">查看商品</view>
					<view v-if="!item.ids&&item.type==1" class="selboxss">未选择礼服</view>
				</view>
			</view>
		</view>
		<view class="page-box" v-if="stayOrder.length==0&&canshow">
			<noOrder></noOrder>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userId:'',
				current: 0,
				current2: 0,
				tabsHeight: 0,
				canshow:[false],
				dx: 0,
				stayOrder:[],
				hasOrder:[],
				successOrder:[]
			}
		},
		methods: {
			to(url,scene,type){
					uni.navigateTo({
						url: "/pages/" + url + "?scene=" + scene + "&type=4"
					})
			},
			// 页面数据
			async getOrderList() {
				let userId = this.userId;
				let res1 = await this.$u.api.newOrders({userId});
				this.stayOrder = res1.result;
				this.canshow = true;
			},
		},
		onLoad(option) {
			this.userId = getApp().globalData.userId; //获取userID
			this.current2 = option.scene;
			this.getOrderList()
		},
		filters:{
			type(data){
				if(data==1){
					return '礼服'
				}else if(data==2){
					return '化妆师'
				}else if(data==3){
					return '饰品'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
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
			margin: 0 auto;
			padding: 24rpx 0;
			background: #fff;
			@include flexBetween;
			border-bottom: 1rpx solid #eee;
			&:last-child{
				border-bottom: none;
			}
			.left {
				.line{
					margin: 10rpx 0;
				}
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
	
		}
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
</style>
