<template>
	<view class="content">
		<Single v-for="item in recordData.result" :key="item.index" :result_item="item"></Single>
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
					userId:'617',
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
						console.log(res.data.result.records)
					},
					data: {
						userId:this.userId
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
