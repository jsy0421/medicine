<template>
	<view class="wrap">
		<u-row gutter="16">
			<u-col span="2">
				<u-icon name="arrow-left" color="#2979ff" size="28"></u-icon>
			</u-col>
			<u-col span="8" class="text">
				<text>复诊配药详情</text>
			</u-col>
			<u-col span="2">
				<u-button size="mini" hair-line="false" @click="doc">关闭</u-button>
			</u-col>
		</u-row>
	</view>


</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			
		},
		methods: {
			doc(){
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.wrap {
		padding: 24rpx;
	}
	.u-row {
		margin: 40rpx 0;
	}
	.text {
		text-align: center ;
	}
</style>
