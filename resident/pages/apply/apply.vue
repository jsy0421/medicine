<template>
	<view class="content">
		<Head></Head>
		<Doctor></Doctor>
	</view>
</template>

<script>
	import Head from './components/head.vue'
	import Doctor from './components/doctor.vue'
	
	export default {
		components:{
			Head,Doctor
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
