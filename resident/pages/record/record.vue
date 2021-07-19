<template>
	<view class="content">
		<Single v-for="tem in recordData.result" :key="item.index" :result_item="item"></Single>
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
					consultId:'1415851778022617090',
					recordData: {
						result: []
					},
				}
			},
			onLoad() {
				uni.request({
					url: `${this.$Url}/consult/${this.consultId}`,
					method: 'GET',
					success: (res) => {
						this.recordData.result=res.data.result
						console.log(res.data.result)
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
