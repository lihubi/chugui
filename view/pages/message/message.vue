<template>
	<view class="marginContainer">
		<view class="listbox">
			<view class="lists" v-for="(item,i) in list" :key="i" @tap="to('messageDetail/messageDetail',item.orderTempId,item.status)">
				<view class="listleft">
					<image src="../../static/img/lefta.png" mode="widthFix"></image>
					<view>
						<view class="msgname">花涂新娘</view>
						<view class="msginfo">{{item.content}}</view>
					</view>
				</view>
				<view class="listright">
					<view class="time">{{item.createTime|time}}</view>
					<view class="jiaob" v-if="item.status==1">1</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userId:'',
				list:[]
			}
		},
		methods: {
			to(url,scene,status){
				uni.navigateTo({
					url: "/pages/" + url + "?scene=" + scene + "&status=" + status
				})
			},
			async getmsg(){
				let userId = this.userId;
				let res = await this.$u.api.userMessage({userId});
				this.list = res.result;
			}
		},
		filters:{
			time(data){
				return data.substring(0,10)
			}
		},
		onShow() {
			this.userId = getApp().globalData.userId; //获取userID
			this.getmsg();
		}
	}
</script>

<style scoped lang="scss">
	.marginContainer{
		.listbox{
			width: 100%;
			margin: 20rpx 0;
			.lists{
				padding: 20rpx 0;
				
				@include flexBetween;
				.listleft{
					display: flex;
					align-items: center;
					image{
						width: 97rpx;
						height: 97rpx;
						margin-right: 23rpx;
					}
					.msgname{
						font-size: 32rpx;
						font-weight: 500;
						color: #1E1E1E;
					}
					.msginfo{
						font-size: 24rpx;
						font-weight: 500;
						margin-top: 15rpx;
						color: #999999;
					}
				}
				.listright{
					display: flex;
					flex-direction: column;
					align-items: center;
					.time{
						font-size: 24rpx;
						font-weight: 500;
						color: #CDCCCC;
					}
					.jiaob{
						margin-top: 18rpx;
						@include jiaobiao;
					}
				}
			}
		}
	}

</style>
