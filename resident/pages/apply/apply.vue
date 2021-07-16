<template>
	<view class="content">
		<Head></Head>
		<Doctor></Doctor>
		<u-button size="mini" @click="showIndex">open</u-button>
		<u-select v-model="hospitalsPickerShow" :list="allHospitalsList" @confirm="handlePickerHospitalConfirm">
		</u-select>
	</view>
</template>

<script>
	import Head from './components/head.vue'
	import Doctor from './components/doctor.vue'

	export default {
		components: {
			Head,
			Doctor,
		},
		data() {
			return {
				UserInfo:{},
				DoctorInfo:{},
				drugsList: [], //选择后的列表
				hospitalsPickerShow: false, //药品选择器显示
				chooseHospital: '', //选择的医院
				allHospitalsList: [ //药品选择器中列表数据
					{
						label: '7院',
						value: '777' //可以是医院id
					},
					{
						label: '222',
						value: '啊啊啊'
					},
					{
						label: '433',
						value: '的萨芬'
					},
				],
			}
		},
		onLoad() {
			this.$event.on('userEvent',(UserInfo)=>{//注册一个'test'事件，等待触发事件时传递一个title信息
			    this.UserInfo=JSON.parse(UserInfo)
				console.log(this.UserInfo)
			})
			this.$event.on('doctorEvent',(DoctorInfo)=>{//注册一个'test'事件，等待触发事件时传递一个title信息
			    this.DoctorInfo=JSON.parse(DoctorInfo)
				console.log(this.DoctorInfo)
			})
		},
		methods: {
			showIndex() {
				this.hospitalsPickerShow = true
			},
			handlePickerHospitalConfirm(data) {
				this.chooseHospital = data[0].value
				console.log(this.chooseHospital)
			},
		}
	}
</script>

<style scoped>
	.content {
		margin: 0 15upx;
	}
</style>
