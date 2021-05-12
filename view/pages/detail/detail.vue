<template>
	<view class="contain">
		<view class="swiperbox">
			<!-- 顶部swiper -->
			<swiper class="swiper" indicator-dots="true" autoplay="autoplay" interval="8000" duration="500" circular="true">
				<swiper-item v-for="(item,i) in details.fullImage" :key="item.id">
					<view class="swiper-item uni-bg-red">
						<image class="swiper_image" :src="item.fullImgUrl|imgBase" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="titlebox">
			<view class="boxLeft">
				<view class="name">{{details.fullDress.fullName || details.dresser.name}}</view>
				<view class="type" v-if="details.fullStyleName">{{details.fullStyleName}}</view>
				<view class="type" v-if="details.dresser">{{details.dresser.level|levelFilter}}</view>
			</view>
			<price :price="details.fullDress.fullRent || details.dresser.price"></price>
		</view>
		<view class="detailbox">
			<view class="detailtop">
				<view class="cn">产品详情</view>
				<view class="en">Product details </view>
			</view>
			<view class="imgbox">
				<u-parse :tag-style="style" :html="details.fullDress.detail || details.dresser.detail"></u-parse>
			</view>
		</view>
		<view class="btmborder">
			<view class="optionbox">
				<view class="options" @tap="to('message/message')">
					<image src="../../static/icon/detail/xiaoxi.png" mode="heightFix"></image>
					<view class="opname">消息</view>
				</view>
				<view class="options" @tap="show=true">
					<image src="../../static/icon/detail/data.png" mode="heightFix"></image>
					<view class="opname">已定档期</view>
				</view>
			</view>
			<button class="btn" open-type="contact" session-from="weapp">立即咨询</button>
			<!-- <view class="btn">立即咨询</view> -->
		</view>
		<view class="totopbtn" @tap="totop">
			<image src="../../static/icon/detail/totop.png" mode="widthFix"></image>
		</view>

		<!-- //隐藏已定档期box -->
		<view class="shadowbox">
			<u-popup v-model="show" mode="center" border-radius="14" width="655rpx" height="60%" :safe-area-inset-bottom="true"
			 :closeable="true">
				<view class="content">
					<view class="detailtop">
						<view class="cn">已定档期</view>
						<view class="en">SCHEDULED </view>
					</view>
					<scroll-view scroll-y="true">
						<view class="auctionbox">
							<view class="auctions" v-for="(item,i) in auction" :key="i">
								<view class="monthbox" v-if="item.day.length>0">
									<view class="zn">{{item.month}}</view>
									<view class="cn">MONTH</view>
								</view>
								<view class="daybox">
									<view class="days" v-for="(item2,i2) in item.day" :key="i2">
										<view class="zn">{{item2}}</view>
										<view class="cn">上午</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	import price from "../../components/price.vue"
	export default {
		data() {
			return {
				details:'',
				style: {
					img: 'width: 100%;height:auto;object-fit:contain;display:inline;'
				},
				content: 'asdas<image class="swiper_image" style="height:1000rpx" src="../../static/img/swiper.png" mode="aspectFill"></image><image class="swiper_image" src="../../static/img/swiper.png" mode="aspectFill"></image>',
				show: false,
				auction: [],
			}
		},
		methods: {
			to(url,scene){
				uni.navigateTo({
					url: "/pages/" + url + "?scene=" + scene
				})
			},
			totop() {
				uni.pageScrollTo({
					duration: 0, //过渡时间必须为0，否则运行到手机会报错
					scrollTop: 0 //滚动到实际距离是元素距离顶部的距离减去最外层盒子的滚动距离（如res.top - data.top）
				})
			},
			async getmsg(){
				let res = await this.$u.api.getDetail({fullId:this.id});
				this.details = res.result;
			},
			async getmsg2(){
				let res = await this.$u.api.getDetail2({id:this.id});
				this.details = res.result;
			},
			async getAuction(){
				let res = await this.$u.api.getAuction({typeId:this.id});
				this.setAuction(res.result)
				console.log(res.result)
			},
			setAuction(datas){
				let list = this.auction;
				for(let item of datas){
					let startArr = item.pickupTime.substring(0,10).split('-').map(Number);
					let endArr = item.endTime.substring(0,10).split('-').map(Number);
					if(startArr[1]==endArr[1]){
						//同一月
						for(let i = startArr[2];i<=endArr[2];i++){
							list.filter((res)=>{return res.month==startArr[1]})[0].day.push(i)
						}
					}else{
						let startover = this.issanshi(startArr[1]);
						for(let i = startArr[2];i<=startover;i++){
							list.filter((res)=>{return res.month==startArr[1]})[0].day.push(i)
						}
						for(let i = 1;i<=endArr[2];i++){
							list.filter((res)=>{return res.month==endArr[1]})[0].day.push(i)
						}
					}
				}
				console.log(list)
				// console.log(startArr,endArr)
			},
			issanshi(month){
				//该月多少天
				let monthArr = [1,3,5,7,8,10,12];
				if(monthArr.indexOf(month)){
					return 31
				}else if(month==2){
					return 28
				}else{
					return 30
				}
			},
			setauction(){
				let auction = [];
				let currMonth = new Date().getMonth()+1; //当前月份
				for(let i=0;i<12;i++){
					let inmonth = currMonth + i;
					inmonth = inmonth>12?inmonth-12:inmonth;
					auction.push({month:inmonth,day:[]})
				}
				this.auction = auction;
			}
		},
		components: {
			price
		},
		filters:{
			
		},
		onLoad(option) {
			
			// 1化妆师 3饰品 4礼服
			this.id = option.scene;
			let type = option.type || 1;
			// console.log(type)
			if(type==1){
				this.getmsg2();
			}else if(type==3){
				// this.getmsg2();
			}else if(type==4){
				this.getmsg();
			}
			this.setauction();
			this.getAuction();
			
		}
	}
</script>

<style scoped lang="scss">
	.contain {
		.swiper {
			height: 438rpx;
			overflow: hidden;

			.swiper-item {
				.swiper_image {
					width: 100%;
					height: 438rpx;
				}
			}
		}

		.titlebox {
			height: 105rpx;
			padding: 0 20rpx 0 27rpx;
			border-bottom: 5rpx solid #F3F3F3;
			@include flexBetween;

			.boxLeft {
				display: flex;
				align-items: center;
				font-weight: bold;

				.name {
					font-size: 28rpx;
					color: #333333;
					margin-right: 22rpx;
					max-width: 15em;
					@include overhide;
				}

				.type {
					flex-shrink: 0;
					padding: 0 10rpx;
					min-width: 87rpx;
					height: 39rpx;
					@include flexCenter;
					border: 1px solid #392D40;
					border-radius: 20rpx;
					font-size: 22rpx;
					color: #392D40;
				}
			}
		}

		.detailbox {
			margin-bottom: 150rpx;

			.detailtop {
				text-align: center;
				font-weight: bold;
				color: #5D5D5D;
				padding: 41rpx 0;

				.cn {
					font-size: 26rpx;
				}

				.en {
					font-size: 24rpx;
					margin-top: 14rpx;

					@mixin wei {
						content: "";
						display: inline-block;
						width: 105px;
						height: 1px;
						opacity: 0.33;
					}

					&::before {
						@include wei;
						margin-right: 30rpx;
						background: linear-gradient(90deg, #FFFFFF, #5D5D5D);

					}

					&::after {
						@include wei;
						margin-left: 30rpx;
						background: linear-gradient(90deg, #5D5D5D, #FFFFFF);

					}
				}
			}

			.imgbox {
				width: 655rpx;
				margin: 0 auto;
			}
		}

		.btmborder {
			width: 100%;
			height: 150rpx;
			background: #FFFFFF;
			box-shadow: 0px 17rpx 33rpx 0px #545454;
			border-radius: 55rpx 55rpx 0px 0px;
			position: fixed;
			bottom: 0;
			
			left: 0;
			z-index: 3;
			padding-right: 60rpx;
			box-sizing: border-box;
			@include flexBetween;

			.optionbox {
				display: flex;
				align-items: center;

				.options {
					width: 120rpx;
					text-align: center;

					image {
						width: 40rpx;
						height: 44rpx;
					}

					.opname {
						margin-top: 15rpx;
						font-size: 24rpx;
						font-weight: 500;
						color: #B0B0B0;
					}
				}
			}

			.btn {
				width: 242rpx;
				margin: 0;
				height: 91rpx;
				border-radius: 46rpx;
				background: $theme-color;
				@include flexCenter;
				font-size: 26rpx;
				color: #FFFFFF;
			}
		}

		.totopbtn {
			width: 64rpx;
			height: 64rpx;
			position: fixed;
			right: 34rpx;
			bottom: 190rpx;
			z-index: 3;

			image {
				width: 100%;
			}
		}

		.shadowbox {
			.content {
				.detailtop {
					text-align: center;
					font-weight: bold;
					color: #5D5D5D;
					padding: 41rpx 0;

					.cn {
						font-size: 26rpx;
					}

					.en {
						font-size: 24rpx;
						margin-top: 14rpx;

						@mixin wei {
							content: "";
							display: inline-block;
							width: 65px;
							height: 1px;
							opacity: 0.33;
						}

						&::before {
							@include wei;
							margin-right: 30rpx;
							background: linear-gradient(90deg, #FFFFFF, #5D5D5D);

						}

						&::after {
							@include wei;
							margin-left: 30rpx;
							background: linear-gradient(90deg, #5D5D5D, #FFFFFF);

						}
					}
				}

				scroll-view {
					height: 45vh;
					padding: 0 20rpx;
					box-sizing: border-box;
					.auctionbox{
						.auctions{
							display: flex;
							.monthbox{
								width: 90rpx;
								height: 90rpx;
								background: $theme-color;
								color: #fff;
								font-size: 20rpx;
								border-radius: 10rpx;
								margin-right: 12rpx;
								margin-bottom: 14rpx;
								flex-shrink: 0;
								@include flexColumn;
								.zn{
									font-size: 26rpx;
									font-weight: bold;
									margin-bottom: 8rpx;
								}
							}
							.daybox{
								@include flexStart;
								.days{
									@extend .monthbox;
									background-color: #F3F3F3;
									color: #707070;
									.zn{
										font-weight: normal;
										font-size: 24rpx;
									}
								}
							}
						}
						
					}
				}
			}
		}
	}
</style>
