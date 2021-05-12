<template>
	<view class="darkbgbox u-skeleton">
		<view class="marginContainer">
			<!-- 顶部swiper -->
			<swiper class="swiper u-skeleton-fillet" indicator-dots="true" autoplay="autoplay" interval="8000" duration="500"
			 circular="true">
				<swiper-item v-for="(item,i) in banner1" :key="item.id">
					<view class="swiper-item uni-bg-red">
						<!-- <image class="swiper_image" :src="item.imageUrl|imgBase" mode="aspectFill"></image> -->
						<image class="swiper_image" :src="item.imageUrl" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
			<!-- //关于花涂 -->
			<view class="aboutHtbox">
				<view class="aboutHeader u-skeleton-fillet">
					<view class="cn">关于花途</view>
					<view class="en">ABOUT US</view>
				</view>
				<view class="aboutinner u-skeleton-fillet">创立时间2015年,石家庄新潮品牌·婚礼当天全程服务~婚纱礼服跟妆~打造与众不同的新娘魅力,0元试纱，一对一服务</view>
			</view>
			<!-- //店面环境 -->
			<view class="shophjbox">
				<view class="boxheader">
					<view>店面环境</view>
				</view>
				<view class="shopimgbox">
					<div class="card1">
						<image src="../../static/img/home/card1.png" mode="aspectFill"></image>
					</div>
					<div class="card2">
						<image src="../../static/img/home/card2.png" mode="aspectFill"></image>
					</div>
					<div class="card3">
						<image src="../../static/img/home/card3.png" mode="aspectFill"></image>
					</div>
					<div class="card4">
						<image src="../../static/img/home/card4.png" mode="aspectFill"></image>
					</div>
					<div class="card5">
						<image src="../../static/img/home/card5.png" mode="aspectFill"></image>
					</div>
					<div class="card6">
						<image src="../../static/img/home/card6.png" mode="aspectFill"></image>
					</div>
				</view>
			</view>
			<!-- //新品展示 -->
			<view class="newShowbox">
				<view class="boxheader">
					<view>新品展示</view>
				</view>
				<view>
					<view class="productbox">
						<view class="products" v-for="(item,i) in fullDressList" :key="i" @tap="to('detail/detail',item.id)">
							<img class="u-skeleton-fillet" :src="item.fullImage|imgBase" alt="" mode="aspectFill">
							<view class="productscontain u-skeleton-rect">
								<view class="proname">{{item.fullName}}</view>
								<price :price="item.fullRent"></price>
							</view>
						</view>
						<nullimg v-if="fullDressList.length==0&&nullshow" style="width: 100%;"></nullimg>
					</view>
				</view>
			</view>

		</view>
		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
	</view>
</template>

<script>
	import price from "../../components/price.vue"
	import nullimg from "../../components/nullimg.vue"
	export default {
		data() {
			return {
				loading: true,
				banner1: [{
						id: 1,
						imageUrl: '../../static/img/home/card5.png'
					},
					{
						id: 2,
						imageUrl: '../../static/img/home/card6.png'
					},
					{
						id: 3,
						imageUrl: '../../static/img/home/card3.png'
					},
				],
				fullDressList: [{
						fullImage: '骨架屏假数据',
						fullRent: '骨架屏假数据',
						fullName: '骨架屏假数据'
					},
					{
						fullImage: '骨架屏假数据',
						fullRent: '骨架屏假数据',
						fullName: '骨架屏假数据'
					},
					{
						fullImage: '骨架屏假数据',
						fullRent: '骨架屏假数据',
						fullName: '骨架屏假数据'
					},
					{
						fullImage: '骨架屏假数据',
						fullRent: '骨架屏假数据',
						fullName: '骨架屏假数据'
					},
					{
						fullImage: '骨架屏假数据',
						fullRent: '骨架屏假数据',
						fullName: '骨架屏假数据'
					},
					{
						fullImage: '骨架屏假数据',
						fullRent: '骨架屏假数据',
						fullName: '骨架屏假数据'
					},
					{
						fullImage: '骨架屏假数据',
						fullRent: '骨架屏假数据',
						fullName: '骨架屏假数据'
					},
				],
			}
		},
		onLoad() {
			this.getCase();
			this.getBanner();
		},
		onReady() {
			setTimeout(() => {
				this.loading = false; //关闭骨架屏
			}, 800)
		},
		methods: {
			to(url, scene) {
				uni.navigateTo({
					url: "/pages/" + url + "?scene=" + scene
				})
			},
			async getCase() {
				let res = await this.$u.api.getCase({});
				console.log(res)
			},
			async getBanner() {
				// let res = await this.$u.api.getBanner({}); 
				// this.banner1 = res.result;
				// console.log(res)
			},

		},
		components: {
			price,
			nullimg
		},
		onReachBottom() { //与methods 同级
			console.log('页面到底了')
		}
	}
</script>

<style scoped lang="scss">
	.darkbgbox {
		.marginContainer {
			background: #F9F9F9;
			font-size: 24rpx;

			.swiper {
				height: 357rpx;
				border-radius: 30rpx;
				overflow: hidden;

				.swiper-item {
					height: 100%;

					.swiper_image {
						width: 100%;
						height: 100%;
					}
				}
			}

			// tab
			.tabbox {
				@include flexCenter;
				width: 100%;
				margin: 0 auto;
				text-align: center;
				margin-top: 44rpx;
				margin-bottom: 60rpx;

				.tabs {
					flex: 1;

					image {
						width: 70rpx;
					}

					.tabname {
						margin-top: 25rpx;
						font-size: 24rpx;
						font-weight: 400;
						color: #3C3C3C;

					}
				}
			}

			//新品展示
			.newShowbox {
				width: 100%;
				background-color: #fff;
				border-radius: 30rpx;
				overflow: hidden;

				.boxheader {
					width: 100%;
					height: 54rpx;
					@include flexBetween;
					background: $theme-color;
					color: #fff;
					padding: 0 19rpx;
					box-sizing: border-box;
				}

				.newSwiperbox {
					margin-top: 12rpx;
					width: 100%;

					.newSwiper {
						width: 100%;
						height: 259rpx;

						.swiper-item {
							height: 100%;

							.swiper_image {
								width: 100%;
								height: 100%;
							}
						}
					}
				}
			}

			//关于花涂
			.aboutHtbox {
				margin-top: 43rpx;
				width: 100%;
				background: #fff;
				margin-bottom: 33rpx;

				.aboutHeader {
					width: 100%;
					height: 146rpx;
					background: url(../../static/img/aboutbg.jpg) no-repeat;
					background-size: cover;
					color: #FFFFFF;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;

					.cn {
						font-size: 28rpx;
						font-weight: bold;
					}

					.en {
						font-size: 20rpx;
						font-weight: 400;
						position: relative;
						line-height: 2;

						&::after {
							content: "";
							position: absolute;
							bottom: 0rpx;
							left: 50%;
							transform: translateX(-50%);
							display: inline-block;
							width: 66rpx;
							height: 1rpx;
							background: #FFFFFF;
						}
					}
				}

				.aboutinner {
					padding: 73rpx 30rpx 67rpx 30rpx;
					box-sizing: border-box;
					font-size: 24rpx;
					font-weight: 400;
					color: #515151;
					line-height: 1.5;
				}
			}

			//店面环境
			.shophjbox {
				@extend .newShowbox;

				.boxheader {
					@include flexCenter;
				}

				.shopimgbox {
					width: 100%;
					justify-content: center;
					padding: 17rpx;
					box-sizing: border-box;
					display: grid;
					grid-template-columns: 150rpx 176rpx 176rpx 150rpx;
					grid-template-rows: 178rpx 178rpx 178rpx;
					row-gap: 4rpx;
					column-gap: 4rpx;

					.card1,
					.card4 {
						grid-row-start: span 2;
					}

					.card5 {
						grid-column-start: span 2;
					}

					.card6 {
						grid-column-start: span 4;
					}

					image {
						width: 100%;
						height: 100%;
					}
				}
			}

			//企业文化
			.companyculture {
				@extend .aboutHtbox;
				margin-bottom: 51rpx;
			}



			.productbox {
				@include flexStart;
				margin-top: 44rpx;

				.products {
					margin-top: 13rpx;
					margin-bottom: 13rpx;
					width: 335rpx;

					img {
						width: 100%;
						height: 396rpx;
					}

					&:nth-child(2n-1) {
						margin-right: 19rpx;
					}

					.productscontain {
						@include flexBetween;

						.proname {
							@include ellipsisMultiline(1);
							color: #686868;
						}
					}

				}
			}
		}
	}
</style>
