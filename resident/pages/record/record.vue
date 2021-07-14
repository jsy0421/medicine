<template>
	<view class="content">
		<Single></Single>
		<Single></Single>
	</view>
</template>

<script>
	import Single from './components/single.vue'
	
	export default {
		components:{
			Single
		},
		data() {
			return {
				
			}
		},
		onLoad() {
	
		},
		methods: {
	
		}
	}
</script>

<style scoped>
	.content{
		margin: 0 15upx;
	}
</style>