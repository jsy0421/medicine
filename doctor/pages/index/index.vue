<template>
	<view class="content">
		<image class="img" src="/static/icon/复诊配药.png" @click="redirect1"></image>
		<view class="text-area">
			<text class="title">
				复诊配药
			</text>
		</view>
		<image class="img" src="/static/icon/配药记录.png" @click="redirect2"></image>
		<view class="text-area">
			<text class="title">
				配药记录
			</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userId:''
			}
		},
		onLoad(option) {
			if (option.userId != undefined){
				this.userId = option.userId;
				console.log(this.userId);
			}
		},
		methods: {
			redirect1(){
				uni.navigateTo({
				    url: '/pages/watchgeneral/watchgeneral?userId=' + this.userId
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 40rpx;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 100rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}
	.img{
		height: 200rpx;
		width: 200rpx;
		margin-top: 100rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}
	
	.title {
		font-size: 32rpx;
		color: $u-content-color;
	}
	
	.button-demo {
		margin-top: 80rpx;
	}
	
	.link-demo {
		margin-top: 80rpx;
	}
</style>
