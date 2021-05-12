<template>
	<view class="btnbox" >  
	<!-- //父元素需要position:relative; -->
		<view class="boxbtns"  v-if="infos==2" >
			<button class="loginbtn" open-type="getUserInfo" @getuserinfo="bindgetuserinfo"></button>
		</view>
		<view class="boxbtns" v-if="infos==1" >
			<button class="loginbtn"  open-type='getPhoneNumber' @getphonenumber="bindgetphonenumber"></button>
		</view>
		<view class="getphonebox" v-if="phoneboxShow">
			<u-modal v-model="phoneboxShow" :show-confirm-button="false" :mask-close-able="true" :show-title="false">
				<view class="titlebox">获取手机号</view>
				<view class="contents">
					<image src="../static/icon/my/success2.png" mode="widthFix"></image>
					<view class="contentTips">授权你的手机号</view>
					<button class="getphone"  open-type='getPhoneNumber' @getphonenumber="bindgetphonenumber">登录</button>
				</view>
			</u-modal>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			 infos:{
			     type:Number,
			     default:function(){
			         return 2; //1手机号，2个人信息
			     }
			 },
		},
		data() {
			return {
				phoneboxShow:false,
			}
		},
		methods:{
			bindgetuserinfo(e) {
				console.log(e)
				// 获取用户信息
				let nickname = e.detail.userInfo.nickName;
				let avatar = e.detail.userInfo.avatarUrl;
				var that = this;
				uni.login({
					withCredentials: true,
					success: res => {
						// console.log(res)
						this.login(res.code,nickname,avatar);
					}
				})
			},
			bindgetphonenumber(e) {
				let iv = e.detail.iv;
				let endata = e.detail.encryptedData
				uni.login({
					success: res => {
						let code = res.code
						this.getphone(code,iv, endata);
					}
				})
			},
			async login(code,nichNmae,imageUrl){
				// console.log(2)
				let res = await this.$u.api.getOpenId({code,nichNmae,imageUrl});
				wx.setStorageSync('userId', res.result.id);
				getApp().globalData.userId = res.result.id;
				if(res.result.phone){
					wx.setStorageSync('phone', res.result.phone);
					getApp().globalData.phone = res.result.phone;
					this.getUserInfo();
				}else{
					this.phoneboxShow = true;
				}
				
			},
			async getphone(code,iv,data){
				// console.log(2)
				let res = await this.$u.api.getPhone({code,iv,data});
				if(!res.message){
					this.getphone(code,iv,data)
				}
				wx.setStorageSync('phone', res.message);
				getApp().globalData.phone = res.message;
				this.phoneboxShow = false;
				this.getUserInfo();
			},
			getUserInfo(){
				this.$emit("getUserInfo")
			}
			
		}
		
	}
</script>

<style scoped lang="scss">
	.btnbox{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 5;
		.boxbtns{
			width: 100%;
			height: 100%;
			opacity: 0;
		}
		.loginbtn{
			width: 100%;
			height: 100%;
		}
		.getphonebox{
			position: fixed;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: rgba(0,0,0,.5);
			.titlebox{
				width: 100%;
				height: 122rpx;
				@include flexCenter;
				font-size: 32rpx;
				color: #353535;
			}
			.contents{
				text-align: center;
				padding-top: 38rpx;
				border-top: 1rpx solid $theme-color;
				image{
					width: 68rpx;
					height: 68rpx;
				}
				.contentTips{
					font-size: 24rpx;
					font-weight: 400;
					color: #9D9D9D;
				}
				.getphone{
					margin: 58rpx auto;
					margin-bottom: 26rpx;
					@include button(26rpx,384rpx,74rpx);
				}
			}
		}
	}

</style>
