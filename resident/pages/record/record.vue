<template>
	<view class="content">
		<Single v-for="item in recordData.result" :key="item.index" :result_item="item"></Single>
		<u-empty margin-top="500" v-if="isEmpty" text="无历史配药记录" mode="history"></u-empty>
	</view>
</template>

<script>
	import Single from './components/single.vue'
	
		export default {
			components: {
				Single
			},
			data() {
				return {
					isEmpty:false,
					userId:getApp().globalData.nickname,
					recordData: {
						result: []
					},
				}
			},
			onLoad() {
				uni.request({
					url: `${this.$Url}/consult/history`,
					method: 'POST',
					success: (res) => {
						this.recordData.result=res.data.result.records
						if(this.recordData.result.length==0)
							this.isEmpty=true
						console.log(this.recordData.result)
					},
					data: {
						userId:this.userId,
						size:100,
						page:1
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			methods: {
				
			}
		}
</script>

<style scoped>
	.content {
		margin: 0 15upx;
	}
	
</style>
