<template>
	<view class="nullimgbox">
		<image src="../static/img/nulldingdan.png" mode="widthFix"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped>
.nullimgbox{
	width: 100%;
	height: auto;
	margin: 0 auto;
	margin-top: 50rpx;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
}
.nullimgbox>image{
	width: 300rpx;
}
</style>
