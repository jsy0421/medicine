<template>
	<view class="content">
		<Head></Head>
	</view>
</template>

<script>
	import Head from './components/head.vue'
	
	export default {
		components:{
			Head,
		},
		data() {
			return {
				title: 'Hello'
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
