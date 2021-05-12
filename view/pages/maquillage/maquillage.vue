<template>
	<view class="container u-skeleton">
		<view class="searchbox u-skeleton-fillet">
			<u-calendar v-model="show" :mode="mode" @change="change" max-date="2050-01-01" :safe-area-inset-bottom="true"></u-calendar>
			<u-search placeholder="请输入日期" v-model="data" :show-action="false" bg-color="#F7F7F7" height="72"
			 placeholder-color="#B3B3B3" :disabled="true" search-icon="calendar" @click="show = !show"></u-search>
		</view>
		<view class="centerbox">
			<view>
				<LeftBar :navs="navs" :baseUrl="false" @changetap="changetap"></LeftBar>
			</view>
			<view class="rightbox">
				<img class="rightswiimg u-skeleton-fillet" src="../../static/img/swiper2.png" mode="aspectFill" alt="">
				<!-- //tab -->
				<scroll-view scroll-y @scrolltolower="onreachBottom" style="height: calc(100vh - 310rpx )">
					<view class="productbox">
						<view class="products" v-for="(item,i) in products" :key="i" @tap="to('detail/detail',item.id)">
							<img class="u-skeleton-fillet" :src="item.imageUrl|imgBase" alt="" mode="aspectFill">
							<view class="productinfo u-skeleton-fillet">
								<view class="proname">{{item.name}}</view>
								<price :price="item.price"></price>
							</view>
						</view>
						<nullimg v-if="products.length==0&&nullshow" style="width: 100%;"></nullimg>
					</view>
				</scroll-view>
			</view>
		</view>
		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
	</view>
</template>

<script>
	import LeftBar from "../../components/leftbar/leftbar"
	import price from "../../components/price.vue"
	import nullimg from "../../components/nullimg.vue"
	export default {
		data() {
			return {
				//日历
				show: false,
				nullshow:false,
				data:'',
				mode: 'date',
				products:[
					{fullImage:' ',fullRent:' ',fullName:' '},
					{fullImage:' ',fullRent:' ',fullName:' '},
					{fullImage:' ',fullRent:' ',fullName:' '},
					{fullImage:' ',fullRent:' ',fullName:' '},
					{fullImage:' ',fullRent:' ',fullName:' '},
					{fullImage:' ',fullRent:' ',fullName:' '},
				],
				level:'',
				pages:1,
				navs: [{
						imageUrl: '../../static/img/lefta.png',
						partitionName: '全部',
						id: ''
					},{
						imageUrl: '../../static/img/lefta.png',
						partitionName: '专业',
						id: 1
					},
					{
						imageUrl: '../../static/img/lefta.png',
						partitionName: '资深',
						id: 2
					},
					{
						imageUrl: '../../static/img/lefta.png',
						partitionName: '高级',
						id: 3
					},
					{
						imageUrl: '../../static/img/lefta.png',
						partitionName: '总监',
						id: 4
					}
				],
				loading: true,
			}
		},
		onLoad() {
			this.getmsg();
			this.loading = false; //关闭骨架屏
		},
		methods: {
			async getmsg() {
				this.nullshow = false;
				let level = this.level;
				let time = this.data;
				let pageNo = this.pages;
				let res = await this.$u.api.getDresser({level,pageNo,time});
				if (this.pages == 1){this.products=[]};
				this.products = [...this.products,...res.result[0]];
				this.nullshow = true;
				this.pages++;
			},
			changetap(id){
				this.level = id;
				this.pages = 1;
				this.products = [];
				this.getmsg();
			},
			change(e) {
				console.log(e);
				this.data = e.result
				this.pages = 1;
				this.products = [];
				this.getmsg();
			},
			to(url,scene){
				uni.navigateTo({
					url: "/pages/" + url + "?scene=" + scene + "&type=1"
				})
			},
			// onreachBottom(){
			// 	this.getmsg();
			// }
			
		},
		components: {
			LeftBar,
			price,
			nullimg
		}
	}
</script>

<style scoped lang="scss">
	.container {
		.searchbox {
			width: 710rpx;
			margin: 0 auto;
		}

		.centerbox {
			width: 710rpx;
			margin-top: 22rpx;
			position: relative;
			@include flexBetween;

			.rightbox {
				width: 463rpx;
				.utabs{
				}
				.rightswiimg {
					width: 100%;
					height: 200rpx;
				}
				.productbox{
					@include flexStart;
					.products{
						margin-top: 13rpx;
						margin-bottom: 13rpx;
						width: 215rpx;
						img{
							width: 100%;
							height: 253rpx;
						}
						&:nth-child(2n-1){
							margin-right: 33rpx;
						}
						.productinfo{
							@include flexBetween;
							.proname{
								font-size: 24rpx;
								@include ellipsisMultiline(1);
								color: #333333;
							}
						}
						
					}
				}
			}
		}
	}
</style>
