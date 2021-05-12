<template>
	<view class="container u-skeleton">
		<view class="searchbox u-skeleton-fillet">
			<u-search placeholder="搜一下,更快捷" @search="toSearch()" @custom="toSearch()" 
			action-text="搜索" v-model="keyword" bg-color="#F7F7F7" height="72"
			 placeholder-color="#B3B3B3"></u-search>
		</view>
		<view class="centerbox">
			<view class="u-skeleton-fillet">
				<LeftBar :navs="navs" @changetap="navsChange"></LeftBar>
			</view>
			<view class="rightbox">
				<img class="rightswiimg u-skeleton-fillet" src="../../static/img/swiper2.png" mode="aspectFill" alt="">
				<!-- //tab -->
				<view>
					<u-tabs-swiper ref="uTabs" :list="list" 
					font-size="24" duration="0.3"
					active-color="#686868"
					inactive-color="#686868"
					
					bar-width="59"
					gutter="100"
					:bold="false"
					:bar-style="barStyle"
					:is-scroll="true" :current="current" @change="tabsChange" 
					class="utabs"
					swiperWidth="463"></u-tabs-swiper>
				</view>
				<!-- //内容 -->
				<swiper :current="swiperCurrent"  duration="300" @transition="transition" @animationfinish="animationfinish" style="height:calc(100vh - 400rpx);">
					<swiper-item class="swiper-item" v-for="(item, index) in list" :key="index" v-show="current==index">
						<scroll-view scroll-y @scrolltolower="onreachBottom" style="height: 100%;">
							<view class="productbox">
								<view class="products" v-for="(item,i) in fullDressList" :key="i" @tap="to('detail/detail',item.id)">
									<img class="u-skeleton-fillet" :src="item.fullImage|imgBase" alt="" mode="aspectFill">
									<view class="productscontain u-skeleton-rect">
										<view class="proname">{{item.fullName}}</view>
										<price :price="item.fullRent"></price>
									</view>
									<!-- <view class="proprice">￥<span class="propri2">{{item.price}}</span>.00</view> -->
								</view>
								<nullimg v-if="fullDressList.length==0&&nullshow" style="width: 100%;"></nullimg>
							</view>
						</scroll-view>
					</swiper-item>
				</swiper>
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
				keyword: '',
				products:[],
				nullshow:false,
				navs: [{id:'',partitionName:'全部',imageUrl:'temp/lefta_1607562087723.png'}],
				list: [{id:'',name:'全部'}],
				barStyle:{
					// width: '59rpx',
					height: '2rpx',
					background: '#392D40',
					
				},
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				fullStyleId:'', //款式id
				fullPartitionId:'', //分区id
				pages:1,
				fullDressList:[
					{fullImage:' ',fullRent:' ',fullName:''},
					{fullImage:' ',fullRent:' ',fullName:''},
					{fullImage:' ',fullRent:' ',fullName:''},
					{fullImage:' ',fullRent:' ',fullName:''},
				],
				loading: true,
			}
		},
		async onLoad() {
			await this.getnavs();
			await this.getProject();
			this.getfullDress();
			this.loading = false; //关闭骨架屏
		},
		methods: {
			toSearch(){
				this.pages = 1;
				this.fullDressList = [];
				this.getfullDress();
			},
			async getProject() {
				let res = await this.$u.api.getProject({type:1});
				this.list = [...this.list,...res.result];
			},
			async getnavs() {
				let res = await this.$u.api.getPartition({});
				this.navs = [...this.navs,...res.result];
			},
			async getfullDress() {
				this.nullshow = false;
				let fullPartitionId = this.fullPartitionId;
				let fullStyleId =  this.fullStyleId;
				let fullName =  this.keyword;
				let pageNo = this.pages;
				let res = await this.$u.api.getfullDress({fullPartitionId,fullStyleId,pageNo,fullName});
				if (this.pages == 1){this.fullDressList=[]};
				this.fullDressList = [...this.fullDressList,...res.result.records];
				this.nullshow = true;
				this.pages++;
			},
			to(url,scene){
				uni.navigateTo({
					url: "/pages/" + url + "?scene=" + scene + "&type=4"
				})
			},

			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
			},
			navsChange(id){
				this.fullPartitionId = id;
				this.pages = 1;
				this.fullDressList = [];
				this.getfullDress();
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
				this.fullStyleId = this.list[current].id
				this.pages = 1;
				this.fullDressList = [];
				this.getfullDress();
			},
			// scroll-view到底部加载更多
			onreachBottom() {
				this.getfullDress();
			}
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
						.productscontain{
							@include flexBetween;
							.proname{
								@include ellipsisMultiline(1);
								color: #686868;
							}
						}
					}
				}
			}
		}
	}
</style>
