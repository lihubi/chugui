<template>
	<view>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper ref="tabs" :list="list"
				font-size="32"
				active-color="#1E1E1E"
				inactive-color="#1E1E1E"
				bar-height="3"
				bar-width="59"
				gutter="100"
				:bold="false"
				:is-scroll="false" :current="current" @change="tabsChange" 
				class="utabs"
				swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="current2" duration="500" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box" v-if="stayOrder.length>0&&canshow[0]">
							<view class="order" v-for="(item, index) in stayOrder" :key="index">
								<image :src="item.imageUrl|imgBase" mode="aspectFit" @tap="to('detail/detail',item.ids,item.type)"></image>
								<view class="orderright">
									<view class="toptitle">{{item.name}}</view>
									<view class="center">
										<price :price="item.rentPrice"></price>
										<view class="num">X<span>1</span></view>
									</view>
									<view class="btmbox">
										<view class="btmlef">
											<view>共一件商品  合计:</view>
											<price :price="item.rentPrice"></price>
										</view>
										<view class="paybtn">付款</view>
									</view>
								</view>
							</view>
						</view>
						<view class="page-box" v-if="stayOrder.length==0&&canshow[0]">
							<noOrder></noOrder>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;">
						<view class="page-box" v-if="hasOrder.length>0&&canshow[1]">
							<view class="order" v-for="(item, index) in hasOrder" :key="index">
								<image :src="item.imageUrl|imgBase" mode="aspectFit" @tap="to('detail/detail',item.ids,item.type)"></image>
								<view class="orderright">
									<view class="toptitle">{{item.name}}</view>
									<view class="center">
										<price :price="item.rentPrice"></price>
										<view class="num">X<span>1</span></view>
									</view>
									<view class="btmbox">
										<view class="btmlef">
											<view>共一件商品  合计:</view>
											<price :price="item.rentPrice"></price>
										</view>
										<!-- <view class="paybtn">付款</view> -->
									</view>
								</view>
							</view>
						</view>
						<view class="page-box" v-if="hasOrder.length==0&&canshow[1]">
							<noOrder></noOrder>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box" v-if="successOrder.length>0">
							<view class="order" v-for="(item, index) in successOrder" :key="index">
								<image :src="item.imageUrl|imgBase" mode="aspectFit" @tap="to('detail/detail',item.ids,item.type)"></image>
								<view class="orderright">
									<view class="toptitle">{{item.name}}</view>
									<view class="center">
										<price :price="item.rentPrice"></price>
										<view class="num">X<span>1</span></view>
									</view>
									<view class="btmbox">
										<view class="btmlef">
											<view>共一件商品  合计:</view>
											<price :price="item.rentPrice"></price>
										</view>
										<!-- <view class="paybtn">付款</view> -->
									</view>
								</view>
							</view>
						</view>
						<view class="page-box" v-if="successOrder.length==0&&canshow[2]">
							<noOrder></noOrder>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import price from "../../components/price.vue"
	import noOrder from "../../components/noOrder.vue"
export default {
	data() {
		return {
			list: [
				{
					name: '待付款'
				},
				{
					name: '待收货'
				},
				{
					name: '已完成',
				}
			],
			userId:'',
			current: 0,
			current2: 0,
			tabsHeight: 0,
			canshow:[false,false,false],
			dx: 0,
			stayOrder:[],
			hasOrder:[],
			successOrder:[]
		};
	},
	onLoad(option) {
		this.userId = getApp().globalData.userId; //获取userID
		this.current2 = option.scene;
		this.getOrderList()
	},
	computed: {
		// 价格小数
		// priceDecimal() {
		// 	return val => {
		// 		if (val !== parseInt(val)) return val.slice(-2);
		// 		else return '00';
		// 	};
		// },
		// // 价格整数
		// priceInt() {
		// 	return val => {
		// 		if (val !== parseInt(val)) return val.split('.')[0];
		// 		else return val;
		// 	};
		// }
	},
	methods: {
		to(url,scene,type){
			if(type!=3){
				uni.navigateTo({
					url: "/pages/" + url + "?scene=" + scene + "&type=" + type
				})
			}
		},
		// 页面数据
		async getOrderList() {
			let userId = this.userId;
			let res1 = await this.$u.api.myOrders({userId,status:1});//待付款
			this.stayOrder = res1.result;
			this.canshow[0] = true;
			let res2 = await this.$u.api.myOrders({userId,status:2});//已付款
			this.hasOrder = res2.result;
			this.canshow[1] = true;
			let res3 = await this.$u.api.myOrders({userId,status:3});//已完成
			this.successOrder = res3.result;
			this.canshow[2] = true;
		},
		// 总价
		// totalPrice(item) {
		// 	let price = 0;
		// 	item.map(val => {
		// 		price += parseFloat(val.price);
		// 	});
		// 	return price.toFixed(2);
		// },
		// // 总件数
		// totalNum(item) {
		// 	let num = 0;
		// 	item.map(val => {
		// 		num += val.number;
		// 	});
		// 	return num;
		// },
		// tab栏切换
		tabsChange(index) {
			// this.current = index;
			this.current2 = index;
			// this.getOrderList(index);
		},
		transition({ detail: { dx } }) {
			this.$refs.tabs.setDx(dx);
		},
		animationfinish({ detail: { current } }) {
			this.$refs.tabs.setFinishCurrent(current);
			this.swiperCurrent = current;
			this.current = current;
		}
	},
	components:{
		price,
		noOrder
	}
};
</script>

<style>
/* #ifndef H5 */
page {
	height: 100%;
	background-color: #fff;
}
/* #endif */
</style>

<style lang="scss" scoped>
	.utabs{
		border-bottom: 1rpx solid #f1f1f1;
	}
.order {
	width: 100%;
	background: #F6F3F7;
	margin: 20rpx auto;
	box-sizing: border-box;
	padding: 30rpx;
	font-size: 26rpx;
	display: flex;
	align-items: center;
	image{
		width: 189rpx;
		height: 205rpx;
		margin-right: 22rpx;
		flex-shrink: 0;
	}
	.orderright{
		.toptitle{
			min-width: 470rpx;
			@include ellipsisMultiline;
		}
		.center{
			margin-top: 24rpx;
			font-size: 26rpx;
			font-weight: 400;
			color: #2B2B2B;
			@include flexBetween;
		}
		.btmbox{
			margin-top: 70rpx;
			color: #686868;
			font-size: 24rpx;
			@include flexBetween;
			.btmlef{
				display: flex;
				align-items: center;
			}
			.paybtn{
				@include button(24rpx);
			}
		}
	}
}
.wrap {
	display: flex;
	flex-direction: column;
	height: calc(100vh - var(--window-top));
	width: 100%;
}
.swiper-box {
	flex: 1;
}
.swiper-item {
	height: 100%;
}
</style>
