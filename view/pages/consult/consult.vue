<template>
	<view class="marginContainer u-skeleton">
		<view class="fixbox">
			<view class="searchbox">
				<u-calendar v-model="show" :mode="mode" @change="changedata" max-date="2050-01-01" :safe-area-inset-bottom="true"></u-calendar>
				<u-search placeholder="请输入日期" v-model="dataShow" :show-action="false" bg-color="#F7F7F7" height="72"
				 placeholder-color="#B3B3B3" :disabled="true" search-icon="calendar" @click="show = !show"></u-search>
			</view>
			<view class="tabsbox">
				<u-tabs  name="partitionName" :list="navs" :is-scroll="true" 
				:current="current" @change="changetab"
				font-size="24"
				active-color="#392D40"
				inactive-color="4A4A4A"
				bar-height="3"
				bar-width="50"
				gutter="70"
				height="40"
				:bold="false"
				></u-tabs>
			</view>
		</view>
		<scroll-view scroll-y="true" @scrolltolower="onreachBottom" style="margin-top: 165rpx;height: calc(100vh - 165rpx);">
			<view>
				<scroll-view scroll-x>
					<view class="childtabsbox">
						<view class="childtabs" v-for="(item,i) in list" :key="i" @tap="changeChildtab(item.id)">
							<image class="u-skeleton-fillet" :src="item.image|imgBase" mode="aspectFill" alt="">
							<view class="name u-skeleton-rect">{{item.name}}</view>
						</view>
					</view>
				</scroll-view>
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
		</scroll-view>
		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
	</view>
</template>
			<!-- margin-top: 165rpx; -->
<script>
	import price from "../../components/price.vue"
	import nullimg from "../../components/nullimg.vue"
	export default {
		data() {
			return {
				//日历
				show: false,
				data:'',
				dataShow:'',
				nullshow:false,
				mode: 'range',
				//tabs
				navs: [{id:'',partitionName:'全部',image:'temp/lefta_1607562087723.png'}],
				list:[
					{id:'',image:'temp/lefta_1607562087723.png',name:'全部'},
					{id:'',image:'temp/lefta_1607562087723.png',name:'全部'},
					{id:'',image:'temp/lefta_1607562087723.png',name:'全部'},
					{id:'',image:'temp/lefta_1607562087723.png',name:'全部'},
					{id:'',image:'temp/lefta_1607562087723.png',name:'全部'},
				],
				current: 0,
				fullDressList:[
					{fullImage:'骨架屏假数据',fullRent:'骨架屏假数据',fullName:'骨架屏假数据'},
					{fullImage:'骨架屏假数据',fullRent:'骨架屏假数据',fullName:'骨架屏假数据'},
					{fullImage:'骨架屏假数据',fullRent:'骨架屏假数据',fullName:'骨架屏假数据'},
					{fullImage:'骨架屏假数据',fullRent:'骨架屏假数据',fullName:'骨架屏假数据'},
				],
				fullStyleId:'', //款式id
				fullPartitionId:'', //分区id
				pages:1,
				loading: true,
			}
		},
		 async onLoad() { 
			 
			 
			 await this.getnavs();
			 await this.getProject();
			 await this.getfullDress();
			 this.loading = false; //关闭骨架屏
		},
		methods: {
			async getProject() {
				let res = await this.$u.api.getProject({type:1});
				this.list = [{id:'',image:'temp/lefta_1607562087723.png',name:'全部'},...res.result];
				// console.log(res.result)
			},
			async getnavs() {
				let res = await this.$u.api.getPartition({});
				this.navs = [...this.navs,...res.result];
			},
			async getfullDress() {
				this.nullshow = false;
				let fullPartitionId = this.fullPartitionId;
				let fullStyleId =  this.fullStyleId;
				let startTime =  this.data.startDate;
				let endTime =  this.data.endDate;
				let pageNo = this.pages;
				let res = await this.$u.api.getfullDress2({fullPartitionId,fullStyleId,pageNo,startTime,endTime});
				console.log(res)
				if (this.pages == 1){this.fullDressList=[]};
				this.fullDressList = [...this.fullDressList,...res.result];
				this.nullshow = true;
				this.pages++;
				console.log(this.fullDressList)
			},
			to(url,scene){
				uni.navigateTo({
					url: "/pages/" + url + "?scene=" + scene + "&type=4"
				})
			},
			changedata(e) {
				//切换日期
				console.log(e);
				this.data = e;
				this.dataShow = e.startDate + ' 至 ' + e.endDate
				this.pages = 1;
				this.fullDressList = [];
				this.getfullDress();
			},
			changeChildtab(id){
				this.fullStyleId = id;
				this.pages = 1;
				this.fullDressList = [];
				this.getfullDress();
			},
			changetab(index) {
				//切换父tab
				this.current = index;
				this.fullPartitionId = this.navs[index].id;
				this.pages = 1;
				this.fullDressList = [];
				this.getfullDress();
			},
			// scroll-view到底部加载更多
			onreachBottom() {
				// this.getfullDress();
			},
		},
		components:{
			price,
			nullimg
		}
	}
</script>

<style scoped lang="scss">
	.marginContainer{
		.fixbox{
			background-color: #fff;
			position: fixed;
			left: 0;
			right: 0;
			top: 0;
			overflow-x:scroll;
			z-index: 3;
			.tabsbox{
				margin-top: 40rpx;
				border-bottom: 1rpx solid #eCeCeC;
				box-sizing: border-box;
			}
		}
		scroll-view{
			width: 100%;
			
			.childtabsbox{
				display: flex;
				align-items: center;
			}
			.childtabs{
				flex-shrink: 0;
				margin-top: 56rpx;
				width: 145rpx;
				text-align: center;
				image{
					width: 91rpx;
					height: 115rpx;
				}
				.name{
					margin-top: 26rpx;
					color: #686868;
					font-size: 24rpx;
				}
			}
		}
		.productbox{
			@include flexStart;
			margin-top: 44rpx;
			.products{
				margin-top: 13rpx;
				margin-bottom: 13rpx;
				width: 335rpx;
				img{
					width: 100%;
					height: 396rpx;
				}
				&:nth-child(2n-1){
					margin-right: 19rpx;
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
</style>
