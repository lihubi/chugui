<template>
	<view class="content">
		<view class="headercont" :style="{paddingTop: minelogoHeight + 'px'}">
			<view class="bgicon">
				<image src="../../static/img/my/bgicon.png" mode="widthFix" alt="">
			</view>
			<view class="infobox" v-if="islogin">
				<img class="headimg" :src="avatar ||'../../static/icon/my/headimg.png'" mode="as" alt="">
				<view class="infor" >
					<view class="name">{{userName}}</view>
					<view class="inforb">
						<img src="../../static/icon/my/edit.png" mode="widthFix" alt="">
						<view class="editinfo">编辑信息</view>
					</view>
				</view>
			</view>
			<view class="infobox"  v-else>
				<img class="headimg" src="" mode="as" alt="">
				<view class="noinfor">
					<view>点击登录</view>
					<login width="100rpx" height="50rpx" @getUserInfo="getUserInfo" :infos="2"></login>
				</view>
			</view>
			<!-- //我的订单 -->
			<!-- <view class="orderbox">
				<view class="boxheader">
					<view class="dd">我的订单</view>
					<view class="more"  @tap="to('newOrder/newOrder',0)">查看全部 <image src="../../static/icon/my/more.png" mode="widthFix"></image></view>
				</view>
				<view class="boxBtm">
					<view class="bbs" @tap="to('order/order',0)">
						<view class="imgbox">
							<view class="jiaob" v-if="countNum.daiCount>0">{{countNum.daiCount}}</view>
							<img src="../../static/icon/my/daifukuan.png" mode="widthFix" alt="">
						</view>
						<view class="text">待付款</view>
					</view>
					<view class="bbs">
						<view class="imgbox" @tap="to('order/order',1)">
							<view class="jiaob" v-if="countNum.yiCount>0">{{countNum.yiCount}}</view>
							<img src="../../static/icon/my/daishouhuo.png" mode="widthFix" alt="">
						</view>
						<view class="text">待收货</view>
					</view>
					<view class="bbs">
						<view class="imgbox" @tap="to('order/order',2)">
							<view class="jiaob" v-if="countNum.wanCount>0">{{countNum.wanCount}}</view>
							<img src="../../static/icon/my/success.png" mode="widthFix" alt="">
						</view>
						<view class="text">已完成</view>
					</view>
				</view>
			</view> -->
			<!-- //跟妆、查档 -->
			<view class="centerimgbox"> 
				<view class="genzhuang"  @tap="to('maquillage/maquillage')"><img src="../../static/img/my/genzhuang.png" alt="" mode="widthFix" ></view>
				<view class="chadang"  @tap="to('consult/consult')"><img src="../../static/img/my/chadang.png" alt="" mode="widthFix" ></view>
			</view>
			<!-- //列表 -->
			<view class="changelist">
				<view class="lists" @tap="to('newOrder/newOrder')">
					<view class="listleft">
						<image class="listicon" src="../../static/icon/my/daishouhuo.png" mode="heightFix"></image>
						<view class="listname">我的订单</view>
					</view>
					<view class="listr">
						<img src="../../static/icon/my/fanhui.png" mode="widthFix" alt="">
					</view>
				</view>
				<view class="lists" @tap="to('message/message')">
					<view class="listleft">
						<image class="listicon" src="../../static/icon/my/pinglun.png" mode="heightFix"></image>
						<view class="listname">消息</view>
					</view>
					<view class="listr">
						<view class="jiaob" v-if="countNum.messageCount>0">{{countNum.messageCount}}</view>
						<img src="../../static/icon/my/fanhui.png" mode="widthFix" alt="">
					</view>
				</view>
				<view class="lists" @tap="to('orderEntry/orderEntry')" v-if="userRole!=1">
					<view class="listleft">
						<image class="listicon" src="../../static/icon/my/wenjuan.png" mode="heightFix"></image>
						<view class="listname">订单录入</view>
					</view>
					<view class="listr">
						<img src="../../static/icon/my/fanhui.png" mode="widthFix" alt="">
					</view>
				</view>
			</view>
			<!-- //列表 -->
			<view class="changelist">
				<view class="lists" @tap="to('appointment/appointment')">
					<view class="listleft">
						<image class="listicon" src="../../static/icon/my/yuyue.png" mode="heightFix"></image>
						<view class="listname">预约来店</view>
					</view>
					<view class="listr">
						<img src="../../static/icon/my/fanhui.png" mode="widthFix" alt="">
					</view>
				</view>
				<view class="lists" @tap="to('take/take')">
					<view class="listleft">
						<image class="listicon" src="../../static/icon/my/qujian.png" mode="heightFix"></image>
						<view class="listname">取件部</view>
					</view>
					<view class="listr">
						<img src="../../static/icon/my/fanhui.png" mode="widthFix" alt="">
					</view>
				</view>
			</view>

		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import login from "../../components/login.vue"
	export default {
		data() {
			return {
				userId:'',
				userRole:'1',
				avatar:'',
				userName:'',
				islogin: false,
				countNum:{},
				minelogoHeight: ''
			}
		},
		methods: {
			to(url,scene){
				if(this.islogin){
					uni.navigateTo({
						url: "/pages/" + url + "?scene=" + scene
					})
				}else{
					this.$refs.uToast.show({
						title: '请登录',
						type: 'warning',
						position: 'bottom'
					})
				}
				
			},
			async getUserInfo(){
				this.userId = getApp().globalData.userId;
				let res = await this.$u.api.getUserInfo({userId:this.userId});
				this.avatar = res.result.imageUrl;
				this.userRole = res.result.userRole;
				this.userName = res.result.userName;
				res.result.phone?this.islogin = true:'';
				console.log(res)
			},
			async getcountNum(){
				let res = await this.$u.api.countNum({userId:this.userId});
				this.countNum = res.result
			}
		},
		onLoad() {
			this.minelogoHeight = getApp().globalData.minelogoHeight;  //获取三角图片据顶部的高度
			this.userId = getApp().globalData.userId; //获取userID
			if(this.userId){
				this.getUserInfo();
			}
		},
		onShow() {
			this.getcountNum();
		},
		components:{
			login
		}
	}
</script>

<style scoped lang="scss">
	
	.content {
		padding-top: 0.1rpx;
		width: 100%;
		min-height: 100vh;
		background: url(../../static/img/my/bg.png) #F9F9F9 no-repeat;
		background-size: contain;

		.headercont {
			width: 650rpx;
			margin: 0 auto;

			.bgicon {
				width: 60rpx;
				height: 60rpx;

				// margin-top: 70rpx;
				image {
					width: 100%;
				}
			}

			.infobox {
				width: 100%;
				background-color: #fff;
				padding: 20rpx;
				box-sizing: border-box;
				border-radius: 20rpx;
				display: flex;
				align-items: center;
				margin-top: 50rpx;
				padding-bottom: 100rpx;
				.noinfor{
					position: relative;
				}
				.headimg {
					background: #aaa;
					width: 101rpx;
					height: 101rpx;
					border-radius: 50%;
					overflow: hidden;
					margin-right: 34rpx;
				}

				.infor {
					.name {
						font-size: 32rpx;
						font-weight: bold;
						color: #434343;
					}

					.inforb {
						display: flex;
						margin-top: 15rpx;
						align-items: center;

						img {
							width: 20rpx;
							height: 20rpx;
							margin-right: 12rpx;
						}

						.editinfo {
							font-size: 24rpx;
							font-weight: 500;
							color: #919191;
						}
					}
				}

				.noinfor {
					font-size: 32rpx;
					font-weight: bold;
					color: #434343;
				}
			}

			.orderbox {
				background: #fff;
				border-radius: 30rpx;
				overflow: hidden;
				.boxheader {
					@include flexBetween;
					background-color: $theme-color;
					width: 100%;
					height: 54rpx;
					padding: 37rpx;
					box-sizing: border-box;
					color: #fff;
					font-size: 28rpx;
					.more{
						font-size: 22rpx;
						image{
							margin-left: 7rpx;
							width: 15rpx;
							height: 15rpx;
						}
					}
				}
				.boxBtm{
					padding: 35rpx;
					box-sizing: border-box;
					@include flexCenter;
					.bbs{
						flex: 1;
						text-align: center;
						.imgbox{
							position: relative;
							margin: 0 auto;
							width: 50rpx;
							height: 50rpx;
							.jiaob{
								@include jiaobiao;
								position: absolute;
								right: -10rpx;
								top: -10rpx;
							}
							img{
								width: 100%;
							}
						}
						
						.text{
							margin-top: 10rpx;
							font-size: 24rpx;
							font-weight: 500;
							color: $theme-color;
						}
					}
				}
			}
			.centerimgbox{
				width: 100%;
				height: 103rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.genzhuang{
					width: 49%;
					height: 100%;
				}
				.chadang{
					width: 49%;
					height: 100%;
				}
				img{
					width: 100%;
				}
			}
			.changelist{
				width: 100%;
				margin: 0 auto;
				padding: 0 24rpx;
				box-sizing: border-box;
				margin-top: 27rpx;
				background: #FFFFFF;
				border-radius: 10rpx;
				.lists{
					width: 100%;
					height: 81rpx;
					border-bottom: 1rpx solid #F1F1F1;
					@include flexBetween;
					&:last-child{
						border-bottom: none;
					}
					.listleft{
						display: flex;
						align-items: center;
						.listicon{
							width: auto;
							height: 32rpx;
							margin-right: 16rpx;
						}
					}
					.listr{
						display: flex;
						align-items: center;
						.jiaob{
							@include jiaobiao;
							margin-right: 24rpx;
						}
						img{
							width: 13rpx;
						}
					}
				}
			}
		}

	}
</style>
