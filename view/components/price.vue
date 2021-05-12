<template>
	<view>
		<view class="proprice">￥<span class="propri2">{{price}}</span>.00</view>
	</view>
</template>

<script>
	export default {
		props:{
			price:''
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped lang="scss">
.proprice{
	text-align: center;
	color: $theme-color;
	font-size: 24rpx;
	.propri2{
		font-size: 28rpx;
		font-weight: bold;
	}
}
</style>
