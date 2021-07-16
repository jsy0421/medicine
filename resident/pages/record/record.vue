<template>
	<view class="content">
		<!-- //页面获得全部数据,组件id传对应单条信息数据 -->
		<Single v-for="item in recordData.result" :key="item.index" :result_item=item></Single>
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
				userid:'mkd',
				recordData: {
					result: []
				},
			}
		},
		onLoad() {
			uni.request({
				url: `${this.$Url}/consult/history/${this.userid}`,//这里的lid,page,pagesize只能是数字或字母
				url: 'http://localhost:12000/consult/history/',
				method: 'GET',
				data: {
					userId: 'mkd',
				},
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
